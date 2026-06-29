import Link from "next/link";

export default function AboutPage() {
  const team = [
    {
      initials: "NA",
      name: "Njihia Alpha Bravo",
      id: "176665",
      role: "Frontend & UI/UX",
    },
    {
      initials: "BM",
      name: "Brian Mathara",
      id: "189736",
      role: "Backend & RAG Engine",
    },
  ];

  const tech = [
    { name: "Next.js 15", desc: "Frontend framework — App Router" },
    { name: "TypeScript", desc: "Type-safe codebase" },
    { name: "Tailwind CSS", desc: "Styling and mobile-first design" },
    { name: "LangChain", desc: "RAG pipeline orchestration" },
    { name: "Google Gemini", desc: "AI language model (gemini-1.5-flash)" },
    { name: "Faiss", desc: "Vector store for MoH PDF embeddings" },
  ];

  const ethics = [
    "No personal or patient data is stored during or after a session",
    "All guidance is clearly labeled as preliminary triage only",
    "Users are always reminded to seek professional medical advice",
    "Emergency override activates immediately for life-threatening symptoms",
    "Designed in compliance with the Kenya Data Protection Act 2019",
    "All clinical guidance is grounded in MoH Kenya Clinical Guidelines 2016",
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">

      {/* Hero */}
      <section className="text-center py-10">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full border border-teal-200 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
          Strathmore University · School of Computing & Engineering Sciences
        </div>
        <h1 className="text-3xl font-semibold text-teal-800 mb-3">
          About PataDaktari
        </h1>
        <p className="text-sm text-teal-600 leading-relaxed max-w-md mx-auto">
          A final year project built to make basic health guidance accessible
          to every Nairobi resident — especially those in informal settlements
          where hospital visits are expensive and queues are long.
        </p>
      </section>

      {/* The problem */}
      <section className="mb-8">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          The problem we are solving
        </p>
        <div className="bg-white border border-teal-100 rounded-2xl px-5 py-5">
          <p className="text-sm text-teal-700 leading-relaxed mb-3">
            Many Nairobi residents — especially those living in informal
            settlements like Kibera, Mathare and Mukuru — cannot easily access
            medical help when they fall sick. Private hospitals are too
            expensive and public hospitals have very long queues.
          </p>
          <p className="text-sm text-teal-700 leading-relaxed mb-3">
            This means many people either ignore their symptoms until things
            get worse, or turn to uncertified practitioners. The problem is
            made harder by the fact that most health information online is in
            English while many residents are more comfortable in Swahili.
          </p>
          <p className="text-sm text-teal-700 leading-relaxed">
            PataDaktari is a simple first step — a digital gateway that helps
            users make a more informed decision about their health before
            visiting a facility.
          </p>
        </div>
      </section>

      {/* What makes it different */}
      <section className="mb-8">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          What makes it different
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              icon: "🇰🇪",
              title: "Built for Kenya",
              desc: "Grounded in Kenya Ministry of Health Clinical Guidelines 2016 — not general internet medical databases.",
            },
            {
              icon: "🗣️",
              title: "Works in Swahili and English",
              desc: "Most existing symptom checkers like Ada Health and WebMD are English-only. PataDaktari responds in the language you write in.",
            },
            {
              icon: "📍",
              title: "Nairobi-specific facilities",
              desc: "Shows the nearest relevant public health facility — not a generic hospital finder.",
            },
            {
              icon: "🔒",
              title: "No data stored",
              desc: "Your session is private. No personal information is collected or stored at any point.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-teal-100 rounded-2xl px-5 py-4 flex gap-4"
            >
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-teal-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-teal-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-8">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          The team
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {team.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-teal-100 rounded-2xl px-5 py-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-teal-700 text-white text-sm font-medium flex items-center justify-center shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-teal-800">{t.name}</p>
                <p className="text-xs text-teal-500">{t.id} · {t.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-teal-100 rounded-2xl px-5 py-4 mt-3 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium flex items-center justify-center shrink-0">
            SM
          </div>
          <div>
            <p className="text-sm font-medium text-teal-800">Salome Monthe</p>
            <p className="text-xs text-teal-500">Project Supervisor · Strathmore University</p>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-8">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          Technology used
        </p>
        <div className="grid grid-cols-2 gap-3">
          {tech.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-teal-100 rounded-2xl px-4 py-3"
            >
              <p className="text-sm font-medium text-teal-800 mb-0.5">{t.name}</p>
              <p className="text-xs text-teal-500">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & ethics */}
      <section className="mb-10">
        <p className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-4">
          Safety & ethics
        </p>
        <div className="bg-white border border-teal-100 rounded-2xl px-5 py-4 flex flex-col gap-3">
          {ethics.map((e) => (
            <div key={e} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="#0A6E6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="text-xs text-teal-700 leading-relaxed">{e}</p>
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
          Try PataDaktari
        </Link>
        <p className="text-xs text-teal-500 mt-3">
          Free · No sign up · No data stored
        </p>
      </div>

    </div>
  );
}