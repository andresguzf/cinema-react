import type { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';

const chatInputSchema = z.object({
  message: z.string().min(1, 'Escribe un mensaje para continuar.').max(1000, 'El mensaje es demasiado largo.'),
});

type ChatInputFormData = z.infer<typeof chatInputSchema>;

export const ChatInput = () => {
  const { sendMessage, isLoading } = useChatStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ChatInputFormData>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: ChatInputFormData) => {
    const text = data.message.trim();
    if (!text || isLoading) return;
    reset();
    await sendMessage(text);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="sticky bottom-0 z-20 w-full pt-2 pb-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950 dark:to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200/90 dark:border-slate-800 focus-within:border-amber-500/80 dark:focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all duration-200"
        >
          {/* Input Icon */}
          <div className="pl-4 pr-1 text-slate-400 dark:text-slate-500">
            <Sparkles className="w-5 h-5 text-amber-500/70 animate-pulse" />
          </div>

          {/* Textarea Input */}
          <textarea
            {...register('message')}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Pregunta sobre la cartelera, películas, horarios..."
            rows={1}
            className="flex-1 py-3.5 px-2 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none resize-none min-h-[48px] max-h-[160px] leading-snug"
          />

          {/* Send Button */}
          <div className="p-2">
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white font-medium shadow-md shadow-amber-500/25 hover:opacity-95 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              title="Enviar consulta"
              aria-label="Enviar consulta"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 ml-0.5" />
              )}
            </button>
          </div>
        </form>

        <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2 font-normal">
          Conectado a <span className="font-semibold text-slate-500 dark:text-slate-400">/api/cinema/ask</span> • Presiona <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px]">Enter</kbd> para enviar
        </p>
      </div>
    </div>
  );
};
