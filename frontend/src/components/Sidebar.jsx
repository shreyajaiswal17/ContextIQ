import React, { useState, useMemo } from 'react';
import { DSA_TOPICS, DSA_CATEGORIES } from '../data/dsaTopics';

export default function Sidebar({ 
  isOpen, 
  onClose, 
  onSelectTopic, 
  selectedTopic,
  messageCount 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return DSA_TOPICS;
    const q = searchQuery.toLowerCase();
    return DSA_TOPICS.filter((t) => 
      t.title.toLowerCase().includes(q) || 
      t.category.toLowerCase().includes(q) ||
      t.tags?.some(tag => tag.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          fixed top-16 bottom-0 left-0 z-40 w-72 bg-slate-950 md:bg-slate-900/90 
          border-r border-slate-800/80 backdrop-blur-md flex flex-col justify-between 
          transition-transform duration-200 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Knowledge Topics
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700/60">
                {DSA_TOPICS.length}
              </span>
            </div>

            <button 
              onClick={onClose}
              className="px-2 py-0.5 text-xs text-slate-400 hover:text-white md:hidden"
            >
              Close
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 pr-7 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          <div className="space-y-4">
            {isSearching ? (
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 mb-1.5">
                  Matches ({filteredTopics.length})
                </div>
                {filteredTopics.map((topic) => {
                  const isSelected = selectedTopic?.title === topic.title;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        onSelectTopic(topic);
                        onClose();
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex flex-col gap-0.5 ${
                        isSelected
                          ? 'bg-blue-600/15 border-l-2 border-blue-400 text-blue-300 font-medium pl-2 shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      <span className="font-medium truncate">{topic.title}</span>
                      <span className="text-[10px] text-slate-500 truncate">{topic.category}</span>
                    </button>
                  );
                })}
                {filteredTopics.length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-500 font-mono">
                    No matching topics
                  </div>
                )}
              </div>
            ) : (
              DSA_CATEGORIES.map((category) => {
                const categoryTopics = DSA_TOPICS.filter((t) => t.category === category);
                return (
                  <div key={category} className="space-y-1">
                    <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                      <span>{category}</span>
                      <span className="text-[9px] text-slate-600">{categoryTopics.length}</span>
                    </div>

                    <div className="space-y-0.5">
                      {categoryTopics.map((topic) => {
                        const isSelected = selectedTopic?.title === topic.title;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => {
                              onSelectTopic(topic);
                              onClose();
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                              isSelected
                                ? 'bg-blue-600/15 border-l-2 border-blue-400 text-blue-300 font-medium pl-2 shadow-xs'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                            }`}
                          >
                            <span className="truncate">{topic.title}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>Knowledge Base</span>
          <span>{messageCount} msg{messageCount === 1 ? '' : 's'}</span>
        </div>
      </aside>
    </>
  );
}
