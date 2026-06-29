"use client";

import { useMemo, useState } from "react";
import { Facility, haversineDistance } from "@/lib/facilities";
import { getDirectionsUrl } from "@/lib/mapUtils";
import GoogleMapCanvas from "@/components/GoogleMapCanvas";
import facilitiesData from "@/data/facilities.json";
import { MapPin, Phone, Clock, AlertCircle, Search, Filter, Navigation, ExternalLink } from "lucide-react";

interface HospitalMapProps {
  language: "en" | "sw";
  userLocation?: { lat: number; lng: number };
  googleMapsApiKey: string;
}

type FacilityWithDistance = Facility & { distance?: number; specialties?: string[] };

function getLevelLabel(level: number, language: "en" | "sw"): string {
  return `${language === "en" ? "Level" : "Kiwango"} ${level}`;
}

export default function HospitalMap({ language, userLocation, googleMapsApiKey }: HospitalMapProps) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityWithDistance | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  const facilitiesWithDistance = useMemo(() => {
    const facilities = facilitiesData as FacilityWithDistance[];
    if (!userLocation) return facilities;

    return facilities
      .map((f) => ({
        ...f,
        distance: haversineDistance(
          userLocation.lat,
          userLocation.lng,
          f.latitude,
          f.longitude
        ),
      }))
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  }, [userLocation]);

  const filteredFacilities = useMemo(() => {
    let results = facilitiesWithDistance;

    if (filterEmergency) {
      results = results.filter((f) => f.emergencyCapable);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          f.address.toLowerCase().includes(query) ||
          f.specialties?.some((s) => s.toLowerCase().includes(query))
      );
    }

    return results;
  }, [searchQuery, filterEmergency, facilitiesWithDistance]);

  const handleSelectFacility = (facility: FacilityWithDistance) => {
    setSelectedFacility(facility);
  };

  return (
    <div className="w-full space-y-5">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <h2 className="text-2xl font-bold">
              {language === "en" ? "Hospital Network Map" : "Ramani ya Mtandao wa Hospitali"}
            </h2>
          </div>
          <p className="text-emerald-50 text-sm">
            {language === "en"
              ? `${filteredFacilities.length} facility/facilities on Google Maps`
              : `Vituo ${filteredFacilities.length} kwenye Google Maps`}
          </p>
        </div>

        <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder={
                language === "en" ? "Search hospitals, clinics..." : "Tafuta hospitali, kliniki..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-300 transition">
            <input
              type="checkbox"
              checked={filterEmergency}
              onChange={(e) => setFilterEmergency(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === "en" ? "Emergency facilities only" : "Vituo vya dharura tu"}
              </span>
            </div>
          </label>
        </div>

        <div className="p-3 sm:p-4 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
          <GoogleMapCanvas
            apiKey={googleMapsApiKey}
            facilities={filteredFacilities}
            selectedFacility={selectedFacility}
            userLocation={userLocation}
            onSelectFacility={handleSelectFacility}
            language={language}
          />
        </div>

        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-3">
            {language === "en" ? "Hospital Levels:" : "Kiwango cha Hospitali:"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-900 rounded-full shadow-sm" />
              <span className="font-medium text-gray-700">
                {language === "en" ? "National" : "Kitaifa"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full shadow-sm" />
              <span className="font-medium text-gray-700">
                {language === "en" ? "Teaching" : "Kufundisha"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-600 rounded-full shadow-sm" />
              <span className="font-medium text-gray-700">
                {language === "en" ? "District" : "Kijiji"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm" />
              <span className="font-medium text-gray-700">
                {language === "en" ? "Health Center" : "Kituo"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm" />
              <span className="font-medium text-gray-700">
                {language === "en" ? "Your Location" : "Mahali"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-5 sm:p-6">
          <h3 className="font-bold text-lg">
            {language === "en"
              ? `Facilities (${filteredFacilities.length})`
              : `Vituo (${filteredFacilities.length})`}
          </h3>
          <p className="text-teal-50 text-sm mt-1">
            {language === "en" ? "Tap to view details" : "Gusa kuona maelezo"}
          </p>
        </div>

        {filteredFacilities.length === 0 ? (
          <div className="text-center py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
            <Search size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">
              {language === "en" ? "No facilities found" : "Hakuna vituo vilivyopatikana"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {language === "en" ? "Try adjusting your search" : "Jaribu kubadilisha utafutaji"}
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto p-4 sm:p-6">
            {filteredFacilities.map((facility) => (
              <button
                key={facility.id}
                type="button"
                onClick={() => handleSelectFacility(facility)}
                onMouseEnter={() => setHoveredMarker(facility.id)}
                onMouseLeave={() => setHoveredMarker(null)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 ${
                  selectedFacility?.id === facility.id
                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500 shadow-md"
                    : hoveredMarker === facility.id
                    ? "bg-gray-50 border-gray-300 shadow-sm"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-semibold text-gray-900">{facility.name}</div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-full">
                    {facility.emergencyCapable ? "🚑" : "🏥"}{" "}
                    {getLevelLabel(facility.level, language)}
                  </span>
                  {facility.distance !== undefined && (
                    <span className="text-xs font-semibold text-emerald-600">
                      {facility.distance < 1
                        ? "< 1 km"
                        : `${facility.distance.toFixed(1)} km`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-1">{facility.address}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedFacility && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border-2 border-emerald-400 shadow-xl">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-900">{selectedFacility.name}</h3>
            <p className="text-sm text-emerald-600 font-semibold mt-1">
              {selectedFacility.emergencyCapable ? "🚑" : "🏥"}{" "}
              {getLevelLabel(selectedFacility.level, language)}
            </p>
          </div>

          <div className="space-y-3 text-sm mb-5">
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
              <MapPin size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">
                  {language === "en" ? "Address" : "Anwani"}
                </div>
                <div className="text-gray-700 text-sm">{selectedFacility.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
              <Phone size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">
                  {language === "en" ? "Phone" : "Simu"}
                </div>
                <a
                  href={`tel:${selectedFacility.phone}`}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
                >
                  {selectedFacility.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
              <Clock size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">
                  {language === "en" ? "Operating Hours" : "Saa za Kufungua"}
                </div>
                <div className="text-gray-700 text-sm font-medium">{selectedFacility.hours}</div>
              </div>
            </div>

            {selectedFacility.distance !== undefined && (
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
                <Navigation size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800">
                    {language === "en" ? "Distance from You" : "Umbali Kutoka Kwako"}
                  </div>
                  <div className="text-gray-700 text-sm font-medium">
                    {selectedFacility.distance < 1
                      ? "< 1 km away"
                      : `${selectedFacility.distance.toFixed(1)} km away`}
                  </div>
                </div>
              </div>
            )}

            {selectedFacility.specialties && (
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
                <AlertCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800">
                    {language === "en" ? "Services" : "Huduma"}
                  </div>
                  <div className="text-gray-700 text-sm">
                    {selectedFacility.specialties.join(", ")}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${selectedFacility.phone}`}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone size={18} />
              {language === "en" ? "Call Hospital" : "Piga Simu"}
            </a>
            <a
              href={getDirectionsUrl(
                selectedFacility.latitude,
                selectedFacility.longitude
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              {language === "en" ? "Get Directions" : "Pata Njia"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
