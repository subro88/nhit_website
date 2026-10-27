'use client';

import React, { useEffect, useRef, useState } from 'react';

/*
 * Hero semicircle badge — a half circle docked on the right edge of the hero.
 * Resting state shows "Estd: 2007" vertically inside the semicircle.
 * Hover (desktop) or tap (mobile) smoothly expands it to reveal key
 * institute features with a staggered slide-in. While the page scrolls
 * it drifts with a soft parallax and tucks itself away past the hero.
 * Content comes from the CMS: hero.estdBadge in homepage.json.
 */

export interface EstdFeature {
  icon: string;
  label: string;
  value: string;
}

export interface EstdBadgeData {
  visible?: boolean;
  text?: string;
  features?: EstdFeature[];
}

export default function HeroEstdBadge({ data }: { data: EstdBadgeData }) {
  const features = data.features ?? [];
  const [isOpen, setIsOpen] = useState(false);
  const [isTucked, setIsTucked] = useState(false);
  const badgeRef = useRef<HTMLButtonElement>(null);

  /* Scroll behaviour: gentle parallax inside the hero, then tuck away. */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const el = badgeRef.current;
        if (el) {
          /* drift upward slightly while the hero is still in view */
          const drift = Math.max(-46, Math.min(0, y * -0.12));
          el.style.setProperty('--estd-parallax', `${drift}px`);
        }
        /* once the visitor scrolls into the page, slide the badge back out */
        setIsTucked(y > 260);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (features.length === 0) return null;

  return (
    <button
      ref={badgeRef}
      type="button"
      aria-expanded={isOpen}
      aria-label={`${data.text || 'Estd 2007'} — key features`}
      className={`edu-estd ${isOpen ? 'is-open' : ''} ${isTucked && !isOpen ? 'is-tucked' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((v) => !v)}
    >
      <span className="edu-estd__estd">{data.text || 'Estd: 2007'}</span>

      <span className="edu-estd__list">
        {features.slice(0, 6).map((f, i) => (
          <span key={i} className="edu-estd__item">
            <span className="edu-estd__icon">
              <i className={`fa ${f.icon || 'fa-check'}`} aria-hidden="true" />
            </span>
            <span className="edu-estd__text">
              <span className="edu-estd__label">{f.label}</span>
              <span className="edu-estd__value">{f.value}</span>
            </span>
          </span>
        ))}
      </span>
    </button>
  );
}
