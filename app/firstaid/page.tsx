"use client";

import { useState } from "react";
import { FIRST_AID_GUIDES, searchFirstAidGuides } from "@/lib/firstaid";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import FirstAidGuideComponent from "@/components/FirstAidGuideComponent";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FirstAidPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const guides =
    searchQuery.trim() === ""
      ? FIRST_AID_GUIDES
      : searchFirstAidGuides(searchQuery);

  const selectedGuideData = selectedGuide
    ? FIRST_AID_GUIDES.find((g) => g.id === selectedGuide)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light to-white">
      {/* Header */}
      <header className="bg-primary-green text-white p-6 shadow-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span>{language === "en" ? "Back" : "Rudi"}</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Heart size={32} fill="white" />
          <h1 className="text-3xl font-bold">{t[language].firstAidTitle}</h1>
        </div>

        <p className="text-light-green">
          {language === "en"
            ? "Quick reference guides for emergency situations"
            : "Mwongozo wa haraka kwa hali za dharura"}
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {!selectedGuideData ? (
          <>
            {/* Search Box */}
            <div className="mb-8">
              <input
                type="text"
                placeholder={t[language].searchFirstAid}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 border-2 border-primary-green rounded-lg focus:outline-none focus:border-light-green shadow-sm"
              />
            </div>

            {/* Guides Grid */}
            {guides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {guides.map((guide) => (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide.id)}
                    className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-primary-green hover:shadow-lg transition-all text-left transform hover:scale-105"
                  >
                    <h3 className="text-xl font-bold text-primary-green mb-2">
                      {language === "en" ? guide.nameEn : guide.nameSw}
                    </h3>
                    <p className="text-text-primary text-sm mb-4">
                      {language === "en"
                        ? guide.descriptionEn
                        : guide.descriptionSw}
                    </p>
                    <span className="inline-block bg-light-green text-white px-4 py-2 rounded text-sm font-semibold">
                      {t[language].viewGuide} →
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-text-primary text-lg mb-4">
                  {t[language].noResults}
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-light-green transition-colors"
                >
                  {language === "en"
                    ? "View All Guides"
                    : "Tazama Mwongozo Wote"}
                </button>
              </div>
            )}

            {/* Emergency Notice */}
            <div className="bg-emergency-red bg-opacity-10 border-l-4 border-emergency-red rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-emergency-red mb-2">
                🚨 {t[language].emergency}
              </h3>
              <p className="text-text-primary">
                {language === "en"
                  ? "If you are experiencing a life-threatening emergency, call 999 immediately. Do not wait for guidance."
                  : "Ikiwa una dharura inayoweza kuua, piga simu 999 mara moja. Usisumbukie mwongozo."}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedGuide(null);
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 text-primary-green font-semibold mb-6 hover:text-light-green transition-colors"
            >
              <ArrowLeft size={20} />
              {language === "en" ? "Back to Guides" : "Rudi kwa Mwongozo"}
            </button>

            {/* Guide Display */}
            <FirstAidGuideComponent guide={selectedGuideData} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary-green text-white p-6 text-center mt-12">
        <p className="text-light-green text-sm">
          {language === "en"
            ? "PataDaktari First Aid Guide - For emergency situations only"
            : "Mwongozo wa Msaada wa Kwanza wa PataDaktari - Kwa hali za dharura tu"}
        </p>
        <p className="text-light-green text-xs mt-2">
          {language === "en"
            ? "Based on Kenya Ministry of Health guidelines. Always seek professional medical help."
            : "Kulingana na mwongozo wa Wizara ya Afya ya Kenya. Daima tafuta msaada wa kitaalamu wa kimatibabu."}
        </p>
      </footer>
    </div>
  );
}
