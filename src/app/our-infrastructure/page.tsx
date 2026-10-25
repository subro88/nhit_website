import React from 'react';
import SubpageHero from '@/components/layout/SubpageHero';
import SidebarNav from '@/components/layout/SidebarNav';
import {
  Building2,
  BookOpen,
  Cpu,
  Cog,
  Wifi,
  Bus,
  Shield,
  HeartPulse,
  Coffee,
} from 'lucide-react';

export default function OurInfrastructurePage() {
  const facilities = [
    {
      icon: Cog,
      title: '40+ Advanced Engineering Laboratories',
      desc: 'Dedicated practical bays for all 6 disciplines — CNC machining centres, hydraulics, electrical machines, material testing UTM, soil mechanics, and automotive engine testbeds.',
    },
    {
      icon: Cpu,
      title: 'Central Computing & Optical Fiber Hub',
      desc: 'Multiple air-conditioned computer laboratories equipped with high-end workstations, Linux/Windows dual-boot environments, gigabit LAN, and 100 Mbps leased line Internet.',
    },
    {
      icon: BookOpen,
      title: 'Central Library & Digital Repository',
      desc: 'Vast physical collection of 25,000+ technical volumes, National & International journals, DELNET e-resources, British Council literature access, and spacious reading halls.',
    },
    {
      icon: Building2,
      title: 'Smart Classrooms & Seminar Halls',
      desc: 'Acoustically treated lecture theatres equipped with high-definition digital projectors, smart podiums, and public address audio systems for seminars and workshops.',
    },
    {
      icon: Shield,
      title: 'On-Campus Hostels (Boys & Girls)',
      desc: 'Secure residential facilities with round-the-clock CCTV surveillance, biometric access, hygienic mess facilities, dedicated resident wardens, and 24-hour power backup.',
    },
    {
      icon: Bus,
      title: 'Institute Bus Transportation Fleet',
      desc: 'Convenient fleet of college buses serving key transport corridors including Asansol, Raniganj, Andal, Jamuria, and Bardhaman for day scholars.',
    },
    {
      icon: HeartPulse,
      title: 'Healthcare Center & First-Aid',
      desc: 'Dedicated on-campus medical inspection room with basic diagnostic tools, first-aid supplies, and on-call ambulance ties with leading Durgapur super-specialty hospitals.',
    },
    {
      icon: Coffee,
      title: 'Cafeteria & Student Recreation',
      desc: 'Spacious student cafeteria serving hygienic meals, snacks, and beverages, alongside indoor table tennis, badminton, and outdoor cricket/football sports fields.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SubpageHero
        kicker="Campus &amp; Facilities Tour"
        badge="40+ Laboratories"
        title="Our Infrastructure"
        subtitle="Explore our sprawling educational campus in City Center, Durgapur — engineered with state-of-the-art laboratory bays, high-speed computing, and comprehensive student amenities."
        breadcrumbs={[
          { label: 'About NHIT', href: '/about' },
          { label: 'Our Infrastructure' },
        ]}
      />

      <div className="max-w-[1240px] mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 space-y-8">
            {/* Campus Overview Card */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Campus Environment
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1 font-montserrat">
                  Built for Hands-On Engineering Mastery
                </h2>
              </div>

              <div className="text-neutral-700 text-sm leading-relaxed space-y-4 font-roboto">
                <p>
                  Strategically situated at <strong>Phase-II, City Center, Durgapur</strong> near
                  Gandhi More, the NHIT campus offers an expansive, peaceful, and technologically
                  vibrant learning environment. Connected directly to National Highway 19 (Grand
                  Trunk Road) and Durgapur Railway Station, students enjoy effortless transit.
                </p>
                <p>
                  Every square meter of the academic complex has been planned according to{' '}
                  <strong>AICTE norms</strong>, featuring heavy floor-load capacity for industrial
                  machinery, proper acoustic separation for workshops, fire-safety hydrants, and
                  uninterrupted high-capacity power backup.
                </p>
              </div>

              {/* Photo Showcase Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-xs">
                  <img
                    src="/images/hero-campus.jpg"
                    alt="NHIT Main Academic Block"
                    className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2.5 bg-neutral-50 text-[11px] font-bold text-neutral-800 text-center">
                    Main Academic Block
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-xs">
                  <img
                    src="/images/hero-computers.jpg"
                    alt="High-Speed Computer Laboratory"
                    className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2.5 bg-neutral-50 text-[11px] font-bold text-neutral-800 text-center">
                    Central Computing Lab
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-xs">
                  <img
                    src="/images/lab-mechanical.jpg"
                    alt="Mechanical Machine Tool Bay"
                    className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2.5 bg-neutral-50 text-[11px] font-bold text-neutral-800 text-center">
                    Mechanical Machine Bay
                  </div>
                </div>
              </div>
            </article>

            {/* Campus Facilities Grid */}
            <article className="bg-white rounded-2xl p-7 sm:p-9 border border-neutral-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF3115] uppercase tracking-wider">
                  Amenities &amp; Specialized Units
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1 font-montserrat">
                  Key Campus Infrastructure Pillars
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {facilities.map((fac, idx) => {
                  const Icon = fac.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-50 transition-colors space-y-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] text-[#FF3115] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-sm text-[#0F172A] font-montserrat">
                          {fac.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-roboto">
                        {fac.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          </main>

          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
