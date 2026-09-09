import React from 'react';
import { 
  RotateCcw, 
  Menu,
  FileCode,
  Layers,
  Code2
} from 'lucide-react';

export default function Navbar({ 
  systemStatus, 
  onNewChat, 
  isGenerating, 
  toggleSidebar 
}) {
  const isHealthy = systemStatus?.status === 'healthy';

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/90">
      {/* Subtle top hairline highlight */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Branding & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            {/* Logo Mark */}
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/90 flex items-center justify-center text-cyan-400 shadow-sm">
              <Code2 className="w-4 h-4" />
            </div>

            {/* Title & Tag */}
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold tracking-tight text-white">
                Context<span className="text-cyan-400">IQ</span>
              </span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 hidden sm:inline-block">
                DSA Engine
              </span>
            </div>
          </div>
        </div>

        {/* Center: Active Knowledge Document Context */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <FileCode className="w-3.5 h-3.5 text-cyan-400" />
          <span>Document:</span>
          <span className="font-mono text-slate-200 font-medium">Dsa.pdf</span>
        </div>

        {/* Right: Engine Status & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Status Capsule */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            {isHealthy ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-slate-300">Ready</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-amber-300">Connecting</span>
              </>
            )}
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 hover:text-white text-xs font-medium border border-slate-700/80 hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            title="Start a new conversation (Ctrl+N)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>New Chat</span>
            <kbd className="hidden lg:inline-block text-[10px] font-mono px-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
              ⌘N
            </kbd>
          </button>

        </div>

      </div>
    </header>
  );
}
