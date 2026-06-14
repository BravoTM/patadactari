"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { TriageResponse } from "@/components/TriageResponse";
import { FacilityCard } from "@/components/FacilityCard";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { t } from "@/lib/i18n";
import { Facility, getNearestFacilities, haversineDistance } from "@/lib/facilities";
import { Heart, ArrowLeft, Map } from "lucide-react";

interface TriageResult {
  guidance: string;
  urgency: "routine" | "urgent" | "emergency";
  condition: string;
  language: "en" | "sw";
}

export default function TriagePage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [facilities, setFacilities] = useState<(Facility & { distance?: number })[]>([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const translations = t[language];

  useEffect(() => {
    // Load triage result from sessionStorage
    const stored = sessionStorage.getItem("triageResult");
    if (stored) {
      try {
        const result = JSON.parse(stored);
        setTriageResult(result);
      } catch (error) {
        console.error("Error parsing triage result:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }

    // Try to get user's location
    if (navigator.geolocation) {
      setIsLoadingFacilities(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          loadFacilities(latitude, longitude);
        },
        () => {
          // Location permission denied or error - load default facilities
          loadFacilities();
        }
      );
    } else {
      // Geolocation not supported
      loadFacilities();
    }
  }, [router]);

  const loadFacilities = (lat?: number, lng?: number) => {
    // Load facilities directly from utility
    const facilitiesList = getNearestFacilities(lat, lng);
    
    // Calculate distances if we have location
    let facilitiesWithDistance = facilitiesList;
    if (lat && lng) {
      facilitiesWithDistance = facilitiesList.map((f) => ({
        ...f,
        distance: haversineDistance(lat, lng, f.latitude, f.longitude),
      }));
    }
    
    setFacilities(facilitiesWithDistance);
    setIsLoadingFacilities(false);
  };

  if (!triageResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4 inline-block">
            <Heart size={40} className="text-green-700" />
          </div>
          <p className="text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  const showEmergencyBanner = triageResult.urgency === "emergency";

  return (
    <main
      className={`min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white ${
        showEmergencyBanner ? "pt-20" : ""
      }`}
    >
      {/* Emergency Banner */}
      {showEmergencyBanner && (
        <EmergencyBanner language={language} />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium"
            aria-label={translations.startOver}
          >
            <ArrowLeft size={20} />
            <span className="text-sm">{translations.startOver}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Out of Scope Message */}
          {triageResult.condition === "out_of_scope" ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="font-bold text-yellow-900 mb-2">
                {translations.outOfScopeTitle}
              </h2>
              <p className="text-yellow-800 text-sm">{triageResult.guidance}</p>
            </div>
          ) : (
            <>
              {/* Triage Response */}
              <div className="mb-8">
                <TriageResponse
                  guidance={triageResult.guidance}
                  urgency={triageResult.urgency}
                  condition={triageResult.condition as "malaria" | "respiratory" | "diarrheal" | "firstaid" | "out_of_scope"}
                  language={language}
                />
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="font-bold text-gray-800 mb-4">
                  {translations.nearestFacilities}
                </h2>

                {isLoadingFacilities ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">
                      {language === "en"
                        ? "Finding nearby facilities..."
                        : "Kutafuta vituo vilivyo karibu..."}
                    </p>
                  </div>
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
                      : "Hakuna vituo vya afya"}
                  </p>
                )}
              </div>

              {/* First Aid Quick Link */}
              {triageResult.condition === "firstaid" && (
                <div className="mt-6 bg-gradient-to-r from-emergency-red to-red-600 rounded-lg p-6 shadow-md text-white">
                  <h3 className="font-bold text-lg mb-2">
                    {language === "en"
                      ? "Need First Aid?"
                      : "Unahitaji Msaada wa Kwanza?"}
                  </h3>
                  <p className="text-sm mb-4 opacity-90">
                    {language === "en"
                      ? "View step-by-step first aid instructions for this emergency."
                      : "Tazama maagizo ya hatua kwa hatua kwa dharura hii."}
                  </p>
                  <a
                    href="/firstaid"
                    className="inline-block bg-white text-emergency-red px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {translations.firstAid} →
                  </a>
                </div>
              )}
            </>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200 text-sm text-orange-800">
            <p className="font-medium mb-2">
              ⚠️{" "}
              {language === "en"
                ? "Important"
                : "Muhimu"}
            </p>
            <p>
              {language === "en"
                ? "This guidance does not replace a doctor. If symptoms are severe or getting worse, go to the nearest health facility immediately."
                : "Hii si mahali pa daktari. Ikiwa dalili ni mbaya au inabadilika, nenda haraka kwa hospitali."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
