import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini & Pinecone
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

/**
 * Helper to call Gemini generateContent with auto-retry for temporary 503 high-demand spikes.
 */
async function generateWithRetry(params, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (err) {
      const is503 = err.message?.includes("503") || err.message?.includes("UNAVAILABLE");
      if (is503 && attempt < retries) {
        console.log(`[Gemini 503 High-Demand Spike] Retrying in 1.5s (attempt ${attempt + 1}/${retries})...`);
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }
      throw err;
    }
  }
}

/**
 * Rewrites a follow-up query into a standalone query using conversation history.
 */
async function transformQuery(question, history = []) {
  if (!history || history.length === 0) {
    return question;
  }

  const queryHistory = [
    ...history,
    {
      role: "user",
      parts: [{ text: question }],
    },
  ];

  try {
    const response = await generateWithRetry({
      model: "gemini-3.5-flash",
      contents: queryHistory,
      config: {
        systemInstruction: `
You are a query rewriting expert.

Based on the provided chat history, rewrite the latest user question
into a complete, standalone question that can be understood without
the previous conversation.

Only output the rewritten question and nothing else.
`,
      },
    });

    return response.text ? response.text.trim() : question;
  } catch (err) {
    console.error("Query rewrite fallback:", err.message);
    return question;
  }
}

/**
 * Health check endpoint - returns system status and Pinecone stats.
 */
app.get("/api/health", async (req, res) => {
  try {
    const stats = await pineconeIndex.describeIndexStats();
    res.json({
      status: "healthy",
      model: "gemini-3.5-flash",
      embeddingModel: "gemini-embedding-001",
      indexName: process.env.PINECONE_INDEX_NAME,
      dimension: stats.dimension,
      totalRecordCount: stats.totalRecordCount,
      namespaces: stats.namespaces,
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

/**
 * Chat endpoint - handles query rewriting, vector retrieval, and grounded response generation.
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { question, history = [] } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "A valid question is required." });
    }

    console.log(`\n[Incoming Query]: "${question}"`);

    // 1. Rewrite query if conversation history exists
    const rewrittenQuestion = await transformQuery(question, history);
    console.log(`[Rewritten Query]: "${rewrittenQuestion}"`);

    // 2. Generate embedding for rewritten question
    const embeddingResponse = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: rewrittenQuestion,
      config: {
        outputDimensionality: 768,
      },
    });

    const queryVector = embeddingResponse.embeddings?.[0]?.values;
    if (!queryVector) {
      throw new Error("Failed to generate embedding for query.");
    }

    // 3. Query Pinecone vector database
    const searchResults = await pineconeIndex.query({
      topK: 5,
      vector: queryVector,
      includeMetadata: true,
    });

    const matches = (searchResults.matches || []).filter(
      (match) => match.metadata?.text
    );

    // 4. Assemble context from retrieved chunks
    const context = matches
      .map((match) => match.metadata.text)
      .join("\n\n");

    const sources = matches.map((match, idx) => ({
      id: match.id || `chunk-${idx + 1}`,
      score: match.score ? Number(match.score.toFixed(4)) : null,
      text: match.metadata.text,
      source: match.metadata.source || "./Dsa.pdf",
      pageNumber: match.metadata.pageNumber ?? null,
      metadata: match.metadata || {},
    }));

    // 5. Build prompt history including the current query
    const promptHistory = [
      ...history,
      {
        role: "user",
        parts: [{ text: question }],
      },
    ];

    // 6. Generate final answer with Gemini
    const response = await generateWithRetry({
      model: "gemini-3.5-flash",
      contents: promptHistory,
      config: {
        systemInstruction: `
You are ContextIQ, an expert technical Data Structures and Algorithms assistant.

Prioritize the provided context from the indexed DSA knowledge base. If the context contains the answer, ground your response thoroughly in it. If the context does not fully cover the inquiry, provide a complete, mathematically rigorous, and educational explanation using standard optimal Data Structures and Algorithms principles.

Format code snippets with proper markdown code blocks (e.g. \`\`\`cpp or \`\`\`python). Include time complexity (Big-O) and space complexity analysis.
Never use emojis or decorative pictograms in your response. Keep the formatting strictly technical, clean, and professional.

Context from DSA Knowledge Base:
${context}
`,
      },
    });

    const answer = response.text || "No response generated.";

    res.json({
      answer,
      rewrittenQuestion,
      sources,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`ContextIQ Server running on http://localhost:${PORT}`);
});
