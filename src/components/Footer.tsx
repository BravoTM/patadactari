"use client";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <footer className="w-full px-4 py-6 mt-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Main footer card */}
        <div className="rounded-3xl border border-teal-100 bg-white/70 backdrop-blur-md px-8 py-8">
          
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
            
            {/* Logo + tagline */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S7 10.5 7 7a5 5 0 0 1 5-5z"/>
                    <circle cx="12" cy="7" r="2"/>
                  </svg>
                </div>
                <span className="text-[16px] font-medium text-teal-800 tracking-tight">
                  Pata<span className="text-teal-500">Daktari</span>
                </span>
              </div>
              <p className="text-xs text-teal-600 pl-10">
               {t.footerTagline}
              </p>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { href: "/", label: t.navHome },
{ href: "/how-it-works", label: t.navHowItWorks },
{ href: "/facilities", label: t.navFacilities },
{ href: "/about", label: t.navAbout },
{ href: "/chat", label: t.navCTA },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-teal-700 hover:text-teal-900 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-teal-100 mb-5" />

          {/* Disclaimer */}
          <p className="text-xs text-teal-600 leading-relaxed mb-5">
           <span className="font-medium">{t.footerDisclaimerLabel} </span>
{t.footerDisclaimer}
            PataDaktari is not a substitute for professional medical advice, diagnosis or treatment.
            All guidance is based on Kenya Ministry of Health Clinical Guidelines 2016 and is intended
            as a first step only. Always consult a qualified healthcare provider.
            Habari hii si badala ya daktari halisi.
          </p>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-teal-500">
  © {new Date().getFullYear()} PataDaktari · {t.footerRights}
</p>
<p className="text-xs text-teal-500">{t.footerPrivacy}</p>
          </div>

        </div>

        {/* Emergency strip */}
        <div className="mt-3 rounded-2xl bg-red-50 border border-red-100 px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              </svg>
            </div>
            <p className="text-xs text-red-700 font-medium">
             {t.footerEmergency} <span className="font-bold">999</span> {t.footerEmergencyDesc}
            </p>
          </div>
          <a
            href="tel:999"
            className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition-colors duration-150 shrink-0"
          >
            Call 999
          </a>
        </div>

      </div>
    </footer>
  );
}