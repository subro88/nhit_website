import React from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Cog, 
  Zap, 
  Hammer, 
  Car, 
  ArrowRight, 
  BookOpen,
  Sparkles,
  Award
} from 'lucide-react';

const departments = [
  {
    slug: 'computer-science-technology',
    title: 'Computer Science & Technology',
    code: 'CST_01',
    accent: '#0EA5E9',
    icon: Cpu,
    tagline: 'Software, systems, networks and the craft of code — the branch that ships.',
    intake: '60 Seats (AICTE Approved)',
    stats: '85–90% Placement • ₹4.8 LPA Highest'
  },
  {
    slug: 'diploma-in-mechanical-engineering',
    title: 'Mechanical Engineering',
    code: 'ME_02',
    accent: '#F97316',
    icon: Cog,
    tagline: 'Machines, thermal systems, and precision manufacturing bays.',
    intake: '120 Seats (AICTE Approved)',
    stats: '80–85% Placement • ₹4.2 LPA Highest'
  },
  {
    slug: 'diploma-in-electronics-telecommunications-engineering',
    title: 'Electronics & Telecom',
    code: 'ETCE_03',
    accent: '#8B5CF6',
    icon: Zap,
    tagline: 'Signals, circuits, embedded microcontrollers, and communication systems.',
    intake: '60 Seats (AICTE Approved)',
    stats: '80–85% Placement • ₹3.8 LPA Highest'
  },
  {
    slug: 'diploma-in-electrical-engineering',
    title: 'Electrical Engineering',
    code: 'EE_04',
    accent: '#F59E0B',
    icon: Zap,
    tagline: 'Power systems, rotating machines, industrial drives, and solar tech.',
    intake: '120 Seats (AICTE Approved)',
    stats: '80–85% Placement • ₹4.0 LPA Highest'
  },
  {
    slug: 'diploma-in-civil-engineering',
    title: 'Civil Engineering',
    code: 'CE_05',
    accent: '#0284C7',
    icon: Hammer,
    tagline: 'Structures, concrete mix design, geotechnical testing, and surveying.',
    intake: '60 Seats (AICTE Approved)',
    stats: '80–85% Placement • ₹3.6 LPA Highest'
  },
  {
    slug: 'diploma-in-automobile-engineering',
    title: 'Automobile Engineering',
    code: 'AE_06',
    accent: '#EF4444',
    icon: Car,
    tagline: 'Engines, powertrains, garage practice, and live vehicle diagnostics.',
    intake: '60 Seats (AICTE Approved)',
    stats: '80–85% Placement • ₹4.2 LPA Highest'
  }
];

export default function DepartmentsIndexPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-[#0F172A] text-white py-16 border-b border-slate-800">
        <div className="max-w-[1140px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Diploma Engineering Divisions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Academic Engineering Disciplines
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every department combines West Bengal State Council curricula with extensive workshop practice and industrial MoUs.
          </p>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-5 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <Link
                key={i}
                href={`/departments/${dept.slug}`}
                className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                style={{ borderTop: `4px solid ${dept.accent}` }}
              >
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: dept.accent }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                      {dept.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#C10A0C] transition-colors mb-2.5">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {dept.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-[11px] font-semibold text-slate-400">
                    {dept.stats}
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700">{dept.intake}</span>
                    <span className="text-[#C10A0C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Branch →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
