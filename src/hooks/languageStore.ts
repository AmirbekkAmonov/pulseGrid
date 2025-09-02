import { create } from 'zustand';
import i18n from '../utils/i18n';

interface LanguageState {
  locale: string; // Hozirgi tanlangan til
  setLocale: (lang: string) => void; // Tilni o‘zgartirish funksiyasi
}

export const useLanguageStore = create<LanguageState>((set) => ({
  //LocalStorage'dan tilni oladi yoki 'en' default qiladi
  locale: localStorage.getItem('selectedLang') || 'en',

  //Tilni yangilash: i18n + localStorage + Zustand holati
  setLocale: (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('selectedLang', lang);
    set({ locale: lang });
  },
}));
