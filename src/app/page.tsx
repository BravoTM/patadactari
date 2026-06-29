"use client";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import PageHero from "@/components/PageHero";

export default function Home() {
  const { lang } = useLang();
  const t = translations[lang];

  const conditions = [
    { icon: "🦟", title: t.condition1Title, desc: t.condition1Desc, href: "/chat", gradient: "from-teal-50 to-emerald-50" },
    { icon: "🫁", title: t.condition2Title, desc: t.condition2Desc, href: "/chat", gradient: "from-cyan-50 to-sky-50" },
    { icon: "💧", title: t.condition3Title, desc: t.condition3Desc, href: "/chat", gradient: "from-amber-50 to-orange-50" },
    { icon: "🩹", title: t.condition4Title, desc: t.condition4Desc, href: "/firstaid", gradient: "from-rose-50 to-red-50" },
  ];

  const steps = [
    { num: "01", title: t.step1Title, desc: t.step1Desc },
    { num: "02", title: t.step2Title, desc: t.step2Desc },
    { num: "03", title: t.step3Title, desc: t.step3Desc },
  ];

  return (
    <div className="page-container pb-16">
      <PageHero
        badge={t.homeBadge}
        title={
          <>
            {t.homeHero1}{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
              {t.homeHero2}
            </span>
          </>
        }
        subtitle={t.homeSubtitle}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/chat" className="btn-primary">{t.homeCTA}</Link>
          <Link href="/how-it-works" className="btn-secondary">{t.homeHowItWorks}</Link>
        </div>
      </PageHero>

      <section className="mb-14 animate-fade-up animate-fade-up-delay-1">
        <p className="section-label text-center">{t.homeConditionsLabel}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className={`glass-card p-5 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${c.gradient}`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{c.icon}</div>
              <h3 className="text-sm font-semibold text-teal-900 mb-1">{c.title}</h3>
              <p className="text-xs text-teal-600/80 leading-relaxed">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14 animate-fade-up animate-fade-up-delay-2">
        <p className="section-label text-center">{t.homeStepsLabel}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="glass-card p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <span className="text-2xl font-bold text-teal-500/40">{s.num}</span>
              <h4 className="text-sm font-semibold text-teal-900">{s.title}</h4>
              <p className="text-xs text-teal-600/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="glass-card bg-amber-50/40 border-amber-200/40 px-6 py-5 text-center animate-fade-up animate-fade-up-delay-3">
        <p className="text-xs text-amber-900/80 leading-relaxed max-w-xl mx-auto">
          <span className="font-semibold">{t.homeImportant} </span>
          {t.homeDisclaimer}
        </p>
      </div>
    </div>
  );
}
