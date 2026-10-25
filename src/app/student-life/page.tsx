import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Rocket, 
  FlaskConical, 
  BookOpen, 
  Award, 
  Wrench, 
  Calendar, 
  ArrowRight, 
  Trophy, 
  Users, 
  HeartHandshake,
  Compass
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';

export const metadata = {
  title: 'Student Life & Innovation Hubs | Campus Culture — NHIT Durgapur',
  description: 'Life at NHIT goes beyond textbooks: NEN Entrepreneurship Cell, CSIR-CMERI research track, ISTE and IE(I) technical chapters, British Council Library access, Horizon fest, and sports grounds.',
};

export default function StudentLifePage() {
  const hubs = [
    {
      code: 'HUB: NEN Cell',
      status: 'MoU Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
      title: 'Entrepreneurship Cell',
      track: 'Foundership & Startups',
      mode: 'All Branches Eligible',
      accent: '#ff3115',
      desc: 'National Entrepreneurship Network membership — startup ideation bootcamps, business-plan drills, investor pitch decks, and annual E-season events for student founders.',
      icon: Rocket,
    },
    {
      code: 'HUB: CSIR Track',
      status: 'Govt. MoU Active',
      statusColor: 'bg-blue-100 text-blue-800',
      title: 'CSIR-CMERI Project Track',
      track: 'R&D / Advanced Testing',
      mode: 'Project-Based',
      accent: '#00bcd4',
      desc: 'Joint engineering research, live plant visits, and instrumentation exposure with Central Mechanical Engineering Research Institute (CSIR-CMERI) right in Durgapur.',
      icon: FlaskConical,
    },
    {
      code: 'HUB: ISTE Chapter',
      status: 'Member Institution',
      statusColor: 'bg-purple-100 text-purple-800',
      title: 'ISTE Students Chapter',
      track: 'Technical Seminars',
      mode: 'Campus Symposia',
      accent: '#92278f',
      desc: 'Indian Society for Technical Education programmes — academic symposiums, coding marathons, skill workshops, and faculty-student technical conventions.',
      icon: Sparkles,
    },
    {
      code: 'HUB: IE(I) Chapter',
      status: 'Life Institutional Member',
      statusColor: 'bg-amber-100 text-amber-800',
      title: 'IE(I) Student Chapter',
      track: 'Professional Cadre',
      mode: 'Chapter Meets',
      accent: '#fc7f0c',
      desc: 'Institution of Engineers (India) institutional membership — senior guest lectures, paper presentations, professional networking, and national engineering symposiums.',
      icon: Award,
    },
    {
      code: 'HUB: BCL Access',
      status: 'Institutional Member',
      statusColor: 'bg-indigo-100 text-indigo-800',
      title: 'British Council Library',
      track: 'Global Journals & English',
      mode: 'Member Card Access',
      accent: '#4f46e5',
      desc: 'Direct institutional access to the British Council Library network — international peer-reviewed journals, IELTS preparation materials, and advanced reading culture.',
      icon: BookOpen,
    },
    {
      code: 'HUB: Workshop Floor',
      status: 'Daily Practice',
      statusColor: 'bg-cyan-100 text-cyan-800',
      title: 'Workshop & Garage Practice',
      track: 'Hands-On Craft',
      mode: 'Scheduled Lab Benches',
      accent: '#0891b2',
      desc: 'Fitting, welding, lathe machining, and automotive garage bays — where hands-on craft meets council engineering theory. Industrial plant tours scheduled every session.',
      icon: Wrench,
    },
  ];

  const campusGalleries = [
    { src: '/images/campus-library.jpg', caption: 'Central Library & Reading Hall (25,000+ Books)' },
    { src: '/images/campus-cafeteria.jpg', caption: 'Spacious Student Cafeteria & Dining' },
    { src: '/images/campus-auditorium.jpg', caption: 'Annual Fest & Seminar Auditorium' },
    { src: '/images/campus-ground.jpg', caption: 'Football & Cricket Sports Pavilion' },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="Vibrant Campus Ecosystem · Co-Curricular & Research Hubs"
        title="Student Life & Innovation"
        subtitle="Learning continues after the last bell: national engineering societies, joint research with CSIR-CMERI, annual Horizon festivals, sports tournaments, and active student clubs."
        breadcrumbs={[
          { label: 'Student Life' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-16">
        
        {/* ── Innovation Hubs & Activity Tracks Grid ───────────────── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Active Chapters &amp; Cells</span>
            <h2 className="text-3xl font-black font-heading text-gray-900 mt-1">
              Innovation Hubs &amp; Activity Tracks
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Our registered institutional MoUs and society memberships provide students with national platforms, research projects, and startup acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub, idx) => {
              const Icon = hub.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  style={{ borderTop: `4px solid ${hub.accent}` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-bold text-gray-500">{hub.code}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hub.statusColor}`}>
                        {hub.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: hub.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">{hub.title}</h3>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      {hub.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-600">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">Track</span>
                      <strong className="text-gray-800">{hub.track}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 block text-[10px] uppercase">Mode</span>
                      <strong className="text-gray-800">{hub.mode}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Annual Technical Fest Banner ─────────────────────────── */}
        <section className="bg-gradient-to-r from-gray-900 via-neutral-900 to-gray-900 text-white rounded-2xl p-8 md:p-12 border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-[#ff3115] border border-[#ff3115]/30">
              Campus Landmark Event
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              Annual Technical Symposium &amp; Cultural Horizon Fest
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              The flagship campus fest returns each year with multi-college robo-races, CAD drafting challenges, coding hackathons, project model expos, and energetic musical evenings.
            </p>
          </div>
          <Link
            href="/circulars"
            className="shrink-0 px-6 py-3.5 bg-[#ff3115] hover:bg-[#e0260c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Watch Event Circulars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* ── Campus Life Gallery ─────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900">Life on the NHIT Campus</h2>
              <p className="text-xs text-gray-500 mt-1">Glimpses of daily academic, social, and recreational facilities in Durgapur</p>
            </div>
            <Link href="/our-infrastructure" className="text-xs font-bold text-[#ff3115] hover:underline">
              Tour Full Campus Infrastructure &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {campusGalleries.map((cg, cIdx) => (
              <div key={cIdx} className="group relative h-60 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src={cg.src}
                  alt={cg.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold leading-snug">{cg.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
