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
    <header className="sticky top-0 z-30 w-full bg-slate-950 border-b border-slate-800">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          {currentView === 'chat' && (
            <button
              onClick={toggleSidebar}
              className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded md:hidden"
            >
              Menu
            </button>
          )}

          <div 
            onClick={() => onNavigate('home')}
            className="cursor-pointer select-none"
          >
            <span className="text-lg font-bold tracking-tight text-white">
              Context<span className="text-cyan-400">IQ</span>
            </span>
          </div>
        </div>

        {/* Center: Clean Text Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${
              currentView === 'home'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${
              currentView === 'chat'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Assistant
          </button>
        </nav>

        {/* Right: Status & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Text-only Status */}
          <div className="hidden sm:block px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
            {isHealthy ? 'Online' : 'Connecting'}
          </div>

          {/* New Chat Button */}
          {currentView === 'chat' && (
            <button
              onClick={onNewChat}
              disabled={isGenerating}
              className="px-3.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 hover:text-white text-xs font-medium border border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              New Chat
            </button>
          )}

          {currentView === 'home' && (
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-1.5 rounded bg-slate-100 hover:bg-white text-slate-950 text-xs font-medium transition-colors"
            >
              Launch Chat
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
