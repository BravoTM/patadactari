"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang } from "@/lib/i18n";

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("patadaktari-language");
    if (saved === "en" || saved === "sw") {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Lang) => {
    setLanguageState(lang);
    localStorage.setItem("patadaktari-language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {/* Show nothing until mounted to prevent hydration mismatch */}
      {mounted ? children : <div className="min-h-screen" />}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default during SSR/prerendering
    return { language: "en" as Lang, setLanguage: () => {} };
  }
  return context;
}
