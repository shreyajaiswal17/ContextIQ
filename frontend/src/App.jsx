import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import HomePage from './components/HomePage';

const stripEmojis = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/\p{Extended_Pictographic}/gu, '').replace(/\s{2,}/g, ' ').trim();
};

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

const INITIAL_GREETING = {
  id: 'initial-greeting',
  role: 'model',
  isStarter: true,
  topicTitle: "Ask ContextIQ",
  topicDesc: "Ask a DSA concept, algorithm, complexity, or implementation question.",
  tags: ["Arrays", "Trees", "Graphs", "DynamicProgramming", "Complexity"],
  timestamp: 'Ready',
  suggestions: [
    "What is a Binary Search Tree and how does insertion work?",
    "Explain the difference between BFS and DFS.",
    "How does Dijkstra's algorithm find the shortest path?",
    "What is the time complexity of merge sort?"
  ],
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [messages, setMessages] = useState(() => {
    try {
      localStorage.removeItem('contextiq_chat_history');
      return [INITIAL_GREETING];
    } catch {
      return [INITIAL_GREETING];
    }
  });

  const [systemStatus, setSystemStatus] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);
  const [inputPlaceholder, setInputPlaceholder] = useState("Ask a DSA question or concept...");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentView === 'chat') {
      scrollToBottom();
    }
  }, [messages, isGenerating, currentView]);

  const fetchHealth = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      if (res.ok) {
        const data = await res.json();
        setSystemStatus(data);
        setErrorBanner(null);
      } else {
        throw new Error('Health check returned ' + res.status);
      }
    } catch (err) {
      console.error("Health check error:", err);
      setSystemStatus({ status: 'error' });
      setErrorBanner("Unable to reach ContextIQ server. Please make sure the backend is running.");
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const buildGeminiHistory = () => {
    return messages
      .filter((m) => !m.isStarter && m.id !== 'initial-greeting' && !m.id?.startsWith('topic-greeting-'))
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const topicGreeting = {
      id: `topic-greeting-${Date.now()}`,
      role: 'model',
      isStarter: true,
      topicTitle: topic.title,
      topicDesc: topic.desc,
      tags: topic.tags || [],
      timestamp: time,
      suggestions: topic.suggestions || [],
    };

    setMessages([topicGreeting]);
    setInputPlaceholder(`Ask about ${topic.title}...`);
    setCurrentView('chat');
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || isGenerating) return;

    setErrorBanner(null);
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: userTime,
      originalQuestion: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsGenerating(true);
    setGenerationPhase("Retrieving relevant context...");

    const phaseTimer = setTimeout(() => {
      setGenerationPhase("Generating grounded response...");
    }, 850);

    try {
      const historyPayload = buildGeminiHistory();

      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: stripEmojis(data.answer),
        timestamp: botTime,
        originalQuestion: text,
        rewrittenQuestion: data.rewrittenQuestion,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setErrorBanner(`Error: ${err.message || 'Failed to generate response'}`);

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `Error connecting to backend: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      clearTimeout(phaseTimer);
      setGenerationPhase(null);
      setIsGenerating(false);
    }
  };

  const handleNewChat = () => {
    if (isGenerating) return;
    setSelectedTopic(null);
    setMessages([INITIAL_GREETING]);
    setInputPlaceholder("Ask a DSA question or concept...");
    localStorage.removeItem('contextiq_chat_history');
    setCurrentView('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar
        systemStatus={systemStatus}
        onNewChat={handleNewChat}
        isGenerating={isGenerating}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {currentView === 'home' ? (
        <HomePage 
          onStartChat={() => setCurrentView('chat')}
          onSelectTopic={handleSelectTopic}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSelectTopic={handleSelectTopic}
            selectedTopic={selectedTopic}
            messageCount={messages.length}
          />

          <main className="flex-1 flex flex-col min-w-0 md:ml-72 bg-slate-950/60">
            <div className="h-10 px-4 sm:px-6 border-b border-slate-900 bg-slate-950/70 backdrop-blur-xs flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-500">Assistant</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-300 font-medium">
                  {selectedTopic ? selectedTopic.title : 'Knowledge Base'}
                </span>
              </div>

              {selectedTopic && (
                <button
                  onClick={handleNewChat}
                  className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Clear Topic &times;
                </button>
              )}
            </div>

            {errorBanner && (
              <div className="mx-4 mt-3 p-3 rounded-xl bg-red-950/50 border border-red-900/80 flex items-center justify-between text-xs text-red-300 shadow-sm">
                <span>{errorBanner}</span>
                <button 
                  onClick={fetchHealth}
                  className="px-2.5 py-1 rounded-lg bg-red-900 hover:bg-red-800 text-white text-[11px] font-medium transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              <div className="pb-6">
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    onSelectSuggestion={handleSendMessage}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <ChatInput
              onSendMessage={handleSendMessage}
              isGenerating={isGenerating}
              generationPhase={generationPhase}
              disabled={systemStatus?.status === 'error'}
              placeholder={inputPlaceholder}
              activeTopic={selectedTopic}
              onClearTopic={handleNewChat}
            />
          </main>
        </div>
      )}
    </div>
  );
}
