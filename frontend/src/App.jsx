import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import HomePage from './components/HomePage';
import { AlertCircle, RefreshCw } from 'lucide-react';

const INITIAL_GREETING = {
  id: 'initial-greeting',
  role: 'model',
  content: `How can I help you today?\n\n*Ask me anything -->*`,
  timestamp: 'Just now',
  suggestions: [
    "What is a Binary Search Tree?",
    "Explain Kadane's algorithm for maximum subarray",
    "Compare QuickSort vs MergeSort",
    "How does Dijkstra's algorithm work?"
  ],
};

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'chat'

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('contextiq_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      }
      return [INITIAL_GREETING];
    } catch {
      return [INITIAL_GREETING];
    }
  });

  const [systemStatus, setSystemStatus] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);
  const [inputPlaceholder, setInputPlaceholder] = useState("Ask me anything --> ");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentView === 'chat') {
      scrollToBottom();
    }
  }, [messages, isGenerating, currentView]);

  useEffect(() => {
    try {
      localStorage.setItem('contextiq_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [messages]);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
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
      .filter((m) => m.id !== 'initial-greeting' && !m.id?.startsWith('topic-greeting-'))
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
  };

  const handleSelectTopic = (topic) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const topicGreeting = {
      id: `topic-greeting-${Date.now()}`,
      role: 'model',
      content: `How can I help you with **${topic.title}**?\n\n*Ask me anything -->*`,
      timestamp: time,
      suggestions: topic.suggestions || [],
    };

    setMessages([topicGreeting]);
    setInputPlaceholder(`Ask me anything about ${topic.title} --> `);
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

    try {
      const historyPayload = buildGeminiHistory();

      const response = await fetch('/api/chat', {
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
        content: data.answer,
        timestamp: botTime,
        originalQuestion: text,
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
      setIsGenerating(false);
    }
  };

  const handleNewChat = () => {
    if (isGenerating) return;
    setMessages([INITIAL_GREETING]);
    setInputPlaceholder("Ask me anything --> ");
    localStorage.removeItem('contextiq_chat_history');
    setCurrentView('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      
      {/* Top Navigation */}
      <Navbar
        systemStatus={systemStatus}
        onNewChat={handleNewChat}
        isGenerating={isGenerating}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Main View Router */}
      {currentView === 'home' ? (
        <HomePage 
          onStartChat={() => setCurrentView('chat')}
          onSelectTopic={(topic) => {
            handleSelectTopic(topic);
          }}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSelectTopic={handleSelectTopic}
            messageCount={messages.length}
          />

          {/* Chat Main Area */}
          <main className="flex-1 flex flex-col min-w-0 md:ml-76">
            
            {/* Global Error Banner */}
            {errorBanner && (
              <div className="mx-4 mt-3 p-2.5 rounded bg-red-950/40 border border-red-900 flex items-center justify-between text-xs text-red-300">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorBanner}</span>
                </div>
                <button 
                  onClick={fetchHealth}
                  className="px-2 py-0.5 rounded bg-red-900 hover:bg-red-800 text-white text-[11px] flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              </div>
            )}

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-slate-900 pb-4">
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

            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isGenerating={isGenerating}
              disabled={systemStatus?.status === 'error'}
              placeholder={inputPlaceholder}
            />

          </main>
        </div>
      )}

    </div>
  );
}
