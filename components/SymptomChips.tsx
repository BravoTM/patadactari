"use client";

import { Lang } from "@/lib/i18n";

const EXAMPLES: Record<Lang, string[]> = {
  en: [
    "Fever and headache for 2 days",
    "Cough and sore throat",
    "Diarrhea and vomiting",
    "Cut on my hand bleeding",
  ],
  sw: [
    "Homa na maumivu ya kichwa kwa siku 2",
    "Kikohozi na koo linauma",
    "Kuharisha na kutapika",
    "Jeraha la mkono linauma",
  ],
};

interface SymptomChipsProps {
  language: Lang;
  onSelect: (text: string) => void;
}

export function SymptomChips({ language, onSelect }: SymptomChipsProps) {
  return (
    <div className="mt-4">
      <p className="text-xs text-gray-500 mb-2">
        {language === "en" ? "Try an example:" : "Jaribu mfano:"}
      </p>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES[language].map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onSelect(example)}
            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full transition"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
