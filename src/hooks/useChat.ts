import { useState } from 'react';
import { Groq } from 'groq-sdk';
import type { Message, ChatState, PlaygroundSettings, Template } from '../types';
import { INDUSTRY_TEMPLATES } from '../types';

const DEFAULT_SETTINGS: PlaygroundSettings = {
  temperature: 0.7,
  maxTokens: 2048,
  selectedTemplate: '',
};

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const [settings, setSettings] = useState<PlaygroundSettings>(DEFAULT_SETTINGS);
  const [apiKey, setApiKey] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState(false);

  const configureGroq = (key: string) => {
    setApiKey(key);
    setIsConfigured(true);
  };

  const getTemplatePrompt = (templateId: string): string => {
    const template = INDUSTRY_TEMPLATES.find(t => t.id === templateId);
    return template ? template.prompt : '';
  };

  const handleSend = async (content: string) => {
    if (!apiKey) {
      setChatState(prev => ({
        ...prev,
        error: 'Please configure your Groq API key first.',
      }));
      return;
    }

    const newMessage: Message = { role: 'user', content };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const groq = new Groq({ 
        apiKey,
        dangerouslyAllowBrowser: true
      });

      const systemPrompt = settings.selectedTemplate 
        ? getTemplatePrompt(settings.selectedTemplate)
        : 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.';

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...chatState.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: 'user', content },
        ],
        model: 'llama-3.2-90b-vision-preview',
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: completion.choices[0]?.message?.content || 'No response generated.',
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get response. Please try again.',
      }));
    }
  };

  const clearChat = () => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
  };

  return {
    chatState,
    settings,
    handleSend,
    setSettings,
    configureGroq,
    isConfigured,
    clearChat,
  };
};