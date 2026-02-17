import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ja' | 'en' | 'uz';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'ja',
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'ekilore-language',
    }
  )
);
