"use client";

import { Lang, t } from "@/lib/i18n";

interface EmergencyBannerProps {
  language: Lang;
}

export function EmergencyBanner({ language }: EmergencyBannerProps) {
  const translations = t[language];

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-700 text-white p-4 shadow-lg z-40">
      <div className="max-w-md mx-auto text-center">
        <p className="font-bold text-lg mb-1">{translations.emergency}</p>
        <p className="text-sm mb-3">{translations.emergencyDesc}</p>
        <a
          href="tel:999"
          className="inline-block bg-white text-red-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          aria-label="Call 999"
        >
          {translations.emergencyButton}
        </a>
      </div>
    </div>
  );
}
