"use client";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import PageHero from "@/components/PageHero";

export default function HowItWorks() {
  const { lang } = useLang();
  const t = translations[lang];

  const steps = [
    { num: "01", title: lang === "en" ? "Describe how you feel" : "Elezea jinsi unavyohisi", desc: lang === "en" ? "Type your symptoms in English or Swahili — naturally, like a conversation." : "Andika dalili zako kwa Kiingereza au Kiswahili — kwa kawaida.", icon: "✍️", color: "from-teal-50 to-emerald-50" },
    { num: "02", title: lang === "en" ? "Emergency check runs first" : "Ukaguzi wa dharura kwanza", desc: lang === "en" ? "Life-threatening keywords trigger immediate 999 guidance before anything else." : "Maneno ya dharura yanaamsha mwongozo wa 999 mara moja.", icon: "🚨", color: "from-red-50 to-rose-50" },
    { num: "03", title: lang === "en" ? "AI reads MoH guidelines" : "AI inasoma mwongozo wa MoH", desc: lang === "en" ? "Your message is matched against Kenya MoH Clinical Guidelines 2016." : "Ujumbe wako unalinganishwa na Mwongozo wa MoH Kenya 2016.", icon: "🩺", color: "from-cyan-50 to-sky-50" },
    { num: "04", title: lang === "en" ? "Get triage guidance" : "Pata mwongozo wa tathmini", desc: lang === "en" ? "Clear next steps — never a diagnosis or prescription." : "Hatua zifuatazo wazi — kamwe si utambuzi au dawa.", icon: "📋", color: "from-amber-50 to-orange-50" },
    { num: "05", title: lang === "en" ? "Find the nearest facility" : "Pata kituo kilicho karibu", desc: lang === "en" ? "See public health facilities on the map with directions." : "Ona vituo vya afya vya umma kwenye ramani na njia.", icon: "📍", color: "from-indigo-50 to-violet-50" },
  ];

  const limits = [
    lang === "en" ? "Does not diagnose any condition" : "Haitambui ugonjwa wowote",
    lang === "en" ? "Does not prescribe medication" : "Haipendekezi dawa",
    lang === "en" ? "Does not store personal information" : "Haihifadhi taarifa za kibinafsi",
    lang === "en" ? "Not a replacement for a real doctor" : "Si mbadala wa daktari halisi",
  ];

  return (
    <div className="page-container-narrow pb-16">
      <PageHero badge={t.howBadge} title={t.howTitle} subtitle={t.howSubtitle} />

      <section className="mb-12 animate-fade-up animate-fade-up-delay-1">
        <div className="flex flex-col gap-3">
          {steps.map((s) => (
            <div key={s.num} className={`glass-card p-5 flex gap-4 bg-gradient-to-r ${s.color} hover:shadow-md transition-shadow`}>
              <div className="text-2xl shrink-0">{s.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-teal-400">{s.num}</span>
                  <h3 className="text-sm font-semibold text-teal-900">{s.title}</h3>
                </div>
                <p className="text-xs text-teal-600/80 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 animate-fade-up animate-fade-up-delay-2">
        <p className="section-label">{t.howLimitsLabel}</p>
        <div className="glass-card p-5 flex flex-col gap-3">
          {limits.map((l) => (
            <div key={l} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <p className="text-xs text-teal-700/90">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center animate-fade-up animate-fade-up-delay-3">
        <Link href="/chat" className="btn-primary">{t.howCTA}</Link>
        <p className="text-xs text-teal-500/80 mt-3">{t.howCTASub}</p>
      </div>
    </div>
  );
}
