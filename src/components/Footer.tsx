"use client";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];

  const links = [
    { href: "/", label: t.navHome },
    { href: "/how-it-works", label: t.navHowItWorks },
    { href: "/facilities", label: t.navFacilities },
    { href: "/firstaid", label: t.navFirstAid },
    { href: "/about", label: t.navAbout },
    { href: "/chat", label: t.navCTA },
  ];

  return (
    <footer className="px-4 pb-8 mt-8">
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="glass-card px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-lg font-semibold text-teal-900">
                Pata<span className="text-teal-500">Daktari</span>
              </span>
              <p className="text-xs text-teal-600/80 mt-1">{t.footerTagline}</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-teal-700/80 hover:text-teal-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-teal-100/60 pt-5 mb-5">
            <p className="text-xs text-teal-600/80 leading-relaxed">
              <span className="font-semibold text-teal-800">{t.footerDisclaimerLabel} </span>
              {t.footerDisclaimer}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-teal-500/80">
            <p>© {new Date().getFullYear()} PataDaktari · {t.footerRights}</p>
            <p>{t.footerPrivacy}</p>
          </div>
        </div>

        <div className="glass-card bg-red-50/60 border-red-100/60 px-6 py-3.5 flex items-center justify-between gap-4">
          <p className="text-xs text-red-700 font-medium">
            {t.footerEmergency} <span className="font-bold">999</span> {t.footerEmergencyDesc}
          </p>
          <a href="tel:999" className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition-colors shrink-0">
            {t.chatCall}
          </a>
        </div>
      </div>
    </footer>
  );
}
