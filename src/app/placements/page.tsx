import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Briefcase, 
  Award, 
  Building2, 
  TrendingUp, 
  Download, 
  Mail, 
  PhoneCall, 
  CheckCircle2, 
  Users, 
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';
import PlacementRadar from '@/components/home/PlacementRadar';
import { readJson, HOMEPAGE_FILE } from '@/lib/cmsStore';
import type { HomepageData } from '@/lib/homeTypes';

export const metadata = {
  title: 'Training & Placements | Recruiter Wall & Placement Metrics — NHIT Durgapur',
  description: 'Official Training & Placement (T&P) portal of NHIT Durgapur. 80–85% placement rate, 14+ alumni batches, marquee core & IT recruiters (Tata Motors, L&T, Cummins), and brochure download.',
};

export default function PlacementsPage() {
  const metrics = [
    { value: '80–85%', label: 'Placed or Lateral B.Tech', sub: 'Interested & eligible final-year candidates' },
    { value: '14+', label: 'Batches Graduated', sub: 'Continuous track record since est. 2007' },
    { value: '15–20%', label: 'Higher Studies Progression', sub: 'Admitted to elite B.Tech lateral engineering' },
    { value: '50+', label: 'Corporate Hiring Partners', sub: 'Tier-1 manufacturing, energy & IT companies' },
  ];

  const recruiterLogos = [
    { src: '/images/rec-tata.png', alt: 'Tata Motors' },
    { src: '/images/rec-lt.png', alt: 'Larsen & Toubro' },
    { src: '/images/rec-cummins.png', alt: 'Cummins India' },
    { src: '/images/rec-magna.png', alt: 'Magna Automotive' },
    { src: '/images/rec-force.png', alt: 'Force Motors' },
    { src: '/images/rec-kiswok.jpg', alt: 'Kiswok Industries' },
    { src: '/images/rec-mate.jpg', alt: 'MATE' },
    { src: '/images/rec-wmark.jpg', alt: 'Campus Recruiter Partner' },
    { src: '/images/rec-hex.png', alt: 'Piaggio Vehicles' },
  ];

  const marqueeBrands = [
    { name: 'JOHN DEERE', cat: 'Agri-Machinery' },
    { name: 'JBM GROUP', cat: 'Auto Systems' },
    { name: 'TIL INDIA', cat: 'Heavy Equipment' },
    { name: 'ANAND GROUP', cat: 'Automotive Components' },
    { name: 'SHARDA MOTORS', cat: 'Automotive Exhaust' },
    { name: 'HCL TECH', cat: 'Technology Partner' },
    { name: 'SCHNEIDER ELECTRIC', cat: 'Power & Switchgear' },
    { name: 'TATA POWER', cat: 'Renewable & Distribution' },
  ];

  const trainingModules = [
    {
      title: 'Aptitude & Quantitative Problem Solving',
      desc: 'Rigorous weekly problem sets covering numerical ability, data interpretation, and abstract reasoning for corporate entry tests.',
    },
    {
      title: 'Technical Core Viva & Domain Drills',
      desc: 'Faculty-mentored mock viva sessions covering machines, circuit diagrams, AutoCAD blueprints, and software system architectures.',
    },
    {
      title: 'Corporate Soft Skills & Group Discussions',
      desc: 'Spoken English labs, corporate email etiquette, personality development workshops, and mock GD rounds.',
    },
    {
      title: 'Industrial Safety & Shop Floor Discipline',
      desc: 'Certification in industrial safety, PPE guidelines, 5S workplace principles, and preventive plant maintenance.',
    },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="Industry-Ready Polytechnic Engineers · 14+ Graduating Batches"
        title="Training & Placements"
        subtitle="Bridging classroom rigor with core shop-floor craftsmanship. NHIT graduates are trusted by India's leading automotive, steel, power, and software engineering giants."
        breadcrumbs={[
          { label: 'Placements' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-16">
        
        {/* ── Key Placement Metrics ─────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center flex flex-col justify-between">
              <div>
                <div className="text-3xl md:text-4xl font-black text-[#ff3115] font-heading">{m.value}</div>
                <div className="text-sm font-bold text-gray-900 mt-2">{m.label}</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{m.sub}</div>
            </div>
          ))}
        </section>

        {/* ── Placement Radar & Sector Breakdown ────────────────────── */}
        <section>
          <PlacementRadar data={readJson<HomepageData>(HOMEPAGE_FILE, {} as HomepageData).placementRadar} />
        </section>

        {/* ── Recruiter Wall & Corporate Partners ─────────────────────── */}
        <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Corporate Recruiters</span>
            <h2 className="text-3xl font-black font-heading text-gray-900 mt-1">
              Where Our Diploma Engineers Work
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Our graduates are employed across heavy engineering, automotive manufacturing, power utilities, and infrastructure projects nationwide.
            </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
            {recruiterLogos.map((logo, lIdx) => (
              <div 
                key={lIdx} 
                className="h-24 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-3 hover:border-gray-400 transition-colors"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
              </div>
            ))}
            {marqueeBrands.map((brand, bIdx) => (
              <div 
                key={`b-${bIdx}`} 
                className="h-24 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center p-3 text-center hover:border-gray-400 transition-colors"
              >
                <span className="font-black text-xs sm:text-sm text-gray-800 tracking-tight">{brand.name}</span>
                <span className="text-[10px] text-gray-500 font-medium uppercase mt-0.5">{brand.cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pre-Placement Training Modules ───────────────────────── */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Holistic Employability</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 mt-1 mb-2">
              Training &amp; Placement Cell Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Starting from the 3rd semester, every student undergoes continuous employability training designed by industrial advisors:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingModules.map((tm, tIdx) => (
              <div key={tIdx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#ff3115] font-black text-sm flex items-center justify-center mb-4">
                    0{tIdx + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{tm.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{tm.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mandatory Semester Module
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recruiter Brochure CTA Band ─────────────────────────── */}
        <section className="bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 text-white rounded-2xl p-8 md:p-12 border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-[#ff3115] border border-[#ff3115]/30">
              For Corporate HR &amp; Campus Hiring Teams
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              Recruiter Placement Brochure — Verified Distribution
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              The annual campus placement booklet containing graduating batch demographics, discipline-wise candidate counts, and laboratory profiles is shared directly with verified recruitment partners.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:info@nhit.in?subject=Recruiter%20Brochure%20Request%20—%20NHIT"
              className="px-6 py-3.5 bg-[#ff3115] hover:bg-[#e0260c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Request Brochure &rarr;
            </a>
            <a
              href="tel:03432542103"
              className="px-6 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> (0343) 254-2103
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
