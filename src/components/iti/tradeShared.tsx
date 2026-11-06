'use client';

/*
 * Shared animation + layout primitives for the ITI trade detail pages.
 * Everything is CSS/IntersectionObserver based — no external animation lib —
 * and every effect respects `prefers-reduced-motion`.
 */

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  MapPin,
  PhoneCall,
} from 'lucide-react';

/* ---------------------------------- color utils ---------------------------------- */

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Mix a hex color toward black (pct < 0) or white (pct > 0). */
function shade(hex: string, pct: number): string {
  const [r, g, b] = hexToRgb(hex);
  const t = pct < 0 ? 0 : 255;
  const p = Math.abs(pct) / 100;
  const mix = (c: number) => Math.round(c + (t - c) * p);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/** Hex → rgba string with the given alpha. */
function alpha(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** CSS custom properties consumed by Tailwind arbitrary values (`var(--acc)` …). */
export function accVars(accent: string, deep?: string): CSSProperties {
  return {
    '--acc': accent,
    '--acc-deep': deep ?? shade(accent, -22),
    '--acc-soft': alpha(accent, 0.1),
    '--acc-soft2': alpha(accent, 0.22),
  } as CSSProperties;
}

/* ---------------------------------- hooks ---------------------------------- */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/* ---------------------------------- Reveal ---------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // 'shown' by default so SSR / no-JS users always see the content; we only
  // arm the hidden state after hydration for elements still below the fold.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    if (rect.top >= window.innerHeight * 0.92) {
      setHidden(true);
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setHidden(false);
            io.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translate3d(0, ${y}px, 0)` : 'none',
        transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- CountUp ---------------------------------- */

export function CountUp({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1600,
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR shows the final value; we only reset to 0 (and animate) after
  // hydration when the element sits below the fold and motion is allowed.
  const [val, setVal] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    if (rect.top >= window.innerHeight * 0.92) {
      setVal(0);
      let raf = 0;
      const run = () => {
        const t0 = performance.now();
        const frame = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setVal(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
      };
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(raf);
      };
    }
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------------------------------- Collapse ---------------------------------- */

/** Smooth height animation using the CSS grid-rows trick — no measuring needed. */
export function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/* ---------------------------------- SectionHead ---------------------------------- */

export function SectionHead({
  icon: Icon,
  kicker,
  title,
  lead,
}: {
  icon: React.ComponentType<{ className?: string; style?: CSSProperties }>;
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="flex items-start gap-4 pb-5 mb-6 border-b border-gray-100">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-[color:var(--acc-soft)] flex items-center justify-center">
        <Icon className="w-5 h-5 text-[color:var(--acc)]" />
      </span>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--acc)]">
          {kicker}
        </span>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 font-montserrat leading-snug">
          {title}
        </h2>
        {lead && <p className="text-xs md:text-sm text-gray-500 mt-1.5 leading-relaxed">{lead}</p>}
      </div>
    </div>
  );
}

/* ---------------------------------- MetricStrip ---------------------------------- */

export interface TradeMetric {
  label: string;
  count?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  accent?: boolean;
  note?: string;
}

export function MetricStrip({ metrics }: { metrics: TradeMetric[] }) {
  return (
    <Reveal>
      <div className="relative z-10 max-w-5xl mx-auto px-5 -mt-10 sm:-mt-12">
        <div className="bg-[#151515] rounded-2xl shadow-2xl shadow-black/25 border border-white/10 overflow-hidden">
          <div className="h-[3px] bg-[linear-gradient(90deg,var(--acc),var(--acc-deep))]" />
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
            {metrics.map((m, i) => (
              <div key={i} className="px-4 py-5 text-center">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  {m.label}
                </span>
                <div
                  className={`text-2xl font-black font-montserrat mt-1 ${
                    m.accent ? 'text-[color:var(--acc)]' : 'text-white'
                  }`}
                >
                  {m.count !== undefined ? (
                    <CountUp
                      end={m.count}
                      decimals={m.decimals ?? 0}
                      prefix={m.prefix ?? ''}
                      suffix={m.suffix ?? ''}
                    />
                  ) : (
                    m.display
                  )}
                </div>
                {m.note && <span className="block text-[10px] text-neutral-500 mt-0.5">{m.note}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------- CareerPath ---------------------------------- */

export interface CareerStep {
  icon: React.ComponentType<{ className?: string; style?: CSSProperties }>;
  stage: string;
  period: string;
  note: string;
}

export function CareerPath({ steps }: { steps: CareerStep[] }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref}>
      {/* animated progress rail (desktop) */}
      <div className="hidden md:block relative h-1 rounded-full bg-gray-100 mb-6 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,var(--acc),var(--acc-deep))] transition-[width] duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ width: inView ? '100%' : '0%', transitionDelay: '200ms' }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="relative h-full bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-[color:var(--acc)] hover:shadow-lg transition-all duration-300">
              <span
                className="absolute -top-3 left-4 text-[10px] font-black px-2 py-0.5 rounded text-white bg-[linear-gradient(135deg,var(--acc),var(--acc-deep))]"
              >
                {s.period}
              </span>
              <s.icon className="w-6 h-6 text-[color:var(--acc)] mt-2" />
              <h4 className="font-bold text-gray-900 text-sm mt-2 font-montserrat">{s.stage}</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{s.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- PayBands ---------------------------------- */

export interface PayBand {
  label: string;
  display: string;
  pct: number;
}

export function PayBands({ bands, note }: { bands: PayBand[]; note: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="space-y-4">
      {bands.map((b, i) => (
        <div key={i}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span className="text-xs font-bold text-gray-700">{b.label}</span>
            <span className="text-xs font-black text-[color:var(--acc)] font-montserrat whitespace-nowrap">
              {b.display}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--acc),var(--acc-deep))] transition-[width] duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ width: inView ? `${b.pct}%` : '0%', transitionDelay: `${i * 150}ms` }}
            />
          </div>
        </div>
      ))}
      <p className="text-[10px] text-gray-400 pt-1">{note}</p>
    </div>
  );
}

/* ---------------------------------- checklist ---------------------------------- */

export function ToolGroupList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 font-montserrat pb-2 mb-3 border-b border-gray-200">
        {heading}
      </h4>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[color:var(--acc)]" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------- FAQ row ---------------------------------- */

export function FaqRow({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? 'border-[color:var(--acc-soft2)] bg-white' : 'border-gray-200'}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs md:text-sm transition-colors ${
          open ? 'text-[color:var(--acc)] bg-[color:var(--acc-soft)]' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
        }`}
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-[color:var(--acc)]' : ''}`}
        />
      </button>
      <Collapse open={open}>
        <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
          {a}
        </div>
      </Collapse>
    </div>
  );
}

/* ---------------------------------- Semester row ---------------------------------- */

export interface Semester {
  sem: number;
  title: string;
  subjects: string[];
}

export function SemesterRow({
  s,
  open,
  onToggle,
}: {
  s: Semester;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? 'border-[color:var(--acc-soft2)]' : 'border-gray-200'}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`w-full p-4 text-left flex items-center gap-3 font-bold text-sm transition-colors ${
          open ? 'bg-[#151515] text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
        }`}
      >
        <span
          className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-black font-montserrat ${
            open ? 'text-white bg-[linear-gradient(135deg,var(--acc),var(--acc-deep))]' : 'text-gray-500 bg-white border border-gray-200'
          }`}
        >
          S{s.sem}
        </span>
        <span className="flex-1 text-xs md:text-sm leading-snug">{s.title}</span>
        <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full bg-[color:var(--acc-soft)] text-[color:var(--acc)]">
          {s.subjects.length} modules
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <Collapse open={open}>
        <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-1 gap-2">
          {s.subjects.map((sub, i) => (
            <div
              key={i}
              className="p-2.5 bg-gray-50 rounded-lg text-xs text-gray-800 flex items-start gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--acc)] shrink-0 mt-1.5" />
              <span className="leading-relaxed">{sub}</span>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

/* ---------------------------------- CTA band ---------------------------------- */

export function CtaBand({
  trade,
  steps,
}: {
  trade: string;
  steps: string[];
}) {
  return (
    <section className="relative bg-[linear-gradient(120deg,#9E0B0F_0%,#C10A0C_45%,#ff3115_100%)] text-white overflow-hidden mt-16">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -left-10 -bottom-20 w-72 h-72 rounded-full bg-black/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 py-12 md:py-14">
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/15 border border-white/25 rounded-full px-3 py-1">
              NCVT Admissions Open · Limited Seats
            </span>
            <h2 className="text-2xl md:text-3xl font-black font-montserrat mt-4 leading-tight">
              Ready to Build Your Career as a {trade}?
            </h2>
            <p className="text-white/85 text-sm mt-3 leading-relaxed">
              Only 20 seats per trade — apply early to lock your place. New sessions begin as per the
              DGT academic calendar (August). Our admission cell will guide you through eligibility,
              counselling and document verification.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex items-start gap-2.5 bg-white/10 border border-white/20 rounded-xl p-3.5 backdrop-blur-sm">
                <span className="w-6 h-6 shrink-0 rounded-full bg-white text-[#9E0B0F] text-xs font-black flex items-center justify-center font-montserrat">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold leading-snug">{s}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#9E0B0F] rounded-xl text-xs font-black hover:bg-neutral-100 transition-colors shadow-lg"
            >
              Apply for Admission <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:03432542103"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/60 text-white rounded-xl text-xs font-black hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="w-4 h-4" /> Admission Helpline: (0343) 2542103
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- sidebar cards ---------------------------------- */

export function ApplyCard({
  trade,
  seats,
  eligibility,
}: {
  trade: string;
  seats: number;
  eligibility: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-[linear-gradient(120deg,#9E0B0F,#C10A0C_55%,#ff3115)] px-5 py-4">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/85">
          Admissions Open · Session 2026
        </span>
        <h3 className="text-base font-black text-white font-montserrat mt-1">
          Apply for {trade}
        </h3>
      </div>
      <div className="p-5 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--acc)] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[color:var(--acc)]" />
          </span>
          <span className="text-xs font-bold text-gray-800">
            Only <span className="text-[color:var(--acc)]">{seats} sanctioned seats</span> per unit
          </span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed">{eligibility}</p>
        <div className="space-y-2.5">
          <Link
            href="/admissions"
            className="w-full py-2.5 px-4 bg-[#ff3115] hover:bg-[#e0260c] text-white text-xs font-black rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            Direct Admission Application <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="tel:03432542103"
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#ff3115]" /> Call: (0343) 2542103
          </a>
        </div>
      </div>
    </div>
  );
}

export function BrochureCard({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 bg-[#151515] rounded-2xl p-5 border border-gray-800 hover:border-[color:var(--acc)] transition-colors"
    >
      <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[color:var(--acc)] transition-colors">
        <Download className="w-[18px] h-[18px] text-white" />
      </span>
      <span>
        <span className="block text-xs font-black text-white font-montserrat">
          NHIT Brochure (PDF)
        </span>
        <span className="block text-[10px] text-neutral-400 mt-0.5">
          Courses, fees guide & campus facilities
        </span>
      </span>
    </a>
  );
}

export function ContactCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3">
      <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 font-montserrat">
        Reach the Admission Cell
      </h4>
      <p className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
        <MapPin className="w-4 h-4 text-[color:var(--acc)] shrink-0 mt-0.5" />
        New Horizons Institute of Technology, Near Gandhi More, Durgapur — 713208, West Bengal
      </p>
      <p className="flex items-center gap-2.5 text-xs text-gray-600">
        <PhoneCall className="w-4 h-4 text-[color:var(--acc)] shrink-0" />
        <a href="tel:03432542103" className="font-bold hover:text-[color:var(--acc)] transition-colors">
          (0343) 2542103
        </a>
      </p>
    </div>
  );
}
