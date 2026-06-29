"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FIRST_AID_GUIDES, getDiseasesFromSymptoms } from "@/lib/firstaid";
import { isEmergency } from "@/lib/emergency";
import { useLanguage } from "@/components/LanguageProvider";
import FirstAidGuideComponent from "@/components/FirstAidGuideComponent";
import { Heart, ArrowLeft, Search, AlertCircle, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function FirstAidPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [symptomInput, setSymptomInput] = useState("");
  const [showDiseases, setShowDiseases] = useState(false);

  const guides = FIRST_AID_GUIDES;
  const filteredGuides = searchQuery.trim() === "" 
    ? guides
    : guides.filter(g =>
        g.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.nameSw.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.emergencyKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const relatedDiseases = getDiseasesFromSymptoms(symptomInput);

  const selectedGuideData = selectedGuide
    ? FIRST_AID_GUIDES.find((g) => g.id === selectedGuide)
    : null;

  const handleSymptomSearch = () => {
    if (isEmergency(symptomInput)) {
      sessionStorage.setItem("emergencySymptoms", symptomInput);
      router.push("/emergency");
      return;
    }
    setShowDiseases(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 sm:p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={20} />
            <span>{language === "en" ? "Back to Home" : "Rudi Nyumbani"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Heart size={24} fill="white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {language === "en" ? "First Aid Guide" : "Mwongozo wa Msaada wa Kwanza"}
              </h1>
              <p className="text-red-100 text-sm">
                {language === "en"
                  ? "Emergency procedures and health information"
                  : "Utaratibu wa dharura na taarifa za afya"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {!selectedGuideData ? (
          <>
            {/* Symptom Checker Section */}
            <div className="mb-8 bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Stethoscope size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === "en" ? "Symptom Checker" : "Kicheki cha Dalili"}
                </h2>
              </div>

              <p className="text-gray-600 mb-4 text-sm">
                {language === "en"
                  ? "Enter your symptoms to discover possible conditions and when to seek help"
                  : "Ingiza dalili zako kupata magonjwa yanayoweza kuwa na wakati wa kuomba msaada"}
              </p>

              <div className="flex gap-2 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder={language === "en" 
                    ? "e.g., fever, cough, headache..." 
                    : "e.g., homa, kikohozi, maumivu..."}
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
                <button
                  onClick={handleSymptomSearch}
                  disabled={symptomInput.trim().length < 2}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Search size={18} />
                  {language === "en" ? "Search" : "Tafuta"}
                </button>
              </div>

              {/* Disease Results */}
              {showDiseases && symptomInput.trim().length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {relatedDiseases.length > 0 ? (
                    <>
                      <p className="text-sm font-semibold text-gray-700 mb-4">
                        {language === "en" 
                          ? `Found ${relatedDiseases.length} condition(s) matching your symptoms:`
                          : `Kupata ${relatedDiseases.length} hali zinazokidhi dalili zako:`}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedDiseases.map((disease) => (
                          <div
                            key={disease.id}
                            className={`p-4 rounded-lg border-2 ${
                              disease.severity === "critical"
                                ? "bg-red-50 border-red-300"
                                : disease.severity === "high"
                                ? "bg-orange-50 border-orange-300"
                                : disease.severity === "medium"
                                ? "bg-yellow-50 border-yellow-300"
                                : "bg-green-50 border-green-300"
                            }`}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <AlertCircle
                                size={18}
                                className={
                                  disease.severity === "critical"
                                    ? "text-red-600"
                                    : disease.severity === "high"
                                    ? "text-orange-600"
                                    : disease.severity === "medium"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }
                              />
                              <div>
                                <h3 className="font-bold text-gray-900">
                                  {language === "en" ? disease.nameEn : disease.nameSw}
                                </h3>
                                <p className="text-xs font-semibold text-gray-600 mt-1">
                                  Severity:{" "}
                                  <span className="capitalize text-gray-700">
                                    {disease.severity}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 mb-3">
                              {language === "en"
                                ? disease.descriptionEn
                                : disease.descriptionSw}
                            </p>

                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-semibold text-gray-700 mb-1">
                                  {language === "en"
                                    ? "Common Symptoms:"
                                    : "Dalili za Kawaida:"}
                                </p>
                                <ul className="text-xs text-gray-700 space-y-1">
                                  {disease.commonSymptoms.slice(0, 3).map((symptom, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      {symptom}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="text-xs font-semibold text-gray-700 mb-1">
                                  {language === "en"
                                    ? "Seek Help If:"
                                    : "Tafuta Msaada Ikiwa:"}
                                </p>
                                <ul className="text-xs text-gray-700 space-y-1">
                                  {disease.whenToSeekHelp.slice(0, 2).map((help, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      {help}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="pt-2">
                                <p className="text-xs font-semibold text-gray-700 mb-1">
                                  {language === "en"
                                    ? "Recommendations:"
                                    : "Mapendekezo:"}
                                </p>
                                <ul className="text-xs text-gray-700 space-y-1">
                                  {disease.recommendations.slice(0, 2).map((rec, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-4 p-3 bg-gray-100 rounded">
                        {language === "en"
                          ? "⚠️ Disclaimer: This information is for educational purposes. Always consult a healthcare professional for medical advice."
                          : "⚠️ Onyo: Taarifa hii ni kwa madhumuni ya elimu. Daima shauri mtaalamu wa afya kwa ushauri wa kimatibabu."}
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-600">
                        {language === "en"
                          ? "No conditions found matching these symptoms."
                          : "Hakuna magonjwa yaliyopatikana yanayokidhi dalili hizi."}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {language === "en"
                          ? "Try different symptoms or consult a healthcare professional."
                          : "Jaribu dalili tofauti au shauri mtaalamu wa afya."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-600 font-semibold">
                {language === "en" ? "First Aid Guides" : "Mwongozo wa Msaada wa Kwanza"}
              </span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Search Box */}
            <div className="mb-8">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === "en"
                    ? "Search first aid guides..."
                    : "Tafuta mwongozo wa msaada..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                />
              </div>
            </div>

            {/* Guides Grid */}
            {filteredGuides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {filteredGuides.map((guide) => (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide.id)}
                    className="bg-white rounded-xl shadow-md p-6 border-2 border-transparent hover:border-red-400 hover:shadow-lg transition-all transform hover:scale-105 text-left h-full"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">!</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {language === "en" ? guide.nameEn : guide.nameSw}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {language === "en"
                        ? guide.descriptionEn
                        : guide.descriptionSw}
                    </p>
                    <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition">
                      {language === "en" ? "View Guide" : "Tazama Mwongozo"} →
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-700 text-lg mb-4 font-medium">
                  {language === "en" ? "No guides found" : "Hakuna mwongozo uliopatikana"}
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition font-semibold"
                >
                  {language === "en" ? "View All Guides" : "Tazama Mwongozo Wote"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelectedGuide(null)}
              className="mb-6 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 font-semibold text-gray-700 transition"
            >
              <ArrowLeft size={18} />
              {language === "en" ? "Back to Guides" : "Rudi kwa Mwongozo"}
            </button>
            {selectedGuideData && (
              <FirstAidGuideComponent guide={selectedGuideData} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-gray-600">
          <p className="mb-2 font-semibold">
            {language === "en"
              ? "🚑 Emergency? Call 999 Immediately"
              : "🚑 Dharura? Piga 999 Haraka"}
          </p>
          <p className="text-gray-500">
            {language === "en"
              ? "These guidelines are for educational purposes only. Always seek professional medical help in emergencies."
              : "Mwongozo huu ni kwa madhumuni ya elimu tu. Daima tafuta msaada wa kimatibabu katika hali za dharura."}
          </p>
        </div>
      </footer>
    </div>
  );
}
