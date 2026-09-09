import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  User, 
  Terminal, 
  Copy, 
  Check
} from 'lucide-react';

// Code block with clean copy button
function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <span className="font-mono text-[11px] uppercase text-slate-400">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-3.5 overflow-x-auto text-xs leading-relaxed font-mono text-slate-200">
        <code>{value}</code>
      </pre>
    </div>
  );
}

export default function ChatMessage({ message, onSelectSuggestion }) {
  const isUser = message.role === 'user';

  return (
    <div className={`py-5 px-4 sm:px-6 ${isUser ? 'bg-transparent' : 'bg-slate-900/40 border-y border-slate-900'}`}>
      <div className="max-w-4xl mx-auto flex gap-3.5 items-start">
        
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Message Body */}
        <div className="flex-1 min-w-0 space-y-2">
          
          {/* Header */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-slate-300">
              {isUser ? 'You' : 'ContextIQ'}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">{message.timestamp || 'Just now'}</span>
          </div>

          {/* Content */}
          {isUser ? (
            <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          ) : (
            <div className="text-sm leading-relaxed text-slate-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');
                    
                    return !inline ? (
                      <CodeBlock
                        language={match ? match[1] : ''}
                        value={codeString}
                      />
                    ) : (
                      <code className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs border border-slate-700/60" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p({ children }) {
                    return <div className="mb-2.5 last:mb-0 leading-relaxed">{children}</div>;
                  },
                  ul({ children }) {
                    return <ul className="my-2 ml-4 list-disc space-y-1 text-slate-300">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="my-2 ml-4 list-decimal space-y-1 text-slate-300">{children}</ol>;
                  },
                  li({ children }) {
                    return <li className="pl-0.5">{children}</li>;
                  },
                  h1({ children }) {
                    return <h1 className="text-base font-bold text-white mt-3 mb-1.5">{children}</h1>;
                  },
                  h2({ children }) {
                    return <h2 className="text-sm font-bold text-white mt-3 mb-1">{children}</h2>;
                  },
                  h3({ children }) {
                    return <h3 className="text-xs font-bold text-slate-200 mt-2 mb-1">{children}</h3>;
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto my-2.5 border border-slate-800 rounded">
                        <table className="min-w-full divide-y divide-slate-800 text-xs">{children}</table>
                      </div>
                    );
                  },
                  th({ children }) {
                    return <th className="px-3 py-1.5 bg-slate-950 text-left font-medium text-slate-400">{children}</th>;
                  },
                  td({ children }) {
                    return <td className="px-3 py-1.5 border-t border-slate-800 text-slate-300">{children}</td>;
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>

              {/* Suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/60">
                  <div className="text-[11px] text-slate-400 mb-1.5">
                    Suggested topics:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectSuggestion && onSelectSuggestion(suggestion)}
                        className="text-xs text-left px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
