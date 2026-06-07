"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SymptomForm } from "@/components/SymptomForm";
import { t } from "@/lib/i18n";
import { isEmergency } from "@/lib/emergency";
import { Heart } from "lucide-react";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const translations = t[language];

  const handleSubmit = async (symptoms: string) => {
    // First, check for emergency keywords client-side
    if (isEmergency(symptoms)) {
      router.push("/emergency");
      return;
    }

    // Not an emergency - proceed to triage
    setIsLoading(true);
    try {
      const response = await fetch("/api/triage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store response in sessionStorage to pass to triage page
        sessionStorage.setItem("triageResult", JSON.stringify(data));
        sessionStorage.setItem("userSymptoms", symptoms);
        router.push("/triage");
      } else {
        alert(translations.errorMessage);
      }
    } catch (error) {
      console.error("Error submitting symptoms:", error);
      alert(translations.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
              <Heart size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-green-700">
              {translations.appName}
            </h1>
          </div>
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Tagline */}
          <p className="text-center text-gray-600 mb-8 font-medium">
            {translations.tagline}
          </p>

          {/* Form */}
          <SymptomForm
            language={language}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs text-blue-900 font-medium">
                {language === "en" ? "🔒 Private" : "🔒 Siri"}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {translations.privacy}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-xs text-orange-900 font-medium">
                {language === "en" ? "⚠️ Emergency" : "⚠️ Dharura"}
              </p>
              <p className="text-xs text-orange-700 mt-1">
                {language === "en"
                  ? "Call 999 for emergencies"
                  : "Piga 999 kwa dharura"}
              </p>
            </div>
          </div>

          {/* First Aid Button */}
          <a
            href="/firstaid"
            className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow text-center"
          >
            {language === "en"
              ? "📖 First Aid Guide"
              : "📖 Mwongozo wa Msaada wa Kwanza"}
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-gray-600">
          <p className="mb-2">{translations.disclaimer}</p>
          <p className="text-gray-500">{translations.privacyFull}</p>
        </div>
      </footer>
    </main>
  );
}
