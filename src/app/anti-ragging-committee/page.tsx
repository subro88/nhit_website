import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { ShieldAlert, PhoneCall, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AntiRaggingCommitteePage() {
  const committeeMembers = [
    {
      name: 'Dr. Principal',
      role: 'Principal, NHIT Durgapur',
      position: 'Chairman',
      contact: '+91 9434005886',
      email: 'principal@nhit.in',
    },
    {
      name: 'Prof. Academic In-Charge',
      role: 'Vice Principal & HOD',
      position: 'Convener & Member Secretary',
      contact: '+91 9800571423',
      email: 'viceprincipal@nhit.in',
    },
    {
      name: 'Senior Police Official',
      role: 'Inspector-in-Charge, Local Police Station',
      position: 'Civil Administration Member',
      contact: 'Durgapur Police Comm.',
      email: 'police@wb.gov.in',
    },
    {
      name: 'Media Representative',
      role: 'Senior Bureau Correspondent',
      position: 'Local Media Member',
      contact: 'City Center Desk',
      email: 'media@nhit.in',
    },
    {
      name: 'NGO Representative',
      role: 'Social Welfare Activist',
      position: 'Youth Welfare Member',
      contact: 'Durgapur Chapter',
      email: 'ngo@nhit.in',
    },
    {
      name: 'Faculty Representatives (6 Branches)',
      role: 'Senior Assistant Professors',
      position: 'Faculty Members',
      contact: 'Through T&P / Dept Offices',
      email: 'faculty@nhit.in',
    },
    {
      name: 'Hostel Wardens (Boys & Girls)',
      role: 'Resident Wardens',
      position: 'Residential Vigilance',
      contact: 'Hostel Gate Control',
      email: 'hostel@nhit.in',
    },
    {
      name: 'Student Representatives',
      role: 'Senior & Fresher Batch Meritorious Students',
      position: 'Student Members',
      contact: 'Internal Cell',
      email: 'studentcell@nhit.in',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Statutory Student Safeguards"
        badge="Zero-Tolerance Campus"
        title="Anti-Ragging Committee &amp; Squad"
        subtitle="Uncompromising safety, proactive mentorship, and strict compliance with Hon'ble Supreme Court directives and AICTE Anti-Ragging Regulations."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'Anti-Ragging Committee' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            {/* Zero Tolerance Declaration Card */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Statutory Mandate
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Zero-Tolerance Anti-Ragging Policy
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF0ED] border-l-4 border-[#FF3115] text-neutral-800 text-sm leading-relaxed space-y-3 font-roboto">
                <p className="font-bold text-[#FF3115]">
                  Ragging in any form is strictly banned inside the campus, classrooms, laboratories,
                  hostels, buses, and off-campus surroundings.
                </p>
                <p>
                  As per the directions of the <strong>Hon&apos;ble Supreme Court of India</strong> and
                  the regulations framed by <strong>AICTE (Notification F.No. 37-3/Legal/AICTE/2009)</strong>,
                  any student found indulging in physical, verbal, mental, or cyber ragging will face
                  immediate suspension, permanent expulsion, cancellation of admission, and FIR
                  lodging with civil law enforcement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <div className="text-xs font-bold text-neutral-900">National Helpline (Toll-Free)</div>
                  <div className="text-lg font-black text-[#FF3115] font-mono">1800-180-5522</div>
                  <div className="text-[11px] text-neutral-500">24x7 Round-the-clock national support</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <div className="text-xs font-bold text-neutral-900">Institute Direct Helpline</div>
                  <div className="text-lg font-black text-neutral-900 font-mono">+91 9434005886</div>
                  <div className="text-[11px] text-neutral-500">Immediate campus squad response</div>
                </div>
              </div>
            </article>

            {/* Committee Member Roster */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Committee Roster
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Anti-Ragging Committee Composition
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-neutral-700 border border-neutral-200 rounded-lg">
                  <thead className="bg-neutral-100 text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Designation / Role</th>
                      <th className="px-4 py-3">Committee Capacity</th>
                      <th className="px-4 py-3">Helpline / Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {committeeMembers.map((m, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                        <td className="px-4 py-3">
                          <div className="font-bold text-neutral-900">{m.name}</div>
                          <div className="text-[11px] text-neutral-500">{m.role}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-neutral-800">{m.position}</span>
                        </td>
                        <td className="px-4 py-3 font-mono text-neutral-600">{m.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
