import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3.5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
          <span className="font-mono text-[11px] font-semibold uppercase text-slate-300">
            {language || 'code'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-mono text-slate-200">
        <code>{value}</code>
      </pre>
    </div>
  );
}

function TopicStarterCard({ message, onSelectSuggestion }) {
  const topicTitle = message.topicTitle || "Ask ContextIQ";
  const topicDesc = message.topicDesc || "Ask a DSA concept, algorithm, complexity, or implementation question.";
  const tags = message.tags || [];
  const suggestions = message.suggestions || [];

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/70 border border-slate-800/90 shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {topicTitle}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-2xl">
            {topicDesc}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/80 border border-slate-700/60 text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                Try a question
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectSuggestion && onSelectSuggestion(s)}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-855 border border-slate-800 hover:border-blue-500/50 text-left transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white leading-relaxed">
                      {s}
                    </span>
                    <span className="text-[11px] font-mono text-blue-400 mt-2.5 inline-flex items-center group-hover:translate-x-0.5 transition-transform">
                      Ask ContextIQ &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChatMessage({ message, onSelectSuggestion }) {
  const isUser = message.role === 'user';
  const isStarter = message.isStarter || message.id === 'initial-greeting' || message.id?.startsWith('topic-greeting-');

  if (isStarter) {
    return <TopicStarterCard message={message} onSelectSuggestion={onSelectSuggestion} />;
  }

  const hasRefinedQuery = !isUser && 
    Boolean(message.rewrittenQuestion) && 
    Boolean(message.originalQuestion) && 
    message.rewrittenQuestion.trim().toLowerCase() !== message.originalQuestion.trim().toLowerCase();

  return (
    <div className={`py-4 sm:py-5 px-4 sm:px-6 transition-colors ${
      isUser ? 'bg-transparent' : 'bg-slate-900/30 border-y border-slate-900/60'
    }`}>
      <div className="max-w-4xl mx-auto flex gap-3.5 items-start">
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-mono text-[10px] font-semibold shadow-xs">
              U
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-300 font-mono text-[11px] font-bold shadow-xs">
              IQ
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-200">
              {isUser ? 'You' : 'ContextIQ Assistant'}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500 font-mono text-[11px]">{message.timestamp || 'Just now'}</span>
          </div>

          {isUser ? (
            <div className="text-sm text-slate-100 whitespace-pre-wrap leading-relaxed bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 sm:p-4 inline-block max-w-3xl shadow-xs">
              {message.content}
            </div>
          ) : (
            <div className="text-sm leading-relaxed text-slate-200">
              {hasRefinedQuery && (
                <details className="mb-3 text-[11px] font-mono text-slate-500 cursor-pointer select-none">
                  <summary className="hover:text-slate-400 transition-colors inline-flex items-center gap-1.5 py-0.5">
                    <span>Search query refined</span>
                  </summary>
                  <div className="mt-1.5 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/90 text-xs text-slate-400 space-y-1">
                    <div><span className="text-slate-500 font-mono">Original:</span> "{message.originalQuestion}"</div>
                    <div><span className="text-slate-500 font-mono">Retrieved as:</span> "{message.rewrittenQuestion}"</div>
                  </div>
                </details>
              )}

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
                      <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700/70" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p({ children }) {
                    return <div className="mb-3 last:mb-0 leading-relaxed">{children}</div>;
                  },
                  ul({ children }) {
                    return <ul className="my-2.5 ml-5 list-disc space-y-1.5 text-slate-300">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="my-2.5 ml-5 list-decimal space-y-1.5 text-slate-300">{children}</ol>;
                  },
                  li({ children }) {
                    return <li className="pl-1">{children}</li>;
                  },
                  h1({ children }) {
                    return <h1 className="text-lg font-bold text-white mt-4 mb-2 pb-1 border-b border-slate-800">{children}</h1>;
                  },
                  h2({ children }) {
                    return <h2 className="text-base font-bold text-white mt-3.5 mb-1.5">{children}</h2>;
                  },
                  h3({ children }) {
                    return <h3 className="text-sm font-semibold text-slate-200 mt-3 mb-1">{children}</h3>;
                  },
                  blockquote({ children }) {
                    return <blockquote className="border-l-2 border-blue-500/60 pl-3 py-0.5 my-2 text-slate-400 italic text-xs">{children}</blockquote>;
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto my-3 border border-slate-800 rounded-xl shadow-xs">
                        <table className="min-w-full divide-y divide-slate-800 text-xs">{children}</table>
                      </div>
                    );
                  },
                  th({ children }) {
                    return <th className="px-3.5 py-2 bg-slate-900 text-left font-semibold text-slate-300">{children}</th>;
                  },
                  td({ children }) {
                    return <td className="px-3.5 py-2 border-t border-slate-800 text-slate-300">{children}</td>;
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>

              {message.sources && message.sources.length > 0 && (
                <div className="mt-4 pt-3.5 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Retrieved Context
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {message.sources.slice(0, 3).map((source, idx) => (
                      <div 
                        key={source.id || idx}
                        className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex flex-col justify-between hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                          <span className="text-slate-300 font-medium truncate">
                            {source.pageNumber ? `DSA Base · Pg ${source.pageNumber}` : "DSA Knowledge Base"}
                          </span>
                          {source.score != null && (
                            <span className="text-cyan-400 font-mono text-[10px] shrink-0 ml-1">
                              Score: {source.score.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed font-sans">
                          {source.text || "Context chunk matched for query grounding."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 mb-2">
                    Related questions:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectSuggestion && onSelectSuggestion(suggestion)}
                        className="text-xs text-left px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/80 transition-all shadow-xs hover:border-blue-500/40"
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
