import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { FileText, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function RtiProcessOfficerPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Statutory Transparency"
        badge="RTI Act 2005"
        title="RTI Process &amp; Officer"
        subtitle="Public Information Officer (PIO), First Appellate Authority, and application procedures under Right to Information Act 2005."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'RTI Process & Officer' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            {/* Overview Card */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Statutory Transparency
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Right to Information (RTI) Compliance
                </h2>
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  In accordance with the provisions of the <strong>Right to Information Act, 2005</strong>,
                  The New Horizons Institute of Technology maintains proactive disclosure of its
                  academic regulations, approvals, fee structures, and administrative framework to
                  ensure accountability and public transparency.
                </p>
                <p>
                  Any citizen of India seeking specific institutional information may file a written
                  application addressed to the Public Information Officer (PIO) accompanied by the
                  prescribed statutory fee.
                </p>
              </div>

              {/* PIO & Appellate Authority Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/80 space-y-2">
                  <span className="text-[11px] font-bold text-[#FF3115] uppercase tracking-wider">
                    Statutory Officer
                  </span>
                  <h3 className="font-bold text-base text-neutral-900 font-montserrat">
                    Public Information Officer (PIO)
                  </h3>
                  <div className="text-xs text-neutral-600 space-y-1">
                    <div><strong>Designation:</strong> Registrar / Senior Administrative Officer</div>
                    <div><strong>Office:</strong> Administrative Block, NHIT Campus</div>
                    <div><strong>Address:</strong> Phase-II, City Center, South G.T. Road, Durgapur — 713208</div>
                    <div><strong>Email:</strong> <span className="font-mono text-[#FF3115]">pio@nhit.in</span></div>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/80 space-y-2">
                  <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">
                    Appellate Jurisdiction
                  </span>
                  <h3 className="font-bold text-base text-neutral-900 font-montserrat">
                    First Appellate Authority (FAA)
                  </h3>
                  <div className="text-xs text-neutral-600 space-y-1">
                    <div><strong>Designation:</strong> Principal, NHIT Durgapur</div>
                    <div><strong>Office:</strong> Office of the Principal, NHIT Campus</div>
                    <div><strong>Address:</strong> Phase-II, City Center, South G.T. Road, Durgapur — 713208</div>
                    <div><strong>Email:</strong> <span className="font-mono text-[#10B981]">principal@nhit.in</span></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Application Procedure Card */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Guidelines
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Procedure for Submitting an RTI Application
                </h3>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed list-decimal pl-5">
                <li>
                  <strong>Application Format:</strong> Draft an application in English or Bengali
                  stating clearly the specific information sought, along with the applicant&apos;s full
                  name, contact address, and phone number.
                </li>
                <li>
                  <strong>Application Fee:</strong> Enclose a non-refundable application fee of ₹10/-
                  (Rupees Ten only) via Demand Draft, Indian Postal Order (IPO), or cash receipt from
                  the institute accounts counter, payable to <em>&ldquo;The New Horizons Institute of Technology&rdquo;</em>.
                </li>
                <li>
                  <strong>Postal Delivery:</strong> Send via Registered/Speed Post or deliver in person
                  to the Public Information Officer, NHIT Campus, Phase-II, City Center, Durgapur —
                  713208.
                </li>
                <li>
                  <strong>Time Limit for Response:</strong> The PIO will furnish information or reply
                  within <strong>30 days</strong> from the date of receipt, as mandated under Section
                  7(1) of the RTI Act 2005.
                </li>
              </ol>
            </article>
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
