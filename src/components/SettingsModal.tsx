import { useState, type FormEvent } from 'react';
import { X, Server, Check, RotateCcw } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_ENDPOINT = '/api/cinema/ask';

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { apiEndpoint, setApiEndpoint } = useChatStore();
  const [endpointInput, setEndpointInput] = useState(apiEndpoint);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setApiEndpoint(endpointInput.trim() || DEFAULT_ENDPOINT);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    setEndpointInput(DEFAULT_ENDPOINT);
    setApiEndpoint(DEFAULT_ENDPOINT);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <Server className="w-5 h-5 text-amber-500" />
            <span>Configuración de API</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Endpoint de Cinema MCP Client
            </label>
            <input
              type="text"
              value={endpointInput}
              onChange={(e) => setEndpointInput(e.target.value)}
              placeholder="/api/cinema/ask o http://localhost:8080/api/cinema/ask"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Endpoint predeterminado: <code className="font-mono text-amber-600 dark:text-amber-400">/api/cinema/ask</code>. Si el backend Spring Boot está corriendo en otro puerto (ej: 8080), puedes ingresar el URL completo.
            </p>
          </div>

          {/* Quick presets */}
          <div className="space-y-2 pt-1">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Presets rápidos:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setEndpointInput('/api/cinema/ask')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 font-mono transition-colors"
              >
                /api/cinema/ask (Proxy)
              </button>
              <button
                type="button"
                onClick={() => setEndpointInput('http://localhost:8080/api/cinema/ask')}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 font-mono transition-colors"
              >
                localhost:8080
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restaurar
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Guardado
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
