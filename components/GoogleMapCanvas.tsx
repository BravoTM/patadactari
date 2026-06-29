"use client";

import { useEffect } from "react";
import {
  APIProvider,
  APILoadingStatus,
  InfoWindow,
  Map,
  Marker,
  useApiLoadingStatus,
  useMap,
} from "@vis.gl/react-google-maps";
import { Facility } from "@/lib/facilities";
import {
  getDirectionsUrl,
  getLevelColor,
  makeMarkerIcon,
  NAIROBI_CENTER,
  USER_MARKER_ICON,
} from "@/lib/mapUtils";

type FacilityWithDistance = Facility & { distance?: number };

interface GoogleMapCanvasProps {
  apiKey: string;
  facilities: FacilityWithDistance[];
  selectedFacility: FacilityWithDistance | null;
  userLocation?: { lat: number; lng: number };
  onSelectFacility: (facility: FacilityWithDistance) => void;
  onDeselectFacility: () => void;
  language: "en" | "sw";
}

function FitMapBounds({
  facilities,
  userLocation,
}: {
  facilities: FacilityWithDistance[];
  userLocation?: { lat: number; lng: number };
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || facilities.length === 0 || typeof google === "undefined") return;

    const bounds = new google.maps.LatLngBounds();
    facilities.forEach((f) => bounds.extend({ lat: f.latitude, lng: f.longitude }));
    if (userLocation) {
      bounds.extend({ lat: userLocation.lat, lng: userLocation.lng });
    }
    map.fitBounds(bounds, 48);
  }, [map, facilities, userLocation]);

  return null;
}

function PanToSelection({
  selectedFacility,
}: {
  selectedFacility: FacilityWithDistance | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !selectedFacility) return;
    map.panTo({ lat: selectedFacility.latitude, lng: selectedFacility.longitude });
  }, [map, selectedFacility]);

  return null;
}

function MapMarkers({
  facilities,
  selectedFacility,
  userLocation,
  onSelectFacility,
  onDeselectFacility,
  language,
}: Omit<GoogleMapCanvasProps, "apiKey">) {
  return (
    <>
      <FitMapBounds facilities={facilities} userLocation={userLocation} />
      <PanToSelection selectedFacility={selectedFacility} />

      {userLocation && (
        <Marker
          position={{ lat: userLocation.lat, lng: userLocation.lng }}
          title="You"
          icon={USER_MARKER_ICON}
          zIndex={1000}
        />
      )}

      {facilities.map((facility) => {
        const isSelected = selectedFacility?.id === facility.id;
        const color = getLevelColor(facility.level);

        return (
          <Marker
            key={facility.id}
            position={{ lat: facility.latitude, lng: facility.longitude }}
            title={facility.name}
            onClick={() => onSelectFacility(facility)}
            icon={makeMarkerIcon(color, isSelected ? 28 : 22)}
            zIndex={isSelected ? 900 : facility.emergencyCapable ? 500 : 100}
          />
        );
      })}

      {selectedFacility && (
        <InfoWindow
          position={{
            lat: selectedFacility.latitude,
            lng: selectedFacility.longitude,
          }}
          onCloseClick={onDeselectFacility}
        >
          <div className="p-1 max-w-[220px]">
            <p className="font-bold text-gray-900 text-sm leading-tight mb-1">
              {selectedFacility.name}
            </p>
            <p className="text-xs text-gray-600 mb-2">
              {language === "en" ? "Level" : "Kiwango"} {selectedFacility.level}
              {selectedFacility.emergencyCapable ? " · 24/7 ER" : ""}
            </p>
            <a
              href={getDirectionsUrl(
                selectedFacility.latitude,
                selectedFacility.longitude
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 font-semibold hover:underline"
            >
              {language === "en" ? "Get directions →" : "Pata njia →"}
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapAuthHelp({ language }: { language: "en" | "sw" }) {
  const status = useApiLoadingStatus();

  if (status !== APILoadingStatus.AUTH_FAILURE) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 p-6">
      <div className="max-w-md text-center">
        <p className="font-bold text-red-700 text-lg mb-2">
          {language === "en" ? "Google Maps could not load" : "Google Maps haikuweza kupakia"}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          {language === "en"
            ? "Your API key was rejected (InvalidKeyMapError). Use a real key from Google Cloud Console — not a placeholder."
            : "Ufunguo wako umekataliwa (InvalidKeyMapError). Tumia ufunguo halisi kutoka Google Cloud Console."}
        </p>
        <ol className="text-left text-sm text-gray-600 space-y-2 list-decimal list-inside">
          <li>
            {language === "en"
              ? "Create a key at console.cloud.google.com → APIs & Services → Credentials"
              : "Unda ufunguo kwenye console.cloud.google.com → APIs & Services → Credentials"}
          </li>
          <li>
            {language === "en"
              ? "Enable Maps JavaScript API for your project"
              : "Wezesha Maps JavaScript API kwa mradi wako"}
          </li>
          <li>
            {language === "en"
              ? "Enable billing (required even for free tier)"
              : "Wezesha malipo (yanahitajika hata kwa kiwango cha bure)"}
          </li>
          <li>
            {language === "en"
              ? "Paste the key into .env.local as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
              : "Bandika ufunguo kwenye .env.local kama NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"}
          </li>
          <li>{language === "en" ? "Restart: npm run dev" : "Anzisha upya: npm run dev"}</li>
        </ol>
      </div>
    </div>
  );
}

export default function GoogleMapCanvas({ apiKey, language, ...props }: GoogleMapCanvasProps) {
  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center h-[420px] bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-center">
        <p className="font-semibold text-amber-900 mb-2">
          {language === "en"
            ? "Google Maps API key required"
            : "Ufunguo wa Google Maps unahitajika"}
        </p>
        <p className="text-sm text-amber-800 max-w-md">
          {language === "en"
            ? "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file. Enable the Maps JavaScript API in Google Cloud Console."
            : "Ongeza NEXT_PUBLIC_GOOGLE_MAPS_API_KEY kwenye .env.local. Wezesha Maps JavaScript API katika Google Cloud Console."}
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="relative w-full h-[420px] sm:h-[480px] rounded-xl overflow-hidden border-2 border-emerald-300 shadow-lg">
        <MapAuthHelp language={language} />
        <Map
          defaultCenter={NAIROBI_CENTER}
          defaultZoom={11}
          gestureHandling="greedy"
          disableDefaultUI={false}
          fullscreenControl
          mapTypeControl={false}
          streetViewControl={false}
          className="w-full h-full"
        >
          <MapMarkers {...props} language={language} />
        </Map>
      </div>
    </APIProvider>
  );
}
