import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { QuickPrompts } from './components/QuickPrompts';
import { ChatInput } from './components/ChatInput';
import { SettingsModal } from './components/SettingsModal';
import { useChatStore } from './stores/chatStore';
import { useThemeStore, applyThemeToDOM } from './stores/themeStore';

export function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { messages } = useChatStore();
  const { theme } = useThemeStore();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sync theme to DOM on mount and theme change
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-amber-500/30 selection:text-amber-600 dark:selection:text-amber-300">
      {/* Header */}
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 sm:px-6 pt-4 pb-2">
        {/* Messages List */}
        <div className="flex-1 space-y-4 pb-4 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Quick Prompts below initial welcome */}
          {messages.length <= 1 && (
            <div className="mt-4">
              <QuickPrompts />
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={chatBottomRef} />
        </div>
      </main>

      {/* Fixed Bottom Input */}
      <ChatInput />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default App;
