import React from 'react';
import { DSA_TOPICS } from '../data/dsaTopics';

export default function HomePage({ onStartChat, onSelectTopic }) {
  // Show key topics on the homepage
  const displayTopics = DSA_TOPICS.slice(0, 6);

  const TECH_STACK = [
    "React",
    "Node.js",
    "Google Gemini",
    "Pinecone",
    "LangChain",
    "RAG"
  ];

  const PIPELINE_STEPS = [
    {
      num: "01",
      name: "Rewrite",
      desc: "Contextual follow-up questions are converted into standalone queries."
    },
    {
      num: "02",
      name: "Retrieve",
      desc: "The query embedding is matched against DSA knowledge stored in Pinecone."
    },
    {
      num: "03",
      name: "Ground",
      desc: "The most relevant document chunks are supplied to the model as context."
    },
    {
      num: "04",
      name: "Generate",
      desc: "Gemini generates a response based on the retrieved information."
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 bg-grid-subtle">
      
      {/* 1. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 max-w-5xl mx-auto text-center">
        
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Tag Badge */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-8 shadow-inner">
          RAG-Powered DSA Knowledge Assistant
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Ask DSA Questions. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500">
            Get Answers Grounded in Context.
          </span>
        </h1>

        {/* Supporting Line */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ContextIQ retrieves relevant concepts from a DSA knowledge base and uses Gemini to generate focused, context-aware responses.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onStartChat}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25"
          >
            Ask ContextIQ
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 active:scale-95 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-sm font-medium transition-all shadow-sm"
          >
            See How It Works
          </button>
        </div>

      </section>

      {/* 2. Three Feature Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto border-t border-slate-900/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Retrieval */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xs hover:border-slate-700 transition-all">
            <div className="text-[11px] font-mono text-cyan-400 mb-2 uppercase tracking-wider font-semibold">
              01 &middot; RETRIEVAL
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Semantic Knowledge Search
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ContextIQ converts the query into an embedding and retrieves the most relevant DSA content using Pinecone.
            </p>
          </div>

          {/* Card 2: Grounded Generation */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xs hover:border-slate-700 transition-all">
            <div className="text-[11px] font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              02 &middot; GROUNDED GENERATION
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Context-Aware Responses
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Retrieved knowledge is provided to Gemini as context so responses stay grounded in the available DSA material.
            </p>
          </div>

          {/* Card 3: Conversation */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xs hover:border-slate-700 transition-all">
            <div className="text-[11px] font-mono text-emerald-400 mb-2 uppercase tracking-wider font-semibold">
              03 &middot; CONVERSATION
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Contextual Follow-Ups
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conversation history and query rewriting help ContextIQ understand follow-up questions without losing the original context.
            </p>
          </div>

        </div>
      </section>

      {/* 4. How ContextIQ Works Section */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-slate-900/80">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
            ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            How ContextIQ Works
          </h2>
          <p className="text-sm text-slate-400">
            A simple retrieval-augmented generation pipeline.
          </p>
        </div>

        {/* Flow Strip */}
        <div className="mb-10 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] text-xs font-mono text-slate-400 px-2">
            <span className="text-slate-200 font-medium">Question</span>
            <span className="text-slate-600">&rarr;</span>
            <span className="text-slate-200 font-medium">Query Rewriting</span>
            <span className="text-slate-600">&rarr;</span>
            <span className="text-slate-200 font-medium">Semantic Retrieval</span>
            <span className="text-slate-600">&rarr;</span>
            <span className="text-slate-200 font-medium">Relevant Context</span>
            <span className="text-slate-600">&rarr;</span>
            <span className="text-cyan-400 font-medium">Gemini Response</span>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PIPELINE_STEPS.map((step) => (
            <div 
              key={step.num}
              className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 block mb-2">
                  STEP {step.num}
                </span>
                <h4 className="text-sm font-semibold text-white mb-2">
                  {step.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. Explore DSA Topics Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-slate-900/80">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">
              KNOWLEDGE BASE
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Explore DSA Topics
            </h2>
          </div>

          <button
            onClick={onStartChat}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            All Topics &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/50 text-left transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {topic.category}
                  </span>
                  <span className="text-[11px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ask &rarr;
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 group-hover:text-white mb-2">
                  {topic.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {topic.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                {topic.tags?.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

      </section>

      {/* 11. Tech Stack Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto border-t border-slate-900/80 text-center">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
          Built With
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {TECH_STACK.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-900 text-center space-y-1">
        <div className="text-xs font-mono text-slate-400">
          ContextIQ &middot; RAG-Powered DSA Knowledge Assistant
        </div>
    
      </footer>

    </div>
  );
}
