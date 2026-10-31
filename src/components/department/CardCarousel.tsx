'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  /** Card contents. Each item is wrapped in a responsive slide: 1 card mobile / 2 tablet / 3 desktop. */
  items: React.ReactNode[];
  /** ms between auto steps; 0 disables auto-scroll. */
  autoScrollMs?: number;
  /** Accessible label, e.g. "faculty members". */
  label?: string;
}

const RESUME_MS = 6000; // resume auto-scroll 6s after manual touch/wheel
const GAP_PX = 24; // must match the track's gap-6

/**
 * Shared snap carousel: 3 cards visible on desktop, 2 on tablet, 1 on mobile.
 * Auto-advances one card every `autoScrollMs`, loops to the start, pauses on
 * hover, resumes 6s after touch/wheel, skips ticks when the tab is hidden or
 * the user prefers reduced motion. Adding more items never breaks the layout.
 */
export default function CardCarousel({ items, autoScrollMs = 4000, label = 'cards' }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = items.length;

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
    return Math.max(1, Math.round((track.clientWidth + GAP_PX) / step));
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
    if (autoScrollMs <= 0 || total <= 1) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const id = setInterval(() => {
      if (pausedRef.current || document.hidden || reduced.matches) return;
      goTo(indexRef.current + 1);
    }, autoScrollMs);
    return () => {
      clearInterval(id);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [total, autoScrollMs, goTo]);

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

  if (total === 0) return null;
  const showNav = total > 1;

  return (
    <div className="space-y-6" aria-roledescription="carousel" aria-label={label}>
      {/* Navigation Controls (Center Aligned) */}
      {showNav && (
        <div className="flex items-center justify-center gap-3 -mt-2">
          <button
            onClick={() => goTo(indexRef.current - 1)}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-[color:var(--edu-primary-dark)] hover:text-white hover:border-[color:var(--edu-primary-dark)] transition-all active:scale-95"
            aria-label={`Previous ${label}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs font-bold text-slate-500 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={() => goTo(indexRef.current + 1)}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-[color:var(--edu-primary-dark)] hover:text-white hover:border-[color:var(--edu-primary-dark)] transition-all active:scale-95"
            aria-label={`Next ${label}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Track: 3 cards visible on desktop, smooth auto-scroll */}
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
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
