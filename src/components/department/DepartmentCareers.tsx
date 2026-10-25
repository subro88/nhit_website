import React from 'react';
import Image from 'next/image';
import { DepartmentCareers } from '@/data/departmentsData';
import { Briefcase, Landmark, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';

interface Props {
  careers: DepartmentCareers;
  accentHex: string;
  placementRate: string;
}

export default function DepartmentCareersSection({ careers, accentHex, placementRate }: Props) {
  if (!careers) return null;

  const recruiterLogos = [
    { src: '/images/rec-tata.png', alt: 'Tata Motors' },
    { src: '/images/rec-lt.png', alt: 'Larsen & Toubro' },
    { src: '/images/rec-cummins.png', alt: 'Cummins India' },
    { src: '/images/rec-magna.png', alt: 'Magna' },
    { src: '/images/rec-kiswok.jpg', alt: 'Kiswok Industries' },
    { src: '/images/rec-force.png', alt: 'Force Motors' },
  ];

  return (
    <section className="space-y-8">
      {/* ── Section Header ── */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
          style={{
            backgroundColor: `${accentHex}15`,
            color: accentHex,
          }}
        >
          INDUSTRY HORIZONS & PLACEMENTS
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Career Options & Job Prospects
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Extensive career pathways spanning core industrial technical roles, government & PSU technical examinations, and higher technical education.
        </p>
      </div>

      {/* ── 3-Column Career Trajectories Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Core Roles */}
        <div 
          className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          style={{ borderTop: `4px solid ${accentHex}` }}
        >
          <div>
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
              style={{ backgroundColor: `${accentHex}20` }}
            >
              <Briefcase className="w-5 h-5" style={{ color: accentHex }} />
            </div>

            <h4 className="text-base font-extrabold text-slate-900 mb-2">
              {careers.roles.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {careers.roles.desc}
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-4">
              {careers.roles.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillar 2: PSUs & Government */}
        <div 
          className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          style={{ borderTop: '4px solid #0284C7' }}
        >
          <div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-sky-50">
              <Landmark className="w-5 h-5 text-sky-600" />
            </div>

            <h4 className="text-base font-extrabold text-slate-900 mb-2">
              {careers.psu.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {careers.psu.desc}
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-4">
              {careers.psu.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillar 3: Higher Studies / Lateral Entry */}
        <div 
          className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          style={{ borderTop: '4px solid #10B981' }}
        >
          <div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-emerald-50">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
            </div>

            <h4 className="text-base font-extrabold text-slate-900 mb-2">
              {careers.lateral.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {careers.lateral.desc}
            </p>

            <ul className="space-y-2 border-t border-slate-100 pt-4">
              {careers.lateral.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* ── Key Campus Recruiting Partners Strip ── */}
      <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
          <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#FF3115]" />
            Key Campus Recruiting Partners
          </h5>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-100/70">
            🎯 {placementRate} Career Placement & JELET Rate
          </span>
        </div>

        {/* Corporate Logos Marquee Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-center py-2">
          {recruiterLogos.map((logo, lIdx) => (
            <div 
              key={lIdx}
              className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-10">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Tags Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {careers.recruiters.map((rec, rIdx) => (
            <span
              key={rIdx}
              className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm hover:border-slate-300 transition-colors"
            >
              🏢 {rec}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
