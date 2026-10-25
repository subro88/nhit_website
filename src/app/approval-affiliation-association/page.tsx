import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { Award, CheckCircle, ExternalLink, ShieldCheck, Building } from 'lucide-react';

export default function ApprovalAffiliationPage() {
  const statutoryApprovals = [
    {
      title: 'AICTE, New Delhi',
      body: 'All India Council for Technical Education, Ministry of Education, Govt. of India',
      status: 'Approved & Annual Extension of Approval (EoA) Current',
      id: 'AICTE Permanent Institute ID: 1-475249561',
      details:
        'All six diploma engineering programs (Mechanical, Computer Science, Electrical, Civil, Electronics & Telecom, and Automobile) are fully approved with verified faculty-student ratios, physical campus acreage, and laboratory requirements.',
    },
    {
      title: 'WBSCT&VE&SD, Kolkata',
      body: 'West Bengal State Council of Technical & Vocational Education and Skill Development',
      status: 'Statutory Polytechnic Affiliation',
      id: 'State Council Institute Code: NHIT-078',
      details:
        'Administers the state-approved 3-year semester curriculum, conduct of semester examinations, evaluation, and awarding of the Diploma in Engineering certificate.',
    },
    {
      title: 'NCVT / DGT, Govt. of India',
      body: 'National Council for Vocational Training / Directorate General of Training',
      status: 'Approved Industrial Training Institute (ITI)',
      id: 'DGT / NCVT Reg. No. DGT-6/25/12/2014-TC',
      details:
        'Craftsman Training Scheme (CTS) for 2-Year Full-Time trades in Electrician and Fitter at NHIT Private ITI.',
    },
    {
      title: 'MAKAUT, West Bengal',
      body: 'Maulana Abul Kalam Azad University of Technology, West Bengal',
      status: 'University Affiliated UG Wing',
      id: 'Apex State Technical University',
      details:
        'Affiliated for 3-Year & 4-Year undergraduate programs including Bachelor of Computer Applications (BCA), BBA, and BBA in Hospital Management.',
    },
  ];

  const mousAndMemberships = [
    {
      title: 'CSIR-CMERI Durgapur',
      type: 'National Research MoU',
      desc: 'Central Mechanical Engineering Research Institute, CSIR, Govt. of India — joint faculty training, student instrumentation visits, and sponsored technical workshops.',
    },
    {
      title: 'The Institution of Engineers (India)',
      type: 'Life Institutional Member',
      desc: 'Life Institutional Membership granting students and faculty access to national engineering symposiums, seminars, and professional accreditation networks.',
    },
    {
      title: 'Indian Society for Technical Education (ISTE)',
      type: 'Institutional Member',
      desc: 'Premier national society for technical education advancement, teacher quality improvement, and student skill conventions.',
    },
    {
      title: 'National Entrepreneurship Network (NEN)',
      type: 'Incubation MoU',
      desc: 'Wadhwani Foundation partnership cultivating campus startups, student business ventures, and entrepreneurship bootcamps.',
    },
    {
      title: 'HCL Technologies',
      type: 'Corporate Technical Tie-Up',
      desc: 'Industry curriculum alignment, guest lectures from enterprise architects, and priority campus hiring pipeline.',
    },
    {
      title: 'British Council Library Access',
      type: 'Academic Library Partnership',
      desc: 'Institutional access to world-class technical publications, digital journal repositories, and communicative English development material.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Statutory Compliance &amp; Credentials"
        badge="AICTE PID: 1-475249561"
        title="Approval, Affiliation &amp; Association"
        subtitle="100% compliant with national statutory bodies, state technical councils, apex universities, and research institutes."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'Approvals & MoUs' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            {/* Statutory Approvals Cards */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  National &amp; State Councils
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Statutory Approvals &amp; Affiliations
                </h2>
              </div>

              <div className="space-y-5">
                {statutoryApprovals.map((app, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-xl border border-neutral-200/90 bg-neutral-50/60 hover:bg-neutral-50 transition-colors space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-bold text-base text-[#0F172A] font-montserrat">
                        {app.title}
                      </h3>
                      <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full w-fit">
                        {app.status}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-500 font-mono">
                      {app.id}
                    </div>
                    <p className="text-xs text-neutral-600 font-roboto">{app.body}</p>
                    <p className="text-xs sm:text-sm text-neutral-700 font-roboto pt-1 leading-relaxed">
                      {app.details}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* MoUs & Industrial Associations */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Collaborative Ecosystem
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Institutional MoUs &amp; Professional Memberships
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mousAndMemberships.map((mou, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-neutral-200/80 bg-white space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="font-bold text-sm text-neutral-900 font-montserrat">
                          {mou.title}
                        </h4>
                        <span className="text-[10px] font-bold text-[#FF3115] bg-[#FFF0ED] px-2 py-0.5 rounded shrink-0">
                          {mou.type}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-roboto">
                        {mou.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
