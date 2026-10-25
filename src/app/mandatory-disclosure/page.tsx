import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { ShieldCheck, Download, FileText, CheckCircle2, Building, Scale, Users, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mandatory Disclosure | AICTE Compliance & Institutional Governance — NHIT Durgapur',
  description: 'Official AICTE Mandatory Disclosure for The New Horizons Institute of Technology (NHIT Durgapur). Comprehensive statutory information on governance, approved intakes, faculty, and student redressal cells.',
};

export default function MandatoryDisclosurePage() {
  const programmes = [
    { name: 'Diploma in Mechanical Engineering (ME)', level: 'Diploma', duration: '3 Years', intake: '120 Seats', body: 'AICTE / WBSCTE' },
    { name: 'Diploma in Electrical Engineering (EE)', level: 'Diploma', duration: '3 Years', intake: '120 Seats', body: 'AICTE / WBSCTE' },
    { name: 'Diploma in Civil Engineering (CE)', level: 'Diploma', duration: '3 Years', intake: '60 Seats', body: 'AICTE / WBSCTE' },
    { name: 'Diploma in Computer Science & Technology (CST)', level: 'Diploma', duration: '3 Years', intake: '60 Seats', body: 'AICTE / WBSCTE' },
    { name: 'Diploma in Automobile Engineering (AE)', level: 'Diploma', duration: '3 Years', intake: '60 Seats', body: 'AICTE / WBSCTE' },
    { name: 'Diploma in Electronics & Telecommunication (ETCE)', level: 'Diploma', duration: '3 Years', intake: '60 Seats', body: 'AICTE / WBSCTE' },
    { name: 'ITI Electrician Trade', level: 'NCVT Certificate', duration: '2 Years', intake: '20 Seats', body: 'DGT / NCVT Govt. of India' },
    { name: 'ITI Fitter Trade', level: 'NCVT Certificate', duration: '2 Years', intake: '20 Seats', body: 'DGT / NCVT Govt. of India' },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        title="Mandatory Disclosure"
        subtitle="Statutory disclosures under AICTE Approval Process Handbook regulations, detailing legal registration, infrastructure metrics, sanctioned intake capacities, faculty credentials, and grievance mechanisms."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'Mandatory Disclosure' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Status Header Badge */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#ff3115]">
                  <ShieldCheck className="w-4 h-4" /> AICTE Statutory Compliance
                </span>
                <span className="text-xs font-semibold text-gray-500">Updated as per Current Regulations</span>
              </div>

              {/* Section 1: Basic Profile */}
              <div className="pt-6">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  1. Basic Institutional Profile
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  In compliance with the regulations formulated by the <strong>All India Council for Technical Education (AICTE)</strong>, New Delhi, and the <strong>West Bengal State Council of Technical and Vocational Education and Skill Development (WBSCTE)</strong>, Kolkata, The New Horizons Institute of Technology publishes its comprehensive institutional profile for public transparency and statutory governance verification.
                </p>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 font-semibold text-gray-700 w-1/3">Name of Institution</th>
                        <td className="py-3 px-4 font-bold text-gray-900">THE NEW HORIZONS INSTITUTE OF TECHNOLOGY (NHIT)</td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 font-semibold text-gray-700">AICTE Permanent ID</th>
                        <td className="py-3 px-4 font-bold text-[#ff3115]">1-475249561 <span className="font-normal text-gray-500 text-xs">(First Approved in 2007)</span></td>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 font-semibold text-gray-700">Campus Address</th>
                        <td className="py-3 px-4 text-gray-700">Phase-II, City Centre, South G.T. Road, Near Gandhi More, Durgapur, Paschim Bardhaman, West Bengal – 713208</td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 font-semibold text-gray-700">Campus Phone &amp; Fax</th>
                        <td className="py-3 px-4 text-gray-700">Phone: (0343) 2542102 / 2542103 / 2542104 / 2542106 | Fax: (0343) 2542106</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 font-semibold text-gray-700">Official Email &amp; Web</th>
                        <td className="py-3 px-4 text-gray-700">
                          <a href="mailto:info@nhit.in" className="text-[#ff3115] hover:underline mr-2">info@nhit.in</a> / 
                          <a href="mailto:principal@nhit.in" className="text-[#ff3115] hover:underline mx-2">principal@nhit.in</a> | 
                          <span className="ml-2 font-medium">www.nhit.in</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="py-3 px-4 font-semibold text-gray-700">Nearest Railway &amp; Airport</th>
                        <td className="py-3 px-4 text-gray-700">Railway: Durgapur Railway Station (DGR - 4.5 km) | Airport: Kazi Nazrul Islam Airport, Andal (RKN - 18 km) &amp; NSCBI Kolkata (CCU - 165 km)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 font-semibold text-gray-700">Institution Type</th>
                        <td className="py-3 px-4 text-gray-700">Private Self-Financed Polytechnic Institute (Non-Autonomous, Co-Educational)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <Building className="w-4 h-4 text-amber-600" /> Campus Land &amp; Title Verification
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    The institute operates on a unified, self-contained <strong>2.50 Acre institutional land parcel</strong> in prime Durgapur City Centre, granted via official long-term government lease registered with the <strong>Asansol Durgapur Development Authority (ADDA)</strong>, Government of West Bengal. The entire educational building infrastructure is fully sanctioned and custom-constructed for technical education.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Sponsoring Society */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                2. Sponsoring Society / Trust Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The New Horizons Institute of Technology was founded and is managed by <strong>Durgapur Ispat Peoples&apos; Society</strong>, a registered non-profit educational body dedicated to industrial skill advancement and higher technical learning in eastern India.
              </p>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 font-semibold text-gray-700 w-1/3">Name of Society</th>
                      <td className="py-3 px-4 font-bold text-gray-900">DURGAPUR ISPAT PEOPLES&apos; SOCIETY</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-semibold text-gray-700">Registration Type &amp; Act</th>
                      <td className="py-3 px-4 text-gray-700">Registered under West Bengal Societies Registration Act XXVI of 1961 (Reg. No. S/1L/18925)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 font-semibold text-gray-700">Registered Office</th>
                      <td className="py-3 px-4 text-gray-700">6/7, Einstein Avenue, B-Zone, Durgapur – 713205, Paschim Bardhaman, West Bengal</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-semibold text-gray-700">Corporate / Campus Office</th>
                      <td className="py-3 px-4 text-gray-700">NHIT Campus, Phase-II, City Centre, South G.T. Road, Near Gandhi More, Durgapur – 713208</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 font-semibold text-gray-700">Contact Numbers</th>
                      <td className="py-3 px-4 text-gray-700">+91 9332038481 / +91 9332038482 / (0343) 2542106</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-semibold text-gray-700">Society Official Email</th>
                      <td className="py-3 px-4 text-gray-700">
                        <a href="mailto:dipsdgp@rediffmail.com" className="text-[#ff3115] hover:underline mr-2">dipsdgp@rediffmail.com</a> / 
                        <a href="mailto:info@nhit.in" className="text-[#ff3115] hover:underline ml-2">info@nhit.in</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Head of Institution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                3. Head of the Institution (Principal)
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 font-semibold text-gray-700 w-1/3">Principal Name</th>
                      <td className="py-3 px-4 font-bold text-gray-900">Mr. Sandip Hazra</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-semibold text-gray-700">Designation</th>
                      <td className="py-3 px-4 text-gray-700">Principal, The New Horizons Institute of Technology</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 font-semibold text-gray-700">Academic Qualifications</th>
                      <td className="py-3 px-4 text-gray-700">B.Tech (Electrical Engineering), M.Tech (Electrical Engineering)</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-semibold text-gray-700">Specialization Area</th>
                      <td className="py-3 px-4 text-gray-700">Power Systems Engineering &amp; Industrial Power Plant Drives</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 font-semibold text-gray-700">Total Experience</th>
                      <td className="py-3 px-4 text-gray-700">18+ Years in Technical Education, Academic Administration &amp; Research</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 font-semibold text-gray-700">Official Telephone &amp; Mobile</th>
                      <td className="py-3 px-4 text-gray-700">Office: (0343) 2542106 | Mobile: +91 81609 09460</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 font-semibold text-gray-700">Official Email</th>
                      <td className="py-3 px-4 text-[#ff3115] font-medium"><a href="mailto:principal@nhit.in">principal@nhit.in</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Programmes & Sanctioned Intake */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                4. Programmes Offered &amp; Approved Intakes
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                All diploma programs are run in strict compliance with the AICTE Approved Intake Matrix, featuring full-time 3-year curriculum (6 semesters) affiliated with WBSCTE:
              </p>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
                      <th className="py-3 px-4">Course Name</th>
                      <th className="py-3 px-4">Level</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Sanctioned Intake</th>
                      <th className="py-3 px-4">Affiliating Body</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {programmes.map((p, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-50/50' : ''}>
                        <td className="py-3 px-4 font-semibold text-gray-900">{p.name}</td>
                        <td className="py-3 px-4 text-gray-600">{p.level}</td>
                        <td className="py-3 px-4 text-gray-600">{p.duration}</td>
                        <td className="py-3 px-4 font-bold text-[#ff3115]">{p.intake}</td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{p.body}</td>
                      </tr>
                    ))}
                    <tr className="bg-orange-50/60 font-bold border-t-2 border-[#ff3115]">
                      <td className="py-3 px-4 text-gray-900">Total Approved Annual Intake</td>
                      <td className="py-3 px-4 text-gray-700">All Disciplines</td>
                      <td className="py-3 px-4 text-gray-700">—</td>
                      <td className="py-3 px-4 text-[#ff3115] text-base">520 Students / Year</td>
                      <td className="py-3 px-4 text-gray-700 text-xs">Full AICTE &amp; NCVT Quota</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 5: Statutory Committees */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                5. Statutory Grievance &amp; Welfare Committees
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To preserve student equity, mental wellbeing, academic fairness, and complete campus security, the following statutory bodies are instituted and functional:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#ff3115]">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Anti-Ragging Committee &amp; Squad</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Operates 24x7 with faculty patrolling, student counsellors, local police liaison, and mandatory online undertaking via anti-ragging portal. Zero tolerance enforcement.
                  </p>
                  <Link href="/anti-ragging-committee" className="inline-block mt-2 text-xs font-semibold text-[#ff3115] hover:underline">
                    View Roster &amp; Helpline &rarr;
                  </Link>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Internal Complaints Committee (ICC)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Constituted under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, ensuring safe learning environment for female students and staff.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Student Grievance Redressal Cell (SGRC)</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Headed by Senior Faculty for examination, hostel, transport, or administrative appeals with statutory resolution timeframes.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-bold text-gray-900 text-base mb-2">SC / ST / OBC &amp; Minority Cell</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Dedicated cell supervising state scholarships (SVMCM, OASIS, Aikyashree, National Scholarship Portal) and ensuring affirmative counseling without bias.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6: Official PDF Download Dossiers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                6. Official Statutory Disclosure Documents
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Students, parents, regulatory inspection officers, and academic auditors may access and download authentic scanned disclosure dossiers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 border border-gray-200 rounded-xl flex flex-col justify-between hover:border-[#ff3115] transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="w-8 h-8 text-[#ff3115] shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">AICTE Mandatory Disclosure (Complete Booklet)</h4>
                      <p className="text-xs text-gray-500 mt-1">Official AICTE Formatted Dossier · PDF Document</p>
                    </div>
                  </div>
                  <a
                    href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#ff3115] text-white text-xs font-bold rounded-lg hover:bg-[#e0260c] transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download PDF Booklet
                  </a>
                </div>

                <div className="p-5 border border-gray-200 rounded-xl flex flex-col justify-between hover:border-gray-900 transition-colors">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">AICTE Extension of Approval (EoA) Archive</h4>
                      <p className="text-xs text-gray-500 mt-1">Annual Extension of Approval Archive (2007–Present)</p>
                    </div>
                  </div>
                  <Link
                    href="/approval-affiliation-association"
                    className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View Approval Letters
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
              <SidebarNav />
          </div>
        </div>
      </main>
    </div>
  );
}
