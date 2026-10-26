'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCheck, Award, Clock, Phone, Mail, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

interface FacultyMember {
  name: string;
  role?: string;
  desig?: string;
  qual?: string;
  exp?: string;
  spec?: string;
  img?: string;
  photo?: string;
  email?: string;
  phone?: string;
}

interface Props {
  faculty: FacultyMember[];
  accentHex: string;
}

export default function DepartmentFacultyRoster({ faculty, accentHex }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  if (!faculty || faculty.length === 0) return null;

  const total = faculty.length;

  // Auto-scroll carousel every 4.8s, pausing on hover
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4800);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, total]);

  const handleNext = () => {
    const next = (currentIndex + 1) % total;
    setCurrentIndex(next);
    scrollToCard(next);
  };

  const handlePrev = () => {
    const prev = currentIndex === 0 ? total - 1 : currentIndex - 1;
    setCurrentIndex(prev);
    scrollToCard(prev);
  };

  const scrollToCard = (index: number) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.firstElementChild?.clientWidth || 320;
    const gap = 24;
    trackRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const cardWidth = trackRef.current.firstElementChild?.clientWidth || 320;
    const gap = 24;
    const newIdx = Math.round(scrollLeft / (cardWidth + gap));
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < total) {
      setCurrentIndex(newIdx);
    }
  };

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
            onClick={handlePrev}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-[color:var(--edu-primary-dark)] hover:text-white hover:border-[color:var(--edu-primary-dark)] transition-all active:scale-95"
            aria-label="Previous faculty member"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs font-bold text-slate-500 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-[color:var(--edu-primary-dark)] hover:text-white hover:border-[color:var(--edu-primary-dark)] transition-all active:scale-95"
            aria-label="Next faculty member"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Carousel Track with Kinetic Drag & Smooth Auto-Scroll ── */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden"
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {faculty.map((f, idx) => {
            const photo = f.img || f.photo || '/images/faculty/nhitfacutyimages0820240002.jpg';
            const photoUrl = photo.startsWith('http') || photo.startsWith('/') 
              ? photo 
              : `/images/faculty/${photo}`;

            return (
              <div
                key={idx}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] snap-start"
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
                      <Image
                        src={photoUrl}
                        alt={f.name}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>

                    {/* Faculty Name */}
                    <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-slate-800 transition-colors mb-2">
                      {f.name}
                    </h4>

                    {/* 3-Item Meta Row (Role, Qualification, Experience) */}
                    <div className="w-full space-y-1.5 py-3 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
                        <UserCheck className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
                        <span>{f.desig || f.role || 'Lecturer'}</span>
                      </div>
                      {f.qual && (
                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
                          <span>{f.qual}</span>
                        </div>
                      )}
                      {f.exp && (
                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                          <span>{f.exp}</span>
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
