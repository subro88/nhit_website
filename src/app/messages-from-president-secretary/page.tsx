import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';

export default function MessagesFromPresidentSecretaryPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Executive Governance Desk"
        badge="Trust Leadership"
        title="Messages from President &amp; Secretary"
        subtitle="Insights, institutional commitments, and visionary guidance from the Governing Council of Durgapur Ispat People's Society and NHIT."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'President & Secretary' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            {/* President's Message */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Apex Leadership
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Message from the President
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF0ED] border-l-4 border-[#FF3115] text-neutral-800 text-sm leading-relaxed space-y-4 font-roboto italic">
                <p>
                  &ldquo;Technical education is the real engine of national progress. When NHIT was
                  conceived in 2007, our goal was not simply to erect classrooms, but to create an
                  intellectual home where students from all walks of life could master engineering
                  trades with high self-esteem and genuine competence.&rdquo;
                </p>
                <p>
                  &ldquo;Over the last eighteen years, NHIT graduates have proven their mettle across
                  multinational core plants, software enterprises, and national infrastructure
                  projects. With our expanding research tie-ups and academic affiliations, we
                  rededicate ourselves to building capable technocrats and ethical leaders for Bengal
                  and the nation.&rdquo;
                </p>
              </div>

              <div className="pt-2 text-right">
                <div className="font-bold text-sm text-neutral-900 font-montserrat">President</div>
                <div className="text-xs text-neutral-500">
                  Durgapur Ispat People&apos;s Society · NHIT Durgapur
                </div>
              </div>
            </article>

            {/* Secretary's Message */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Operational Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Message from the Secretary
                </h2>
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  &ldquo;At NHIT, we believe that education is an active partnership between student
                  aspirations, faculty mentorship, and industrial reality. We have made continuous
                  capital investments in our departmental laboratories — from heavy CNC lathes and
                  hydraulic presses to cloud computing clusters and renewable energy rigs.&rdquo;
                </p>
                <p>
                  &ldquo;Our proactive Training &amp; Placement Cell works year-round with automotive,
                  construction, and IT conglomerates to ensure that every graduating student is
                  equipped not merely with a certificate, but with tangible day-one employable
                  competence.&rdquo;
                </p>
                <p>
                  &ldquo;We welcome every aspiring technocrat to step into the NHIT campus and
                  realize their full potential.&rdquo;
                </p>
              </div>

              <div className="pt-2 text-right border-t border-neutral-100">
                <div className="font-bold text-sm text-neutral-900 font-montserrat">
                  Sri Partha Mandal
                </div>
                <div className="text-xs text-neutral-500">
                  Secretary · Durgapur Ispat People&apos;s Society &amp; NHIT Durgapur
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
