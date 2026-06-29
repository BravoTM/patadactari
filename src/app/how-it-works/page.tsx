"use client";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
export default function HowItWorks() {
  const { lang } = useLang();
  const t = translations[lang];

  const steps = [
    {
      num: "01",
      title: "Describe how you feel",
      desc: "Type your symptoms in English or Swahili. You can write naturally — just say what you are experiencing, like 'nimekuwa na homa na maumivu ya kichwa tangu jana' or 'I have had a fever and headache since yesterday.'",
      icon: "✍️",
      bg: "bg-teal-50",
    },
    {
      num: "02",
      title: "Emergency check runs first",
      desc: "Before anything else, the system scans your message for life-threatening keywords. If you describe something like difficulty breathing, unconsciousness or severe bleeding, you are immediately shown emergency contacts and told to call 999.",
      icon: "🚨",
      bg: "bg-red-50",
    },
    {
      num: "03",
      title: "Your symptoms are assessed",
      desc: "If it is not an emergency, your message is sent to our AI system which reads the relevant sections of the Kenya Ministry of Health Clinical Guidelines 2016 before generating a response. The advice is grounded in official Kenyan health standards — not general internet information.",
      icon: "🩺",
      bg: "bg-purple-50",
    },
    {
      num: "04",
      title: "You get triage guidance",
      desc: "The system tells you what your symptoms may indicate, what to do next and how urgent it is. It will never diagnose you or prescribe medication. It gives guidance like 'based on your symptoms you should visit a Level 4 or 5 facility for a proper test.'",
      icon: "📋",
      bg: "bg-amber-50",
    },
    {
      num: "05",
      title: "Find the nearest facility",
      desc: "At the end of every session the system shows you the three nearest public health facilities relevant to your condition, with their level, location, phone number and operating hours.",
      icon: "📍",
      bg: "bg-teal-50",
    },
  ];

  const conditions = [
    { name: "Malaria suspicion", detail: "Screening for fever, chills and risk factors relevant to Nairobi residents and those with recent travel history." },
    { name: "Respiratory infections", detail: "Basic assessment of cough, flu-like symptoms and warning signs that may indicate something more serious like pneumonia." },
    { name: "Diarrheal diseases", detail: "Checking for dehydration levels and giving basic management guidance for adults." },
    { name: "Basic first aid", detail: "Immediate step-by-step guidance for common injuries like burns, cuts and minor trauma." },
  ];

  const limits = [
    "PataDaktari does not diagnose any condition",
    "It does not prescribe or recommend any medication",
    "It does not cover conditions outside its 4 areas",
    "It does not store any of your personal information",
    "It is not a replacement for visiting a real doctor",
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">

      {/* Hero */}
      <section className="text-center py-12">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full border border-teal-200 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
         {t.howBadge}
        </div>
        <h1 className="text-3xl font-semibold text-teal-800 mb-3">
         {t.howTitle}
        </h1>
        <p className="text-sm text-teal-600 leading-relaxed max-w-md mx-auto">
          {t.howSubtitle}
        </p>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <div className="flex flex-col gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white border border-teal-100 rounded-2xl p-5 flex gap-4"
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-2xl shrink-0`}>
                {s.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-teal-400">{s.num}</span>
                  <h3 className="text-sm font-medium text-teal-800">{s.title}</h3>
                </div>
                <p className="text-xs text-teal-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions covered */}
      <section className="mb-12">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          {t.howConditionsLabel}
        </p>
        <div className="flex flex-col gap-3">
          {conditions.map((c) => (
            <div
              key={c.name}
              className="bg-white border border-teal-100 rounded-2xl px-5 py-4"
            >
              <h4 className="text-sm font-medium text-teal-800 mb-1">{c.name}</h4>
              <p className="text-xs text-teal-600 leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What it will not do */}
      <section className="mb-10">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          {t.howLimitsLabel}
        </p>
        <div className="bg-white border border-teal-100 rounded-2xl px-5 py-4 flex flex-col gap-3">
          {limits.map((l) => (
            <div key={l} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <p className="text-xs text-teal-700 leading-relaxed">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-150 hover:-translate-y-px"
        >
          {t.howCTA}
        </Link>
        <p className="text-xs text-teal-500 mt-3">
         {t.howCTASub}
        </p>
      </div>

    </div>
  );
}