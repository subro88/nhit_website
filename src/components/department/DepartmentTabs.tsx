'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  UserCheck, 
  GraduationCap, 
  FlaskConical, 
  Layers, 
  Download, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  Award,
  PhoneCall,
  Mail
} from 'lucide-react';
import { DepartmentData } from '@/data/departmentsData';

interface Props {
  dept: DepartmentData;
}

export default function DepartmentTabs({ dept }: Props) {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'labs' | 'eligibility' | 'hod'>('curriculum');
  const [openSem, setOpenSem] = useState<string>('1');

  const accent = dept.accentHex || '#0EA5E9';

  const tabs = [
    { id: 'curriculum', label: 'WBSCTVESD 6-Sem Curriculum', icon: Layers },
    { id: 'labs', label: `Laboratories & Equipment (${dept.labs.length})`, icon: FlaskConical },
    { id: 'eligibility', label: 'Admission Eligibility (JEXPO / VOCLET)', icon: GraduationCap },
    { id: 'hod', label: 'HOD Desk & Leadership', icon: UserCheck },
  ] as const;

  return (
    <section className="space-y-6">
      {/* ── Tab Navigation Bar ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-2 flex flex-wrap gap-2 sticky top-20 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Icon 
                className="w-4 h-4 flex-shrink-0" 
                style={{ color: isActive ? accent : undefined }} 
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Tab Content Panels ── */}
      <div className="transition-opacity duration-200">
        
        {/* PANEL 1: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  WBSCTVESD Prescribed 6-Semester Curriculum
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Full modular semester breakdown prescribed by the West Bengal State Council of Technical and Vocational Education and Skill Development.
                </p>
              </div>

              {dept.syllabusPdf && (
                <a
                  href={dept.syllabusPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow hover:brightness-110 flex-shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  <Download className="w-4 h-4" />
                  Download Council PDF
                </a>
              )}
            </div>

            {/* 6-Semester Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {['1', '2', '3', '4', '5', '6'].map((semKey) => {
                const subjects = dept.sems[semKey] || [];
                return (
                  <div
                    key={semKey}
                    className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between"
                    style={{ borderTop: `3px solid ${accent}` }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h4 className="text-sm font-extrabold text-slate-900">
                          Semester {semKey}
                        </h4>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${accent}15`, color: accent }}
                        >
                          WBSCTVESD
                        </span>
                      </div>

                      <ul className="space-y-1.5">
                        {subjects.map((sub, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-mono text-slate-600">
                      Credits & Evaluation per AICTE Model
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PANEL 2: LABS & WORKSHOPS */}
        {activeTab === 'labs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <div className="pb-6 border-b border-slate-100">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Departmental Laboratories, Workshops & Tooling
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                State-of-the-art technical facilities equipped with industrial test benches, calibrated tooling, software simulators, and safety infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dept.labs.map((lab, lIdx) => (
                <div
                  key={lIdx}
                  className="group bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {lab.img && (
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                      <Image
                        src={lab.img}
                        alt={lab.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="p-5 space-y-2">
                    <span 
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${accent}15`, color: accent }}
                    >
                      LAB {String(lIdx + 1).padStart(2, '0')} // PRACTICAL RIG
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {lab.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lab.spec}
                    </p>
                  </div>

                  <div className="px-5 pb-5 pt-0">
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Complies with AICTE Laboratory Norms
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL 3: ADMISSION ELIGIBILITY */}
        {activeTab === 'eligibility' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <div className="pb-6 border-b border-slate-100">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Admission Eligibility & Counseling Framework
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Official criteria for 1st Year (JEXPO) and 2nd Year Lateral Entry (VOCLET) per WBSCTVESD and AICTE guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1st Year Entry */}
              <div 
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-4"
                style={{ borderTop: `4px solid ${accent}` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base font-extrabold text-slate-900">
                    1st Year Direct Admission (3-Year Program)
                  </h4>
                  <span className="text-xs font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded">
                    JEXPO
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Passed 10th Standard / Madhyamik examination or equivalent from a recognized State/Central Board.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Secured at least 35% aggregate marks with Mathematics, Physical Science, and English.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Valid rank in JEXPO examination conducted by WBSCTVESD, or direct institutional quota counseling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>No upper age limit as per AICTE and West Bengal State Council directives.</span>
                  </li>
                </ul>
              </div>

              {/* 2nd Year Lateral Entry */}
              <div 
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-4"
                style={{ borderTop: '4px solid #10B981' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base font-extrabold text-slate-900">
                    2nd Year Lateral Entry (2-Year Program)
                  </h4>
                  <span className="text-xs font-bold text-white bg-emerald-600 px-2.5 py-0.5 rounded">
                    VOCLET
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Passed 10+2 examination with Physics, Mathematics, Chemistry or Vocational/Technical subjects.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>OR passed 10th standard + 2-year ITI in relevant trade with National Trade Certificate (NTC).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Valid rank in VOCLET entrance examination conducted by WBSCTVESD.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Direct admission to 3rd Semester (2nd Year) completing the diploma in 2 years (4 Semesters).</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* PANEL 4: HOD DESK */}
        {activeTab === 'hod' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* HOD Photo & Credentials */}
              <div className="flex flex-col items-center text-center flex-shrink-0 mx-auto md:mx-0">
                <div 
                  className="relative w-44 h-44 rounded-full overflow-hidden border-4 shadow-lg mb-4"
                  style={{ borderColor: accent }}
                >
                  <Image
                    src={dept.hod.img}
                    alt={dept.hod.name}
                    fill
                    className="object-cover"
                    sizes="176px"
                  />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  {dept.hod.name}
                </h4>
                <div className="text-xs font-semibold text-slate-600">
                  {dept.hod.desig}
                </div>
                <div 
                  className="text-xs font-bold mt-1"
                  style={{ color: accent }}
                >
                  {dept.title}
                </div>
              </div>

              {/* HOD Message */}
              <div className="space-y-4">
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${accent}15`, color: accent }}
                >
                  LEADERSHIP DESK // DEPARTMENT VISION
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Message from the Department In-Charge
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 italic bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80">
                  <p>&ldquo;{dept.hod.message}&rdquo;</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-[#FF3115]" />
                    Office Desk: (0343) 2542103
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                    info@nhit.in
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
