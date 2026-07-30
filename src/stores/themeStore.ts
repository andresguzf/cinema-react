import { create } from 'zustand';

export type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('cinema_theme') as Theme | null;
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyThemeToDOM = (theme: Theme) => {
  const root = document.documentElement;
  const body = document.body;
  if (theme === 'dark') {
    root.classList.add('dark');
    body?.classList.add('dark');
  } else {
    root.classList.remove('dark');
    body?.classList.remove('dark');
  }
  localStorage.setItem('cinema_theme', theme);
};

// Initial DOM sync
applyThemeToDOM(getInitialTheme());

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      applyThemeToDOM(nextTheme);
      return { theme: nextTheme };
    });
  },
  setTheme: (theme) => {
    applyThemeToDOM(theme);
    set({ theme });
  },
}));
