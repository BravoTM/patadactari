"use client";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function EmergencyScreen({ onBack }: { onBack: () => void }) {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800 z-50 flex flex-col items-center justify-center px-6 text-center animate-fade-up">
      <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-4xl mb-6 animate-pulse">
        🚨
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t.emergencyTitle}</h1>
      <p className="text-red-100 text-base leading-relaxed max-w-sm mb-8">{t.emergencyDesc}</p>

      <a
        href="tel:999"
        className="w-full max-w-xs bg-white text-red-600 font-bold text-lg py-4 rounded-2xl mb-4 block hover:bg-red-50 transition-all shadow-xl hover:scale-[1.02]"
      >
        {t.emergencyCall}
      </a>

      <div className="w-full max-w-xs bg-white/10 backdrop-blur rounded-2xl p-5 mb-6 text-left border border-white/20">
        <p className="text-red-200 text-xs font-semibold uppercase tracking-wider mb-3">
          {t.emergencyHospitals}
        </p>
        {[
          { name: "Mama Lucy Kibaki Hospital", phone: "+254 20 2719000" },
          { name: "Mbagathi Hospital", phone: "+254 20 2725000" },
          { name: "Pumwani Maternity Hospital", phone: "+254 20 2763000" },
        ].map((h) => (
          <div key={h.name} className="mb-3 last:mb-0">
            <p className="text-white text-sm font-medium">{h.name}</p>
            <a href={`tel:${h.phone}`} className="text-red-200 text-xs hover:text-white transition-colors">
              {h.phone}
            </a>
          </div>
        ))}
      </div>

      <button onClick={onBack} className="text-red-200 text-sm underline underline-offset-4 hover:text-white transition-colors">
        {t.emergencyBack}
      </button>
    </div>
  );
}
