"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { AppNav } from "@/components/AppNav";
import HospitalMap from "@/components/HospitalMap";

interface MapsPageClientProps {
  googleMapsApiKey: string;
}

export default function MapsPageClient({ googleMapsApiKey }: MapsPageClientProps) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const highlightFacilityId = searchParams.get("facility");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const finishLoading = () => {
      if (!cancelled) setIsLoadingLocation(false);
    };

    const timeoutId = window.setTimeout(finishLoading, 4000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (cancelled) return;
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          finishLoading();
        },
        finishLoading,
        { enableHighAccuracy: false, timeout: 3500, maximumAge: 300000 }
      );
    } else {
      finishLoading();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <AppNav />

      <div className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {language === "en" ? "Hospital Map" : "Ramani ya Hospitali"}
        </h1>

        {isLoadingLocation ? (
          <div className="w-full text-center py-8">
            <div className="animate-spin mb-4 inline-block">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full" />
            </div>
            <p className="text-gray-600">
              {language === "en" ? "Finding your location..." : "Inatafuta mahali pako..."}
            </p>
          </div>
        ) : null}

        <div className={isLoadingLocation ? "hidden" : "w-full"}>
          <HospitalMap
            language={language}
            userLocation={userLocation || undefined}
            googleMapsApiKey={googleMapsApiKey}
            highlightFacilityId={highlightFacilityId}
          />

          <div className="w-full mt-8 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
            <h2 className="font-bold text-blue-900 mb-3 text-lg">
              {language === "en" ? "About This Map" : "Kuhusu Ramani Hii"}
            </h2>
            <p className="text-sm text-blue-800 mb-3">
              {language === "en"
                ? "This map uses Google Maps to show health facilities across Nairobi. Tap a hospital in the list or on the map to see phone, address, and directions."
                : "Ramani hii inatumia Google Maps kuonyesha vituo vya afya katika Nairobi. Gusa hospitali kwenye orodha au ramani kuona simu, anwani, na njia."}
            </p>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
              <strong>💡 {language === "en" ? "Tip:" : "Kidokezo:"}</strong>
              <div className="mt-1">
                {language === "en"
                  ? "Use the search box to find hospitals by name, location, or services. Enable emergency filter to see only 24/7 emergency facilities."
                  : "Tumia sanduku la kutafuta ili kupata hospitali kulingana na jina, mahali, au huduma. Wezesha kichuja cha dharura kuona vituo vya dharura 24/7 tu."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
