import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

export default function ChatInput({ 
  onSendMessage, 
  isGenerating, 
  disabled, 
  placeholder = "Ask me anything --> ",
  prefill = "" 
}) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (prefill) {
      setInput(prefill);
      textareaRef.current?.focus();
    }
  }, [prefill]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
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
    <div className="sticky bottom-0 w-full bg-slate-950/90 backdrop-blur border-t border-slate-800/80 pt-3 pb-4 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Status */}
        {isGenerating && (
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
            <span>Generating response...</span>
          </div>
        )}

        {/* Input box */}
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 p-2 rounded-lg bg-slate-900 border border-slate-700/80 focus-within:border-slate-500 transition-colors"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating || disabled}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-2.5 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-36 min-h-[38px] leading-relaxed disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isGenerating || disabled}
            className="h-8 w-8 rounded bg-slate-100 hover:bg-white active:scale-95 text-slate-900 font-medium flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            aria-label="Send"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
            ) : (
              <ArrowUp className="w-4 h-4 text-slate-900" />
            )}
          </button>
        </form>

        {/* Footer Hint */}
        <div className="flex items-center justify-between mt-1.5 px-1 text-[11px] text-slate-500">
          <span>ContextIQ</span>
          <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono text-[10px]">Enter ↵</kbd></span>
        </div>

      </div>
    </div>
  );
}
