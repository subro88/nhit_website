'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Award,
  Layers,
  Cpu
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
  const [orbitAngle, setOrbitAngle] = useState(0);

  const targetOrbitAngle = useRef(0);
  const currentOrbitAngle = useRef(0);
  const radarRef = useRef<HTMLDivElement | null>(null);

  const accent = dept.accentHex || '#0EA5E9';
  const glyphs = '0123456789ABCDEF!@#$%&*<>{}[]~/+-=';

  // The 5 authentic Key Specs callouts evenly spaced across 360 deg (72 deg intervals)
  const callouts = [
    {
      icon: '🎓',
      title: dept.duration.split('·')[0].trim() || '3-Year Diploma',
      subtitle: '6 Semesters Full-Time',
    },
    {
      icon: '🏛️',
      title: 'AICTE Approved',
      subtitle: 'Govt. of India, New Delhi',
    },
    {
      icon: '⚡',
      title: 'WBSCTVESD Affiliated',
      subtitle: 'State Council Registered',
    },
    {
      icon: '👥',
      title: `${dept.intake} Intake`,
      subtitle: 'JEXPO / Direct Counseling',
    },
    {
      icon: '💼',
      title: `${dept.stats.placementRate} Placement`,
      subtitle: 'Top Industries & Lateral Entry',
    },
  ];

  const [decodedTitles, setDecodedTitles] = useState<string[]>(
    callouts.map((c) => c.title)
  );

  // Auto-advance hero slides every 5.5s
  useEffect(() => {
    if (!dept.heroSlides || dept.heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dept.heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [dept.heroSlides]);

  // ── Orbit Mode: Wheel Scroll with Page Lock & Inertia ──
  useEffect(() => {
    const el = radarRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isRadarHovered) return;
      // Lock page scroll while mouse is over Key Specs so wheel scroll rotates the HUD in circular motion
      e.preventDefault();
      targetOrbitAngle.current += e.deltaY * 0.0028;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isRadarHovered]);

  // Inertia animation loop for smooth circular orbit
  useEffect(() => {
    let rafId: number;

    const animateOrbit = () => {
      const diff = targetOrbitAngle.current - currentOrbitAngle.current;
      if (Math.abs(diff) > 0.0001) {
        currentOrbitAngle.current += diff * 0.12;
        setOrbitAngle(currentOrbitAngle.current);
      }
      rafId = requestAnimationFrame(animateOrbit);
    };

    rafId = requestAnimationFrame(animateOrbit);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Sci-Fi Matrix Typewriter Text Decoder ──
  const triggerCyberDecode = () => {
    callouts.forEach((callout, idx) => {
      const original = callout.title;
      const len = original.length;
      let step = 0;
      const maxSteps = len + 8;

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

        setDecodedTitles((prev) => {
          const next = [...prev];
          next[idx] = output;
          return next;
        });

        if (step >= maxSteps) {
          clearInterval(interval);
          setDecodedTitles((prev) => {
            const next = [...prev];
            next[idx] = original;
            return next;
          });
        }
      }, 28);
    });
  };

  // ── 3D Perspective Tilt on Mouse Movement ──
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!radarRef.current) return;
    const rect = radarRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * -10,
      y: x * 10,
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

  // ── Exact Polar Trigonometry for Even Distribution & Connecting Dotted Lines ──
  // Canvas coordinate system: 480 x 480
  const Cx = 240;
  const Cy = 240;
  const rHub = 65; // Hub diameter 130px
  const ROrbit = 175; // Orbit radius
  const N = callouts.length;
  const deltaAngle = (Math.PI * 2) / N; // 72 deg evenly spaced

  const nodes = callouts.map((c, i) => {
    // Base angle starting from top (-90 deg), shifted by dynamic orbitAngle
    const angle = -Math.PI / 2 + i * deltaAngle + orbitAngle;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    // Card Center
    const cardX = Cx + ROrbit * cosA;
    const cardY = Cy + ROrbit * sinA;

    // Dotted Line Start (on Hub border)
    const startX = Cx + rHub * cosA;
    const startY = Cy + rHub * sinA;

    // Dotted Line End (connecting directly to the card node)
    const endX = Cx + (ROrbit - 24) * cosA;
    const endY = Cy + (ROrbit - 24) * sinA;

    // Subtle technical curved dogleg
    const midX = startX + (endX - startX) * 0.5 - sinA * 10;
    const midY = startY + (endY - startY) * 0.5 + cosA * 10;
    const pathD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;

    return {
      cardX,
      cardY,
      startX,
      startY,
      endX,
      endY,
      pathD,
      item: c,
      idx: i,
    };
  });

  return (
    <section 
      className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] md:min-h-[640px] lg:h-[76vh] lg:max-h-[780px] flex items-center"
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
          background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.70) 55%, rgba(15,23,42,0.82) 100%)',
        }}
      />

      {/* ── High-DPI Engineering Blueprint Progressive Line Drawing & Dissolving Schematics ── */}
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
                Admission Brochure
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

          {/* Right Column: Floating Circular Radar Telemetry Hub with Wheel Orbit (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div 
              ref={radarRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[480px] aspect-square flex items-center justify-center cursor-pointer select-none"
              style={{ perspective: '1000px' }}
            >
              
              {/* Dynamic SVG Connecting Dotted Lines with Dash Animation & Glowing Terminal Dots */}
              <svg 
                viewBox="0 0 480 480"
                className={`absolute inset-0 w-full h-full pointer-events-none z-[4] overflow-visible transition-opacity duration-300 ${
                  isRadarHovered ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              >
                {nodes.map((n) => (
                  <g key={n.idx}>
                    {/* Dotted Connecting Line */}
                    <path
                      d={n.pathD}
                      className="dept-laser-line"
                      stroke={accent}
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      fill="none"
                      style={{
                        animation: 'dept-laser-dash 1.2s linear infinite',
                      }}
                    />
                    {/* Hub Perimeter Anchor Node */}
                    <circle
                      cx={n.startX}
                      cy={n.startY}
                      r="2.5"
                      fill={accent}
                    />
                    {/* Glowing HUD Card Terminal Dot */}
                    <circle
                      cx={n.endX}
                      cy={n.endY}
                      r="4"
                      className="dept-laser-dot"
                    />
                  </g>
                ))}
              </svg>

              {/* Concentric Encircling Radar Rings */}
              <div className="absolute w-[320px] h-[320px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[2]">
                {/* Ring 1: Dashed rotating circle */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px] rounded-full border border-dashed border-white/45"
                  style={{ animation: 'dept-ring-spin 30s linear infinite' }}
                />
                {/* Ring 2: Solid outer circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-white/25" />
                {/* Ring 3: Concentric outer boundary */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/15" />
                {/* Radar pulse wave */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{
                    borderColor: accent,
                    animation: 'dept-radar-pulse 2.8s cubic-bezier(0.1, 0.8, 0.3, 1) infinite',
                  }}
                />
              </div>

              {/* Central Floating Circular Button (130px) */}
              <div 
                className="relative z-10 w-[130px] h-[130px] rounded-full flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                  border: isRadarHovered ? '2px solid #ffffff' : '2px solid rgba(255, 255, 255, 0.75)',
                  boxShadow: isRadarHovered 
                    ? `0 0 45px ${accent}B0, 0 15px 35px rgba(0, 0, 0, 0.6)` 
                    : `0 0 25px ${accent}50, inset 0 0 20px rgba(255, 255, 255, 0.1), 0 10px 30px rgba(0, 0, 0, 0.5)`,
                  transform: isRadarHovered ? 'scale(1.08) translateY(-4px)' : 'none',
                  animation: !isRadarHovered ? 'dept-radar-float 4s ease-in-out infinite' : 'none',
                }}
              >
                <div className="text-2xl leading-none mb-1 filter drop-shadow">
                  ⚙️
                </div>
                <div className="font-extrabold text-[11px] tracking-wider text-white uppercase">
                  KEY SPECS
                </div>
                <div 
                  className="text-[9px] font-bold uppercase tracking-wide transition-colors"
                  style={{ color: isRadarHovered ? '#00F0FF' : accent }}
                >
                  {isRadarHovered ? 'SCROLL ORBIT' : 'HOVER INFO'}
                </div>
              </div>

              {/* Radiating Callout Badges — Evenly Spread at 72 deg, Rotating Smoothly on Wheel Scroll */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-[6]">
                {nodes.map((n) => (
                  <div
                    key={n.idx}
                    className="absolute transition-all ease-out"
                    style={{
                      left: `${(n.cardX / 480) * 100}%`,
                      top: `${(n.cardY / 480) * 100}%`,
                      transform: `translate(-50%, -50%) perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                        isRadarHovered ? 1 : 0.65
                      })`,
                      opacity: isRadarHovered ? 1 : 0,
                      pointerEvents: isRadarHovered ? 'auto' : 'none',
                      transitionDuration: isRadarHovered ? '300ms' : '200ms',
                    }}
                  >
                    {/* Liquid Glass Frosted Bubble with HUD Corner Brackets */}
                    <div 
                      className="relative px-3.5 py-2 rounded-[9px] shadow-2xl flex items-center gap-2.5 text-white transition-all group/bubble"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.32)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px) saturate(190%) contrast(105%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(190%) contrast(105%)',
                        boxShadow: '0 10px 32px 0 rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.65)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {/* Top-Left Corner Bracket */}
                      <span 
                        className="absolute -top-[2px] -left-[2px] w-[7px] h-[7px] border-t-2 border-l-2 pointer-events-none"
                        style={{ borderColor: accent }}
                      />
                      {/* Bottom-Right Corner Bracket */}
                      <span 
                        className="absolute -bottom-[2px] -right-[2px] w-[7px] h-[7px] border-b-2 border-r-2 pointer-events-none"
                        style={{ borderColor: accent }}
                      />

                      <span className="text-base select-none leading-none">
                        {n.item.icon}
                      </span>
                      <div className="text-left">
                        <strong className="block text-xs font-extrabold text-white tracking-wide font-sans leading-tight">
                          {decodedTitles[n.idx]}
                        </strong>
                        <div className="text-[10px] font-semibold text-slate-300 leading-tight mt-0.5">
                          {n.item.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
