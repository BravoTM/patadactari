"use client";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  const { lang } = useLang();
  const t = translations[lang];

  const team = [
    { initials: "NA", name: "Njihia Alpha Bravo", id: "176665", role: lang === "en" ? "Frontend & UI/UX" : "Frontend na UI/UX" },
    { initials: "BM", name: "Brian Mathara", id: "189736", role: lang === "en" ? "Backend & RAG Engine" : "Backend na RAG" },
  ];

  const diff = [
    { icon: "🇰🇪", title: lang === "en" ? "Built for Kenya" : "Imejengwa kwa Kenya", desc: lang === "en" ? "Grounded in MoH Kenya Clinical Guidelines 2016." : "Imejengwa kwenye Mwongozo wa MoH Kenya 2016." },
    { icon: "🗣️", title: lang === "en" ? "Swahili & English" : "Kiswahili na Kiingereza", desc: lang === "en" ? "Responds in the language you write in." : "Inajibu kwa lugha unayoandika." },
    { icon: "📍", title: lang === "en" ? "Nairobi facilities map" : "Ramani ya vituo Nairobi", desc: lang === "en" ? "Find nearest public health facilities with Google Maps." : "Pata vituo vya afya vya umma vilivyo karibu." },
    { icon: "🔒", title: lang === "en" ? "No data stored" : "Hakuna data inayohifadhiwa", desc: lang === "en" ? "Your session is completely private." : "Kipindi chako ni cha faragha kabisa." },
  ];

  return (
    <div className="page-container-narrow pb-16">
      <PageHero badge={t.aboutBadge} title={t.aboutTitle} subtitle={t.aboutSubtitle} />

      <section className="mb-8 animate-fade-up animate-fade-up-delay-1">
        <p className="section-label">{t.aboutProblemLabel}</p>
        <div className="glass-card p-6 space-y-3">
          <p className="text-sm text-teal-700/90 leading-relaxed">
            {lang === "en"
              ? "Many Nairobi residents — especially in informal settlements — cannot easily access medical help. Private hospitals are expensive and public hospitals have long queues."
              : "Wakaaji wengi wa Nairobi — hasa katika makazi duni — hawawezi kupata msaada wa kimatibabu kwa urahisi."}
          </p>
          <p className="text-sm text-teal-700/90 leading-relaxed">
            {lang === "en"
              ? "PataDaktari is a simple first step — a digital gateway to help you make a more informed decision before visiting a facility."
              : "PataDaktari ni hatua ya kwanza — lango la kidijitali kukusaidia kufanya uamuzi bora kabla ya kutembelea kituo."}
          </p>
        </div>
      </section>

      <section className="mb-8 animate-fade-up animate-fade-up-delay-2">
        <p className="section-label">{t.aboutDiffLabel}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {diff.map((item) => (
            <div key={item.title} className="glass-card p-5 flex gap-4 hover:shadow-md transition-shadow">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-teal-900 mb-1">{item.title}</h3>
                <p className="text-xs text-teal-600/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <p className="section-label">{t.aboutTeamLabel}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {team.map((m) => (
            <div key={m.id} className="glass-card p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white text-sm font-semibold flex items-center justify-center">
                {m.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-900">{m.name}</p>
                <p className="text-xs text-teal-500">{m.id} · {m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link href="/chat" className="btn-primary">{t.aboutCTA}</Link>
        <p className="text-xs text-teal-500/80 mt-3">{t.aboutCTASub}</p>
      </div>
    </div>
  );
}
