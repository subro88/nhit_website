import React from 'react';
import Link from 'next/link';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import {
  Award,
  GraduationCap,
  Users,
  Building2,
  CheckCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    {
      year: '2007',
      title: 'First Academic Session',
      desc: 'Inaugurated on 16 August 2007 with core diploma branches in Mechanical, Electrical, and Civil Engineering.',
    },
    {
      year: '2010',
      title: 'First Graduating Batch',
      desc: 'First graduating class achieved 85% placement and B.Tech lateral entry success, establishing recruitment benchmark.',
    },
    {
      year: '2014',
      title: 'NCVT ITI Establishment',
      desc: 'Establishment of NHIT Private ITI offering Electrician and Fitter trade certifications with dedicated workshop bays.',
    },
    {
      year: '2020',
      title: 'CSIR-CMERI Research MoU',
      desc: 'Formal partnership with CSIR-CMERI Durgapur, facilitating high-end research exposure and faculty development programs.',
    },
    {
      year: '2026',
      title: 'Undergraduate Wing (MAKAUT)',
      desc: 'Launch of MAKAUT-affiliated Bachelor of Computer Applications (BCA), BBA, and BBA Hospital Management.',
    },
  ];

  const partnerships = [
    {
      title: 'CSIR-CMERI Durgapur',
      tag: 'Govt. of India MoU',
      desc: 'Research exposure, joint technical workshops, and engineering instrumentation projects.',
    },
    {
      title: 'National Entrepreneurship Network (NEN)',
      tag: 'Incubation Partner',
      desc: 'Startup mentoring, business plan bootcamps, and student enterprise incubation.',
    },
    {
      title: 'HCL Technologies',
      tag: 'Industry Tie-Up',
      desc: 'Enterprise skills training, campus recruitment drives, and cloud labs support.',
    },
    {
      title: 'The Institution of Engineers (India)',
      tag: 'Life Institutional Member',
      desc: 'Professional engineering chapter activities, technical paper presentations, and seminars.',
    },
    {
      title: 'Indian Society for Technical Education (ISTE)',
      tag: 'National Member',
      desc: 'Faculty development programs and student technical convention representation.',
    },
    {
      title: 'British Council Library',
      tag: 'Knowledge Access',
      desc: 'Digital technical repository and international language lab learning resources.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* 1. Breadcrumb Hero Banner */}
      <SubpageHero
        kicker="Institutional Profile · Est. 2007"
        badge="18+ Years Legacy"
        title="About The New Horizons Institute of Technology"
        subtitle="One of Eastern India's largest diploma engineering institutes — six specialised engineering disciplines, two ITI trades, and 40+ laboratories in Durgapur, West Bengal."
        breadcrumbs={[{ label: 'About NHIT' }]}
      />

      {/* 2. Main Layout with Sidebar */}
      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area (70%) */}
          <main className="flex-1 space-y-8">
            {/* Heritage Card */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Genesis &amp; Heritage
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Engineering Futures in Eastern India
                </h2>
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  <strong>The New Horizons Institute of Technology (NHIT)</strong> opened its first
                  academic session on <strong>16 August 2007</strong> at Durgapur. Established under
                  the aegis of <strong>Durgapur Ispat People&apos;s Society</strong> (registered
                  under the West Bengal Societies Registration Act XXVI of 1961), NHIT was founded
                  with a singular conviction: to create an institution where technical education is
                  rigorous, hands-on, and accessible to students across West Bengal and neighboring
                  states.
                </p>
                <p>
                  Today, NHIT is one of eastern India&apos;s largest diploma engineering institutes
                  by student intake, running six diploma branches and an NCVT-approved Private ITI.
                  The institute&apos;s foundational pass-out batch set the standard:{' '}
                  <strong>85% moved directly into industry employment or B.Tech lateral entry</strong>
                  .
                </p>
              </div>

              {/* Stat Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#FF3115] font-montserrat">
                    18+ Years
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-500 mt-0.5">
                    Est. 2007
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xl sm:text-2xl font-black text-neutral-900 font-montserrat">
                    40+ Labs
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-500 mt-0.5">
                    Campus Floor
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#10B981] font-montserrat">
                    80–85%
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-500 mt-0.5">
                    Placement Record
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#00bcd4] font-montserrat">
                    6,000+
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-500 mt-0.5">
                    Alumni Network
                  </div>
                </div>
              </div>
            </article>

            {/* Vision & Mission */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] text-[#FF3115] flex items-center justify-center font-bold text-xl mb-4">
                    🎯
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-montserrat mb-2">
                    Our Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-roboto">
                    To emerge as a premier centre of excellence in polytechnic engineering, technical
                    craftsmanship, and management education in Eastern India — cultivating
                    innovation, industry-ready competency, and ethical leadership.
                  </p>
                </div>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center font-bold text-xl mb-4">
                    🚀
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-montserrat mb-2">
                    Our Mission
                  </h3>
                  <ul className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-roboto space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-1" />
                      <span>
                        <strong>Workshop-First Pedagogy:</strong> Hands-on machinery from Semester
                        One.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-1" />
                      <span>
                        <strong>Industry &amp; Research Ties:</strong> Active MoUs with CSIR-CMERI
                        and top MNCs.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-1" />
                      <span>
                        <strong>Affordable Access:</strong> Subsidized training with SVMCM and
                        OASIS support.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Milestones of an 18-Year Journey */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Timeline
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Milestones of an 18-Year Educational Journey
                </h3>
              </div>

              <div className="space-y-4">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/70 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="w-16 h-10 rounded-lg bg-[#FF3115] text-white flex items-center justify-center font-black text-sm tracking-wide shrink-0">
                      {m.year}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-neutral-900">{m.title}</h4>
                      <p className="text-xs text-neutral-600 mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Leadership Overview Links */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Governance Desk
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Institutional Leadership Messages
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/messages-from-president-secretary"
                  className="group p-5 rounded-xl border border-neutral-200 hover:border-[#FF3115] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-2">🏛️</div>
                    <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF3115] transition-colors">
                      President &amp; Secretary
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Sponsoring body vision, trust history, and expansion charter.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#FF3115] mt-4 flex items-center gap-1">
                    Read Message →
                  </span>
                </Link>

                <Link
                  href="/message-from-principal"
                  className="group p-5 rounded-xl border border-neutral-200 hover:border-[#FF3115] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-2">🎓</div>
                    <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF3115] transition-colors">
                      Principal’s Desk
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Academic rigor, laboratory excellence, and career pathways.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#FF3115] mt-4 flex items-center gap-1">
                    Read Message →
                  </span>
                </Link>

                <Link
                  href="/message-from-vice-principal"
                  className="group p-5 rounded-xl border border-neutral-200 hover:border-[#FF3115] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-2">🛡️</div>
                    <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF3115] transition-colors">
                      Vice Principal
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Student welfare, anti-ragging security, and scholarships.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#FF3115] mt-4 flex items-center gap-1">
                    Read Message →
                  </span>
                </Link>
              </div>
            </article>

            {/* MoUs & Industrial Associations */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Credibility &amp; Networks
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Institutional Affiliations, MoUs &amp; Memberships
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partnerships.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-neutral-900">{p.title}</h4>
                      <span className="text-[10px] font-bold text-[#FF3115] bg-[#FFF0ED] px-2 py-0.5 rounded">
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">{p.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </main>

          {/* Institutional Sidebar (30%) */}
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
