"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { translations } from "@/lib/translations";
import { useLang } from "@/lib/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { href: "/", label: t.navHome },
    { href: "/how-it-works", label: t.navHowItWorks },
    { href: "/facilities", label: t.navFacilities },
    { href: "/firstaid", label: t.navFirstAid },
    { href: "/about", label: t.navAbout },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between gap-3 px-5 py-3 rounded-2xl glass-card shadow-sm shadow-teal-900/5">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S7 10.5 7 7a5 5 0 0 1 5-5z"/>
              <circle cx="12" cy="7" r="2"/>
            </svg>
          </div>
          <span className="text-[17px] font-semibold text-teal-900 tracking-tight">
            Pata<span className="text-teal-500">Daktari</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm px-3.5 py-2 rounded-xl transition-all duration-200 ${
                pathname === link.href
                  ? "bg-teal-600/10 text-teal-800 font-medium"
                  : "text-teal-700/80 hover:bg-teal-50 hover:text-teal-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-teal-50/80 rounded-xl p-0.5 border border-teal-100/60">
            {(["en", "sw"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200 uppercase ${
                  lang === l
                    ? "bg-white text-teal-800 font-semibold shadow-sm"
                    : "text-teal-600 hover:text-teal-800"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link href="/chat" className="hidden sm:flex btn-primary !py-2 !px-4 !text-xs">
            {t.navCTA}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-teal-50 text-teal-700"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden max-w-5xl mx-auto mt-2 p-3 glass-card animate-fade-up">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm px-4 py-3 rounded-xl transition-colors ${
                pathname === link.href ? "bg-teal-600/10 text-teal-800 font-medium" : "text-teal-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/chat" onClick={() => setMenuOpen(false)} className="block btn-primary text-center mt-2 !w-full justify-center">
            {t.navCTA}
          </Link>
        </div>
      )}
    </header>
  );
}
