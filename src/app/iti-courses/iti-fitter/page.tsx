'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubpageHero from '@/components/layout/SubpageHero';
import { 
  Wrench, 
  Award, 
  CheckCircle2, 
  Download, 
  Briefcase, 
  ChevronDown, 
  PhoneCall, 
  GraduationCap, 
  ShieldCheck,
  Building,
  Zap,
  BookOpen
} from 'lucide-react';

export default function ItiFitterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openSem, setOpenSem] = useState<number>(1);

  const semesters = [
    {
      sem: 1,
      title: 'Semester 1: Workshop Safety, Precision Hand Tools & Linear Measurement',
      subjects: [
        'Trade Theory: Industrial Safety, PPE Standards & Precision Measurement Instruments',
        'Trade Practical: Hacksawing, Flat & Cross Filing to ±0.04mm Accuracy',
        'Vernier Caliper, Inside/Outside Micrometer, Bevel Protractor Calibration',
        'Engineering Drawing & Workshop Calculation & Science-I',
      ],
    },
    {
      sem: 2,
      title: 'Semester 2: Precision Fitting, Drilling, Reaming & Surface Finishing',
      subjects: [
        'Trade Theory: Drilling Machines, Drill Bits, Hand/Machine Reamers & Tap/Die Sets',
        'Trade Practical: Step Fitting, Angular Fitting, T-Joint & Dovetail Fitting Exercises',
        'Pillar & Radial Drilling Operations, Counter-sinking, Counter-boring & Hand Reaming',
        'Scraping Techniques, Surface Plate Checking & Blue Matching Practice',
      ],
    },
    {
      sem: 3,
      title: 'Semester 3: Lathe Machine Turning, Threading & Metrology',
      subjects: [
        'Trade Theory: Center Lathe Construction, Cutting Tool Geometry & Thread Nomenclature',
        'Trade Practical: Facing, Plain Turning, Step Turning, Chamfering & Knurling',
        'Single-Point Cutting Tool Grinding, Metric & Whitworth V-Thread Cutting on Lathe',
        'Vernier Height Gauge, Slip Gauges, Dial Test Indicators & Sine Bar Metrology',
      ],
    },
    {
      sem: 4,
      title: 'Semester 4: Assembly Operations, Hydraulics, Pneumatics & Maintenance',
      subjects: [
        'Trade Theory: Industrial Bearings, Fasteners, Gaskets, Couplings & Preventive Maintenance',
        'Trade Practical: Sub-Assembly of Machine Vices, Pipe Vices & Flanged Pipe Couplings',
        'Hydraulic & Pneumatic Circuit Assembly, Directional Control Valves & Actuators',
        'Machine Tool Overhaul, Leveling, Alignment Testing & Industrial Safety Audit',
      ],
    },
  ];

  const psuRecruiters = [
    { name: 'Indian Railways (RRB)', desc: 'Technician-III Fitter (Loco Workshop, Carriage & Wagon)' },
    { name: 'SAIL Durgapur Steel Plant', desc: 'Attendant-cum-Technician Trainee (ACTT Mechanical)' },
    { name: 'Ordnance Factory Board (OFB)', desc: 'Gun & Shell Factory, Cossipore & Ishapore Rifle Factory' },
    { name: 'Hindustan Aeronautics Limited (HAL)', desc: 'Aircraft Assembly & Mechanical Fitter Trainee' },
    { name: 'Indian Navy / Mazagon Dock', desc: 'Dockyard Apprentice & Marine Hull Fitter' },
    { name: 'Bharat Heavy Electricals (BHEL)', desc: 'Heavy Engineering Artisan & Fabrication Trainee' },
  ];

  const faqs = [
    {
      q: 'What is the eligibility criteria for admission into ITI Fitter at NHIT?',
      a: 'Applicants must have passed 10th Standard / Madhyamik examination or equivalent from a recognized board with Science and Mathematics. Admission is granted based on NCVT merit counseling and direct institutional counseling. Candidates must be at least 14 years old, with no upper age restriction.',
    },
    {
      q: 'What certification is awarded upon completion of the ITI Fitter trade?',
      a: 'Graduates are awarded the official National Trade Certificate (NTC) issued by the National Council for Vocational Training (NCVT), Directorate General of Training (DGT), Government of India, valid for government recruitments and multinational technical positions across India and abroad.',
    },
    {
      q: 'What practical machinery and hand tools do students master during training?',
      a: 'Students master precision hand filing (flat, half-round, triangular to ±0.04mm accuracy), vernier calipers, outside/inside micrometers, height gauges, pillar and radial drilling machines, hand and machine reamers, center lathe turning (facing, plain/step turning, knurling, V-threading), and pipe joint assembly.',
    },
    {
      q: 'Can ITI Fitter pass-outs join Diploma Mechanical Engineering directly in 2nd year?',
      a: 'Yes! Through the West Bengal State Council VOCLET examination, ITI Fitter pass-outs secure direct lateral entry into the 2nd Year (3rd Semester) of 3-Year Diploma in Mechanical Engineering or Automobile Engineering, completing their engineering diploma in just 2 years.',
    },
    {
      q: 'What PSU and railway vacancies are open to NCVT Fitter certificate holders?',
      a: 'ITI Fitter is the premier trade recruited by Indian Railways (RRB Technician-III Fitter in Workshop and Carriage & Wagon divisions, ALP), SAIL Durgapur Steel Plant (ACTT Mechanical), Ordnance Factory Board (Gun & Shell Factory), HAL, BHEL, and Indian Navy Dockyards.',
    },
    {
      q: 'Which private companies recruit ITI Fitters from NHIT Durgapur?',
      a: 'Top engineering firms like Tata Motors, Larsen & Toubro, Cummins India, Kiswok Industries, Shyam Steel, Gabriel India, and tier-1 automobile and steel fabrication plants recruit NHIT fitters with starting packages ranging up to ₹3.5 LPA.',
    },
    {
      q: 'Are hostel and canteen facilities provided on campus for ITI trainees?',
      a: 'Yes, NHIT offers full on-campus hostel accommodation for outstation students with 24/7 security, high-speed Wi-Fi, modern dining halls serving hygienic meals, sports grounds, and medical assistance inside the NHIT Durgapur campus.',
    },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="NCVT CTS Code: 0227 · 2-Year Craftsman Training"
        title="ITI Fitter Trade"
        subtitle="NCVT Approved Benchmark Training in Precision Toolroom Fitting, Center Lathe Turning, Assembly Metrology, and Heavy Mechanical Maintenance."
        breadcrumbs={[
          { label: 'ITI Courses', href: '/iti-courses' },
          { label: 'ITI Fitter' },
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
            <div className="text-xl font-black text-[#f97316] mt-0.5">90–95%</div>
          </div>
          <div className="border-r border-gray-100 last:border-0">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Highest CTC</span>
            <div className="text-xl font-black text-[#ff3115] mt-0.5">₹3.5 LPA</div>
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
                The <strong>ITI Fitter</strong> trade at The New Horizons Institute of Technology is a 2-year National Council for Vocational Training (NCVT) program designed to build master craftsmen capable of producing high-precision mechanical assemblies, executing heavy lathe machining, and maintaining industrial plant equipment.
              </p>

              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src="/images/iti/iti-fitter-workshop.jpg"
                  alt="ITI Fitter Workshop at NHIT Durgapur"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#f97316]" /> NCVT Certification (NTC)
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Govt. of India National Trade Certificate authorizing appointment in railways, defence factories, shipyards, and heavy engineering plants.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" /> Lateral Entry via VOCLET
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Direct entry into 2nd Year (3rd Semester) of 3-Year Diploma in Mechanical Engineering or Automobile Engineering at NHIT Durgapur.
                  </p>
                </div>
              </div>
            </div>

            {/* Trade In-Charge Perspective */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-orange-600 text-white font-bold flex items-center justify-center text-xl shrink-0">
                  B
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">Trade In-Charge Perspective</span>
                  <h3 className="text-xl font-bold text-gray-900">Biswajit Roy</h3>
                  <p className="text-xs text-gray-500">Trade In-Charge (ITI Fitter) · Diploma ME (10 yrs exp)</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed italic bg-gray-50 p-4 rounded-xl border-l-4 border-orange-500">
                &ldquo;A fitter is the mechanical backbone of any production line. We teach our trainees how to read intricate engineering blueprints, handle micrometers with tactile sensitivity, and operate center lathes with confidence so they emerge ready for high-precision manufacturing roles.&rdquo;
              </p>
            </div>

            {/* 4 Semesters Curriculum */}
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
                  <Download className="w-4 h-4 text-orange-400" /> Download NCVT Syllabus
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
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
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

            {/* PSU & Railway Recruiters */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                Government PSUs &amp; Railway Recruitment
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                ITI Fitter certificate holders are the most demanded craftsman profile in heavy machinery, railways, and defence workshops:
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

            {/* FAQs */}
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                  NCVT Admissions Open 2026
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Apply for ITI Fitter</h3>
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
                  href="/iti-courses/iti-electrician"
                  className="block p-4 rounded-xl border border-gray-200 hover:border-gray-900 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-gray-900">ITI Electrician Trade</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded">20 Seats</span>
                  </div>
                  <p className="text-xs text-gray-500">Industrial wiring, transformer testing &amp; motor rewinding</p>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
