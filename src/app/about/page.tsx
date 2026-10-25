import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Award, 
  CheckCircle, 
  Handshake, 
  GraduationCap, 
  Users, 
  Compass, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const partnerships = [
    { title: 'CSIR-CMERI Durgapur', desc: 'Ministry of Science & Technology, Govt. of India MoU for industrial projects' },
    { title: 'National Entrepreneurship Network (NEN)', desc: 'Institutional tie-up for student startup incubation' },
    { title: 'HCL Technologies', desc: 'Training tie-up for enterprise skills and campus recruitment drives' },
    { title: 'Institution of Engineers (India)', desc: 'Official Life Institutional Member (IEI)' },
    { title: 'ISTE New Delhi', desc: 'Indian Society for Technical Education Institutional Member' },
    { title: 'British Council Library', desc: 'Academic literature and language lab access partnership' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-[#0F172A] text-white py-16 border-b border-slate-800">
        <div className="max-w-[1140px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            Est. 2007 • ISO 9001:2015 Certified
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            About The New Horizons Institute of Technology
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            One of Eastern India's largest technical institutions, bridging foundational science with hands-on workshop rigor in Durgapur, West Bengal.
          </p>
        </div>
      </section>

      <div className="max-w-[1140px] mx-auto px-5 -mt-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-8">
          {/* Institutional Legacy Story */}
          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
            <p>
              <strong>New Horizons Institute of Technology (NHIT)</strong> opened its first academic session on 16 August 2007 at Durgapur, Paschim Bardhaman. Today it stands as one of eastern India's largest diploma engineering institutes by student intake, running six diploma branches and a Private ITI with Electrician and Fitter trades.
            </p>
            <p>
              The first pass-out batch set the standard: <strong>85% of that batch moved directly into jobs or B.Tech lateral entry</strong> — a benchmark the institute has continuously upheld through corporate MoUs, workshop-first pedagogy, and a proactive Training & Placement Cell.
            </p>
          </div>

          {/* Institutional Affiliation */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-base text-slate-900 mb-1 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#C10A0C]" />
              Accreditation & State Council Affiliation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All diploma engineering programmes are approved by the <strong>All India Council for Technical Education (AICTE)</strong>, New Delhi, and affiliated to the <strong>West Bengal State Council of Technical & Vocational Education and Skill Development (WBSCT&VE&SD)</strong>.
            </p>
          </div>

          {/* Strategic MoUs & Partnerships Grid */}
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-[#C10A0C]" />
              Partnerships, Memberships & Industry Ties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {partnerships.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-xs text-slate-900 mb-1">{p.title}</div>
                  <div className="text-[11px] text-slate-500 leading-normal">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900 text-sm">Interested in joining NHIT for Session 2026?</div>
              <div className="text-xs text-slate-500">Explore admission requirements or consult our career desk.</div>
            </div>
            <Link
              href="/admissions"
              className="px-6 py-2.5 rounded-full bg-[#C10A0C] hover:bg-[#9E0B0F] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Admissions Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
