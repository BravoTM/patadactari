"use client";
import { useState } from "react";
import facilitiesData from "@/data/facilities.json";

const LEVELS = ["All", "Level 5", "Level 4", "Level 3"];

export default function FacilitiesPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const filtered = facilitiesData.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.area.toLowerCase().includes(search.toLowerCase());
    const matchesLevel =
      levelFilter === "All" || `Level ${f.level}` === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const levelColor: Record<number, string> = {
    5: "bg-teal-700 text-white",
    4: "bg-teal-100 text-teal-800",
    3: "bg-teal-50 text-teal-700",
  };

  const levelBorder: Record<number, string> = {
    5: "border-teal-200",
    4: "border-teal-100",
    3: "border-teal-50",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">

      {/* Hero */}
      <section className="text-center py-10">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full border border-teal-200 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
          15 Nairobi public health facilities
        </div>
        <h1 className="text-3xl font-semibold text-teal-800 mb-3">
          Find a facility near you
        </h1>
        <p className="text-sm text-teal-600 leading-relaxed max-w-md mx-auto">
          All facilities listed are public health facilities in Nairobi. Higher level facilities offer more services.
        </p>
      </section>

      {/* Level guide */}
      <div className="bg-white border border-teal-100 rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row gap-3">
        {[
          { level: "Level 5", desc: "Full hospital — 24hr emergency, labs, specialists", color: "bg-teal-700 text-white" },
          { level: "Level 4", desc: "District hospital — most outpatient needs", color: "bg-teal-100 text-teal-800" },
          { level: "Level 3", desc: "Health centre — basic primary care", color: "bg-teal-50 text-teal-700" },
        ].map((l) => (
          <div key={l.level} className="flex items-center gap-2 flex-1">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${l.color}`}>
              {l.level}
            </span>
            <p className="text-xs text-teal-600">{l.desc}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-teal-100 rounded-2xl px-4 py-2.5 text-sm text-teal-900 placeholder:text-teal-300 outline-none focus:border-teal-300 transition-colors"
        />
        <div className="flex gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevelFilter(l)}
              className={`text-xs px-3 py-2 rounded-full border transition-colors duration-150 ${
                levelFilter === l
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-teal-700 border-teal-100 hover:border-teal-300"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-teal-500 mb-4">
        Showing {filtered.length} of {facilitiesData.length} facilities
      </p>

      {/* Facility cards */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-teal-100 rounded-2xl px-5 py-8 text-center">
            <p className="text-sm text-teal-500">No facilities match your search.</p>
          </div>
        ) : (
          filtered.map((f) => (
            <div
              key={f.id}
              className={`bg-white border rounded-2xl px-5 py-4 ${levelBorder[f.level]}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-medium text-teal-800 mb-0.5">
                    {f.name}
                  </h3>
                  <p className="text-xs text-teal-500">{f.area}, Nairobi</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${levelColor[f.level]}`}>
                  Level {f.level}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#0A6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                  <a href={`tel:${f.phone}`} className="text-xs text-teal-600 hover:text-teal-800 transition-colors">
                    {f.phone}
                  </a>
                </div>

                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="#0A6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <p className="text-xs text-teal-600">{f.hours}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-center mt-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-medium">Note: </span>
          Facility information is based on a static database. Hours and contacts may change.
          Always call ahead to confirm before visiting.
        </p>
      </div>

    </div>
  );
}