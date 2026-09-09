# ContextIQ

ContextIQ is a RAG-powered DSA knowledge assistant designed to generate accurate, context-aware responses by retrieving relevant information from a curated DSA knowledge base. It combines semantic retrieval with Google Gemini to ground responses in the source content and supports multi-turn conversations through query rewriting for better follow-up understanding.


## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Markdown (syntax highlighted code blocks)
- **Backend API**: Express.js (Node.js ES Modules)
- **AI Models**: Google Gemini 3.5 Flash (Query Rewriter & Grounded Generator), Gemini Embedding 001 (768-dim)
- **Vector Database**: Pinecone
- **RAG Pipeline**: Semantic retrieval, multi-turn query rewriting, grounded response generation

## How It Works

```
User Query  
    ↓  
Query Rewriting (Gemini 3.5 Flash)  
    ↓  
Embedding Generation (Gemini Embedding 001)  
    ↓  
Pinecone Semantic Search (Top-5 Vector Search)  
    ↓  
Relevant Context Retrieval (Dsa.pdf Chunks)  
    ↓  
Gemini Response Generation (Grounded DSA Answer)
```

## Key Features

- **Modern Glassmorphic Dark UI**: Built with React and Tailwind CSS with real-time status indicators.
- **Semantic Search over DSA Content**: 227 vectors indexed in Pinecone with similarity score badges.
- **Context Chunk Inspector**: Inspect exact source excerpts from `Dsa.pdf` used to ground each response.
- **Query Rewriting Transparency**: Visualizes how ContextIQ rewrites follow-up questions for standalone retrieval.
- **Interactive Code Blocks**: Formatted DSA algorithms with one-click code copying.
- **Quick-Start Starter Cards**: Pre-configured prompts for Binary Search Trees, AVL Trees, Graphs, Sorting, and Complexity Analysis.

## Setup & Running

1. Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd ContextIQ
npm install
npm install --prefix frontend
```

2. Create a `.env` file in the root folder:
```env
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
```

3. Start both the Backend API and React UI:

```bash
npm run dev
```

- **React Web App**: [http://localhost:5173](http://localhost:5173)
- **Express Backend API**: [http://localhost:5000](http://localhost:5000)

*(You can also run the CLI script directly using `npm start`)*