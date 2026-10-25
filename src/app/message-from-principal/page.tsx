import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';

export default function MessageFromPrincipalPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Academic Executive Desk"
        badge="Office of the Principal"
        title="Message from the Principal"
        subtitle="Welcome from the Academic Head of The New Horizons Institute of Technology, Durgapur."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'Principal’s Message' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start border-b border-neutral-100 pb-6">
                <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden shrink-0 border-2 border-neutral-200 shadow-md">
                  <img
                    src="/images/principal.jpg"
                    alt="Principal, NHIT Durgapur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                    Executive Academic Head
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                    From the Desk of the Principal
                  </h2>
                  <p className="text-xs font-semibold text-neutral-500 mt-1">
                    The New Horizons Institute of Technology (NHIT Durgapur)
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold">
                    <span>AICTE Approved · WBSCT&amp;VE&amp;SD Affiliated</span>
                  </div>
                </div>
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  <strong>Welcome to The New Horizons Institute of Technology.</strong> As educators
                  in a rapidly advancing technological era, we hold the conviction that genuine
                  engineering competence is forged in the laboratories and heavy workshops, not
                  merely absorbed from textbooks.
                </p>
                <p>
                  At NHIT, every diploma engineering curriculum is systematically structured to
                  balance foundational physics, mathematics, and computation with hands-on machinery
                  mastery. Our students engage with CNC milling, high-voltage test rigs, Cisco
                  networking terminals, and live vehicle teardowns from their earliest semesters.
                </p>
                <p>
                  We take immense pride in our disciplined campus environment, active Training &amp;
                  Placement Cell, and national research linkages with institutions like CSIR-CMERI.
                  Over 85% of our eligible pass-out students consistently transition into core MNC
                  employment or lateral admission into premier B.Tech degree programs.
                </p>
                <p>
                  I invite aspiring students and proud parents to tour our campus, interact with our
                  dedicated faculty, and begin an inspiring journey toward technical distinction.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-500">
                <span>Durgapur, West Bengal</span>
                <span className="font-bold text-neutral-800">
                  Principal, NHIT Durgapur
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
