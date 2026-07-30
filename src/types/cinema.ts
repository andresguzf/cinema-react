export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status?: 'sending' | 'success' | 'error';
  errorMessage?: string;
}

export interface AskRequest {
  question?: string;
  prompt?: string;
  message?: string;
}

export interface AskResponse {
  answer?: string;
  response?: string;
  result?: string;
  message?: string;
  status?: string;
  [key: string]: unknown;
}
