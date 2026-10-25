'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import { 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  CheckCircle, 
  Book, 
  Compass, 
  Network, 
  Building, 
  Users, 
  Wifi, 
  IdCard, 
  Cog, 
  Cpu, 
  Car, 
  Code, 
  MessageSquare, 
  UserCheck, 
  FileText, 
  Video, 
  Briefcase, 
  Award, 
  Rocket 
} from 'lucide-react';

interface Stage {
  id: number;
  phase: string;
  title: string;
  desc: string;
  tag: string;
  pin: string;
  accent: string;
  glow: string;
  image: string;
  pills: { icon: any; text: string }[];
  metric1: { label: string; value: string };
  metric2: { label: string; value: string };
}

const STAGES: Stage[] = [
  {
    id: 0,
    phase: 'PHASE 01 / 06 • FOUNDATION',
    title: 'The Aspiring School Student',
    desc: 'You have just completed Class 10 with a spark of engineering curiosity. Rather than spending 2 years on rote memorization, NHIT offers a direct, practical gateway into technical education where foundational science meets hands-on discovery.',
    tag: '🎒 Age 15 • Class 10 Pass',
    pin: '🎒',
    accent: '#d90429',
    glow: 'rgba(217, 4, 41, 0.28)',
    image: '/images/journey/stage-1-school.jpg',
    pills: [
      { icon: CheckCircle, text: 'Direct Entry After 10th' },
      { icon: Book, text: 'Core Applied Sciences' },
      { icon: Compass, text: 'Career Counselling' },
      { icon: Network, text: '6 Specialised Branches' }
    ],
    metric1: { label: 'ELIGIBILITY PATH', value: 'Class 10 / JEXPO' },
    metric2: { label: 'EARLY ADVANTAGE', value: 'Hands-on at Age 15' }
  },
  {
    id: 1,
    phase: 'PHASE 02 / 06 • CAMPUS INDUCTION',
    title: 'Welcome to NHIT Durgapur',
    desc: 'Stepping into Eastern India’s premier polytechnic campus. Over 2,000 peers, 40+ state-of-the-art laboratories, a digital library, and dedicated faculty mentor groups welcome you into a vibrant, collaborative engineering community.',
    tag: '🏫 Day 01 • Campus Induction',
    pin: '🏫',
    accent: '#f77f00',
    glow: 'rgba(247, 127, 0, 0.28)',
    image: '/images/journey/stage-2-fresher.jpg',
    pills: [
      { icon: Building, text: 'Est. 2007 Legacy' },
      { icon: Users, text: '2,000+ Student Community' },
      { icon: Wifi, text: 'High-Tech Wi-Fi Campus' },
      { icon: IdCard, text: '1-on-1 Faculty Mentorship' }
    ],
    metric1: { label: 'CAMPUS LABS', value: '40+ Advanced Setups' },
    metric2: { label: 'COMMUNITY', value: '18+ Years Excellence' }
  },
  {
    id: 2,
    phase: 'PHASE 03 / 06 • PRACTICAL RIGOR',
    title: 'Hands-On Labs from Semester One',
    desc: 'At NHIT, you don’t wait until final year to touch real machinery. From your very first semester, you work directly with CNC machines, automobile engine teardowns, electrical grids, civil surveying total stations, and programming compilers.',
    tag: '🔧 Sem 1-2 • 40+ Advanced Labs',
    pin: '🔧',
    accent: '#06d6a0',
    glow: 'rgba(6, 214, 160, 0.28)',
    image: '/images/journey/stage-3-workshop.jpg',
    pills: [
      { icon: Cog, text: 'CNC Machining & Turning' },
      { icon: Cpu, text: 'Circuit Simulation' },
      { icon: Car, text: 'Automobile Rig Testing' },
      { icon: Code, text: 'Full-Stack Programming' }
    ],
    metric1: { label: 'PRACTICAL RATIO', value: '65% Lab & Workshop' },
    metric2: { label: 'SAFETY CERTIFIED', value: 'Industrial Standards' }
  },
  {
    id: 3,
    phase: 'PHASE 04 / 06 • PROFESSIONAL GROOMING',
    title: 'Rigorous Soft Skills & Personality Prep',
    desc: 'Technical skills alone won’t win the boardroom. NHIT’s dedicated Training & Placement Cell conducts structured communication training, mock group discussions, personal interview drills, and corporate etiquette bootcamps.',
    tag: '🎯 Sem 3-4 • T&P Cell Grooming',
    pin: '🎯',
    accent: '#118ab2',
    glow: 'rgba(17, 138, 178, 0.28)',
    image: '/images/journey/stage-4-softskills.jpg',
    pills: [
      { icon: MessageSquare, text: 'Spoken English & GDs' },
      { icon: UserCheck, text: 'Corporate Etiquette' },
      { icon: FileText, text: 'ATS-Optimised Resume' },
      { icon: Video, text: 'Mock Video Interviews' }
    ],
    metric1: { label: 'MOCK ROUNDS', value: '12+ Rigorous Sessions' },
    metric2: { label: 'GROOMING CELL', value: 'Full-Time HR Trainers' }
  },
  {
    id: 4,
    phase: 'PHASE 05 / 06 • INDUSTRY EXPOSURE',
    title: 'Industry-Ready & Competitive Exams',
    desc: 'Real-world exposure via institutional MoUs with CSIR-CMERI Durgapur, National Entrepreneurship Network (NEN), and technology tie-ups with HCL. VOCLET coaching for B.Tech lateral entry alongside live industrial internships.',
    tag: '🏭 Sem 5 • MoUs & Internships',
    pin: '🏭',
    accent: '#8338ec',
    glow: 'rgba(131, 56, 236, 0.28)',
    image: '/images/journey/stage-5-industry.jpg',
    pills: [
      { icon: Briefcase, text: 'CSIR-CMERI Live Projects' },
      { icon: Building, text: 'HCL Technology Training' },
      { icon: Award, text: 'VOCLET / JELET Prep' },
      { icon: Rocket, text: 'Entrepreneurship Cell' }
    ],
    metric1: { label: 'RESEARCH TIE-UP', value: 'CSIR-CMERI Durgapur' },
    metric2: { label: 'TRAINING PARTNER', value: 'HCL Technologies' }
  },
  {
    id: 5,
    phase: 'PHASE 06 / 06 • CONVOCATION & CAREER',
    title: 'Placed Engineer & Future Leader',
    desc: 'From an uncertain school-leaver to an empowered, certified diploma engineer. Holding an official offer letter or stepping into prestigious government engineering colleges through lateral entry — your transformation is complete.',
    tag: '🎓 Final Sem • Placed Engineer',
    pin: '🎓',
    accent: '#d90429',
    glow: 'rgba(217, 4, 41, 0.32)',
    image: '/images/journey/stage-6-engineer.jpg',
    pills: [
      { icon: Award, text: '80–85% Placement Band' },
      { icon: Briefcase, text: 'L&T, John Deere, Tata' },
      { icon: GraduationCap, text: 'Direct 2nd Yr B.Tech' },
      { icon: Users, text: '6,000+ Alumni Network' }
    ],
    metric1: { label: 'PLACEMENT RECORD', value: '80–85% Consistent' },
    metric2: { label: 'TOP RECRUITERS', value: '50+ Global Brands' }
  }
];

export default function CareerJourney() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const activeStage = STAGES[currentIdx];

  const triggerAnimeTransition = useCallback((nextIdx: number, dir: number) => {
    if (avatarCardRef.current) {
      anime({
        targets: avatarCardRef.current,
        rotateY: [dir * 25, 0],
        scale: [0.94, 1],
        opacity: [0.7, 1],
        duration: 550,
        easing: 'easeOutCubic'
      });
    }

    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        translateY: [dir * 18, 0],
        opacity: [0, 1],
        duration: 480,
        easing: 'easeOutQuad'
      });
    }
  }, []);

  const handleScrollToStage = useCallback((idx: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const maxScroll = track.offsetHeight - window.innerHeight;
    const targetY = track.offsetTop + ((idx + 0.5) / STAGES.length) * maxScroll;

    window.scrollTo({
      top: Math.round(targetY),
      behavior: 'smooth'
    });
    setCurrentIdx(idx);
    triggerAnimeTransition(idx, idx > currentIdx ? 1 : -1);
  }, [currentIdx, triggerAnimeTransition]);

  // Window scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const trackHeight = track.offsetHeight;
      const winHeight = window.innerHeight;
      const maxScroll = trackHeight - winHeight;

      if (maxScroll <= 0) return;
      const scrolled = -rect.top;

      if (scrolled < 0) {
        setIsPinned(false);
        setIsBottom(false);
      } else if (scrolled >= 0 && scrolled <= maxScroll) {
        setIsPinned(true);
        setIsBottom(false);
      } else {
        setIsPinned(false);
        setIsBottom(true);
      }

      const p = Math.min(1, Math.max(0, scrolled / maxScroll));
      setProgress(p);

      const stageIdx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
      if (stageIdx !== currentIdx) {
        const dir = stageIdx > currentIdx ? 1 : -1;
        setCurrentIdx(stageIdx);
        triggerAnimeTransition(stageIdx, dir);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIdx, triggerAnimeTransition]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const next = (currentIdx + 1) % STAGES.length;
      handleScrollToStage(next);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, currentIdx, handleScrollToStage]);

  return (
    <div ref={trackRef} className="relative w-full h-[350vh] bg-white">
      <section 
        className={`w-full h-screen flex flex-col justify-center bg-blueprint-grid border-y border-slate-900 transition-all ${
          isPinned ? 'fixed top-0 left-0 z-40 border-none' : isBottom ? 'absolute bottom-0 left-0' : 'absolute top-0 left-0'
        }`}
      >
        <div className="max-w-[1180px] w-full mx-auto px-5">
          {/* Header */}
          <div className="text-center max-w-[780px] mx-auto mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#C10A0C] text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              The Student Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              From Aspiring Student to <span className="text-[#C10A0C]">Industry-Ready Engineer</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto">
              Experience the transformative 3-year journey at NHIT Durgapur — where school-level curiosity turns into workshop mastery, professional grooming, and high-value industry careers.
            </p>
          </div>

          {/* Chapter Navigation Tabs */}
          <div className="flex justify-center mb-3 overflow-x-auto py-1">
            <div className="inline-flex gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleScrollToStage(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    currentIdx === idx
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="font-mono opacity-60">0{idx + 1}</span>
                  <span className="hidden sm:inline">{s.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Showcase Card */}
          <div 
            ref={showcaseRef}
            className="grid grid-cols-1 md:grid-cols-[380px_1fr] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden min-h-[440px]"
          >
            {/* Left: 3D Avatar Pedestal */}
            <div className="relative p-6 flex flex-col items-center justify-center bg-slate-50 border-r border-slate-100">
              <div 
                ref={avatarCardRef}
                className="relative w-[240px] h-[300px] rounded-2xl overflow-hidden shadow-lg border-2 border-white"
              >
                <Image
                  src={activeStage.image}
                  alt={activeStage.title}
                  fill
                  sizes="240px"
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg flex justify-between items-center text-white text-xs">
                  <span className="font-medium truncate">{activeStage.tag}</span>
                  <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-mono">
                    0{activeStage.id + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Story Narrative & Metrics */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold tracking-wider text-red-600 uppercase">
                    {activeStage.phase}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    0{activeStage.id + 1} / 06
                  </span>
                </div>

                <h3 ref={titleRef} className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                  {activeStage.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {activeStage.desc}
                </p>

                {/* Pills */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {activeStage.pills.map((pill, i) => {
                    const Icon = pill.icon;
                    return (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200/80 px-2.5 py-1.5 rounded-lg">
                        <Icon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="truncate">{pill.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activeStage.metric1.label}</div>
                    <div className="text-sm font-extrabold text-slate-900">{activeStage.metric1.value}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activeStage.metric2.label}</div>
                    <div className="text-sm font-extrabold text-slate-900">{activeStage.metric2.value}</div>
                  </div>
                </div>
              </div>

              {/* Controls & Progress */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => currentIdx > 0 && handleScrollToStage(currentIdx - 1)}
                    disabled={currentIdx === 0}
                    className="p-1.5 rounded-full border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                    aria-label="Previous Stage"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => currentIdx < STAGES.length - 1 && handleScrollToStage(currentIdx + 1)}
                    disabled={currentIdx === STAGES.length - 1}
                    className="p-1.5 rounded-full border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                    aria-label="Next Stage"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Continuous Progress Bar */}
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden mx-2">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${(progress * 100).toFixed(1)}%` }}
                  />
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-red-600" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Auto-Play'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Exit CTA Banner */}
      <div className="nhit-journey-exit-cta">
        <div className="nhit-journey__container">
          <div className="nhit-journey__cta">
            <div className="nhit-journey__cta-info">
              <h3>Start Your Engineering Story at NHIT</h3>
              <p>
                Admissions open for Session 2026–27. Scholarships available for meritorious students
                across all 6 diploma engineering streams.
              </p>
            </div>
            <div className="nhit-journey__cta-actions">
              <Link href="/admissions" className="jrn-btn-primary">
                <span>Apply for Admission 2026</span>
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </Link>
              <a
                href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
                target="_blank"
                rel="noopener"
                className="jrn-btn-outline"
              >
                <i className="fa fa-download" aria-hidden="true" />
                <span>Download Brochure</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
