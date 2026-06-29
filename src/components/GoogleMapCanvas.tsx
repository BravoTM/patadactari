"use client";

import { useEffect, useRef } from "react";
import {
  APIProvider,
  APILoadingStatus,
  InfoWindow,
  Map,
  Marker,
  useApiLoadingStatus,
  useMap,
} from "@vis.gl/react-google-maps";
import { FacilityWithDistance } from "@/lib/facilities";
import {
  buildLevelMarkerIcon,
  buildUserMarkerIcon,
  getDirectionsUrl,
  getLevelColor,
  NAIROBI_CENTER,
} from "@/lib/mapUtils";
import MapLegend from "@/components/MapLegend";

interface GoogleMapCanvasProps {
  apiKey: string;
  facilities: FacilityWithDistance[];
  selectedId: number | null;
  hoveredFacilityId: number | null;
  userLocation?: { lat: number; lng: number };
  onSelectFacility: (facility: FacilityWithDistance) => void;
  onHoverFacility: (id: number | null) => void;
  onDeselectFacility: () => void;
  language: "en" | "sw";
}

function FitMapBounds({
  facilities,
  userLocation,
  selectedId,
}: {
  facilities: FacilityWithDistance[];
  userLocation?: { lat: number; lng: number };
  selectedId: number | null;
}) {
  const map = useMap();
  const prevKey = useRef("");

  useEffect(() => {
    if (selectedId === null) prevKey.current = "";
  }, [selectedId]);

  useEffect(() => {
    if (!map || facilities.length === 0 || typeof google === "undefined") return;
    if (selectedId !== null) return;

    const key = facilities.map((f) => f.id).join(",");
    if (key === prevKey.current) return;
    prevKey.current = key;

    const bounds = new google.maps.LatLngBounds();
    facilities.forEach((f) => bounds.extend({ lat: f.lat, lng: f.lng }));
    if (userLocation) bounds.extend(userLocation);
    map.fitBounds(bounds, { top: 56, right: 56, bottom: 56, left: 56 });
  }, [map, facilities, userLocation, selectedId]);

  return null;
}

function PanToSelection({
  selectedId,
  facilities,
}: {
  selectedId: number | null;
  facilities: FacilityWithDistance[];
}) {
  const map = useMap();
  const lastPannedId = useRef<number | null>(null);

  useEffect(() => {
    if (!map || selectedId === null) {
      lastPannedId.current = null;
      return;
    }
    if (lastPannedId.current === selectedId) return;

    const target = facilities.find((f) => f.id === selectedId);
    if (!target) return;

    lastPannedId.current = selectedId;
    const center = { lat: target.lat, lng: target.lng };

    map.moveCamera({ center, zoom: 16 });

    // Nudge view so the pin sits above the info window, not hidden under it
    window.setTimeout(() => {
      map.panBy(0, -60);
    }, 120);
  }, [map, selectedId, facilities]);

  return null;
}

function MapMarkers({
  facilities,
  selectedId,
  hoveredFacilityId,
  userLocation,
  onSelectFacility,
  onHoverFacility,
  onDeselectFacility,
  language,
}: Omit<GoogleMapCanvasProps, "apiKey">) {
  const selected = selectedId
    ? facilities.find((f) => f.id === selectedId) ?? null
    : null;

  return (
    <>
      <FitMapBounds
        facilities={facilities}
        userLocation={userLocation}
        selectedId={selectedId}
      />
      <PanToSelection selectedId={selectedId} facilities={facilities} />

      {userLocation && (
        <Marker
          position={userLocation}
          title={language === "en" ? "Your location" : "Mahali ulipo"}
          icon={buildUserMarkerIcon()}
          zIndex={1000}
        />
      )}

      {facilities.map((facility) => {
        const isSelected = selectedId === facility.id;
        const isHovered = hoveredFacilityId === facility.id;
        return (
          <Marker
            key={facility.id}
            position={{ lat: facility.lat, lng: facility.lng }}
            title={`${facility.name} (L${facility.level})`}
            onClick={() => onSelectFacility(facility)}
            onMouseOver={() => onHoverFacility(facility.id)}
            onMouseOut={() => onHoverFacility(null)}
            icon={buildLevelMarkerIcon(facility.level, {
              selected: isSelected,
              hovered: isHovered,
            })}
            zIndex={isSelected ? 900 : isHovered ? 700 : facility.level >= 5 ? 500 : 100}
          />
        );
      })}

      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={onDeselectFacility}
          pixelOffset={[0, -34]}
        >
          <div className="p-1 max-w-[240px]">
            <p className="font-bold text-gray-900 text-sm leading-tight mb-0.5">
              {selected.name}
            </p>
            {selected.address && (
              <p className="text-[11px] text-gray-500 mb-1.5">{selected.address}</p>
            )}
            <p className="text-xs text-gray-600 mb-2 flex items-center gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: getLevelColor(selected.level) }}
              />
              {language === "en" ? "Level" : "Kiwango"} {selected.level}
              {selected.level >= 5 ? " · 24/7" : ` · ${selected.hours}`}
            </p>
            <a
              href={getDirectionsUrl(selected.lat, selected.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-teal-700 font-semibold hover:text-teal-900 transition-colors"
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
      <div className="max-w-sm text-center">
        <p className="text-sm font-semibold text-red-700 mb-2">
          {language === "en" ? "Google Maps could not load" : "Google Maps haikuweza kupakia"}
        </p>
        <p className="text-xs text-gray-600">
          {language === "en"
            ? "Check that Maps JavaScript API is enabled and localhost is allowed on your API key."
            : "Hakikisha Maps JavaScript API imewezeshwa na localhost inaruhusiwa kwenye ufunguo wako."}
        </p>
      </div>
    </div>
  );
}

export default function GoogleMapCanvas({ apiKey, language, ...props }: GoogleMapCanvasProps) {
  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full min-h-[320px] bg-amber-50/80 rounded-2xl p-6 text-center">
        <p className="text-sm text-amber-900 max-w-md">
          {language === "en"
            ? "Google Maps API key not found. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local, then restart the dev server."
            : "Ufunguo wa Google Maps haujapatikana. Ongeza NEXT_PUBLIC_GOOGLE_MAPS_API_KEY kwenye .env.local."}
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="map-shell relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden shadow-lg shadow-teal-900/5 border border-white/60">
        <MapAuthHelp language={language} />
        <MapLegend language={language} showUserLocation={!!props.userLocation} />
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
