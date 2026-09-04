import * as dotenv from "dotenv";
dotenv.config();

import readlineSync from "readline-sync";
import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(
    process.env.PINECONE_INDEX_NAME
);

const History = [];


async function transformQuery(question) {

    History.push({
        role: "user",
        parts: [{ text: question }],
    });

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: History,

        config: {
            systemInstruction: `
You are a query rewriting expert.

Based on the provided chat history, rewrite the latest user question
into a complete standalone question.

Only output the rewritten question and nothing else.
`,
        },
    });

    History.pop();

    return response.text.trim();
}


async function chatting(question) {

    // Rewrite question
    const rewrittenQuestion = await transformQuery(question);

    console.log("\nSearching for:", rewrittenQuestion);


    // Convert query into embedding
    const embeddingResponse = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: rewrittenQuestion,

        config: {
            outputDimensionality: 768,
        },
    });

    const queryVector =
        embeddingResponse.embeddings?.[0]?.values;

    if (!queryVector) {
        throw new Error("Query embedding failed");
    }


    // Search Pinecone
    const searchResults = await pineconeIndex.query({
        topK: 5,
        vector: queryVector,
        includeMetadata: true,
    });


    // Create context
    const context = searchResults.matches
        .map((match) => match.metadata?.text)
        .filter(Boolean)
        .join("\n\n");


    // Add user question to history
    History.push({
        role: "user",
        parts: [{ text: question }],
    });


    // Generate final answer
    const response = await ai.models.generateContent({

        model: "gemini-3.5-flash",

        contents: History,

        config: {
            systemInstruction: `
You are a Data Structures and Algorithms assistant.

Answer the user's question using ONLY the provided context.

If the answer is not available in the context, say:
"I could not find the answer in the provided document."

Keep the answer clear and easy to understand.

Context:
${context}
`,
        },
    });


    // Store model response
    History.push({
        role: "model",
        parts: [{ text: response.text }],
    });


    console.log("\n" + response.text);
}


async function main() {

    while (true) {

        const userProblem = readlineSync.question(
            "\nAsk me anything --> "
        );

        if (
            userProblem.toLowerCase() === "exit" ||
            userProblem.toLowerCase() === "quit"
        ) {
            break;
        }

        await chatting(userProblem);
    }
}


main().catch(console.error);