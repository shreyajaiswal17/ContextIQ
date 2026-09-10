# ContextIQ

ContextIQ is a RAG-powered (Retrieval-Augmented Generation) DSA knowledge assistant designed to deliver accurate, context-grounded responses by querying a curated Data Structures and Algorithms knowledge base. It combines semantic vector retrieval with Google Gemini to ground its explanations directly in source documentation and maintains conversation coherence through multi-turn query rewriting.

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons
- **Backend API**: Express.js (Node.js ES Modules)
- **AI Models**: 
  - **Generation & Rewriting**: Google Gemini 3.5 Flash (`gemini-3.5-flash`)
  - **Vector Embeddings**: Gemini Embedding 001 (`gemini-embedding-001`, 768-dim)
- **Vector Database**: Pinecone
- **RAG Pipeline**: Multi-turn query rewriting, semantic cosine similarity search, chunk attribution, grounded response synthesis

---


## Architecture & RAG Pipeline

```
User Query (e.g. "What is its time complexity?")
    ↓
Query Rewriter (Gemini 3.5 Flash + Conversation History)
    ↓
Standalone Query (e.g. "What is the time complexity of Merge Sort?")
    ↓
Embedding Model (Gemini Embedding 001 → 768-dim vector)
    ↓
Vector Retrieval (Pinecone Top-5 nearest neighbors from Dsa.pdf)
    ↓
Context Assembly (Retrieved knowledge chunks + similarity scores)
    ↓
Grounded Generation (Gemini 3.5 Flash with strict technical system prompt)
    ↓
Response Delivered (Answer + Source Attribution + Rewritten Query transparency)
```

---

## Key Features

- **Modern Glassmorphic Dark UI**: Built with React 19, Tailwind CSS v4, and Lucide icons.
- **Context-Grounded Retrieval**: High-precision vector search over indexed DSA chunks with similarity score badges.
- **Source Chunk Inspector**: View the exact excerpts from `Dsa.pdf` used to ground each response.
- **Transparent Query Rewriting**: Inspect how ContextIQ reformulates follow-up questions for standalone retrieval.
- **Rich Code Blocks**: Clean syntax formatting for C++, Python, and Java algorithms with one-click copy.
- **Dual Interfaces**:
  - **Web Application**: Visual chat UI with topic filters, breadcrumbs, and inspectable sources.
  - **Terminal CLI**: Fast, distraction-free command-line chat for quick reference.

---

## Setup & Local Development

### 1. Clone & Install Dependencies

```bash
git clone <your-repository-url>
cd ContextIQ

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
GOOGLE_API_KEY=your_google_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=genai
PINECONE_ENVIRONMENT=us-east-1
PORT=5000
```

### 3. Run Locally

Open two terminal tabs:

```bash
# Terminal 1: Start Backend API (runs on port 5000)
cd backend
npm run dev

# Terminal 2: Start Frontend App (runs on port 5173)
cd frontend
npm run dev
```

- **Frontend Web App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

*(To chat directly in your terminal, run `node index.js` inside `backend/`)*

