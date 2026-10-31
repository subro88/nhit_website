'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { UserCheck, Clock, Phone, Mail, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

interface FacultyMember {
  name: string;
  role?: string;
  designation?: string;
  desig?: string;
  qualification?: string;
  qual?: string;
  experience?: string;
  exp?: string;
  spec?: string;
  avatar?: string;
  img?: string;
  photo?: string;
  email?: string;
  phone?: string;
}

interface Props {
  faculty: FacultyMember[];
  accentHex: string;
}

const AUTO_SCROLL_MS = 4000; // one card step every 4s
const RESUME_MS = 6000; // resume auto-scroll 6s after manual touch/wheel

export default function DepartmentFacultyRoster({ faculty, accentHex }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = faculty?.length ?? 0;

  // Scroll the track so the card at `index` is the left-most visible card.
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const target = track.children[index] as HTMLElement | undefined;
    if (!first || !target) return;
    track.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: 'smooth',
    });
  }, []);

  // How many cards fit in the viewport right now (3 desktop / 2 tablet / 1 mobile).
  const getPerView = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 1;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first || !second) return 1;
    const step = second.offsetLeft - first.offsetLeft;
    if (step <= 0) return 1;
    return Math.max(1, Math.round((track.clientWidth + 24) / step));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const perView = getPerView();
      const maxIndex = Math.max(0, total - perView);
      const next = ((index % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
      indexRef.current = next;
      setCurrentIndex(next);
      scrollToIndex(next);
    },
    [total, getPerView, scrollToIndex]
  );

  // Auto-scroll loop — interval is NOT reset on index change, so movement stays smooth.
  useEffect(() => {
    if (total <= 1) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const id = setInterval(() => {
      if (pausedRef.current || document.hidden || reduced.matches) return;
      goTo(indexRef.current + 1);
    }, AUTO_SCROLL_MS);
    return () => {
      clearInterval(id);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [total, goTo]);

  const pauseWhileHovering = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = null;
  };

  const resumeAfterLeave = () => {
    pausedRef.current = false;
  };

  // After manual touch / wheel interaction, give the user time before auto-scroll resumes.
  const pauseTemporarily = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_MS);
  };

  // Track index while the user swipes / drags manually.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first || !second) return;
    const step = second.offsetLeft - first.offsetLeft;
    if (step <= 0) return;
    const idx = Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    if (idx !== indexRef.current) {
      indexRef.current = idx;
      setCurrentIndex(idx);
    }
  };

  if (!faculty || faculty.length === 0) return null;

  return (
    <section className="space-y-6">
      {/* ── Section Header with Navigation Controls (Center Aligned) ── */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--edu-primary-dark)] bg-red-50 border border-red-100"
        >
          ACADEMIC DIRECTORY // NHIT FACULTY
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[color:var(--edu-primary-dark)] tracking-tight mt-1.5">
          Our Faculties ({total})
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Experienced engineering educators, licensed technical instructors, and researchers guiding students across laboratory practice and theory.
        </p>

        {/* Carousel Navigation Buttons & Counter Centered */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => goTo(indexRef.current - 1)}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-[color:var(--edu-primary-dark)] hover:text-white hover:border-[color:var(--edu-primary-dark)] transition-all active:scale-95"
            aria-label="Previous faculty member"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs font-bold text-slate-500 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={() => goTo(indexRef.current + 1)}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-[color:var(--edu-primary-dark)] hover:text-white hover:border-[color:var(--edu-primary-dark)] transition-all active:scale-95"
            aria-label="Next faculty member"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Carousel Track: 3 cards visible on desktop, smooth auto-scroll ── */}
      <div
        onMouseEnter={pauseWhileHovering}
        onMouseLeave={resumeAfterLeave}
        className="relative overflow-hidden"
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onTouchStart={pauseTemporarily}
          onWheel={pauseTemporarily}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {faculty.map((f, idx) => {
            const photo = f.avatar || f.img || f.photo || '';
            const photoUrl = photo
              ? photo.startsWith('http') || photo.startsWith('/')
                ? photo
                : `/images/faculty/${photo}`
              : '';
            const initials = f.name
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0]?.toUpperCase() ?? '')
              .join('');

            return (
              <div
                key={idx}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div
                  className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-between h-full hover:-translate-y-1"
                >
                  <div className="w-full flex flex-col items-center">
                    {/* Pure Circular Photo Frame (170px diameter) with subtle glow */}
                    <div
                      className="relative w-40 h-40 rounded-full overflow-hidden border-4 shadow-md mb-5 group-hover:scale-105 transition-transform duration-300"
                      style={{
                        borderColor: accentHex,
                        boxShadow: `0 0 20px -3px ${accentHex}30`,
                      }}
                    >
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={f.name}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center bg-slate-100 text-4xl font-extrabold tracking-wide"
                          style={{ color: accentHex }}
                          aria-hidden="true"
                        >
                          {initials}
                        </div>
                      )}
                    </div>

                    {/* Faculty Name */}
                    <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-slate-800 transition-colors mb-2">
                      {f.name}
                    </h4>

                    {/* 3-Item Meta Row (Role, Qualification, Experience) */}
                    <div className="w-full space-y-1.5 py-3 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
                        <UserCheck className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
                        <span>{f.designation || f.desig || f.role || 'Lecturer'}</span>
                      </div>
                      {(f.qualification || f.qual) && (
                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
                          <span>{f.qualification || f.qual}</span>
                        </div>
                      )}
                      {(f.experience || f.exp) && (
                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                          <span>{f.experience || f.exp}</span>
                        </div>
                      )}
                    </div>

                    {/* Core Specialization Pill */}
                    {f.spec && (
                      <div className="mt-3">
                        <span
                          className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full text-slate-800 bg-slate-100 group-hover:bg-slate-200 transition-colors"
                        >
                          🎯 {f.spec}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Direct Engineering Contact Bar */}
                  <div className="w-full pt-4 mt-4 border-t border-slate-100 flex items-center justify-center gap-3 text-xs text-slate-600">
                    <a
                      href="tel:03432542103"
                      className="inline-flex items-center gap-1 font-semibold hover:text-slate-900 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
                      (0343) 2542103
                    </a>
                    <span className="text-slate-300">·</span>
                    <a
                      href="mailto:info@nhit.in"
                      className="inline-flex items-center gap-1 font-semibold hover:text-slate-900 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-sky-600" />
                      info@nhit.in
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
