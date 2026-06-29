"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import {
  FIRST_AID_CATEGORIES,
  FIRST_AID_GUIDES,
  FirstAidCategoryId,
  FirstAidGuide,
  getFirstAidGuide,
  searchFirstAidGuides,
} from "@/lib/firstaid";
import { isEmergency } from "@/lib/emergency";
import EmergencyScreen from "@/components/EmergencyScreen";
import PageHero from "@/components/PageHero";

function GuideCard({
  guide,
  lang,
  onSelect,
}: {
  guide: FirstAidGuide;
  lang: "en" | "sw";
  onSelect: (id: string) => void;
}) {
  const category = FIRST_AID_CATEGORIES.find((c) => c.id === guide.category);
  return (
    <button
      onClick={() => onSelect(guide.id)}
      className="glass-card p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-3xl group-hover:scale-110 transition-transform">{guide.icon}</span>
        {category && (
          <span className="text-[10px] font-medium text-teal-600/70 bg-teal-50 border border-teal-100 rounded-full px-2 py-0.5 shrink-0">
            {lang === "en" ? category.nameEn : category.nameSw}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-teal-900 mb-1">
        {lang === "en" ? guide.nameEn : guide.nameSw}
      </h3>
      <p className="text-xs text-teal-600/80 leading-relaxed">
        {lang === "en" ? guide.descriptionEn : guide.descriptionSw}
      </p>
    </button>
  );
}

export default function FirstAidPage() {
  const { lang } = useLang();
  const t = translations[lang];
  const [search, setSearch] = useState("");
  const [symptomInput, setSymptomInput] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<FirstAidCategoryId | "all">("all");
  const [emergency, setEmergency] = useState(false);

  const searched = search.trim() ? searchFirstAidGuides(search) : FIRST_AID_GUIDES;
  const guides =
    activeCategory === "all"
      ? searched
      : searched.filter((g) => g.category === activeCategory);

  const selected = selectedId ? getFirstAidGuide(selectedId) : null;
  const showGrouped = !search.trim() && activeCategory === "all";

  function handleSymptomCheck() {
    const text = symptomInput.trim();
    if (!text) return;
    if (isEmergency(text)) {
      setEmergency(true);
      return;
    }
    const results = searchFirstAidGuides(text);
    if (results.length > 0) setSelectedId(results[0].id);
  }

  if (emergency) return <EmergencyScreen onBack={() => setEmergency(false)} />;

  if (selected) {
    const category = FIRST_AID_CATEGORIES.find((c) => c.id === selected.category);
    return (
      <div className="page-container-narrow pb-12 animate-fade-up">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-900 mb-6 transition-colors"
        >
          ← {t.firstAidBack}
        </button>

        <div className="glass-card overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-teal-700 to-teal-900 px-6 py-5 flex items-center gap-4">
            <span className="text-4xl">{selected.icon}</span>
            <div>
              {category && (
                <p className="text-[11px] text-teal-300/80 font-medium mb-0.5">
                  {lang === "en" ? category.nameEn : category.nameSw}
                </p>
              )}
              <h1 className="text-xl font-semibold text-white">
                {lang === "en" ? selected.nameEn : selected.nameSw}
              </h1>
              <p className="text-sm text-teal-200/90">
                {lang === "en" ? selected.descriptionEn : selected.descriptionSw}
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-6 bg-white/40">
            {selected.steps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-md">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-teal-900 mb-2">
                    {lang === "en" ? step.titleEn : step.titleSw}
                  </h3>
                  <ul className="space-y-1.5">
                    {(lang === "en" ? step.instructionsEn : step.instructionsSw).map((inst, i) => (
                      <li key={i} className="text-xs text-teal-700/90 leading-relaxed flex gap-2">
                        <span className="text-teal-400">•</span>
                        {inst}
                      </li>
                    ))}
                  </ul>
                  {(lang === "en" ? step.warningsEn : step.warningsSw)?.map((w, i) => (
                    <p
                      key={i}
                      className="mt-2 text-xs text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2"
                    >
                      ⚠️ {w}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card bg-red-50/50 border-red-100/60 mt-4 p-5 text-center">
          <p className="text-xs text-red-700 mb-3">{t.firstAidEmergencyNote}</p>
          <a href="tel:999" className="btn-primary !bg-red-500 !shadow-red-500/25 hover:!bg-red-600">
            {t.chatCall}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container pb-16">
      <PageHero badge={t.firstAidBadge} title={t.firstAidTitle} subtitle={t.firstAidSubtitle} />

      <section className="glass-card p-5 mb-6 animate-fade-up animate-fade-up-delay-1">
        <h2 className="text-sm font-semibold text-teal-900 mb-1">{t.firstAidSymptomTitle}</h2>
        <p className="text-xs text-teal-600/80 mb-4">{t.firstAidSymptomDesc}</p>
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSymptomCheck()}
            placeholder={t.firstAidSymptomPlaceholder}
            className="flex-1 bg-white/80 border border-teal-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/30"
          />
          <button onClick={handleSymptomCheck} className="btn-primary !py-2.5 shrink-0">
            {t.firstAidSymptomBtn}
          </button>
        </div>
      </section>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t.firstAidSearch}
        className="w-full glass-card px-4 py-3 text-sm mb-4 outline-none focus:ring-2 focus:ring-teal-500/30 animate-fade-up animate-fade-up-delay-2"
      />

      <div className="flex gap-2 flex-wrap mb-6 animate-fade-up animate-fade-up-delay-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
            activeCategory === "all"
              ? "bg-teal-700 text-white border-teal-700"
              : "bg-white/60 text-teal-700 border-teal-100 hover:border-teal-300"
          }`}
        >
          {t.firstAidAllCategories} ({FIRST_AID_GUIDES.length})
        </button>
        {FIRST_AID_CATEGORIES.map((cat) => {
          const count = FIRST_AID_GUIDES.filter((g) => g.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1 ${
                activeCategory === cat.id
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white/60 text-teal-700 border-teal-100 hover:border-teal-300"
              }`}
            >
              <span>{cat.icon}</span>
              {lang === "en" ? cat.nameEn : cat.nameSw}
              <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {showGrouped ? (
        <div className="flex flex-col gap-10 animate-fade-up animate-fade-up-delay-3">
          {FIRST_AID_CATEGORIES.map((cat) => {
            const catGuides = guides.filter((g) => g.category === cat.id);
            if (catGuides.length === 0) return null;
            return (
              <section key={cat.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-base font-semibold text-teal-900">
                      {lang === "en" ? cat.nameEn : cat.nameSw}
                    </h2>
                    <p className="text-xs text-teal-600/70">
                      {lang === "en" ? cat.descriptionEn : cat.descriptionSw}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catGuides.map((guide) => (
                    <GuideCard
                      key={guide.id}
                      guide={guide}
                      lang={lang}
                      onSelect={setSelectedId}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up animate-fade-up-delay-3">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} lang={lang} onSelect={setSelectedId} />
          ))}
        </div>
      )}

      {guides.length === 0 && (
        <p className="text-center text-sm text-teal-500 py-8">{t.firstAidEmpty}</p>
      )}
    </div>
  );
}
