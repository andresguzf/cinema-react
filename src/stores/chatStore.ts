import { create } from 'zustand';
import type { ChatMessage } from '../types/cinema';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  apiEndpoint: string;
  setApiEndpoint: (endpoint: string) => void;
  sendMessage: (content: string) => Promise<void>;
  retryLastMessage: () => Promise<void>;
  clearMessages: () => void;
}

const DEFAULT_ENDPOINT = '/api/cinema/ask';
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: '¡Hola! 🍿 Bienvenido al Asistente de Cine MCP Client. Puedo ayudarte a consultar la cartelera, películas en cartelera, horarios de funciones, tráileres, reservar boletos o información sobre salas de cine. ¿En qué te puedo colaborar hoy?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'success',
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  messages: INITIAL_MESSAGES,
  isLoading: false,
  error: null,
  apiEndpoint: localStorage.getItem('cinema_api_endpoint') || DEFAULT_ENDPOINT,

  setApiEndpoint: (endpoint) => {
    localStorage.setItem('cinema_api_endpoint', endpoint);
    set({ apiEndpoint: endpoint });
  },

  clearMessages: () => {
    set({ messages: INITIAL_MESSAGES, error: null });
  },

  sendMessage: async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: trimmed,
      timestamp,
      status: 'success',
    };

    const initialAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp,
      status: 'sending',
    };

    set((state) => ({
      messages: [...state.messages, userMessage, initialAssistantMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const baseEndpoint = get().apiEndpoint;
      const separator = baseEndpoint.includes('?') ? '&' : '?';
      // Spring Controller param: @RequestParam("q") String q
      const requestUrl = `${baseEndpoint}${separator}q=${encodeURIComponent(trimmed)}`;

      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain, application/json, */*',
        },
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(errorText || `Error de servidor: ${response.status} ${response.statusText}`);
      }

      const rawText = await response.text();
      let replyContent = rawText;

      try {
        const parsed = JSON.parse(rawText);
        if (parsed && typeof parsed === 'object') {
          replyContent =
            parsed.answer ||
            parsed.response ||
            parsed.result ||
            parsed.message ||
            parsed.text ||
            JSON.stringify(parsed, null, 2);
        } else if (typeof parsed === 'string') {
          replyContent = parsed;
        }
      } catch {
        // If rawText is plain text (e.g. starting with "¡Hola!..."), use rawText directly
        replyContent = rawText;
      }

      if (!replyContent) {
        replyContent = 'Sin respuesta del servidor de Cinema MCP.';
      }

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: replyContent, status: 'success' }
            : msg
        ),
        isLoading: false,
      }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al conectar con el servidor MCP de Cine.';

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: '⚠️ No se pudo conectar con el servidor de Cine MCP Client en ' + get().apiEndpoint + '. Asegúrate de que el backend esté corriendo en el puerto correspondiente o ajusta el endpoint en la configuración.',
                status: 'error',
                errorMessage,
              }
            : msg
        ),
        isLoading: false,
        error: errorMessage,
      }));
    }
  },

  retryLastMessage: async () => {
    const { messages, sendMessage } = get();
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      set((state) => ({
        messages: state.messages.filter((m) => m.status !== 'error'),
      }));
      await sendMessage(lastUserMessage.content);
    }
  },
}));
