import * as dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(
    process.env.PINECONE_INDEX_NAME
);

async function indexDocument() {
    try {
        // 1. Load PDF using LangChain
        const loader = new PDFLoader("./Dsa.pdf");

        const rawDocs = await loader.load();

        console.log(`Loaded ${rawDocs.length} pages from PDF.`);


        // 2. Split document into smaller overlapping chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunkDocs =
            await textSplitter.splitDocuments(rawDocs);

        console.log(`Created ${chunkDocs.length} chunks.`);


        // 3. Generate embeddings and prepare Pinecone records
        const vectors = [];

        for (let i = 0; i < chunkDocs.length; i++) {

            const chunk = chunkDocs[i];

            const embeddingResponse =
                await ai.models.embedContent({
                    model: "gemini-embedding-001",
                    contents: chunk.pageContent,

                    config: {
                        outputDimensionality: 768,
                    },
                });


            const values =
                embeddingResponse.embeddings?.[0]?.values;


            if (!values) {
                console.log(
                    `Embedding failed for chunk ${i}`
                );
                continue;
            }


            // PDFLoader metadata contains page information
            const pageNumber =
                chunk.metadata?.loc?.pageNumber;


            vectors.push({
                id: `dsa-chunk-${i}`,

                values,

                metadata: {
                    text: chunk.pageContent,
                    source: "./Dsa.pdf",
                    pageNumber:
                        pageNumber ?? 0,
                },
            });


            console.log(
                `Prepared ${i + 1}/${chunkDocs.length}`
            );
        }


        // 4. Store vectors in Pinecone
        const batchSize = 50;

        for (
            let i = 0;
            i < vectors.length;
            i += batchSize
        ) {

            const batch =
                vectors.slice(i, i + batchSize);

            await pineconeIndex.upsert(batch);

            console.log(
                `Uploaded ${Math.min(
                    i + batchSize,
                    vectors.length
                )}/${vectors.length}`
            );
        }


        console.log(
            "Indexing completed successfully."
        );

    } catch (error) {

        console.error(
            "Error during indexing:",
            error
        );
    }
}


indexDocument();