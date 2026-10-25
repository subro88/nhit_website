'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  UserCheck, 
  GraduationCap, 
  FlaskConical, 
  Users, 
  Briefcase, 
  Download, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  Building,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

interface Props {
  dept: any;
  faculty: any[];
}

export default function DepartmentTabs({ dept, faculty }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'hod' | 'curriculum' | 'labs' | 'faculty' | 'placements'>('overview');
  const [openSem, setOpenSem] = useState<string>('1');

  const accent = dept.accentHex || '#FF3115';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'hod', label: 'HOD Desk', icon: UserCheck },
    { id: 'curriculum', label: 'Curriculum (Sem 1–6)', icon: Layers },
    { id: 'labs', label: 'Labs & Workshops', icon: FlaskConical },
    { id: 'faculty', label: 'Faculty Roster', icon: Users },
    { id: 'placements', label: 'Career & Placements', icon: Briefcase },
  ] as const;

  // Department-specific lab images fallback
  const getLabImage = (index: number) => {
    const labImages = [
      '/images/labs/lab-electrical-machines.jpg',
      '/images/labs/lab-electronics-circuit.jpg',
      '/images/labs/lab-lathe-shop.jpg',
      '/images/labs/lab-milling.jpg',
      '/images/labs/lab-auto-engine.jpg',
      '/images/labs/lab-civil-survey.jpg',
      '/images/labs/lab-welding-shop.jpg',
      '/images/labs/lab-utm-testing.jpg',
    ];
    return labImages[index % labImages.length];
  };

  return (
    <div className="space-y-8">
      {/* ── Tab Navigation Bar ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 flex flex-wrap gap-1 sticky top-20 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" style={{ color: isActive ? accent : undefined }} />
              {tab.label}
              {tab.id === 'faculty' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {faculty.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content Panels ───────────────────────────────────────── */}
      <div className="transition-opacity duration-300">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Academic Program Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">
                The {dept.title} program at NHIT is structured around state-of-the-art technical pedagogy endorsed by the West Bengal State Council of Technical and Vocational Education and Skill Development (WBSCTVESD) and approved by AICTE. We blend theoretical rigor with over 60% practical laboratory engagement.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Educational Objectives
                  </h3>
                  <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
                    <li>Practical mastery over modern industry-standard software, tools, and heavy machinery.</li>
                    <li>Strong theoretical foundation preparing students for high-scoring JLET B.Tech lateral entry.</li>
                    <li>Hands-on capstone engineering projects solved under faculty and industrial mentorship.</li>
                    <li>Professional ethics, collaborative teamwork, and structured technical documentation.</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600" /> Sanction &amp; Accreditation
                  </h3>
                  <ul className="text-xs text-gray-600 space-y-2">
                    <li><strong className="text-gray-800">Approved Intake:</strong> {dept.intake}</li>
                    <li><strong className="text-gray-800">Program Duration:</strong> 3 Years (6 Semesters) Full Time</li>
                    <li><strong className="text-gray-800">Affiliation:</strong> WBSCT&amp;VE&amp;SD, Govt. of West Bengal</li>
                    <li><strong className="text-gray-800">AICTE Approval:</strong> Permanent Institute ID: 1-475249561</li>
                  </ul>
                </div>
              </div>

              {/* Admission Eligibility Box */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#ff3115]" />
                  Eligibility Criteria &amp; Admission Pathways
                </h3>
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                  {dept.eligibility}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOD DESK */}
        {activeTab === 'hod' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-md shrink-0"
                style={{ backgroundColor: accent }}
              >
                {dept.hod?.name?.charAt(0) || 'H'}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Head of Department</span>
                <h2 className="text-2xl font-bold font-heading text-gray-900">{dept.hod?.name}</h2>
                <p className="text-xs text-gray-500 font-medium">Department of {dept.title} · NHIT Durgapur</p>
              </div>
            </div>

            <div className="relative bg-gray-50 p-6 md:p-8 rounded-2xl border-l-4" style={{ borderColor: accent }}>
              <div className="text-gray-800 text-base md:text-lg leading-relaxed italic font-serif">
                &ldquo;{dept.hod?.message}&rdquo;
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <div className="text-xs text-gray-500 font-bold uppercase">Department Vision</div>
                <div className="text-sm font-bold text-gray-800 mt-1">Industrial Readiness &amp; Craft</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <div className="text-xs text-gray-500 font-bold uppercase">Mentorship Ratio</div>
                <div className="text-sm font-bold text-gray-800 mt-1">1:15 Faculty Guidance</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <div className="text-xs text-gray-500 font-bold uppercase">Corporate Outreach</div>
                <div className="text-sm font-bold text-gray-800 mt-1">MoUs with Core Industries</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CURRICULUM ACCORDIONS */}
        {activeTab === 'curriculum' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900">
                  State Council 6-Semester Curriculum
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Full syllabi prescribed by WBSCTVESD for 3-Year Diploma in Engineering
                </p>
              </div>
              <a
                href={dept.syllabusPdf || 'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-[#ff3115]" />
                Download Syllabus PDF
              </a>
            </div>

            <div className="space-y-3">
              {dept.sems && Object.entries(dept.sems).map(([sem, subjects]: [string, any]) => {
                const isOpen = openSem === sem;
                return (
                  <div key={sem} className="border border-gray-200 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenSem(isOpen ? '' : sem)}
                      className={`w-full p-4 text-left flex items-center justify-between font-bold text-sm transition-colors ${
                        isOpen ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: isOpen ? accent : '#6b7280' }} 
                        />
                        Semester 0{sem} Curriculum
                      </span>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-normal ${isOpen ? 'text-gray-300' : 'text-gray-500'}`}>
                          {subjects.length} Course Modules
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-5 bg-white space-y-2 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {subjects.map((sub: string, sIdx: number) => (
                            <div 
                              key={sIdx} 
                              className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-800 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3115] shrink-0" />
                              <span className="font-semibold">{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: LABS & WORKSHOPS */}
        {activeTab === 'labs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">
                    Laboratories &amp; Workshop Facilities
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Hands-on industrial machinery, high-speed computational clusters, and diagnostic testbeds
                  </p>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-[#ff3115] font-bold text-xs rounded-full">
                  {dept.labs?.length || 0} Specialised Labs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dept.labs?.map((lab: any, i: number) => (
                  <div key={i} className="group rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
                    <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                      <Image
                        src={getLabImage(i)}
                        alt={lab.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white uppercase tracking-wider backdrop-blur-xs">
                          Lab 0{i + 1}
                        </span>
                        <h4 className="text-white font-bold text-sm mt-1">{lab.name}</h4>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-600 leading-relaxed">{lab.spec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FACULTY ROSTER */}
        {activeTab === 'faculty' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900">
                  Department Faculty &amp; Mentors
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Experienced academicians with industrial exposure and research publications
                </p>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full">
                {faculty.length} Faculty Members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {faculty.map((f: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center text-center hover:border-gray-300 transition-colors">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-3 border-2 border-white shadow-sm">
                    {f.avatar ? (
                      <Image
                        src={f.avatar}
                        alt={f.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: accent }}
                      >
                        {f.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{f.name}</h4>
                  <span className="text-xs font-semibold text-[#ff3115] mt-0.5">{f.designation}</span>
                  <span className="text-[11px] text-gray-500 mt-1">{f.qualification}</span>
                  {f.experience && (
                    <span className="mt-2 text-[10px] font-bold px-2 py-0.5 bg-gray-200/80 text-gray-700 rounded-md">
                      {f.experience} Experience
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CAREER & PLACEMENTS */}
        {activeTab === 'placements' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
              Career Trajectories &amp; Placement Record
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Graduates of {dept.title} secure competitive offers in leading core manufacturing, power utilities, automation firms, IT service leaders, or proceed to elite B.Tech lateral programs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 bg-orange-50 rounded-xl border border-orange-200 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-700">Placement Rate</span>
                <div className="text-3xl font-black text-gray-900 mt-1">{dept.stats.placementRate}</div>
                <span className="text-[11px] text-gray-500 mt-1 block">Campus On-Drive Success</span>
              </div>
              <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Highest CTC Offered</span>
                <div className="text-3xl font-black text-amber-600 mt-1">{dept.stats.highestCtc}</div>
                <span className="text-[11px] text-gray-500 mt-1 block">Annual CTC Package</span>
              </div>
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Median Compensation</span>
                <div className="text-3xl font-black text-blue-600 mt-1">{dept.stats.medianCtc}</div>
                <span className="text-[11px] text-gray-500 mt-1 block">Average Base Salary</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Typical Roles for Diploma Graduates</h3>
              <div className="flex flex-wrap gap-2">
                {['Junior Design Engineer', 'Site & Plant Supervisor', 'Quality Assurance Inspector', 'Testing & Maintenance Technician', 'Technical Operations Trainee', 'Industrial Automation Associate'].map((role, rIdx) => (
                  <span key={rIdx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
