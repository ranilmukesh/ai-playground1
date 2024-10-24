export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface PlaygroundSettings {
  temperature: number;
  maxTokens: number;
  selectedTemplate: string;
}

export interface Template {
  id: string;
  name: string;
  industry: string;
  prompt: string;
  description: string;
}

export const INDUSTRY_TEMPLATES: Template[] = [
  {
    id: 'healthcare',
    name: 'Medical Analysis',
    industry: 'Healthcare',
    prompt: 'You are a medical AI assistant. Analyze the following medical information and provide insights:',
    description: 'Analyze medical reports and provide clinical insights'
  },
  {
    id: 'finance',
    name: 'Financial Analysis',
    industry: 'Finance',
    prompt: 'You are a financial analyst AI. Review the following financial data and provide analysis:',
    description: 'Analyze financial data and provide investment insights'
  },
  {
    id: 'legal',
    name: 'Legal Document Analysis',
    industry: 'Legal',
    prompt: 'You are a legal AI assistant. Review the following legal document and provide analysis:',
    description: 'Analyze legal documents and provide legal insights'
  },
  {
    id: 'marketing',
    name: 'Marketing Content',
    industry: 'Marketing',
    prompt: 'You are a marketing AI specialist. Generate content based on the following brief:',
    description: 'Generate marketing content and campaign ideas'
  },
  {
    id: 'education',
    name: 'Educational Content',
    industry: 'Education',
    prompt: 'You are an educational AI tutor. Explain the following concept:',
    description: 'Create educational content and explanations'
  }
];