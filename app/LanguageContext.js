'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { t, detectLocale, defaultLocale, locales } from '@/lib/i18n';

const LangCtx = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    setLocale(saved && locales.includes(saved) ? saved : detectLocale());
  }, []);

  const setLang = (l) => {
    setLocale(l);
    localStorage.setItem('locale', l);
  };

  return (
    <LangCtx.Provider value={{ locale, setLang, tr: t[locale] }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}

// Selector de idioma para el nav
export function LangSwitcher() {
  const { locale, setLang } = useLang();
  const flags = { ca: 'CA', es: 'ES', en: 'EN' };

  return (
    <div className="lang-switcher">
      {locales.map(l => (
        <button
          key={l}
          className={`lang-btn${locale === l ? ' active' : ''}`}
          onClick={() => setLang(l)}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}
