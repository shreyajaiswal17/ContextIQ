import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Code2, 
  Search, 
  Layers, 
  Zap, 
  ShieldCheck, 
  FileText,
  Hash,
  Compass
} from 'lucide-react';

const FEATURED_TOPICS = [
  {
    title: "Arrays & Hashing",
    desc: "Two Sum, Kadane's Algorithm, Dutch National Flag, and Hash Map optimizations.",
    query: "Explain optimal Array techniques (Kadane's Algorithm, Two Sum, Dutch National Flag) with time and space complexity."
  },
  {
    title: "Binary Search",
    desc: "Search in rotated arrays, search on answer space, and matrix binary search.",
    query: "Explain Binary Search on 1D arrays, rotated sorted arrays, and search-on-answer space (e.g. Book Allocation)."
  },
  {
    title: "Dynamic Programming",
    desc: "0/1 Knapsack, Longest Common Subsequence (LCS), Grid DP, and space optimization.",
    query: "Explain Dynamic Programming from recursion to memoization to tabulation with examples: 0/1 Knapsack, LCS, and Grid DP."
  },
  {
    title: "Graph Algorithms",
    desc: "BFS, DFS, Dijkstra's Shortest Path, Topological Sort, and Disjoint Set Union.",
    query: "Explain Graph traversals (BFS, DFS), Topological Sort (Kahn's), and Dijkstra's Shortest Path algorithm with priority queue."
  },
  {
    title: "Binary Trees & BST",
    desc: "Traversals, Lowest Common Ancestor (LCA), Diameter, and BST validation.",
    query: "Explain Binary Tree traversals (Inorder, Preorder, Postorder), Height, Diameter, and Lowest Common Ancestor (LCA)."
  },
  {
    title: "Stacks & Queues",
    desc: "Monotonic Stack patterns, Next Greater Element, and Trapping Rainwater.",
    query: "Explain the Monotonic Stack pattern and how to solve the Next Greater Element and Trapping Rainwater problems."
  }
];

export default function HomePage({ onStartChat, onSelectTopic }) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 max-w-5xl mx-auto text-center">
        
        {/* Subtle Top Capsule */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Knowledge & Algorithmic Query Engine</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Precision Knowledge Retrieval <br />
          <span className="text-slate-400">for Complex Problem Solving</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ContextIQ combines vector search with generative intelligence to deliver grounded technical explanations, algorithm breakdowns, and verified code implementations.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStartChat}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-medium text-sm transition-all shadow-sm active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('featured-topics');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-sm font-medium transition-all"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Explore Topics</span>
          </button>
        </div>

      </section>

      {/* Value Pillars Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 mb-4">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">
              Semantic Vector Retrieval
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Finds exact relevant passages and algorithmic context using high-dimensional vector embeddings and semantic search.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">
              Multi-Turn Context Rewriting
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Follow-up questions are automatically contextualized into standalone search queries for coherent, continuous discussions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 mb-4">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">
              Structured Code & Complexity
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides clean, formatted code blocks with time/space complexity trade-offs and edge case considerations.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Topics Launcher */}
      <section id="featured-topics" className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto border-t border-slate-900">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Featured Problem Domains
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any core topic to begin an inquiry with the assistant.
            </p>
          </div>

          <button
            onClick={onStartChat}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
          >
            <span>View All Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_TOPICS.map((topic, index) => (
            <button
              key={index}
              onClick={() => onSelectTopic(topic)}
              className="p-5 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {topic.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {topic.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span>Start Discussion</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>

      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-3">
          <span>ContextIQ</span>
          <span>/</span>
          <span>Knowledge & Reasoning Assistant</span>
        </div>
      </footer>

    </div>
  );
}
