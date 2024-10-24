import React, { useState } from 'react';
import { Brain, Trash2 } from 'lucide-react';
import { Chat } from './components/Chat';
import { ApiKeyInput } from './components/ApiKeyInput';
import { SettingsPanel } from './components/SettingsPanel';
import { useChat } from './hooks/useChat';

function App() {
  const { 
    chatState, 
    settings, 
    handleSend, 
    setSettings,
    configureGroq, 
    isConfigured,
    clearChat 
  } = useChat();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-gray-900">AI Playground</h1>
          </div>
          
          {isConfigured && (
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Clear Chat
            </button>
          )}
        </div>

        {!isConfigured ? (
          <ApiKeyInput onSubmit={configureGroq} />
        ) : (
          <div className="relative">
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
              isOpen={isSettingsOpen}
              onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
            />
            <Chat chatState={chatState} onSend={handleSend} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;