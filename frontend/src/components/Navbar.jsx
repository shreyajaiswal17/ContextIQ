import React from 'react';

export default function Navbar({ 
  systemStatus, 
  onNewChat, 
  isGenerating, 
  toggleSidebar,
  currentView, 
  onNavigate 
}) {
  const isHealthy = systemStatus?.status === 'healthy';

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3 sm:gap-4">
          {currentView === 'chat' && (
            <button
              onClick={toggleSidebar}
              className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg md:hidden transition-colors"
            >
              Topics
            </button>
          )}

          <div 
            onClick={() => onNavigate('home')}
            className="cursor-pointer select-none flex items-center gap-2 group"
          >
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors">
              Context<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">IQ</span>
            </span>
          </div>
        </div>

        <nav className="flex items-center bg-slate-900/90 border border-slate-800/90 rounded-xl p-1 shadow-inner">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'home'
                ? 'bg-slate-800 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === 'chat'
                ? 'bg-slate-800 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Assistant
          </button>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {currentView === 'chat' && (
            <button
              onClick={onNewChat}
              disabled={isGenerating}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 hover:text-white text-xs font-medium border border-slate-700/80 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              New Chat
            </button>
          )}

          {currentView === 'home' && (
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-medium transition-all shadow-sm shadow-blue-600/20"
            >
              Ask ContextIQ
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
