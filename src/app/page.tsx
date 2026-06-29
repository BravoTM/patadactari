"use client";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Home() {
  const { lang } = useLang();
  const t = translations[lang];
  const conditions = [
  { icon: "🦟", title: t.condition1Title, desc: t.condition1Desc, bg: "bg-teal-50" },
  { icon: "🫁", title: t.condition2Title, desc: t.condition2Desc, bg: "bg-purple-50" },
  { icon: "💧", title: t.condition3Title, desc: t.condition3Desc, bg: "bg-amber-50" },
  { icon: "🩹", title: t.condition4Title, desc: t.condition4Desc, bg: "bg-red-50" },
];

  const steps = [
  { num: "1", title: t.step1Title, desc: t.step1Desc },
  { num: "2", title: t.step2Title, desc: t.step2Desc },
  { num: "3", title: t.step3Title, desc: t.step3Desc },
];

  return (
    <div className="max-w-3xl mx-auto px-4">

      {/* Hero */}
      <section className="text-center py-16 px-4">
  <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full border border-teal-200 mb-6">
    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
    {lang === "en" ? "Grounded in MoH Kenya Clinical Guidelines 2016" : "Imejengwa kwenye Mwongozo wa MoH Kenya 2016"}
  </div>

  <h1 className="text-4xl sm:text-5xl font-semibold text-teal-800 leading-tight mb-4">
  {t.homeHero1}{" "}
  <span className="text-teal-500">{t.homeHero2}</span>
</h1>
  <p className="text-base text-teal-700 leading-relaxed max-w-xl mx-auto mb-8">
    {t.homeSubtitle}
  </p>

  <div className="flex flex-wrap gap-3 justify-center">
    <Link href="/chat" className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium px-7 py-3 rounded-full transition-all duration-150 hover:-translate-y-px">
      {t.homeCTA}
    </Link>
    <Link href="/how-it-works" className="bg-white hover:bg-teal-50 text-teal-700 text-sm font-medium px-7 py-3 rounded-full border border-teal-200 transition-all duration-150">
      {t.homeHowItWorks}
    </Link>
  </div>
</section>

      {/* Conditions */}
      <section className="mb-12">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
         {t.homeConditionsLabel}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {conditions.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-teal-100 rounded-2xl p-5 text-center hover:border-teal-300 transition-colors duration-150"
            >
              <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3`}>
                {c.icon}
              </div>
              <h3 className="text-sm font-medium text-teal-800 mb-1">{c.title}</h3>
              <p className="text-xs text-teal-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          How it works
        </p>
        <div className="flex flex-col gap-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white border border-teal-100 rounded-2xl px-5 py-4 flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-teal-700 text-white text-sm font-semibold flex items-center justify-center shrink-0">
                {s.num}
              </div>
              <div>
                <h4 className="text-sm font-medium text-teal-800 mb-0.5">{s.title}</h4>
                <p className="text-xs text-teal-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-center mb-8">
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-medium">{t.homeImportant} </span>
{t.homeDisclaimer}
        </p>
      </div>

    </div>
  );}