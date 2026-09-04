# ContextIQ

ContextIQ is a RAG-powered DSA knowledge assistant designed to generate accurate, context-aware responses by retrieving relevant information from a curated DSA knowledge base. It combines semantic retrieval with Google Gemini to ground responses in the source content and supports multi-turn conversations through query rewriting for better follow-up understanding.


## Tech Stack

- React
- Google Gemini
- Pinecone
- LangChain

## How It Works

User Query  
↓  
Query Rewriting  
↓  
Embedding Generation  
↓  
Pinecone Semantic Search  
↓  
Relevant Context Retrieval  
↓  
Gemini Response Generation

## Key Features

- Semantic search over DSA content
- RAG-based grounded response generation
- Conversation history support
- Query rewriting for follow-up questions
- Pinecone-based vector retrieval

## Setup

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd ContextIQ
npm install
```

Create a .env file with the following - 
```
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
```