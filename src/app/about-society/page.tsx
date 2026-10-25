import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import { Award, CheckCircle, ShieldCheck, BookOpen, Users, Compass } from 'lucide-react';

export default function AboutSocietyPage() {
  const societyObjectives = [
    {
      title: 'Democratize Technical Education',
      desc: 'Extend professional polytechnic engineering and vocational crafts to rural, semi-urban, and economically backward youth across eastern India.',
    },
    {
      title: 'Industry-Aligned Curricula',
      desc: 'Bridge the critical gap between theoretical technical knowledge and heavy industrial requirements in the Durgapur-Asansol-Raniganj industrial corridor.',
    },
    {
      title: 'State-of-the-Art Workshop Infrastructure',
      desc: 'Build and maintain modern physical laboratories, CNC tooling setups, high-voltage test bays, and computer laboratories exceeding AICTE requirements.',
    },
    {
      title: 'Lifelong Employability & Foundership',
      desc: 'Instill workplace discipline, entrepreneurship aptitude through NEN, and ethical leadership to build resilient career trajectories.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Sponsoring Body · Est. 2004–05"
        badge="Reg. No. S/1L/18925"
        title="About The Sponsoring Society"
        subtitle="The New Horizons Institute of Technology is established and managed by Durgapur Ispat People's Society, registered under the West Bengal Societies Registration Act XXVI of 1961."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'About Society' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <main className="flex-1 space-y-8">
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Genesis &amp; Founding Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Genesis of Durgapur Ispat People&apos;s Society
                </h2>
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  <strong>Durgapur Ispat People&apos;s Society</strong> is a non-profit registered
                  educational society registered with the Registrar of Societies, Government of West
                  Bengal under the West Bengal Societies Registration Act XXVI of 1961 (Registration
                  No. <strong>S/1L/18925 of 2003–2004</strong>).
                </p>
                <p>
                  The idea germinated in <strong>2004–2005</strong>, when a distinguished collective
                  of educators, industrial engineers, and philanthropic visionaries came together to
                  realize their dream of spreading affordable, high-quality technical education
                  throughout Eastern India.
                </p>
              </div>

              {/* Callout Quote */}
              <div className="p-5 rounded-xl bg-[#FFF0ED] border-l-4 border-[#FF3115] text-neutral-800 text-xs sm:text-sm leading-relaxed italic">
                &ldquo;Durgapur had transformed into the primary industrial and educational hub of
                Eastern India, housing premier universities, engineering colleges, and secondary
                schools. However, a high-caliber polytechnic institution offering specialized 3-year
                diploma engineering tailored directly to core industries was conspicuously absent.
                The Society was formed to bridge this critical deficit.&rdquo;
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  On <strong>16 August 2007</strong>, the Society founded its flagship institution,
                  <strong> The New Horizons Institute of Technology (NHIT)</strong>, offering
                  AICTE-approved diploma programs in Mechanical, Electrical, and Civil Engineering.
                  Over subsequent years, the Society expanded into Computer Science, Automobile
                  Engineering, Electronics, and NCVT ITI trades.
                </p>
              </div>
            </article>

            {/* Core Objectives Card */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Charter &amp; Values
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Core Aims &amp; Objectives of the Society
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {societyObjectives.map((obj, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF3115]" />
                      <h4 className="font-bold text-sm text-neutral-900">{obj.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{obj.desc}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Statutory Compliance & Registration Card */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Statutory Records
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Registration &amp; Governance Details
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-neutral-700 border border-neutral-200 rounded-lg">
                  <tbody className="divide-y divide-neutral-200">
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 font-bold text-neutral-900 w-1/3">Name of Society</td>
                      <td className="px-4 py-3">Durgapur Ispat People&apos;s Society</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-neutral-900">Act of Registration</td>
                      <td className="px-4 py-3">West Bengal Societies Registration Act XXVI of 1961</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 font-bold text-neutral-900">Registration Number</td>
                      <td className="px-4 py-3 font-mono font-bold text-[#FF3115]">
                        S/1L/18925 of 2003–2004
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-neutral-900">Registered Office</td>
                      <td className="px-4 py-3">
                        Phase-II, City Center, South G.T. Road, Durgapur, Paschim Bardhaman — 713208
                      </td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 font-bold text-neutral-900">Flagship Institution</td>
                      <td className="px-4 py-3">The New Horizons Institute of Technology (NHIT)</td>
                    </tr>
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
