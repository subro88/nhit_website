import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  CheckCircle2, 
  Download, 
  FileText, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Award,
  CreditCard,
  Building,
  HelpCircle
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';

export const metadata = {
  title: 'Admissions 2026–27 | Eligibility, Roadmap & Fee Structure — NHIT Durgapur',
  description: 'Complete admissions portal for NHIT Durgapur. 3-Year Diploma in Engineering (JEXPO / Direct), 2-Year VOCLET Lateral Entry, and NCVT ITI Trades. Verified fee structure and scholarship guidance.',
};

export default function AdmissionsPage() {
  const roadmapSteps = [
    {
      num: '01',
      title: 'Check Eligibility',
      text: 'Class 10 (Madhyamik or equivalent) with Science, Mathematics & English. Minimum qualifying aggregate per Council norms. Relaxations apply for reserved/sports categories.',
    },
    {
      num: '02',
      title: 'Apply & Counsel',
      text: 'Collect and submit application form at the NHIT Admission Desk (Phase-II, City Centre, Durgapur) or register online. Connect with departmental academic counsellors.',
    },
    {
      num: '03',
      title: 'Merit & Branch Selection',
      text: 'Selection on Class 10 merit or state JEXPO rank following WBSCT&VE&SD norms. Branch preference is locked in directly with the admissions officer.',
    },
    {
      num: '04',
      title: 'Verify & Enroll',
      text: 'Marksheets, admit card, Aadhaar ID proof, and passport photos are verified on the spot. Initial semester fee payment completes institutional enrolment.',
    },
    {
      num: '05',
      title: 'Begin Semester 1',
      text: 'Campus induction, workshop floor allotment, and identity card issuance. Classes begin per State Council academic calendar with early workshop practice.',
    },
  ];

  const feeSlab = [
    { head: 'Tuition Fee', schedule: 'Per Semester', notes: 'As notified by WBSCT&VE&SD / Institute each session' },
    { head: 'Admission & Registration', schedule: 'One-time (Sem 1)', notes: 'Council registration and administrative admission fee' },
    { head: 'Laboratory & Workshop Fee', schedule: 'Per Semester', notes: 'Covers consumable workshop materials, tool access & lab power' },
    { head: 'Examination Fee', schedule: 'Per Council Cycle', notes: 'Collected as per WBSCTVESD state examination schedule' },
    { head: 'Institutional Development', schedule: 'Annual', notes: 'Library access, high-speed Wi-Fi & campus facilities' },
  ];

  const scholarships = [
    {
      name: 'Swami Vivekananda Merit-cum-Means (SVMCM)',
      dept: 'Govt. of West Bengal Higher Education Dept.',
      benefit: '₹18,000 / Year',
      criteria: 'Min. 60% in Madhyamik / Class 10 for family income < ₹2.5 Lakhs/yr',
    },
    {
      name: 'OASIS Scholarship',
      dept: 'Backward Classes Welfare Dept., Govt. of West Bengal',
      benefit: 'Tuition + Maintenance Grants',
      criteria: 'Eligible SC, ST, and OBC candidates enrolled in full-time diploma courses',
    },
    {
      name: 'Aikyashree Scholarship',
      dept: 'West Bengal Minorities Development & Finance Corp.',
      benefit: 'State Fellowship Support',
      criteria: 'Merit-cum-means scholarship for minority community students (Muslim, Christian, etc.)',
    },
    {
      name: 'Kanyashree Prakalpa (K2 & K3)',
      dept: 'Women & Social Welfare Dept., Govt. of West Bengal',
      benefit: 'Annual Grant for Girl Students',
      criteria: 'Empowering female technical candidates pursuing diploma engineering',
    },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="Session 2026–2027 Admissions Open · AICTE Approved"
        title="Admissions Hub"
        subtitle="Join eastern India's premier technical institute in Durgapur. Direct entry for Class 10 school leavers, 2nd-year lateral entry via VOCLET, and 2-year NCVT ITI trades."
        breadcrumbs={[
          { label: 'Admissions' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-16">
        
        {/* ── 5-Step Admission Roadmap ─────────────────────────────── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Step-by-Step Guidance</span>
            <h2 className="text-3xl font-black font-heading text-gray-900 mt-1">
              Admission Roadmap — Class 10 to Engineer
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              A transparent, hassle-free 5-stage admission procedure designed for aspiring polytechnic and ITI candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {roadmapSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[#ff3115] transition-colors relative"
              >
                <div>
                  <div className="text-2xl font-black text-[#ff3115]/30 mb-2 font-mono">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{step.text}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center text-[10px]">
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Two Admission Pathways ───────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pathway 1 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="inline-block px-3 py-1 rounded bg-blue-50 text-blue-700 font-bold text-xs font-mono mb-3">
                PATHWAY 01 · 3 YEARS (6 SEMESTERS)
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                1st Year Diploma Entry (After 10th / Madhyamik)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                Direct entry for school pass-outs into foundational and applied technical sciences. Replaces general high school theory with hands-on workshop craft and state-certified diploma curriculum.
              </p>

              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Passed Class 10 / Madhyamik from any recognized Board with min. 35% aggregate marks.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Compulsory subjects: Mathematics, Physical Science, and English.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Valid rank in JEXPO counseling OR Direct Institutional Quota seat allotment.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No upper age limit as per AICTE and State Council directives.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-3">
              <a
                href="tel:03432542103"
                className="flex-1 py-3 px-4 bg-gray-900 hover:bg-[#ff3115] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4" /> Call Desk: (0343) 2542103
              </a>
            </div>
          </div>

          {/* Pathway 2 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="inline-block px-3 py-1 rounded bg-amber-50 text-amber-700 font-bold text-xs font-mono mb-3">
                PATHWAY 02 · 2 YEARS (4 SEMESTERS)
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                2nd Year Lateral Entry (VOCLET / ITI Pass-Outs)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                Fast-track 2-year diploma pathway directly into 3rd Semester with full credit recognition for 10+2 Science / Vocational or 2-Year ITI certificate holders. Saves an entire academic year.
              </p>

              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Passed 10+2 with Physics/Chemistry/Math/Vocational OR 10th + 2-Year ITI trade.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Valid rank in VOCLET entrance examination conducted by WBSCTVESD.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Directly admitted to 3rd Semester across Mechanical, Electrical, Civil, CST, Automobile, ETCE.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Subsequent eligibility for B.Tech lateral entry through JELET.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-3">
              <a
                href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#ff3115] hover:bg-[#e0260c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Download 2026 Brochure (PDF)
              </a>
            </div>
          </div>

        </section>

        {/* ── Fee Structure & Installment Scaffold ─────────────────── */}
        <section className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Statutory Financial Disclosures</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 mt-1 mb-2">
              Fee &amp; Installment Scaffold
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              NHIT follows transparent fee regulations stipulated by the State Fee Committee, Government of West Bengal, with installment payment flexibility.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table */}
            <div className="lg:col-span-7 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                    <th className="py-3 px-4">Fee Head</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Policy Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feeSlab.map((f, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-gray-50/50' : ''}>
                      <td className="py-3 px-4 font-bold text-gray-900">{f.head}</td>
                      <td className="py-3 px-4 font-semibold text-[#ff3115]">{f.schedule}</td>
                      <td className="py-3 px-4 text-gray-600 text-xs">{f.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 bg-gray-50 border-t border-gray-200 text-[11px] text-gray-500 font-mono">
                // Current session fee schedule is issued with the admission brochure. Confirm at admission desk or call +91 98005 71423.
              </div>
            </div>

            {/* Official Fee Structure Graphic Card */}
            <div className="lg:col-span-5 bg-gray-50 rounded-xl p-5 border border-gray-200 text-center">
              <h4 className="font-bold text-sm text-gray-900 mb-2">Official Fee Structure Notification</h4>
              <p className="text-xs text-gray-500 mb-4">Official publication document detailing branch-wise breakdown</p>
              <div className="relative h-64 rounded-lg overflow-hidden border border-gray-300 bg-white">
                <Image
                  src="/images/nhit-fees-2024.png"
                  alt="Official NHIT fee structure — admission fees, installment amounts and total course fees for all diploma branches and ITI trades"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <a
                href="/images/nhit-fees-2024.png"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#ff3115] hover:underline"
              >
                <span>View Full-Size Document</span> &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ── State Scholarship Assistance ─────────────────────────── */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Financial Aid &amp; Inclusivity</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 mt-1 mb-2">
              Government Scholarship Guidance
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              NHIT has a dedicated SC/ST/OBC and Minority Welfare Cell that actively facilitates student scholarship applications on state and national portals:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scholarships.map((s, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                    {s.benefit}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm mt-3 mb-1">{s.name}</h3>
                  <p className="text-[11px] text-gray-400 font-medium mb-3">{s.dept}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.criteria}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-semibold text-emerald-600">
                  Full Application Assistance at NHIT Desk
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Direct Counseling & Helpline Card ────────────────────── */}
        <section className="bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 text-white rounded-2xl p-8 md:p-10 border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-[#ff3115] border border-[#ff3115]/30">
              Personalized Counseling
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              Need Help Choosing the Right Engineering Branch?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Visit our City Centre campus counseling center or speak directly with our senior admission advisors. We walk you through branch career prospects, lab tours, and fee installment schedules.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+919800571423"
              className="px-6 py-3.5 bg-[#ff3115] hover:bg-[#e0260c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> +91 98005 71423
            </a>
            <a
              href="https://wa.me/917407294943"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              WhatsApp Counseling ↗
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
