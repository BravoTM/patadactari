"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translations } from "@/lib/translations";
import { useLang } from "@/lib/LanguageContext";

export default function Header() {
  const pathname = usePathname();
 const { lang, setLang } = useLang();
const t = translations[lang];
 const navLinks = [
  { href: "/", label: t.navHome },
  { href: "/how-it-works", label: t.navHowItWorks },
  { href: "/facilities", label: t.navFacilities },
  { href: "/about", label: t.navAbout },
];
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav className="max-w-4xl mx-auto flex items-center justify-between gap-3 px-5 py-2.5 rounded-full border border-teal-100 bg-white/70 backdrop-blur-md shadow-sm">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-teal-700 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S7 10.5 7 7a5 5 0 0 1 5-5z"/>
              <circle cx="12" cy="7" r="2"/>
            </svg>
          </div>
          <span className="text-[17px] font-medium text-teal-800 tracking-tight">
            Pata<span className="text-teal-500">Daktari</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm px-4 py-1.5 rounded-full transition-all duration-150
                ${pathname === link.href
                  ? "bg-teal-50 text-teal-800 font-medium"
                  : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side — language toggle + CTA */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Language toggle */}
          <div className="flex items-center bg-teal-50 border border-teal-100 rounded-full p-0.5">
            <button
              onClick={() => setLang("en")}
              className={`text-xs px-3 py-1 rounded-full transition-all duration-150 ${
                lang === "en"
                  ? "bg-teal-700 text-white font-medium"
                  : "text-teal-600 hover:text-teal-800"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("sw")}
              className={`text-xs px-3 py-1 rounded-full transition-all duration-150 ${
                lang === "sw"
                  ? "bg-teal-700 text-white font-medium"
                  : "text-teal-600 hover:text-teal-800"
              }`}
            >
              SW
            </button>
          </div>

          {/* CTA */}
          <Link
            href="/chat"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 px-5 py-2 rounded-full transition-all duration-150 hover:-translate-y-px"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
           {t.navCTA}
          </Link>
        </div>

      </nav>
    </header>
  );
}