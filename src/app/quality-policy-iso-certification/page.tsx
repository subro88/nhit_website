import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { Award, CheckCircle, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export default function QualityPolicyPage() {
  const qualityObjectives = [
    {
      title: 'Outcome-Based Pedagogical Standards',
      desc: 'Deliver curricula systematically mapped to Program Outcomes (POs) and Course Outcomes (COs) aligning with the National Board of Accreditation (NBA) framework.',
    },
    {
      title: 'Continuous Infrastructure Modernization',
      desc: 'Upgrade laboratory equipment, calibration setups, and computing workstations on an annual cycle reflecting technological and industrial evolutions.',
    },
    {
      title: 'Faculty Empowerment & Research',
      desc: 'Mandate periodic faculty development programs (FDPs), industry immersion visits, and research publications with national institutes like CSIR-CMERI.',
    },
    {
      title: 'Proactive Student Support & Safeguards',
      desc: 'Enforce an uncompromised anti-ragging campus, structured mentorship ratios, and grievance redressal turnaround within 48 working hours.',
    },
    {
      title: 'Industry Feedback Integration',
      desc: 'Incorporate structured feedback from corporate recruiters, alumni, and parents into curriculum enrichment, soft skills training, and workshop planning.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Institutional Quality Framework"
        badge="ISO 9001:2015 Certified"
        title="Quality Policy &amp; ISO Certification"
        subtitle="Our institutional commitment to high standards in engineering instruction, governance, laboratory maintenance, and continuous quality enhancement."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'Quality Policy & ISO' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            {/* Quality Policy Declaration */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Official Declaration
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Institutional Quality Policy Statement
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF0ED] border-l-4 border-[#FF3115] text-neutral-800 text-sm leading-relaxed space-y-4 font-roboto italic">
                <p>
                  &ldquo;The New Horizons Institute of Technology is dedicated to providing
                  state-of-the-art technical and polytechnic education through rigorous curriculum
                  delivery, intensive workshop practice, and continuous professional grooming.&rdquo;
                </p>
                <p>
                  &ldquo;We commit to complying with all statutory requirements of AICTE and
                  WBSCT&amp;VE&amp;SD, continually enhancing the effectiveness of our Quality
                  Management System (QMS) in accordance with ISO 9001:2015 international standards,
                  and nurturing ethically grounded, industry-competent engineers.&rdquo;
                </p>
              </div>

              <div className="pt-2 text-right">
                <div className="font-bold text-sm text-neutral-900 font-montserrat">
                  Governing Body &amp; Academic Council
                </div>
                <div className="text-xs text-neutral-500">
                  The New Horizons Institute of Technology
                </div>
              </div>
            </article>

            {/* Quality Objectives */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Strategic Goals
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Key Institutional Quality Objectives
                </h3>
              </div>

              <div className="space-y-4">
                {qualityObjectives.map((obj, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-neutral-200/80 bg-neutral-50/60 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                      <h4 className="font-bold text-sm text-[#0F172A] font-montserrat">
                        {obj.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-roboto pl-6">
                      {obj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* ISO Certification Badge Box */}
            <article className="bg-gradient-to-br from-[#151515] to-[#262626] text-white rounded-2xl p-7 sm:p-9 shadow-md flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-[#FF3115] flex items-center justify-center text-white shrink-0 shadow-lg">
                <Award className="w-10 h-10" />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-bold text-lg font-montserrat">
                  ISO 9001:2015 Certified Educational Institution
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-roboto">
                  Certified for the design, development, and delivery of technical diploma
                  engineering courses, management education, and vocational industrial training
                  programs.
                </p>
                <div className="text-[11px] font-mono text-neutral-400">
                  Annual Surveillance Audits conducted by Accredited International Registrars.
                </div>
              </div>
            </article>
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
