"use client";

import { useState, useEffect } from "react";
import { Facility, haversineDistance } from "@/lib/facilities";
import facilitiesData from "@/data/facilities.json";
import { Heart, MapPin, Phone, Clock, AlertCircle, Search, Filter, Navigation } from "lucide-react";

interface HospitalMapProps {
  language: "en" | "sw";
  userLocation?: { lat: number; lng: number };
}

export default function HospitalMap({ language, userLocation }: HospitalMapProps) {
  const [facilities] = useState<Facility[]>(facilitiesData as Facility[]);
  const [selectedFacility, setSelectedFacility] = useState<(Facility & { distance?: number }) | null>(null);
  const [facilitiesWithDistance, setFacilitiesWithDistance] = useState<(Facility & { distance?: number })[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<(Facility & { distance?: number })[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  useEffect(() => {
    // Calculate distances if user location is available
    if (userLocation) {
      const withDistance = facilities.map((f) => ({
        ...f,
        distance: haversineDistance(userLocation.lat, userLocation.lng, f.latitude, f.longitude),
      }));
      setFacilitiesWithDistance(withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0)));
      setFilteredFacilities(withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0)));
    } else {
      setFacilitiesWithDistance(facilities);
      setFilteredFacilities(facilities);
    }
  }, [userLocation, facilities]);

  // Apply filters
  useEffect(() => {
    let results = facilitiesWithDistance;

    if (filterEmergency) {
      results = results.filter((f) => f.emergencyCapable);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          f.address.toLowerCase().includes(query) ||
          (f as any).specialties?.some((s: string) => s.toLowerCase().includes(query))
      );
    }

    setFilteredFacilities(results);
  }, [searchQuery, filterEmergency, facilitiesWithDistance]);

  return (
    <div className="w-full space-y-5">
      {/* Main Map Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
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
              ? `${filteredFacilities.length} facility/facilities available`
              : `Vituo vya ${filteredFacilities.length} vinavyopatikana`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder={language === "en" ? "Search hospitals, clinics..." : "Tafuta hospitali, kliniki..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          {/* Emergency Filter */}
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

        {/* Interactive Map */}
        <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 flex justify-center overflow-x-auto">
          <svg width={550} height={450} className="border-2 border-emerald-300 bg-white rounded-xl shadow-lg flex-shrink-0" style={{ minWidth: "550px" }}>
            {/* Grid background pattern */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#d1fae5" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f0fdfa" />
                <stop offset="100%" stopColor="#d1fae5" />
              </linearGradient>
            </defs>
            <rect width={550} height={450} fill="url(#waterGradient)" />
            <rect width={550} height={450} fill="url(#grid)" opacity="0.3" />

            {/* User location marker */}
            {userLocation && (() => {
              const pos = projectCoordinates(userLocation.lat, userLocation.lng);
              return (
                <g>
                  <circle cx={pos.x} cy={pos.y} r="14" fill="#10b981" fillOpacity="0.2" />
                  <circle cx={pos.x} cy={pos.y} r="10" fill="#10b981" stroke="white" strokeWidth="2" />
                  <circle cx={pos.x} cy={pos.y} r="4" fill="white" />
                </g>
              );
            })()}

            {/* Hospital markers */}
            {facilitiesWithDistance.map((facility) => {
              const pos = projectCoordinates(facility.latitude, facility.longitude);
              const isSelected = selectedFacility?.id === facility.id;
              const isHovered = hoveredMarker === facility.id;
              const color = getLevelColor(facility.level);
              const markerSize = isSelected || isHovered ? 18 : facility.emergencyCapable ? 14 : 12;

              return (
                <g key={facility.id}>
                  {/* Enhanced halo on select/hover */}
                  {(isSelected || isHovered) && (
                    <>
                      <circle cx={pos.x} cy={pos.y} r="26" fill={color} fillOpacity="0.12" />
                      <circle cx={pos.x} cy={pos.y} r="22" fill={color} fillOpacity="0.08" />
                    </>
                  )}
                  
                  {/* Main marker circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={markerSize}
                    fill={color}
                    fillOpacity={isSelected ? "1" : isHovered ? "0.95" : "0.85"}
                    stroke="white"
                    strokeWidth={isSelected || isHovered ? "3" : "2"}
                    onClick={() => setSelectedFacility(facility)}
                    onMouseEnter={() => setHoveredMarker(facility.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    className="hover:filter hover:drop-shadow-lg"
                  />
                  
                  {/* Inner marker detail */}
                  <circle cx={pos.x} cy={pos.y} r={markerSize / 2.5} fill="white" opacity={isSelected || isHovered ? "1" : "0.9"} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Enhanced Legend */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-3">{language === "en" ? "Hospital Levels:" : "Kiwango cha Hospitali:"}</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-900 rounded-full shadow-sm"></div>
              <span className="font-medium text-gray-700">{language === "en" ? "National" : "Kitaifa"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full shadow-sm"></div>
              <span className="font-medium text-gray-700">{language === "en" ? "Teaching" : "Kufundisha"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-600 rounded-full shadow-sm"></div>
              <span className="font-medium text-gray-700">{language === "en" ? "District" : "Kijiji"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
              <span className="font-medium text-gray-700">{language === "en" ? "Health Center" : "Kituo"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
              <span className="font-medium text-gray-700">{language === "en" ? "Your Location" : "Mahali"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities List Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-5 sm:p-6">
          <h3 className="font-bold text-lg">
            {language === "en"
              ? `Facilities (${filteredFacilities.length})`
              : `Vituo (${filteredFacilities.length})`}
          </h3>
          <p className="text-teal-50 text-sm mt-1">
            {language === "en" 
              ? "Tap to view details" 
              : "Gusa kuona maelezo"}
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
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                onMouseEnter={() => setHoveredMarker(facility.id)}
                onMouseLeave={() => setHoveredMarker(null)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                  selectedFacility?.id === facility.id
                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500 shadow-md"
                    : hoveredMarker === facility.id
                    ? "bg-gray-50 border-gray-300 shadow-sm"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{facility.name}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-full">
                        {facility.emergencyCapable ? "🚑" : "🏥"} {getLevelLabel(facility.level)}
                      </span>
                      {facility.distance !== undefined && (
                        <span className="text-xs font-semibold text-emerald-600">
                          {facility.distance < 1 ? "< 1 km" : facility.distance.toFixed(1) + " km"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Facility Details Card */}
      {selectedFacility && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border-2 border-emerald-400 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{selectedFacility.name}</h3>
              <p className="text-sm text-emerald-600 font-semibold mt-1">
                {selectedFacility.emergencyCapable ? "🚑" : "🏥"} {getLevelLabel(selectedFacility.level)}
              </p>
            </div>
          </div>
          
          <div className="space-y-3 text-sm mb-5">
            {/* Address */}
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
              <MapPin size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">
                  {language === "en" ? "Address" : "Anwani"}
                </div>
                <div className="text-gray-700 text-sm">{selectedFacility.address}</div>
              </div>
            </div>

            {/* Phone */}
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

            {/* Hours */}
            <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
              <Clock size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">
                  {language === "en" ? "Operating Hours" : "Saa za Kufungua"}
                </div>
                <div className="text-gray-700 text-sm font-medium">{selectedFacility.hours}</div>
              </div>
            </div>

            {/* Distance */}
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
                      : selectedFacility.distance.toFixed(1) + " km away"}
                  </div>
                </div>
              </div>
            )}

            {/* Specialties */}
            {(selectedFacility as any).specialties && (
              <div className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
                <AlertCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800">
                    {language === "en" ? "Services" : "Huduma"}
                  </div>
                  <div className="text-gray-700 text-sm">
                    {(selectedFacility as any).specialties.join(", ")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call Button */}
          <a
            href={`tel:${selectedFacility.phone}`}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center flex items-center justify-center gap-2 group shadow-lg"
          >
            <Phone size={18} className="group-hover:scale-110 transition-transform" />
            {language === "en" ? "Call Hospital" : "Piga Simu"}
          </a>
        </div>
      )}
    </div>
  );

  // Helper function to project coordinates
  function projectCoordinates(lat: number, lng: number): { x: number; y: number } {
    const mapWidth = 550;
    const mapHeight = 450;
    const centerLat = -1.3;
    const centerLng = 36.8;
    const zoomLevel = 0.4;

    const x = ((lng - centerLng) / zoomLevel) * 20 + mapWidth / 2;
    const y = (-(lat - centerLat) / zoomLevel) * 20 + mapHeight / 2;
    return { x: Math.max(15, Math.min(mapWidth - 15, x)), y: Math.max(15, Math.min(mapHeight - 15, y)) };
  }

  // Helper function to get marker color by level
  function getLevelColor(level: number): string {
    if (level === 6) return "#7f1d1d"; // Dark red for National
    if (level === 5) return "#dc2626"; // Red for Teaching
    if (level === 4) return "#ea580c"; // Orange for District
    return "#3b82f6"; // Blue for Health Centers
  }

  // Helper function to get level label
  function getLevelLabel(level: number): string {
    return `${language === "en" ? "Level" : "Kiwango"} ${level}`;
  }
}
