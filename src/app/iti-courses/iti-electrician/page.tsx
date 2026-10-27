'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubpageHero from '@/components/layout/SubpageHero';
import { 
  Zap, 
  Award, 
  CheckCircle2, 
  Download, 
  Briefcase, 
  ChevronDown, 
  PhoneCall, 
  GraduationCap, 
  ShieldCheck,
  Building,
  Wrench,
  BookOpen
} from 'lucide-react';

export default function ItiElectricianPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openSem, setOpenSem] = useState<number>(1);

  const semesters = [
    {
      sem: 1,
      title: 'Semester 1: Workshop Safety, Fundamental Electrical & Tools',
      subjects: [
        'Trade Theory: Safety Regulations, First Aid & Artificial Respiration',
        'Trade Practical: Common Hand Tools, Wire Splicing & Soldering',
        'Ohm’s Law, Kirchhoff’s Laws & Resistive Network Verification',
        'Engineering Drawing & Workshop Calculation & Science-I',
      ],
    },
    {
      sem: 2,
      title: 'Semester 2: AC Circuits, Cells, Earthing & Domestic Wiring',
      subjects: [
        'Trade Theory: Single-Phase & 3-Phase AC Circuits (RL, RC, RLC)',
        'Trade Practical: Domestic PVC Conduit & Casing-Capping Wiring',
        'Pipe Earthing & Plate Earthing Field Installation & Testing',
        'Lead-Acid Battery Maintenance & Electrolyte Specific Gravity Testing',
      ],
    },
    {
      sem: 3,
      title: 'Semester 3: DC Machines, Transformers & Instrumentation',
      subjects: [
        'Trade Theory: DC Generator Characteristics & DC Motor Speed Control',
        'Trade Practical: 3-Point & 4-Point Starter Connections & Testing',
        'Single-Phase & 3-Phase Transformer Open/Short Circuit Tests',
        'Moving Coil & Moving Iron Meters, Megger & Earth Tester Calibration',
      ],
    },
    {
      sem: 4,
      title: 'Semester 4: 3-Phase Induction Motors, Alternators & Panel Wiring',
      subjects: [
        'Trade Theory: Synchronous Alternators & 3-Phase Induction Motors',
        'Trade Practical: Direct-On-Line (DOL) & Star-Delta Starter Wiring',
        'Armature Rewinding, Coil Winding & Varnish Baking Practice',
        'Industrial Control Panel Fabrication, Contactor & Relay Wiring',
      ],
    },
  ];

  const psuRecruiters = [
    { name: 'Indian Railways (RRB)', desc: 'Technician-III Electrical & Assistant Loco Pilot (ALP)' },
    { name: 'WBSEDCL & WBSETCL', desc: 'Lineman, Substation Attendant & Office Technical Staff' },
    { name: 'SAIL Durgapur Steel Plant', desc: 'Attendant-cum-Technician Trainee (ACTT Electrical)' },
    { name: 'Coal India Limited (ECL / BCCL)', desc: 'Colliery Electrical Maintenance Craftsman' },
    { name: 'Ordnance Factory Board (OFB)', desc: 'Defence Electrical Fitter & Maintenance Staff' },
    { name: 'NTPC & DVC Thermal Power', desc: 'Plant Electrical Artisan & Switchyard Technician' },
  ];

  const faqs = [
    {
      q: 'What is the eligibility criteria for admission into ITI Electrician?',
      a: 'Candidates must have passed 10th Standard / Madhyamik examination or equivalent from a recognized board with Science and Mathematics. Admissions are conducted through state NCVT counseling and direct merit quota under Directorate General of Training (DGT) guidelines. The minimum age is 14 years, with no upper age limit.',
    },
    {
      q: 'Is this course recognized by NCVT and the Government of India?',
      a: 'Yes. The ITI Electrician trade at NHIT is strictly affiliated to the National Council for Vocational Training (NCVT), Directorate General of Training (DGT), Ministry of Skill Development and Entrepreneurship, Government of India. Successful candidates receive the internationally recognized National Trade Certificate (NTC).',
    },
    {
      q: 'What practical workshop skills are taught in ITI Electrician at NHIT?',
      a: 'Students receive thorough hands-on training in domestic conduit wiring, industrial switchgear assembly, DOL and Star-Delta starters, 3-phase induction motor rewinding, single/3-phase transformer testing, pipe and plate safety earthing installations, and solar photovoltaic rooftop wiring.',
    },
    {
      q: 'Can ITI Electrician graduates enter directly into the 2nd year of Diploma Engineering?',
      a: 'Yes! ITI Electrician pass-outs with 10th standard qualification can appear for the West Bengal state VOCLET examination and enter directly into the 2nd Year (3rd Semester) of the 3-Year Diploma in Electrical Engineering at NHIT or any recognized polytechnic, completing the diploma in just 2 years.',
    },
    {
      q: 'What are the job opportunities in Indian Railways and PSUs for ITI Electricians?',
      a: 'ITI Electrician holds the highest recruitment quota in Indian Railways for RRB Technician-III and Assistant Loco Pilot (ALP). In addition, graduates qualify for SAIL Durgapur Steel Plant (ACTT), WBSEDCL/WBSETCL Lineman & Substation Attendant, Coal India (CIL), and Ordnance Factory Board technical posts.',
    },
    {
      q: 'Which private companies recruit ITI Electricians from NHIT Durgapur?',
      a: 'NHIT maintains a 90–95% placement and apprenticeship placement rate for ITI trades. Major recruiters include Tata Power, Schneider Electric, Havells India, Larsen & Toubro Construction, CESC Ltd, and premier electrical switchboard manufacturers in eastern India.',
    },
    {
      q: 'Does NHIT assist in securing National Apprenticeship Training (NAC)?',
      a: 'Yes. The NHIT Training & Placement Cell assists every graduate in enrolling on the NAPS (National Apprenticeship Promotion Scheme) portal for 1-year paid industrial apprenticeship training leading to the National Apprenticeship Certificate (NAC).',
    },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="NCVT CTS Code: 0231 · 2-Year Craftsman Training"
        title="ITI Electrician Trade"
        subtitle="NCVT Approved Center of Excellence in Industrial Wiring, Motor Rewinding, Transformer Testing, and Power Distribution Panels."
        breadcrumbs={[
          { label: 'ITI Courses', href: '/iti-courses' },
          { label: 'ITI Electrician' },
        ]}
      />

      {/* Metric Strip */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="border-r border-gray-100 last:border-0">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Sanctioned Intake</span>
            <div className="text-xl font-black text-gray-900 mt-0.5">20 Seats</div>
          </div>
          <div className="border-r border-gray-100 last:border-0">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Placement Success</span>
            <div className="text-xl font-black text-[#10b981] mt-0.5">90–95%</div>
          </div>
          <div className="border-r border-gray-100 last:border-0">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Highest CTC</span>
            <div className="text-xl font-black text-[#ff3115] mt-0.5">₹3.6 LPA</div>
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase">Trade Duration</span>
            <div className="text-xl font-black text-gray-900 mt-0.5">2 Years</div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold font-heading text-gray-900">Trade Overview</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                The <strong>ITI Electrician</strong> trade at The New Horizons Institute of Technology is an intensive 2-year vocational program affiliated with the <strong>National Council for Vocational Training (NCVT)</strong> under the Directorate General of Training (DGT), Ministry of Skill Development and Entrepreneurship, Government of India.
              </p>

              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src="/images/iti/iti-electrician-workbench.jpg"
                  alt="ITI Electrician Workbench at NHIT"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> NCVT Certification (NTC)
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    National Trade Certificate recognized across India and worldwide for electrical wireman licensing and government engineer recruitment.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" /> Lateral Entry via VOCLET
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Direct admission into the 2nd Year (3rd Semester) of 3-Year Diploma in Electrical Engineering at NHIT, completing the polytechnic degree in 2 years.
                  </p>
                </div>
              </div>
            </div>

            {/* Trade In-Charge Desk */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-emerald-600 text-white font-bold flex items-center justify-center text-xl shrink-0">
                  S
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Trade In-Charge Perspective</span>
                  <h3 className="text-xl font-bold text-gray-900">Soumya Mukherjee</h3>
                  <p className="text-xs text-gray-500">Trade In-Charge (ITI Electrician) · Diploma EE (8 yrs exp)</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed italic bg-gray-50 p-4 rounded-xl border-l-4 border-emerald-500">
                &ldquo;Electrical craftsmen are the indispensable lifeblood of modern industrial infrastructure. At NHIT Private ITI, our training emphasizes safety-first protocols, millimeter-accurate panel layouts, and mastery over heavy industrial drives so that our trainees secure premier railway and PSU technician appointments.&rdquo;
              </p>
            </div>

            {/* 4 Semesters Syllabus */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">2-Year Trade Curriculum</h2>
                  <p className="text-xs text-gray-500 mt-1">Prescribed by DGT / NCVT Craftsman Training Scheme (CTS)</p>
                </div>
                <a
                  href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 text-emerald-400" /> Download NCVT Syllabus
                </a>
              </div>

              <div className="space-y-3">
                {semesters.map((s) => {
                  const isOpen = openSem === s.sem;
                  return (
                    <div key={s.sem} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenSem(isOpen ? 0 : s.sem)}
                        className={`w-full p-4 text-left flex items-center justify-between font-bold text-sm transition-colors ${
                          isOpen ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <span>{s.title}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white space-y-2 border-t border-gray-100">
                          {s.subjects.map((sub, subIdx) => (
                            <div key={subIdx} className="p-2.5 bg-gray-50 rounded-lg text-xs text-gray-800 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PSU & Railway Opportunities */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                Government PSUs &amp; Railway Recruitment
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                ITI Electrician holders enjoy maximum recruitment quotas across major public sector undertakings and defence installations:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {psuRecruiters.map((p, pIdx) => (
                  <div key={pIdx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 text-sm">{p.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, fIdx) => {
                  const isOpen = openFaq === fIdx;
                  return (
                    <div key={fIdx} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                        className={`w-full p-4 text-left flex items-center justify-between font-bold text-xs md:text-sm transition-colors ${
                          isOpen ? 'bg-orange-50/60 text-[#ff3115]' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ml-2 ${isOpen ? 'rotate-180 text-[#ff3115]' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-20 space-y-6">
              
              {/* Counseling Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  NCVT Admissions Open 2026
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Apply for ITI Electrician</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">
                  Sanctioned intake of 20 seats. 10th standard pass candidates with Science &amp; Math eligible.
                </p>
                <div className="space-y-2.5">
                  <Link
                    href="/admissions"
                    className="w-full py-2.5 px-4 bg-[#ff3115] hover:bg-[#e0260c] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    Direct Admission Application &rarr;
                  </Link>
                  <a
                    href="tel:03432542103"
                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#ff3115]" />
                    Call: (0343) 2542103
                  </a>
                </div>
              </div>

              {/* Other ITI Trade */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Other ITI Trade at NHIT
                </h4>
                <Link
                  href="/iti-courses/iti-fitter"
                  className="block p-4 rounded-xl border border-gray-200 hover:border-gray-900 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-gray-900">ITI Fitter Trade</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 text-[#ff3115] rounded">20 Seats</span>
                  </div>
                  <p className="text-xs text-gray-500">Precision bench fitting, lathe machining &amp; assembly</p>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
