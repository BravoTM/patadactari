"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import {
  getAllFacilities,
  sortByDistance,
  FacilityWithDistance,
} from "@/lib/facilities";
import GoogleMapCanvas from "@/components/GoogleMapCanvas";
import FacilityCard from "@/components/FacilityCard";
import PageHero from "@/components/PageHero";
import { FACILITY_LEVELS, legendPinSvg } from "@/lib/mapUtils";

const LEVELS = ["All", "Level 5", "Level 4", "Level 3"] as const;

interface FacilitiesClientProps {
  mapsApiKey: string;
}

function resolveInitialKey(serverKey: string): string {
  return serverKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
}

export default function FacilitiesClient({ mapsApiKey: initialKey }: FacilitiesClientProps) {
  const { lang } = useLang();
  const t = translations[lang];
  const [mapsApiKey, setMapsApiKey] = useState(() => resolveInitialKey(initialKey));
  const [loadingKey, setLoadingKey] = useState(() => !resolveInitialKey(initialKey));
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const cardRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (mapsApiKey) {
      setLoadingKey(false);
      return;
    }
    let cancelled = false;
    fetch("/api/maps-key")
      .then((res) => res.json())
      .then((data: { key?: string }) => {
        if (!cancelled && data.key) setMapsApiKey(data.key);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoadingKey(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mapsApiKey]);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const allFacilities = useMemo(() => {
    let list: FacilityWithDistance[] = getAllFacilities();
    if (userLocation) {
      list = sortByDistance(list, userLocation.lat, userLocation.lng);
    }
    return list;
  }, [userLocation]);

  const filtered = useMemo(() => {
    return allFacilities.filter((f) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.area.toLowerCase().includes(q) ||
        (f.address?.toLowerCase().includes(q) ?? false);
      const matchesLevel =
        levelFilter === "All" || `Level ${f.level}` === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [allFacilities, search, levelFilter]);

  // Drop selection when the selected hospital is no longer visible
  useEffect(() => {
    if (selectedId !== null && !filtered.some((f) => f.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  useEffect(() => {
    if (selectedId === null) return;
    cardRefs.current.get(selectedId)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  const handleSelect = useCallback((facility: FacilityWithDistance) => {
    setSelectedId((prev) => (prev === facility.id ? null : facility.id));
  }, []);

  const handleHover = useCallback((id: number, hovered: boolean) => {
    setHoveredId(hovered ? id : null);
  }, []);

  return (
    <div className="page-container pb-12">
      <PageHero
        badge={t.facilitiesBadge}
        title={t.facilitiesTitle}
        subtitle={t.facilitiesSubtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-6 animate-fade-up animate-fade-up-delay-1">
        <div className="lg:col-span-3 h-[340px] sm:h-[420px] lg:h-[520px] lg:sticky lg:top-28">
          {loadingKey ? (
            <div className="w-full h-full min-h-[320px] glass-card flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-teal-600">
                  {lang === "en" ? "Loading map..." : "Inapakia ramani..."}
                </p>
              </div>
            </div>
          ) : (
            <GoogleMapCanvas
              apiKey={mapsApiKey}
              facilities={filtered}
              selectedId={selectedId}
              hoveredFacilityId={hoveredId}
              userLocation={userLocation ?? undefined}
              onSelectFacility={handleSelect}
              onHoverFacility={setHoveredId}
              onDeselectFacility={() => setSelectedId(null)}
              language={lang}
            />
          )}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
          <div className="relative">
            <input
              type="text"
              placeholder={t.facilitiesSearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass-card pl-4 pr-10 py-3 text-sm text-teal-900 placeholder:text-teal-400 outline-none focus:ring-2 focus:ring-teal-500/30 transition-all duration-200"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 hover:text-teal-700 transition-colors text-lg leading-none"
                aria-label={lang === "en" ? "Clear search" : "Futa utafutaji"}
              >
                ×
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 active:scale-95 ${
                  levelFilter === l
                    ? "bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/25"
                    : "glass-card text-teal-700 hover:border-teal-300 hover:bg-white/90"
                }`}
              >
                {l}
              </button>
            ))}
            <button
              type="button"
              onClick={requestLocation}
              disabled={locating}
              className="ml-auto text-xs px-3 py-1.5 rounded-full border glass-card text-teal-700 hover:border-teal-300 hover:bg-white/90 transition-all duration-200 disabled:opacity-60 flex items-center gap-1.5"
            >
              <span className={`inline-block ${locating ? "animate-spin" : ""}`}>📍</span>
              {lang === "en" ? (locating ? "Locating…" : "Near me") : locating ? "Inatafuta…" : "Karibu nami"}
            </button>
          </div>

          <p className="text-xs text-teal-500/80 transition-opacity duration-300">
            {t.facilitiesShowing}{" "}
            <span className="font-semibold text-teal-700 tabular-nums">{filtered.length}</span>{" "}
            {t.facilitiesOf}{" "}
            <span className="tabular-nums">{allFacilities.length}</span> {t.facilitiesFacilities}
            {userLocation &&
              (lang === "en" ? " · sorted by distance" : " · zimepangwa kwa umbali")}
          </p>

          <div className="facility-list flex flex-col gap-2.5 overflow-y-auto max-h-[480px] pr-1 scroll-smooth">
            {filtered.length === 0 ? (
              <div className="glass-card p-8 text-center animate-fade-up">
                <p className="text-sm text-teal-500">{t.facilitiesEmpty}</p>
              </div>
            ) : (
              filtered.map((f, i) => (
                <FacilityCard
                  key={f.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(f.id, el);
                    else cardRefs.current.delete(f.id);
                  }}
                  facility={f}
                  index={i}
                  selected={selectedId === f.id}
                  hovered={hoveredId === f.id}
                  onSelect={() => handleSelect(f)}
                  onHover={(h) => handleHover(f.id, h)}
                  lang={lang}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 animate-fade-up animate-fade-up-delay-2">
        {([5, 4, 3] as const).map((level) => {
          const info = FACILITY_LEVELS[level];
          return (
            <div
              key={level}
              className="glass-card px-4 py-3 flex items-center gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <span
                className="shrink-0"
                dangerouslySetInnerHTML={{ __html: legendPinSvg(info.color, 22) }}
              />
              <div>
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${info.badgeClass}`}
                >
                  {lang === "en" ? info.labelEn : info.labelSw}
                </span>
                <p className="text-xs text-teal-600/80 mt-1.5">
                  {lang === "en" ? info.descEn : info.descSw}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card bg-amber-50/50 border-amber-200/50 px-5 py-4 text-center">
        <p className="text-xs text-amber-800/90 leading-relaxed">
          <span className="font-semibold">{t.facilitiesNoteLabel} </span>
          {t.facilitiesNote}
        </p>
      </div>
    </div>
  );
}
