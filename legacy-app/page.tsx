"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { AppNav } from "@/components/AppNav";
import { SymptomForm } from "@/components/SymptomForm";
import { SymptomChips } from "@/components/SymptomChips";
import { t } from "@/lib/i18n";
import { isEmergency } from "@/lib/emergency";
import { matchFirstAidGuide } from "@/lib/firstAidRouting";
import { triageSymptoms } from "@/lib/clientTriage";
import { Activity, Shield, Zap, MapPin, BookOpen } from "lucide-react";

export default function Home() {
  const { language } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const translations = t[language];

  const handleSubmit = async (submittedSymptoms: string) => {
    if (isEmergency(submittedSymptoms)) {
      sessionStorage.setItem("emergencySymptoms", submittedSymptoms);
      router.push("/emergency");
      return;
    }

    const firstAidGuide = matchFirstAidGuide(submittedSymptoms);
    if (firstAidGuide) {
      router.push(`/firstaid?guide=${firstAidGuide.id}`);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/triage-rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: submittedSymptoms, language }),
      });

      const data = await response.json();

      if (data.emergency) {
        sessionStorage.setItem("emergencySymptoms", submittedSymptoms);
        router.push("/emergency");
        return;
      }

      if (response.ok && data.guidance) {
        sessionStorage.setItem("triageResult", JSON.stringify(data));
        sessionStorage.setItem("userSymptoms", submittedSymptoms);
        router.push("/triage");
        return;
      }

      const triageResult = triageSymptoms(submittedSymptoms, language);
      sessionStorage.setItem("triageResult", JSON.stringify(triageResult));
      sessionStorage.setItem("userSymptoms", submittedSymptoms);
      router.push("/triage");
    } catch (error) {
      console.error("Error submitting symptoms:", error);
      try {
        const triageResult = triageSymptoms(submittedSymptoms, language);
        sessionStorage.setItem("triageResult", JSON.stringify(triageResult));
        sessionStorage.setItem("userSymptoms", submittedSymptoms);
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
      <AppNav />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4">
              <Activity size={32} className="text-emerald-700" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {language === "en" ? "Your Health Matters" : "Afya Yako ni Muhimu"}
            </h2>
            <p className="text-gray-600 text-lg mb-2">{translations.tagline}</p>
            <p className="text-sm text-gray-500">
              {language === "en"
                ? "Get instant medical guidance and find nearby facilities"
                : "Pata mwongozo wa haraka wa kimatibabu na tafuta vituo vya karibu"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
            <SymptomForm
              language={language}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              value={symptoms}
              onChange={setSymptoms}
            />
            <SymptomChips language={language} onSelect={setSymptoms} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={20} className="text-emerald-700" />
              </div>
              <p className="text-xs text-emerald-900 font-semibold mb-1">
                {language === "en" ? "🔒 Private" : "🔒 Siri"}
              </p>
              <p className="text-xs text-emerald-700 leading-relaxed">{translations.privacy}</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={20} className="text-red-700" />
              </div>
              <p className="text-xs text-red-900 font-semibold mb-1">
                {language === "en" ? "⚠️ Emergency" : "⚠️ Dharura"}
              </p>
              <p className="text-xs text-red-700 leading-relaxed">
                {language === "en" ? "Call 999 for emergencies" : "Piga 999 kwa dharura"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="/maps"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center flex items-center justify-center gap-2 group"
            >
              <MapPin size={20} className="group-hover:scale-110 transition-transform" />
              {language === "en" ? "Find Nearby Hospitals" : "Tafuta Hospitali za Karibu"}
            </a>

            <a
              href="/firstaid"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center flex items-center justify-center gap-2 group"
            >
              <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
              {language === "en" ? "First Aid Guide" : "Mwongozo wa Msaada wa Kwanza"}
            </a>
          </div>

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
                <div className="text-2xl font-bold text-emerald-700">18</div>
                <p className="text-xs text-gray-600">
                  {language === "en" ? "Nairobi Hospitals" : "Hospitali Nairobi"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white/50 border-t border-gray-200/50 py-8 mt-12">
        <div className="max-w-2xl mx-auto px-4 text-center text-xs text-gray-600">
          <p className="mb-2">{translations.disclaimer}</p>
          <p className="text-gray-500">{translations.privacyFull}</p>
        </div>
      </footer>
    </main>
  );
}
