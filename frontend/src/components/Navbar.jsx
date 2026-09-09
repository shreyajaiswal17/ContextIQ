import React from 'react';
import { 
  RotateCcw, 
  Menu,
  Code2,
  Home,
  MessageSquare
} from 'lucide-react';

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
    <header className="sticky top-0 z-30 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Full-width container with generous padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        
        {/* Left: Branding & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {currentView === 'chat' && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition-colors"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Logo Mark */}
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-slate-600 transition-colors shadow-sm">
              <Code2 className="w-4 h-4" />
            </div>

            {/* Title */}
            <span className="text-base font-bold tracking-tight text-white">
              Context<span className="text-cyan-400">IQ</span>
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Home vs Assistant) */}
        <nav className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'home'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'chat'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Assistant</span>
          </button>
        </nav>

        {/* Right: Engine Status & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>{isHealthy ? 'Engine Online' : 'Connecting'}</span>
          </div>

          {/* New Chat Button */}
          {currentView === 'chat' && (
            <button
              onClick={onNewChat}
              disabled={isGenerating}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 hover:text-white text-xs font-medium border border-slate-700/80 hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              title="Start a new conversation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>New Chat</span>
            </button>
          )}

          {currentView === 'home' && (
            <button
              onClick={() => onNavigate('chat')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-white text-slate-900 text-xs font-medium transition-all shadow-sm active:scale-95"
            >
              <span>Launch Chat</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
