import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import type { ChatState } from '../types';

interface ChatProps {
  chatState: ChatState;
  onSend: (message: string) => void;
}

export const Chat: React.FC<ChatProps> = ({ chatState, onSend }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="h-[600px] overflow-y-auto mb-4 space-y-6">
        {chatState.messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">Welcome to the AI Playground!</p>
            <p>Select an industry template from the settings panel and start chatting.</p>
          </div>
        )}
        
        {chatState.messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        
        {chatState.isLoading && (
          <div className="flex justify-center">
            <div className="animate-pulse text-purple-500">
              Thinking...
            </div>
          </div>
        )}
        
        {chatState.error && (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
            {chatState.error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={onSend}
        disabled={chatState.isLoading}
      />
    </div>
  );
};