import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wrench, 
  Zap, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Download, 
  Building, 
  Briefcase, 
  PhoneCall, 
  GraduationCap,
  Calendar,
  Users
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';

export const metadata = {
  title: 'NCVT ITI Courses | Electrician & Fitter Trades — NHIT Durgapur',
  description: 'NCVT approved 2-Year Craftsman Training Scheme (CTS) in Electrician and Fitter at NHIT Private ITI Durgapur. Direct admission, 100% placement support, and railway/PSU preparation.',
};

export default function ItiCoursesPage() {
  const trades = [
    {
      slug: 'iti-electrician',
      title: 'ITI Electrician Trade',
      badge: 'NCVT CTS Code: 0231',
      duration: '2 Years (4 Semesters / Annual Pattern)',
      intake: '20 Seats',
      accent: '#f59e0b',
      icon: Zap,
      image: '/images/iti/iti-electrician-workbench.jpg',
      tagline: 'Residential wiring, 3-phase industrial power circuits, transformer testing, DC/AC rotating machines, motor rewinding, and solar PV installations.',
      highlights: [
        'National Trade Certificate (NTC) awarded by DGT / NCVT',
        'Direct recruitment eligibility for Indian Railways (ALP & Technician)',
        'State DISCOM recruitment (WBSEDCL, WBSETCL, DVC)',
        'Direct Lateral Entry into 2nd Year Diploma Electrical Engineering via VOCLET',
      ],
      workshops: 'Electrical Machinery Bay, House Wiring Testboards, Armature Winding Station',
    },
    {
      slug: 'iti-fitter',
      title: 'ITI Fitter Trade',
      badge: 'NCVT CTS Code: 0227',
      duration: '2 Years (4 Semesters / Annual Pattern)',
      intake: '20 Seats',
      accent: '#f97316',
      icon: Wrench,
      image: '/images/iti/iti-fitter-workshop.jpg',
      tagline: 'Precision bench fitting to ±0.04mm accuracy, center lathe turning, drilling, hand/machine reaming, pipeline fabrication, and mechanical assembly.',
      highlights: [
        'National Trade Certificate (NTC) valid across India and abroad',
        'Top recruitment preference by Indian Railways Loco & Carriage Workshops',
        'SAIL Durgapur Steel Plant & Heavy Engineering apprentice recruitment',
        'Direct Lateral Entry into 2nd Year Diploma Mechanical Engineering via VOCLET',
      ],
      workshops: 'Fitting & Toolroom Shop, Center Lathe Bay, Pillar Drilling & Grinding Rigs',
    },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="DGT / NCVT Govt. of India Approved · DGT-6/25/12/2014-TC"
        title="NCVT Industrial Training Institute (ITI)"
        subtitle="Master high-demand technical craftsmanship with national certification, 100% practical machinery training, direct railway/PSU eligibility, and diploma lateral entry pathways."
        breadcrumbs={[
          { label: 'ITI Courses' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Value Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs font-bold uppercase text-gray-500">Affiliation Body</span>
            <div className="text-lg font-bold text-gray-900 mt-1">NCVT / DGT India</div>
            <span className="text-[11px] text-[#ff3115] font-semibold mt-0.5 block">National Trade Certificate</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs font-bold uppercase text-gray-500">Practical Ratio</span>
            <div className="text-lg font-bold text-gray-900 mt-1">70% Hands-On</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Machinery &amp; Bench Work</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs font-bold uppercase text-gray-500">Annual Quota</span>
            <div className="text-lg font-bold text-gray-900 mt-1">40 Total Seats</div>
            <span className="text-[11px] text-gray-500 font-semibold mt-0.5 block">20 Electrician · 20 Fitter</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs font-bold uppercase text-gray-500">Placement Support</span>
            <div className="text-lg font-bold text-gray-900 mt-1">100% Placement</div>
            <span className="text-[11px] text-blue-600 font-semibold mt-0.5 block">Core Plants &amp; PSUs</span>
          </div>
        </div>

        {/* 2 Main Trades Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {trades.map((trade, idx) => {
            const Icon = trade.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Hero Image */}
                  <div className="relative h-60 w-full bg-gray-900 overflow-hidden">
                    <Image
                      src={trade.image}
                      alt={trade.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span 
                        className="px-3 py-1 rounded-md text-xs font-bold text-white shadow-sm flex items-center gap-1.5"
                        style={{ backgroundColor: trade.accent }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {trade.badge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-gray-900">
                        {trade.intake}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white">{trade.title}</h3>
                      <p className="text-xs text-gray-300 font-medium mt-1">{trade.duration}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 space-y-6">
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {trade.tagline}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Key Career &amp; Academic Advantages
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-700">
                        {trade.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
                      <strong className="text-gray-900 block mb-1">Dedicated Workshop Facilities:</strong>
                      <span className="text-gray-600">{trade.workshops}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 md:p-8 pt-0 flex flex-wrap gap-3">
                  <Link
                    href={`/iti-courses/${trade.slug}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-900 hover:bg-[#ff3115] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>View Trade Details &amp; Syllabus</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="py-3 px-5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ff3115] text-xs font-bold transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* NCVT Craftsman Training Scheme (CTS) Benefits Section */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Ministry of Skill Development &amp; Entrepreneurship</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 mt-1 mb-3">
              Why Study ITI at NHIT Durgapur?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              NHIT Private Industrial Training Institute operates within the comprehensive 2.5-acre technical education campus of NHIT Durgapur, providing ITI trainees with university-grade infrastructure, hostel facilities, industrial workshops, and placement cells.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#ff3115] flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">National Trade Certificate (NTC)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Govt. of India recognized certificate enabling students to apply for central government jobs, Indian Railways, defence ordnance factories, and global overseas employment.
              </p>
            </div>

            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">VOCLET Lateral Entry Bridge</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Eligible for direct entry into the 2nd Year (3rd Semester) of 3-Year Diploma in Engineering at NHIT, saving a full year and elevating qualifications to polytechnic and B.Tech levels.
              </p>
            </div>

            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Campus Placement &amp; Apprenticeship</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Regular campus interview drives from leading engineering leaders including Tata Motors, L&amp;T, Shyam Steel, Kiswok Industries, and Gabriel India with competitive starter packages.
              </p>
            </div>
          </div>
        </div>

        {/* Live Workshop Photos Grid */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                Workshop &amp; Practical Training Facilities
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Real photos from NHIT Private ITI workshop floor and student practice sessions
              </p>
            </div>
            <Link
              href="/our-infrastructure"
              className="text-xs font-bold text-[#ff3115] hover:underline"
            >
              Explore Full Campus Infrastructure &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { src: '/images/iti/iti-electrician-workbench.jpg', caption: 'Electrician Testboards & Motor Testing' },
              { src: '/images/iti/iti-fitter-tools.jpg', caption: 'Precision Measuring Tools & Verniers' },
              { src: '/images/iti/iti-electrical-panel.jpg', caption: 'Industrial Switchgear & Relay Panel' },
              { src: '/images/iti/iti-practical-training.jpg', caption: 'Hand Filing & Fitment Training' },
            ].map((img, i) => (
              <div key={i} className="group relative h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2.5 left-3 right-3 text-[11px] font-bold text-white leading-tight">
                  {img.caption}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
