'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';
import { DepartmentData } from '@/data/departmentsData';

interface Props {
  dept: DepartmentData;
}

export default function DepartmentHero({ dept }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance hero slides every 5.5 seconds for Ken Burns dynamic visual feel
  useEffect(() => {
    if (!dept.heroSlides || dept.heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dept.heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [dept.heroSlides]);

  const accent = dept.accentHex || '#0EA5E9';

  return (
    <section 
      className="relative overflow-hidden bg-slate-950 text-white min-h-[540px] md:min-h-[600px] lg:h-[72vh] lg:max-h-[740px] flex items-center"
      style={{ '--dept-accent': accent } as React.CSSProperties}
    >
      {/* ── Background Image Slideshow with Subtle Ken Burns Effect ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {dept.heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '1200ms',
            }}
          >
            <Image
              src={slide}
              alt={`${dept.title} Campus & Laboratories`}
              fill
              priority={idx === 0}
              className="object-cover object-center transform transition-transform duration-10000 ease-out"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ── Rich Dark Scrim & Blueprint Technical Grid Overlay ── */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.82) 55%, rgba(15,23,42,0.88) 100%)',
        }}
      />
      <div 
        className="absolute inset-0 z-[1] opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Ambient Radial Glow around Accent Color ── */}
      <div 
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: accent }}
      />
      <div 
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15"
        style={{ background: accent }}
      />

      {/* ── Hero Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Department Titles, Badges, Tagline & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Breadcrumb / Branch Code Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-sm">
              <span className="font-mono font-bold text-xs uppercase tracking-wider" style={{ color: accent }}>
                [{dept.code}]
              </span>
              <span className="text-slate-400 text-xs font-mono">//</span>
              <span className="text-slate-300 text-xs font-medium">
                Engineering Division
              </span>
              <span className="text-slate-400 text-xs font-mono">//</span>
              <span className="text-slate-400 text-xs">NHIT Durgapur</span>
            </div>

            {/* Department Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {dept.title}
              </h1>
              <div 
                className="h-1.5 w-28 rounded-full mt-3 transition-all duration-300"
                style={{ backgroundColor: accent }}
              />
            </div>

            {/* Tagline / Lede */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
              {dept.tagline}
            </p>

            {/* Regulatory Affiliation Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                AICTE Approved
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-sm">
                <Layers className="w-3.5 h-3.5" style={{ color: accent }} />
                WBSCTVESD Affiliated
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                ISO 9001:2015 Certified
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={dept.syllabusPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white transition-all shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: accent }}
              >
                <FileText className="w-4 h-4" />
                Download WBSCTVESD Syllabus PDF
              </a>

              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold bg-[#FF3115] hover:bg-[#e0260c] text-white transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                Admission Counseling 2026–27
              </Link>
            </div>

            {/* Quick Helpline Mention */}
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>Direct Branch Counseling Helpline:</span>
              <a href="tel:03432542103" className="font-bold text-white hover:underline">
                (0343) 2542103
              </a>
              <span className="text-slate-400">·</span>
              <a href="mailto:info@nhit.in" className="text-slate-300 hover:text-white hover:underline">
                info@nhit.in
              </a>
            </div>

          </div>

          {/* Right Column: Floating Circular Radar Telemetry Hub (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Concentric Animated Radar Rings */}
              <div 
                className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20 pointer-events-none"
                style={{ animationDuration: '4s' }}
              />
              <div className="absolute inset-6 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-dashed border-white/15 pointer-events-none" />
              <div className="absolute inset-28 rounded-full border border-white/15 pointer-events-none" />

              {/* Central Floating Circular Hub */}
              <div 
                className="relative z-10 w-32 h-32 rounded-full flex flex-col items-center justify-center text-center shadow-2xl border-2 backdrop-blur-xl transition-transform hover:scale-105 duration-300"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.90)',
                  borderColor: accent,
                  boxShadow: `0 0 35px -5px ${accent}40`,
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white"
                  style={{ backgroundColor: `${accent}25` }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: accent }} />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  KEY SPECS
                </span>
                <span className="text-[10px] font-mono text-slate-300 uppercase">
                  NHIT METRICS
                </span>
              </div>

              {/* 5 Radiating HUD Callout Bubbles around the Center */}
              {/* Callout 1: Approved Intake (Top Center) */}
              <div className="absolute -top-1 sm:top-1 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center transform transition-transform hover:-translate-y-1">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[0]?.label || 'Approved Intake'}
                  </div>
                  <div className="text-sm font-extrabold text-white" style={{ color: accent }}>
                    {dept.hudSpecs[0]?.val || dept.intake}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[0]?.sub || 'Annual Sanction'}
                  </div>
                </div>
              </div>

              {/* Callout 2: Program Duration (Top Right) */}
              <div className="absolute top-16 right-0 sm:-right-2 z-20">
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center transform transition-transform hover:-translate-y-1">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[1]?.label || 'Duration'}
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {dept.hudSpecs[1]?.val || '3 Years'}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[1]?.sub || '6 Semesters'}
                  </div>
                </div>
              </div>

              {/* Callout 3: Hands-on Practical (Bottom Right) */}
              <div className="absolute bottom-12 right-0 sm:-right-2 z-20">
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center transform transition-transform hover:-translate-y-1">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[2]?.label || 'Practical Focus'}
                  </div>
                  <div className="text-sm font-extrabold text-sky-400">
                    {dept.hudSpecs[2]?.val || '60% Lab'}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[2]?.sub || 'Systems Practice'}
                  </div>
                </div>
              </div>

              {/* Callout 4: Placement Rate (Bottom Left) */}
              <div className="absolute bottom-12 left-0 sm:-left-2 z-20">
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center transform transition-transform hover:-translate-y-1">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[3]?.label || 'Placement'}
                  </div>
                  <div className="text-sm font-extrabold text-emerald-400">
                    {dept.hudSpecs[3]?.val || dept.stats.placementRate}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[3]?.sub || 'Career Conversion'}
                  </div>
                </div>
              </div>

              {/* Callout 5: Highest CTC (Top Left) */}
              <div className="absolute top-16 left-0 sm:-left-2 z-20">
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center transform transition-transform hover:-translate-y-1">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[4]?.label || 'Highest Package'}
                  </div>
                  <div className="text-sm font-extrabold text-orange-400">
                    {dept.hudSpecs[4]?.val || dept.stats.highestCtc}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[4]?.sub || 'Industry CTC'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Slide Indicator Dots ── */}
      {dept.heroSlides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {dept.heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to hero slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
