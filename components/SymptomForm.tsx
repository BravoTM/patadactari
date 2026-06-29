"use client";

import { useState } from "react";
import { Lang, t } from "@/lib/i18n";

interface SymptomFormProps {
  language: Lang;
  onSubmit: (symptoms: string) => void;
  isLoading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function SymptomForm({
  language,
  onSubmit,
  isLoading = false,
  value: controlledValue,
  onChange,
}: SymptomFormProps) {
  const [internalValue, setInternalValue] = useState("");
  const symptoms = controlledValue !== undefined ? controlledValue : internalValue;
  const setSymptoms = onChange ?? setInternalValue;
  const translations = t[language];
  const charCount = symptoms.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim().length >= 10) {
      onSubmit(symptoms.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <label htmlFor="symptoms" className="block text-sm font-medium mb-2 text-gray-700">
        {translations.inputLabel}
      </label>
      <textarea
        id="symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder={translations.inputPlaceholder}
        maxLength={500}
        rows={6}
        disabled={isLoading}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
        aria-label={translations.inputLabel}
      />
      <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
        <span>{translations.charCount(charCount)}</span>
        <span>
          {charCount < 10 && charCount > 0 ? (
            <span className="text-red-500">
              {language === "en" ? "Minimum 10 characters" : "Angalau herufi 10"}
            </span>
          ) : null}
        </span>
      </div>
      <button
        type="submit"
        disabled={isLoading || charCount < 10}
        className="w-full mt-4 px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors h-12 flex items-center justify-center"
        aria-label={translations.submit}
      >
        {isLoading ? translations.loading : translations.submit}
      </button>
    </form>
  );
}
