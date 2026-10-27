'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { AchievementsData } from '@/lib/homeTypes';

/*
 * Achievements & milestones marquee — a slim accent strip right under the
 * hero that slowly scrolls real placement/achievement news collected from
 * NHIT's own social posts. Pauses on hover. Content: achievements in
 * homepage.json (Admin → Home Page Editor → Achievements Marquee).
 */
export default function AchievementsStrip({ data }: { data: AchievementsData }) {
  const items = data.items ?? [];
  const trackRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (items.length === 0) return null;

  /* duplicate the list so the CSS marquee loops seamlessly */
  const loop = [...items, ...items];

  return (
    <section
      ref={trackRef}
      className={`edu-achv ${inView ? 'is-inview' : ''}`}
      aria-label={data.heading || 'Achievements'}
    >
      <div className="edu-achv__label">
        <i className="fa fa-line-chart" aria-hidden="true" />
        <span>{data.heading || 'Achievements'}</span>
      </div>
      <div className="edu-achv__viewport">
        <div className="edu-achv__track">
          {loop.map((it, i) => (
            <span key={i} className="edu-achv__item" aria-hidden={i >= items.length}>
              {it.icon ? <i className={`fa ${it.icon}`} aria-hidden="true" /> : null}
              <span>{it.text}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
