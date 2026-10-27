'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import type { CareerJourneyData, JourneyStage } from '@/lib/homeTypes';
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

/*
 * Icon names stored in homepage.json (careerJourney.stages[].pills[].icon)
 * are resolved here. Unknown names fall back to CheckCircle.
 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
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
  Rocket,
};

export default function CareerJourney({ data }: { data: CareerJourneyData }) {
  const STAGES: JourneyStage[] = data.stages ?? [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const activeStage = STAGES[currentIdx] ?? STAGES[0];

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

  if (!activeStage) return null;

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
              {data.kicker}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {data.title}{" "}
              {data.titleEm && <span className="text-[#C10A0C]">{data.titleEm}</span>}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto">
              {data.sub}
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
                    0{(activeStage.id ?? 0) + 1}
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
                    0{(activeStage.id ?? 0) + 1} / 06
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
                    const Icon = ICON_MAP[pill.icon] || CheckCircle;
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
              <h3>{data.ctaTitle}</h3>
              <p>{data.ctaText}</p>
            </div>
            <div className="nhit-journey__cta-actions">
              <Link href={data.ctaBtn1Href || '#'} className="jrn-btn-primary">
                <span>{data.ctaBtn1Text}</span>
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </Link>
              <a
                href={data.ctaBtn2Href || '#'}
                target="_blank"
                rel="noopener"
                className="jrn-btn-outline"
              >
                <i className="fa fa-download" aria-hidden="true" />
                <span>{data.ctaBtn2Text}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
