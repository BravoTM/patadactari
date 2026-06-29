"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SymptomForm } from "@/components/SymptomForm";
import { t } from "@/lib/i18n";
import { isEmergency } from "@/lib/emergency";
import { triageSymptoms } from "@/lib/clientTriage";
import { Heart, Activity, Shield, Zap, MapPin, BookOpen } from "lucide-react";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const translations = t[language];

  const handleSubmit = async (symptoms: string) => {
    if (isEmergency(symptoms)) {
      sessionStorage.setItem("emergencySymptoms", symptoms);
      router.push("/emergency");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/triage-rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, language }),
      });

      const data = await response.json();

      if (data.emergency) {
        sessionStorage.setItem("emergencySymptoms", symptoms);
        router.push("/emergency");
        return;
      }

      if (response.ok && data.guidance) {
        sessionStorage.setItem("triageResult", JSON.stringify(data));
        sessionStorage.setItem("userSymptoms", symptoms);
        router.push("/triage");
        return;
      }

      const triageResult = triageSymptoms(symptoms, language);
      sessionStorage.setItem("triageResult", JSON.stringify(triageResult));
      sessionStorage.setItem("userSymptoms", symptoms);
      router.push("/triage");
    } catch (error) {
      console.error("Error submitting symptoms:", error);
      try {
        const triageResult = triageSymptoms(symptoms, language);
        sessionStorage.setItem("triageResult", JSON.stringify(triageResult));
        sessionStorage.setItem("userSymptoms", symptoms);
        router.push("/triage");
      } catch {
        alert(translations.errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-emerald-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200/50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-md">
              <Heart size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
              {translations.appName}
            </h1>
          </div>
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4">
              <Activity size={32} className="text-emerald-700" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {language === "en" ? "Your Health Matters" : "Afya Yako ni Muhimu"}
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              {translations.tagline}
            </p>
            <p className="text-sm text-gray-500">
              {language === "en" 
                ? "Get instant medical guidance and find nearby facilities"
                : "Pata mwongozo wa haraka wa kimatibabu na tafuta vituo vya karibu"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
            <SymptomForm
              language={language}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={20} className="text-emerald-700" />
              </div>
              <p className="text-xs text-emerald-900 font-semibold mb-1">
                {language === "en" ? "🔒 Private" : "🔒 Siri"}
              </p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                {translations.privacy}
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={20} className="text-red-700" />
              </div>
              <p className="text-xs text-red-900 font-semibold mb-1">
                {language === "en" ? "⚠️ Emergency" : "⚠️ Dharura"}
              </p>
              <p className="text-xs text-red-700 leading-relaxed">
                {language === "en"
                  ? "Call 999 for emergencies"
                  : "Piga 999 kwa dharura"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href="/maps"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center flex items-center justify-center gap-2 group"
            >
              <MapPin size={20} className="group-hover:scale-110 transition-transform" />
              {language === "en"
                ? "Find Nearby Hospitals"
                : "Tafuta Hospitali za Karibu"}
            </a>

            <a
              href="/firstaid"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center flex items-center justify-center gap-2 group"
            >
              <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
              {language === "en"
                ? "First Aid Guide"
                : "Mwongozo wa Msaada wa Kwanza"}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-4">
              {language === "en" ? "Trusted by thousands" : "Kutegemewa na maelfu"}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-700">24/7</div>
                <p className="text-xs text-gray-600">
                  {language === "en" ? "Available" : "Inayopatikana"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-700">100%</div>
                <p className="text-xs text-gray-600">
                  {language === "en" ? "Confidential" : "Siri"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-700">🏥</div>
                <p className="text-xs text-gray-600">
                  {language === "en" ? "100+ Hospitals" : "100+ Hospitali"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200/50 py-8 mt-12">
        <div className="max-w-2xl mx-auto px-4 text-center text-xs text-gray-600">
          <p className="mb-2">{translations.disclaimer}</p>
          <p className="text-gray-500">{translations.privacyFull}</p>
        </div>
      </footer>
    </main>
  );
}
