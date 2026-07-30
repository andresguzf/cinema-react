import { Film, Ticket, Sparkles, Popcorn, Clock } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';

export const QUICK_PROMPTS = [
  {
    icon: Film,
    label: 'Cartelera de hoy',
    prompt: '¿Cuáles son las películas disponibles en cartelera hoy?',
  },
  {
    icon: Ticket,
    label: 'Horarios y Funciones',
    prompt: '¿Qué horarios y funciones de cine hay disponibles para esta tarde?',
  },
  {
    icon: Sparkles,
    label: 'Recomendaciones',
    prompt: 'Recomiéndame las mejores películas de ciencia ficción o acción en cartelera.',
  },
  {
    icon: Popcorn,
    label: 'Precios de Dulcería',
    prompt: '¿Cuáles son los precios de los combos de palomitas y refrescos en la dulcería?',
  },
  {
    icon: Clock,
    label: 'Próximos Estrenos',
    prompt: '¿Cuáles son los próximos estrenos cinematográficos anunciados?',
  },
];

export const QuickPrompts = () => {
  const { sendMessage, isLoading } = useChatStore();

  return (
    <div className="w-full py-3">
      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 px-1">
        Sugerencias de consulta rápida:
      </p>
      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => sendMessage(item.prompt)}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-200 disabled:opacity-50 text-left active:scale-[0.98]"
            >
              <Icon className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
