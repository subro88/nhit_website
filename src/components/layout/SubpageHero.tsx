import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubpageHeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
}

export default function SubpageHero({
  kicker,
  title,
  subtitle,
  breadcrumbs,
  badge,
}: SubpageHeroProps) {
  return (
    <div className="relative bg-[#151515] text-white py-14 sm:py-20 overflow-hidden border-b border-neutral-800">
      {/* Background Graphic Elements */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #FF3115 0%, transparent 40%), radial-gradient(circle at 80% 70%, #00d2ff 0%, transparent 40%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-2 text-xs text-neutral-400 mb-6 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#FF3115]" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-neutral-200 font-medium">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title & Kicker */}
        <div className="max-w-3xl">
          {kicker && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-bold text-[#FF6A4F] uppercase tracking-wider mb-4">
              <span>{kicker}</span>
              {badge && (
                <span className="px-1.5 py-0.2 bg-[#FF3115] text-white rounded text-[10px]">
                  {badge}
                </span>
              )}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-montserrat">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-roboto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
