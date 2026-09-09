import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ 
  onSendMessage, 
  isGenerating, 
  disabled, 
  placeholder = "Ask any doubt, concept, or code implementation...",
  prefill = "",
  activeTopic = null,
  onClearTopic = null
}) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (prefill) {
      setInput(prefill);
      textareaRef.current?.focus();
    }
  }, [prefill]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating || disabled) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-3 pb-4 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Active Context / Generating Indicator */}
        <div className="flex items-center justify-between mb-2 px-1 text-xs">
          {activeTopic ? (
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-mono text-blue-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Topic: {activeTopic.title}</span>
              {onClearTopic && (
                <button
                  onClick={onClearTopic}
                  className="ml-1 text-blue-400 hover:text-white"
                  title="Clear topic filter"
                >
                  ✕
                </button>
              )}
            </div>
          ) : (
            <div className="text-[11px] font-mono text-slate-500">
              General DSA Doubt Solving
            </div>
          )}

          {isGenerating && (
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              Preparing response...
            </div>
          )}
        </div>

        {/* Form Container */}
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/70 hover:border-slate-600/80 focus-within:border-blue-500/70 focus-within:ring-2 focus-within:ring-blue-500/20 shadow-xl transition-all"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating || disabled}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-36 min-h-[38px] leading-relaxed disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isGenerating || disabled}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-xs transition-all shadow-md shadow-blue-600/20 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            {isGenerating ? 'Thinking' : 'Send'}
          </button>
        </form>

        {/* Footer Hint */}
        <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-mono text-slate-500">
          <span>ContextIQ DSA Assistant</span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-slate-300 text-[10px]">Enter</kbd> to send &middot; <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-slate-300 text-[10px]">Shift+Enter</kbd> newline
          </span>
        </div>

      </div>
    </div>
  );
}
