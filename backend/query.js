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


    const response =
        await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: History,

            config: {

                systemInstruction: `
You are a query rewriting expert.

Based on the provided chat history, rewrite the latest user question
into a complete standalone question that can be understood without
the previous conversation.

Only output the rewritten question and nothing else.
`,

            },
        });


    // Remove temporary question used only for rewriting
    History.pop();


    return response.text.trim();
}



async function chatting(question) {

    try {

        // 1. Rewrite follow-up question
        const rewrittenQuestion =
            await transformQuery(question);


        console.log(
            "\nSearching for:",
            rewrittenQuestion
        );


        // 2. Convert query into embedding
        const embeddingResponse =
            await ai.models.embedContent({

                model: "gemini-embedding-001",

                contents: rewrittenQuestion,

                config: {
                    outputDimensionality: 768,
                },
            });


        const queryVector =
            embeddingResponse.embeddings?.[0]?.values;


        if (!queryVector) {

            throw new Error(
                "Query embedding failed"
            );
        }


        // 3. Search existing Pinecone index
        const searchResults =
            await pineconeIndex.query({

                topK: 5,

                vector: queryVector,

                includeMetadata: true,
            });


        // 4. Preserve retrieved text + metadata
        const retrievedChunks =
            searchResults.matches
                .filter(
                    (match) =>
                        match.metadata?.text
                )
                .map((match) => ({

                    text:
                        match.metadata.text,

                    source:
                        match.metadata.source ||
                        "./Dsa.pdf",

                    pageNumber:
                        match.metadata.pageNumber,

                    score:
                        match.score,
                }));


        // 5. Build context
        const context =
            retrievedChunks
                .map(
                    (chunk) =>
                        chunk.text
                )
                .join("\n\n");


        // 6. Add actual question to conversation history
        History.push({

            role: "user",

            parts: [
                {
                    text: question,
                },
            ],
        });


        // 7. Generate grounded answer
        const response =
            await ai.models.generateContent({

                model: "gemini-3.5-flash",

                contents: History,

                config: {

                    systemInstruction: `
You are a Data Structures and Algorithms assistant.

Answer the user's question using ONLY the provided context.

If the answer cannot be found in the context, say:
"I could not find the answer in the provided document."

Keep the answer clear, concise, and educational.

Context:
${context}
`,
                },
            });


        // 8. Save assistant response in history
        History.push({

            role: "model",

            parts: [
                {
                    text: response.text,
                },
            ],
        });


        console.log(
            "\nContextIQ:\n" +
            response.text
        );


        // 9. Show retrieved sources/pages
        if (retrievedChunks.length > 0) {

            console.log("\nSources:");

            const seen = new Set();

            retrievedChunks.forEach(
                (chunk) => {

                    const key =
                        `${chunk.source}-${chunk.pageNumber}`;


                    if (seen.has(key)) {
                        return;
                    }

                    seen.add(key);


                    if (
                        chunk.pageNumber !== undefined
                    ) {

                        console.log(
                            `${chunk.source} - Page ${chunk.pageNumber}`
                        );

                    } else {

                        console.log(
                            chunk.source
                        );
                    }

                }
            );
        }


        // Useful later for your React UI
        return {
            answer: response.text,
            rewrittenQuestion,
            sources: retrievedChunks.map(
                (chunk) => ({
                    source: chunk.source,
                    pageNumber:
                        chunk.pageNumber,
                    score: chunk.score,
                })
            ),
        };


    } catch (error) {

        console.error(
            "Error while processing query:",
            error
        );
    }
}



async function main() {

    console.log(
        "\nContextIQ - RAG Based DSA Assistant\n"
    );


    while (true) {

        const userProblem =
            readlineSync.question(
                "Ask me anything --> "
            );


        if (
            userProblem
                .toLowerCase()
                .trim() === "exit" ||

            userProblem
                .toLowerCase()
                .trim() === "quit"
        ) {

            break;
        }


        await chatting(
            userProblem
        );
    }
}


main().catch(console.error);