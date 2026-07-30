import { useState } from 'react';
import { User, Film, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../types/cinema';
import { useChatStore } from '../stores/chatStore';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const { retryLastMessage, isLoading } = useChatStore();
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-200 ${
        isUser
          ? 'bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 ml-auto max-w-[88%] sm:max-w-[80%]'
          : 'bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm mr-auto max-w-[95%] sm:max-w-[90%]'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        ) : (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-rose-500 to-amber-500 text-white flex items-center justify-center shadow-sm">
            <Film className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {isUser ? 'Tú' : 'Cinema AI Asistente'}
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {message.timestamp}
          </span>
        </div>

        {/* Message Body */}
        <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed break-words whitespace-pre-wrap font-normal">
          {message.status === 'sending' && !message.content ? (
            <div className="flex items-center gap-1.5 py-1 text-slate-400 dark:text-slate-500">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs ml-2 font-medium">Consultando cartelera...</span>
            </div>
          ) : (
            message.content
          )}
        </div>

        {/* Error Handling State */}
        {message.status === 'error' && (
          <div className="mt-3 flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{message.errorMessage || 'Error en la consulta'}</span>
            <button
              onClick={retryLastMessage}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Reintentar
            </button>
          </div>
        )}

        {/* Actions bar for Assistant */}
        {!isUser && message.content && message.status === 'success' && (
          <div className="pt-2 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50"
              title="Copiar respuesta"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
