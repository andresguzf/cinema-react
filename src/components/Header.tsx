import { Film, Sun, Moon, Settings, Trash2, Sparkles, Server } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { useChatStore } from '../stores/chatStore';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header = ({ onOpenSettings }: HeaderProps) => {
  const { theme, toggleTheme } = useThemeStore();
  const { clearMessages, apiEndpoint } = useChatStore();

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-amber-500/20">
            <Film className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-slate-100">
                Cinema <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">MCP Client</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles className="w-2.5 h-2.5" /> AI Powered
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Asistente Inteligente de Cartelera & Funciones
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Endpoint Indicator */}
          <button
            onClick={onOpenSettings}
            title={`Endpoint actual: ${apiEndpoint}`}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Server className="w-3.5 h-3.5 text-emerald-500" />
            <span className="truncate max-w-[120px]">{apiEndpoint}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="Configuración de Endpoint"
            aria-label="Configuración de Endpoint"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Clear Chat */}
          <button
            onClick={clearMessages}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-transparent"
            title="Limpiar conversación"
            aria-label="Limpiar conversación"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Theme Toggle Switch */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-0.5"></div>

          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200/80 dark:border-slate-700/80 group"
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label="Cambiar Tema"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Sun
                className={`w-5 h-5 text-amber-500 absolute transition-all duration-300 ${
                  theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                }`}
              />
              <Moon
                className={`w-5 h-5 text-purple-400 absolute transition-all duration-300 ${
                  theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
