"use client";

import { Lang, t } from "@/lib/i18n";

interface LanguageToggleProps {
  language: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => onChange("en")}
        className={`px-3 py-1 rounded font-medium transition-colors ${
          language === "en"
            ? "bg-green-700 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => onChange("sw")}
        className={`px-3 py-1 rounded font-medium transition-colors ${
          language === "sw"
            ? "bg-green-700 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        aria-label="Switch to Kiswahili"
      >
        Kiswahili
      </button>
    </div>
  );
}
