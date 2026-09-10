import React, { useState, useRef, useEffect } from 'react';
import { DSA_TOPICS, DSA_CATEGORIES } from '../data/dsaTopics';

export default function HomePage({ onStartChat, onSelectTopic }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quickQuestion, setQuickQuestion] = useState('');
  const scrollContainerRef = useRef(null);

  // Always reset scroll to top on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, []);

  const categories = ['All', ...DSA_CATEGORIES];

  const filteredTopics = selectedCategory === 'All' 
    ? DSA_TOPICS 
    : DSA_TOPICS.filter((t) => t.category === selectedCategory);

  const handleQuickAsk = (e) => {
    e.preventDefault();
    onStartChat();
  };

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
    <div 
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 bg-grid-subtle scroll-smooth"
    >
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-4xl mx-auto text-center">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-6 shadow-inner tracking-wide">
          RAG-POWERED DSA ASSISTANT
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Master DSA with ContextIQ.
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 mb-5">
          Ask questions. Understand concepts. Learn from context.
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          ContextIQ retrieves relevant concepts from a DSA knowledge base and uses Gemini to generate focused, context-aware responses.
        </p>

        <div className="flex items-center justify-center">
          <button
            onClick={onStartChat}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Ask ContextIQ</span>
            <span>&rarr;</span>
          </button>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-slate-900/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Explore DSA Topics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browse concepts and algorithms from the ContextIQ knowledge base.
            </p>
          </div>

          <button
            onClick={onStartChat}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors self-start sm:self-auto cursor-pointer"
          >
            View all &rarr;
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white border border-slate-700 font-medium shadow-xs'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/40 text-left transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2 font-medium">
                  {topic.category}
                </span>

                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-white mb-2 transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {topic.desc}
                </p>
              </div>

              <div>
                {topic.tags && topic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60 mb-3">
                    {topic.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-400 border border-slate-700/40">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-xs font-mono text-blue-400 group-hover:text-blue-300 inline-flex items-center gap-1 transition-colors">
                  <span>Explore</span>
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800/90 shadow-xl">
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
              Have a DSA question?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Ask about algorithms, data structures, complexity, or implementation.
            </p>
          </div>

          <form onSubmit={handleQuickAsk} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-3xl">
            <input
              type="text"
              value={quickQuestion}
              onChange={(e) => setQuickQuestion(e.target.value)}
              placeholder="e.g. Why is binary search O(log n)?"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-sm transition-all shadow-md shadow-blue-600/20 shrink-0 cursor-pointer flex items-center justify-center gap-1"
            >
              <span>Ask</span>
              <span>&rarr;</span>
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-slate-900/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2 font-medium">
            ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            How ContextIQ Works
          </h2>
          <p className="text-sm text-slate-400">
            A simple retrieval-augmented generation pipeline.
          </p>
        </div>

        <div className="mb-10 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[640px] text-xs font-mono text-slate-400 px-3">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PIPELINE_STEPS.map((step) => (
            <div 
              key={step.num}
              className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/80 hover:border-slate-700/80 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 block mb-2 font-medium">
                  STEP {step.num}
                </span>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {step.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-900 text-center">
        <div className="text-xs font-mono text-slate-400">
          ContextIQ &middot; RAG-Powered DSA Knowledge Assistant
        </div>
      </footer>
    </div>
  );
}
