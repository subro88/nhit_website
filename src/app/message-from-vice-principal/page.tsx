import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';

export default function MessageFromVicePrincipalPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Student Welfare &amp; Academic Operations"
        badge="Office of Vice Principal"
        title="Message from the Vice Principal"
        subtitle="Academic operations, student welfare, anti-ragging vigilance, and scholarship facilitation at NHIT Durgapur."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'Vice Principal’s Message' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Academic Operations &amp; Welfare
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Message from the Vice Principal
                </h2>
                <p className="text-xs font-semibold text-neutral-500 mt-1">
                  Vice Principal &amp; Academic In-Charge · NHIT Durgapur
                </p>
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  &ldquo;At NHIT, academic discipline and student welfare go hand-in-hand. We maintain
                  an uncompromising zero-tolerance anti-ragging campus with dedicated faculty mentors
                  assigned to each batch from their first orientation day.&rdquo;
                </p>
                <p>
                  &ldquo;Our academic cell operates transparently with regular internal assessments,
                  practical lab examinations, and remedial tutorial sessions for students needing
                  additional academic support. Whether helping eligible candidates secure West Bengal
                  Government scholarships such as <strong>SVMCM (Swami Vivekananda Merit-cum-Means)</strong>,
                  <strong> OASIS</strong>, and <strong>Aikyashree</strong>, or coordinating technical
                  symposiums, our administrative and counseling teams stand by our students at every
                  milestone.&rdquo;
                </p>
                <p>
                  &ldquo;We encourage our students to immerse themselves in workshops, maintain
                  curiosity, and build enduring professional values.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-500">
                <span>Durgapur Campus</span>
                <span className="font-bold text-neutral-800">
                  Vice Principal, NHIT Durgapur
                </span>
              </div>
            </article>
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
