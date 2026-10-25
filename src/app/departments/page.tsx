import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Cpu, 
  Cog, 
  Zap, 
  Hammer, 
  Car, 
  ArrowRight, 
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  FlaskConical,
  Wrench,
  GraduationCap
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';

export const metadata = {
  title: 'Engineering Departments & Disciplines | NHIT Durgapur',
  description: 'Explore the 6 AICTE-approved 3-year diploma engineering disciplines at NHIT Durgapur: CST, Mechanical, Electrical, Civil, ETCE, and Automobile Engineering.',
};

const departments = [
  {
    slug: 'computer-science-technology',
    title: 'Computer Science & Technology',
    code: 'CST',
    accent: '#0ea5e9',
    icon: Cpu,
    tagline: 'Software engineering, algorithmic systems, database architecture, and computer networking.',
    intake: '60 Seats',
    stats: '85–90% Placement • ₹4.8 LPA Highest',
    labs: '7 Specialised Labs (Linux, DB, Networking)',
    image: '/images/hero-cse.jpg'
  },
  {
    slug: 'diploma-in-mechanical-engineering',
    title: 'Mechanical Engineering',
    code: 'ME',
    accent: '#f97316',
    icon: Cog,
    tagline: 'Thermodynamics, machine design, CNC milling, precision lathe turning, and CAD/CAM.',
    intake: '120 Seats',
    stats: '80–85% Placement • ₹4.2 LPA Highest',
    labs: 'Heavy Workshop Bays & UTM Testing Lab',
    image: '/images/hero-me.jpg'
  },
  {
    slug: 'diploma-in-electrical-engineering',
    title: 'Electrical Engineering',
    code: 'EE',
    accent: '#f59e0b',
    icon: Zap,
    tagline: 'Power systems, rotating machines, industrial drives, PLC automation, and switchgear.',
    intake: '120 Seats',
    stats: '80–85% Placement • ₹4.0 LPA Highest',
    labs: 'AC/DC Machine Testbeds & Control Systems',
    image: '/images/hero-ee.jpg'
  },
  {
    slug: 'diploma-in-civil-engineering',
    title: 'Civil Engineering',
    code: 'CE',
    accent: '#0284c7',
    icon: Hammer,
    tagline: 'Structural engineering, surveying with Total Station, geotechnical soil testing, and concrete technology.',
    intake: '60 Seats',
    stats: '80–85% Placement • ₹3.6 LPA Highest',
    labs: 'Surveying Field Lab & Soil Mechanics',
    image: '/images/hero-civil.jpg'
  },
  {
    slug: 'diploma-in-electronics-telecommunications-engineering',
    title: 'Electronics & Telecommunication',
    code: 'ETCE',
    accent: '#8b5cf6',
    icon: Zap,
    tagline: 'Embedded IoT systems, digital microcontrollers, RF communication, and VLSI circuit design.',
    intake: '60 Seats',
    stats: '80–85% Placement • ₹3.8 LPA Highest',
    labs: 'Microprocessor & Microwave Lab',
    image: '/images/hero-etce.jpg'
  },
  {
    slug: 'diploma-in-automobile-engineering',
    title: 'Automobile Engineering',
    code: 'AE',
    accent: '#ef4444',
    icon: Car,
    tagline: 'Automotive chassis design, transmission systems, engine diagnostic rigs, and EV powertrains.',
    intake: '60 Seats',
    stats: '80–85% Placement • ₹4.2 LPA Highest',
    labs: 'Engine Diagnostic & Vehicle Workshop',
    image: '/images/hero-auto.jpg'
  }
];

export default function DepartmentsIndexPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="WBSCTVESD Affiliated · AICTE Approved"
        title="Engineering Disciplines"
        subtitle="Explore our 6 premier diploma engineering branches equipped with industry-grade workshops, 40+ specialized laboratories, and direct corporate placement pipelines."
        breadcrumbs={[
          { label: 'Academic Departments' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                    <Image
                      src={dept.image}
                      alt={dept.title}
                      fill
                      className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-2.5 py-1 rounded-md text-xs font-black text-white shadow-sm"
                        style={{ backgroundColor: dept.accent }}
                      >
                        {dept.code}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 text-gray-900 backdrop-blur-xs">
                        {dept.intake}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {dept.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {dept.tagline}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <FlaskConical className="w-3.5 h-3.5 text-[#ff3115]" />
                        <span>{dept.labs}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>{dept.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-[#ff3115] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm group-hover:shadow-md"
                  >
                    <span>Explore Department</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* NCVT Industrial Training Institute (ITI) Banner */}
        <div className="bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 text-white rounded-2xl p-8 md:p-10 border border-gray-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-[#ff3115] border border-[#ff3115]/30">
              <Wrench className="w-3.5 h-3.5" /> NCVT / DGT Craftsman Training Scheme
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              Looking for 2-Year ITI Trade Certifications?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              NHIT Private ITI offers National Council for Vocational Training (NCVT) approved courses in <strong>Electrician</strong> and <strong>Fitter</strong> with intensive workshop training, live machinery bays, and 100% placement support.
            </p>
          </div>
          <Link
            href="/iti-courses"
            className="shrink-0 px-6 py-3 bg-[#ff3115] hover:bg-[#e0260c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>Explore ITI Trades</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
