import type { ReactNode } from "react";

interface PageHeroProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHero({ badge, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="text-center py-10 sm:py-14 animate-fade-up">
      {badge && (
        <div className="inline-flex items-center gap-2 badge-pill mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          {badge}
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-teal-900 tracking-tight mb-4 leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base text-teal-700/80 leading-relaxed max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
