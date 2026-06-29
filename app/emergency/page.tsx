"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { AppNav } from "@/components/AppNav";
import { FacilityCard } from "@/components/FacilityCard";
import { t } from "@/lib/i18n";
import { Facility, getNearestEmergencyFacilities, haversineDistance } from "@/lib/facilities";
import { Phone } from "lucide-react";

export default function EmergencyPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [facilities, setFacilities] = useState<(Facility & { distance?: number })[]>([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(true);
  const [emergencySymptoms, setEmergencySymptoms] = useState<string | null>(null);
  const translations = t[language];

  useEffect(() => {
    const stored = sessionStorage.getItem("emergencySymptoms");
    if (stored) setEmergencySymptoms(stored);
    loadEmergencyFacilities();
  }, []);

  const loadEmergencyFacilities = () => {
    setIsLoadingFacilities(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const facilitiesList = getNearestEmergencyFacilities(latitude, longitude, 5);
          const withDistance = facilitiesList.map((f) => ({
            ...f,
            distance: haversineDistance(latitude, longitude, f.latitude, f.longitude),
          }));
          setFacilities(withDistance);
          setIsLoadingFacilities(false);
        },
        () => {
          setFacilities(getNearestEmergencyFacilities(undefined, undefined, 5));
          setIsLoadingFacilities(false);
        }
      );
    } else {
      setFacilities(getNearestEmergencyFacilities(undefined, undefined, 5));
      setIsLoadingFacilities(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-red-700">
      <div className="bg-red-800">
        <AppNav />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center text-white">
          <div className="mb-8 animate-pulse">
            <h1 className="text-5xl font-bold mb-2">{translations.emergency}</h1>
            <p className="text-lg font-semibold mb-4">
              {language === "en" ? "DHARURA" : "DHARURA"}
            </p>
          </div>

          <div className="bg-red-900 bg-opacity-70 rounded-lg p-6 mb-6 border-2 border-white">
            <p className="text-xl font-bold mb-2">{translations.emergencyDesc}</p>
            {emergencySymptoms && (
              <p className="text-sm opacity-90 mt-3 pt-3 border-t border-red-700">
                <span className="font-semibold">
                  {language === "en" ? "Reported symptoms: " : "Dalili zilizoripotiwa: "}
                </span>
                {emergencySymptoms}
              </p>
            )}
          </div>

          <a
            href="tel:999"
            className="block bg-white text-red-700 px-8 py-6 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-colors mb-8 active:bg-gray-200 touch-target"
            aria-label="Call 999"
          >
            {translations.emergencyButton}
          </a>

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors w-full"
            aria-label={translations.startOver}
          >
            {translations.startOver}
          </button>
        </div>
      </div>

      <div className="bg-white border-t-4 border-red-700">
        <div className="max-w-md mx-auto px-4 py-8">
          <h2 className="font-bold text-gray-800 mb-4">
            {language === "en"
              ? "Nearest Emergency Facilities"
              : "Vituo vya Dharura vya Karibu"}
          </h2>

          {isLoadingFacilities ? (
            <p className="text-gray-500 text-sm">
              {language === "en" ? "Loading facilities..." : "Inakamatia vituo..."}
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
              {language === "en" ? "No facilities found" : "Hakuna vituo"}
            </p>
          )}
        </div>
      </div>

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
