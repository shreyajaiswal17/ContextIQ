import React from 'react';
import { DSA_TOPICS } from '../data/dsaTopics';

export default function HomePage({ onStartChat, onSelectTopic }) {
  // Select top 6 high-yield featured topics for display
  const featuredTopics = DSA_TOPICS.slice(0, 6);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 bg-grid-subtle">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 max-w-5xl mx-auto text-center">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-8 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          Interactive DSA Learning & Doubt Solving
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Master Data Structures & Algorithms <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500">
            with Clear Explanations and Code
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ContextIQ helps students understand core algorithms, visualize time and space complexity, and write clean, optimal solutions in C++, Python, and Java.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onStartChat}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25"
          >
            Start Learning
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('featured-domains');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 active:scale-95 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-sm font-medium transition-all shadow-sm"
          >
            Explore Topics
          </button>
        </div>

      </section>

      {/* Core Learning Pillars */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto border-t border-slate-900/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xs hover:border-slate-700 transition-all">
            <div className="text-[11px] font-mono text-cyan-400 mb-2 uppercase tracking-wider font-semibold">
              01 &middot; Curated Problem Patterns
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">
              Comprehensive Topic Coverage
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Master high-yield coding patterns including sliding windows, two pointers, binary tree traversals, graphs, and dynamic programming.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xs hover:border-slate-700 transition-all">
            <div className="text-[11px] font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              02 &middot; Step-by-Step Explanations
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">
              Intuition & Dry Runs
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get clear conceptual breakdowns with step-by-step dry runs, edge case considerations, and trade-off comparisons.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xs hover:border-slate-700 transition-all">
            <div className="text-[11px] font-mono text-emerald-400 mb-2 uppercase tracking-wider font-semibold">
              03 &middot; Clean Multi-Language Code
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">
              Optimal Time & Space Analysis
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every response includes clean, readable code implementations accompanied by rigorous Big-O time and space complexity analysis.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Problem Domains */}
      <section id="featured-domains" className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-slate-900/80">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">
              Core Study Areas
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Featured Problem Patterns
            </h2>
          </div>

          <button
            onClick={onStartChat}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            All 19 Topics &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTopics.map((topic) => (
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
                    Open &rarr;
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 group-hover:text-white mb-2">
                  {topic.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {topic.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                {topic.tags?.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-900 text-center text-xs font-mono text-slate-500">
        ContextIQ &middot; Data Structures & Algorithms Learning Assistant for Students
      </footer>

    </div>
  );
}
