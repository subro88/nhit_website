'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import DepartmentBlueprintCanvas from './DepartmentBlueprintCanvas';

interface Props {
  dept: DepartmentData;
}

export default function DepartmentHero({ dept }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRadarHovered, setIsRadarHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [decodedTexts, setDecodedTexts] = useState<string[]>(
    dept.hudSpecs.map((s) => s.val)
  );

  const radarRef = useRef<HTMLDivElement | null>(null);
  const accent = dept.accentHex || '#0EA5E9';
  const glyphs = '0123456789ABCDEF!@#$%&*<>{}[]~/+-=';

  // Auto-advance hero slides every 5.5s for Ken Burns dynamic visual feel
  useEffect(() => {
    if (!dept.heroSlides || dept.heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dept.heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [dept.heroSlides]);

  // ── Cascading Cybernetic Decrypt Animation on Radar Hover ──
  const triggerCyberDecode = () => {
    dept.hudSpecs.forEach((spec, specIdx) => {
      const original = spec.val;
      const len = original.length;
      let step = 0;
      const maxSteps = len + 10;

      const interval = setInterval(() => {
        step++;
        let output = '';
        for (let i = 0; i < len; i++) {
          if (i < step - 4) {
            output += original[i];
          } else if (original[i] === ' ') {
            output += ' ';
          } else {
            output += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }

        setDecodedTexts((prev) => {
          const next = [...prev];
          next[specIdx] = output;
          return next;
        });

        if (step >= maxSteps) {
          clearInterval(interval);
          setDecodedTexts((prev) => {
            const next = [...prev];
            next[specIdx] = original;
            return next;
          });
        }
      }, 32);
    });
  };

  // ── 3D Perspective Tilt on Mouse Movement ──
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!radarRef.current) return;
    const rect = radarRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * -12,
      y: x * 12,
    });
  };

  const handleMouseEnter = () => {
    setIsRadarHovered(true);
    triggerCyberDecode();
  };

  const handleMouseLeave = () => {
    setIsRadarHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      className="relative overflow-hidden bg-slate-950 text-white min-h-[560px] md:min-h-[620px] lg:h-[74vh] lg:max-h-[760px] flex items-center"
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

      {/* ── Rich Dark Scrim Gradient ── */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.82) 55%, rgba(15,23,42,0.88) 100%)',
        }}
      />

      {/* ── Interactive High-DPI Engineering Blueprint Canvas ── */}
      <DepartmentBlueprintCanvas deptCode={dept.code} accentHex={accent} />

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
            <div 
              ref={radarRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center cursor-pointer select-none group"
            >
              
              {/* Concentric Animated Radar Rings */}
              <div 
                className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20 pointer-events-none"
                style={{ animationDuration: '4s' }}
              />
              <div className="absolute inset-6 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-dashed border-white/15 pointer-events-none" />
              <div className="absolute inset-28 rounded-full border border-white/15 pointer-events-none" />

              {/* ── Dynamic SVG Laser Lines connecting Central Hub to 5 Bubbles ── */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-[5]" 
                viewBox="0 0 420 420"
                aria-hidden="true"
              >
                {/* Raycast Laser Beams (Center: 210, 210) */}
                {/* Path 1: Top Center (210, 35) */}
                <path
                  d="M 210 145 L 210 50"
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className={isRadarHovered ? 'animate-pulse opacity-90' : 'opacity-40'}
                />
                <circle cx="210" cy="50" r="3" fill={accent} />

                {/* Path 2: Top Right (345, 115) */}
                <path
                  d="M 260 170 Q 300 140 335 125"
                  fill="none"
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className={isRadarHovered ? 'animate-pulse opacity-90' : 'opacity-40'}
                />
                <circle cx="335" cy="125" r="3" fill={accent} />

                {/* Path 3: Bottom Right (345, 305) */}
                <path
                  d="M 260 250 Q 300 280 335 295"
                  fill="none"
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className={isRadarHovered ? 'animate-pulse opacity-90' : 'opacity-40'}
                />
                <circle cx="335" cy="295" r="3" fill={accent} />

                {/* Path 4: Bottom Left (75, 305) */}
                <path
                  d="M 160 250 Q 120 280 85 295"
                  fill="none"
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className={isRadarHovered ? 'animate-pulse opacity-90' : 'opacity-40'}
                />
                <circle cx="85" cy="295" r="3" fill={accent} />

                {/* Path 5: Top Left (75, 115) */}
                <path
                  d="M 160 170 Q 120 140 85 125"
                  fill="none"
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className={isRadarHovered ? 'animate-pulse opacity-90' : 'opacity-40'}
                />
                <circle cx="85" cy="125" r="3" fill={accent} />
              </svg>

              {/* Central Floating Circular Hub */}
              <div 
                className="relative z-10 w-32 h-32 rounded-full flex flex-col items-center justify-center text-center shadow-2xl border-2 backdrop-blur-xl transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  borderColor: accent,
                  boxShadow: isRadarHovered 
                    ? `0 0 45px -2px ${accent}60` 
                    : `0 0 25px -5px ${accent}30`,
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white transition-transform group-hover:rotate-12 duration-300"
                  style={{ backgroundColor: `${accent}25` }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: accent }} />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  KEY SPECS
                </span>
                <span className="text-[10px] font-mono text-slate-300 uppercase">
                  {isRadarHovered ? 'DECODING...' : 'HOVER INFO'}
                </span>
              </div>

              {/* 5 Radiating HUD Callout Bubbles with Spring 3D Tilt & Cyber Decrypt */}
              
              {/* Callout 1: Approved Intake (Top Center) */}
              <div 
                className="absolute -top-1 sm:top-1 left-1/2 -translate-x-1/2 z-20 transition-transform duration-200 ease-out"
                style={{
                  transform: `translate(-50%, 0) perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center hover:border-sky-400/60 transition-colors">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[0]?.label || 'Approved Intake'}
                  </div>
                  <div 
                    className="text-sm font-extrabold transition-all"
                    style={{ 
                      color: accent,
                      textShadow: isRadarHovered ? `0 0 8px ${accent}` : 'none',
                    }}
                  >
                    {decodedTexts[0] || dept.hudSpecs[0]?.val}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[0]?.sub || 'Annual Sanction'}
                  </div>
                </div>
              </div>

              {/* Callout 2: Program Duration (Top Right) */}
              <div 
                className="absolute top-16 right-0 sm:-right-2 z-20 transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center hover:border-sky-400/60 transition-colors">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[1]?.label || 'Duration'}
                  </div>
                  <div 
                    className="text-sm font-extrabold text-white transition-all"
                    style={{
                      textShadow: isRadarHovered ? '0 0 8px rgba(255,255,255,0.8)' : 'none',
                    }}
                  >
                    {decodedTexts[1] || dept.hudSpecs[1]?.val}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[1]?.sub || '6 Semesters'}
                  </div>
                </div>
              </div>

              {/* Callout 3: Hands-on Practical (Bottom Right) */}
              <div 
                className="absolute bottom-12 right-0 sm:-right-2 z-20 transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center hover:border-sky-400/60 transition-colors">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[2]?.label || 'Practical Focus'}
                  </div>
                  <div 
                    className="text-sm font-extrabold text-sky-400 transition-all"
                    style={{
                      textShadow: isRadarHovered ? '0 0 8px #38BDF8' : 'none',
                    }}
                  >
                    {decodedTexts[2] || dept.hudSpecs[2]?.val}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[2]?.sub || 'Systems Practice'}
                  </div>
                </div>
              </div>

              {/* Callout 4: Placement Rate (Bottom Left) */}
              <div 
                className="absolute bottom-12 left-0 sm:-left-2 z-20 transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center hover:border-emerald-400/60 transition-colors">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[3]?.label || 'Placement'}
                  </div>
                  <div 
                    className="text-sm font-extrabold text-emerald-400 transition-all"
                    style={{
                      textShadow: isRadarHovered ? '0 0 8px #34D399' : 'none',
                    }}
                  >
                    {decodedTexts[3] || dept.hudSpecs[3]?.val}
                  </div>
                  <div className="text-[9px] text-slate-400">
                    {dept.hudSpecs[3]?.sub || 'Career Conversion'}
                  </div>
                </div>
              </div>

              {/* Callout 5: Highest CTC (Top Left) */}
              <div 
                className="absolute top-16 left-0 sm:-left-2 z-20 transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg text-center hover:border-orange-400/60 transition-colors">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {dept.hudSpecs[4]?.label || 'Highest Package'}
                  </div>
                  <div 
                    className="text-sm font-extrabold text-orange-400 transition-all"
                    style={{
                      textShadow: isRadarHovered ? '0 0 8px #FB923C' : 'none',
                    }}
                  >
                    {decodedTexts[4] || dept.hudSpecs[4]?.val}
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
