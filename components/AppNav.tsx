"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { t } from "@/lib/i18n";
import { Heart, Home, MapPin, BookOpen, Phone } from "lucide-react";

const links = [
  { href: "/", icon: Home, labelEn: "Home", labelSw: "Nyumbani" },
  { href: "/maps", icon: MapPin, labelEn: "Map", labelSw: "Ramani" },
  { href: "/firstaid", icon: BookOpen, labelEn: "First Aid", labelSw: "Msaada" },
  { href: "/emergency", icon: Phone, labelEn: "999", labelSw: "999" },
] as const;

export function AppNav() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const translations = t[language];

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/80 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow">
              <Heart size={18} className="text-white" />
            </div>
            <span className="font-bold text-emerald-800 hidden sm:inline">
              {translations.appName}
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {links.map(({ href, icon: Icon, labelEn, labelSw }) => {
              const active = pathname === href;
              const isEmergency = href === "/emergency";
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isEmergency
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : active
                      ? "bg-emerald-100 text-emerald-800"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden xs:inline sm:inline">
                    {language === "en" ? labelEn : labelSw}
                  </span>
                </Link>
              );
            })}
          </nav>

          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
      </div>
    </header>
  );
}
