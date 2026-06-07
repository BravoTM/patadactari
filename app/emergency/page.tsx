"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { FacilityCard } from "@/components/FacilityCard";
import { t } from "@/lib/i18n";
import { Facility } from "@/lib/facilities";
import { Phone, Home } from "lucide-react";

export default function EmergencyPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [facilities, setFacilities] = useState<(Facility & { distance?: number })[]>([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(true);
  const translations = t[language];

  useEffect(() => {
    // Load emergency facilities
    loadEmergencyFacilities();
  }, []);

  const loadEmergencyFacilities = async () => {
    try {
      const response = await fetch("/api/facilities?emergency=true");
      if (response.ok) {
        const data = await response.json();
        setFacilities(data.facilities);
      }
    } catch (error) {
      console.error("Error loading facilities:", error);
    } finally {
      setIsLoadingFacilities(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-red-700">
      {/* Main Emergency Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center text-white">
          {/* Big Alert */}
          <div className="mb-8 animate-pulse">
            <h1 className="text-5xl font-bold mb-2">{translations.emergency}</h1>
            <p className="text-lg font-semibold mb-4">
              {language === "en" ? "DHARURA" : "DHARURA"}
            </p>
          </div>

          {/* Emergency Message */}
          <div className="bg-red-900 bg-opacity-70 rounded-lg p-6 mb-8 border-2 border-white">
            <p className="text-xl font-bold mb-4">{translations.emergencyDesc}</p>
          </div>

          {/* Big Call Button */}
          <a
            href="tel:999"
            className="block bg-white text-red-700 px-8 py-6 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-colors mb-8 active:bg-gray-200 touch-target"
            aria-label="Call 999"
          >
            {translations.emergencyButton}
          </a>

          {/* Secondary Action */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors w-full"
            aria-label={translations.startOver}
          >
            <Home size={20} />
            <span>{translations.startOver}</span>
          </button>
        </div>
      </div>

      {/* Emergency Facilities */}
      <div className="bg-white border-t-4 border-red-700">
        <div className="max-w-md mx-auto px-4 py-8">
          <h2 className="font-bold text-gray-800 mb-4">
            {language === "en"
              ? "Level 4+ Emergency Facilities"
              : "Vituo vya Dharura vya Kiwango 4+"}
          </h2>

          {isLoadingFacilities ? (
            <p className="text-gray-500 text-sm">
              {language === "en"
                ? "Loading facilities..."
                : "Inakamatia vituo..."}
            </p>
          ) : facilities.length > 0 ? (
            <div className="grid gap-3">
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  distance={facility.distance}
                  language={language}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {language === "en"
                ? "No facilities found"
                : "Hakuna vituo"}
            </p>
          )}
        </div>
      </div>

      {/* Sticky Call Button (mobile) */}
      <div className="sticky bottom-0 w-full bg-red-700 p-4 md:hidden">
        <a
          href="tel:999"
          className="block bg-white text-red-700 px-6 py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
          aria-label="Call 999"
        >
          <Phone className="inline mr-2" size={20} />
          {translations.emergencyButton}
        </a>
      </div>
    </main>
  );
}
