'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { GalleryData } from '@/lib/homeTypes';

/*
 * "Journal-style" 3D photo fan (coverflow) — the section the user asked to
 * match to their uploaded screen recording: every photo is a card in a curved
 * 3D deck; the active photo sits front and center, the others fan away to the
 * sides in perspective and sweep through as you navigate (arrows, dots,
 * click-a-side-card, drag/swipe, keyboard, or autoplay).
 *
 * Butter-smooth rules (same philosophy as the CareerJourney rebuild):
 *  - Geometry is pure CSS: each card gets only a signed slot offset (--i) and
 *    its distance (--abs) as CSS vars; transform/opacity come from calc().
 *  - React re-renders ONLY when the active index changes (12 per full loop).
 *  - Dragging writes two CSS vars (--drag-x / --drag-ry) on the stage through
 *    a rAF-throttled ref — no React state per pointermove.
 *  - Only transform/opacity animate => compositor-friendly, no layout work.
 *
 * Click handling note: the stage calls setPointerCapture() on pointerdown, so
 * the browser retargets the follow-up "click" to the STAGE, not to whatever
 * was pressed — native onClick on the arrows/cards would never fire. Instead:
 *  - presses that start on an arrow bail out of the drag logic entirely, so
 *    the button keeps its native click;
 *  - a press on a card that ends without movement is treated as a tap and the
 *    card is activated from endDrag() via the card's data-idx attribute.
 */

const AUTOPLAY_MS = 4500;
const FAN_ANGLE = 30; // deg of rotateY per slot

/** Signed circular slot offset of item i relative to the active index. */
function slotOffset(i: number, active: number, n: number): number {
  if (n <= 1) return 0;
  const half = n / 2;
  let d = (((i - active + half) % n) + n) % n - half;
  return d;
}

export default function CampusGallery({ data }: { data: GalleryData }) {
  const items = data.items ?? [];
  const n = items.length;

  const [active, setActive] = useState(0);
  const [autoOn, setAutoOn] = useState(true);
  const [reduced, setReduced] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef(false);
  const dragRef = useRef({ on: false, startX: 0, lastDx: 0, moved: false, ryRatio: 0.15, idx: null as number | null });
  const rafRef = useRef(0);
  const pendingDx = useRef<number | null>(null);

  /* Respect prefers-reduced-motion (checked client-side only). */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  /* Autoplay: single stable interval; skips ticks while hidden/hovered/dragged. */
  useEffect(() => {
    if (!autoOn || reduced || n < 2) return;
    const id = setInterval(() => {
      if (document.hidden || hoverRef.current || dragRef.current.on) return;
      setActive((a) => (a + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoOn, reduced, n]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const go = useCallback(
    (delta: number) => {
      if (n < 2) return;
      setActive((a) => (a + delta + n) % n);
    },
    [n]
  );

  /* ---- Drag / swipe -------------------------------------------------- */
  const setDragVars = (dx: number) => {
    const st = stageRef.current;
    if (!st) return;
    st.style.setProperty('--drag-x', `${dx.toFixed(1)}px`);
    st.style.setProperty('--drag-ry', `${(dx * dragRef.current.ryRatio).toFixed(2)}deg`);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const t = e.target as HTMLElement | null;
    /* Presses on the prev/next arrows must never become drags or get pointer-
       captured — capturing would retarget their click to the stage and the
       buttons would go dead. Bail out and let the button handle it natively. */
    if (t?.closest?.('.fan-arrow')) return;
    const st = stageRef.current;
    if (!st) return;
    const card = st.querySelector<HTMLElement>('.fan-card');
    const slotW = (card?.offsetWidth || 380) * 0.46;
    /* Remember which card was pressed so endDrag() can treat a movement-less
       release as a "tap this photo forward" action. */
    const cardEl = t?.closest?.('.fan-card');
    const pressedIdx = cardEl ? Number(cardEl.getAttribute('data-idx')) : null;
    dragRef.current = { on: true, startX: e.clientX, lastDx: 0, moved: false, ryRatio: FAN_ANGLE / slotW, idx: Number.isFinite(pressedIdx) ? pressedIdx : null };
    try {
      st.setPointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
    st.classList.add('is-dragging');
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.on) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.lastDx = dx;
    if (Math.abs(dx) > 6) dragRef.current.moved = true;
    pendingDx.current = dx;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (pendingDx.current !== null) {
          setDragVars(pendingDx.current);
          pendingDx.current = null;
        }
      });
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.on) return;
    const st = stageRef.current;
    dragRef.current.on = false;
    if (st) {
      try {
        st.releasePointerCapture(e.pointerId);
      } catch {
        /* not captured */
      }
      const card = st.querySelector<HTMLElement>('.fan-card');
      const slotW = (card?.offsetWidth || 380) * 0.46;
      const dx = dragRef.current.lastDx; /* NOT pendingDx — rAF nulls that */
      pendingDx.current = null;
      /* Re-enable transitions first, then apply the final index + zero drag in
         the same frame, so the deck animates from the dragged pose to its new
         resting fan instead of snapping. */
      st.classList.remove('is-dragging');
      const shift = Math.round(-dx / slotW);
      const pressedIdx = dragRef.current.idx;
      if (shift !== 0 && n >= 2) {
        setActive((a) => (a + shift + n * Math.abs(shift) + n) % n);
      } else if (!dragRef.current.moved && pressedIdx !== null && n >= 2) {
        /* No real drag happened — it was a tap on a photo, so bring it forward. */
        setActive(pressedIdx);
      }
      st.style.setProperty('--drag-x', '0px');
      st.style.setProperty('--drag-ry', '0deg');
    }
  };

  /* Keyboard support while the stage is focused. */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  if (n === 0) return null;

  return (
    <section id="campus" className="wp-block-group edu-gallery">
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center edu-reveal is-inview">
          <p className="edu-sec-head__kicker">{data.kicker}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
          <p className="edu-gallery__hint">Drag, swipe or use the arrows — tap any photo to bring it forward</p>
        </div>
      </div>

      <div className="wp-block-group alignwide edu-gallery__fan">
        {/* 3D fan stage */}
        <div
          ref={stageRef}
          className="fan-stage"
          role="region"
          aria-roledescription="carousel"
          aria-label={data.title || 'Campus gallery'}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
          onKeyDown={onKeyDown}
        >
          {items.map((item, i) => {
            const d = slotOffset(i, active, n);
            const abs = Math.abs(d);
            return (
              <div
                key={i}
                className={`fan-card${d === 0 ? ' is-active' : ''}${abs >= 5 ? ' is-gone' : ''}`}
                style={{ '--i': d, '--abs': abs, zIndex: 50 - abs } as React.CSSProperties}
                data-idx={i}
                aria-hidden={d !== 0}
              >
                <img src={item.src} alt={item.alt} loading="eager" draggable={false} />
                <span className="fan-card__dim" aria-hidden="true" />
              </div>
            );
          })}

          <button
            type="button"
            className="fan-arrow fan-arrow--prev"
            aria-label="Previous photo"
            onClick={() => go(-1)}
          >
            <i className="fa fa-angle-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="fan-arrow fan-arrow--next"
            aria-label="Next photo"
            onClick={() => go(1)}
          >
            <i className="fa fa-angle-right" aria-hidden="true" />
          </button>
        </div>

        {/* Active caption + counter (announced to screen readers on change) */}
        <div className="fan-meta">
          <p className="fan-caption" aria-live="polite">
            {items[active]?.caption}
          </p>
          <p className="fan-counter">
            {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </p>
        </div>

        {/* Dots + autoplay toggle */}
        <div className="fan-controls">
          <div className="fan-dots" role="tablist" aria-label="Choose photo">
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Photo ${i + 1}: ${item.caption}`}
                className={`fan-dot${i === active ? ' is-on' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="fan-auto"
            aria-pressed={autoOn}
            onClick={() => setAutoOn((v) => !v)}
          >
            <i className={`fa ${autoOn ? 'fa-pause' : 'fa-play'}`} aria-hidden="true" />
            {autoOn ? 'Pause' : 'Auto-Play'}
          </button>
        </div>
      </div>
    </section>
  );
}
