'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { CountersData } from '@/lib/homeTypes';

export default function CountersSection({ data }: { data: CountersData }) {
  const stats = data.items ?? [];
  const [counts, setCounts] = useState<number[]>(() => stats.map((s) => s.target));
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          // Animate count-up
          const duration = 2000;
          const startTime = performance.now();

          const updateFrame = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(stats.map((s) => Math.round(s.target * easeOut)));

            if (progress < 1) {
              requestAnimationFrame(updateFrame);
            }
          };

          requestAnimationFrame(updateFrame);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="wp-block-group edu-counters">
      <div className="wp-block-group edu-container edu-counters__grid">
        {stats.map((stat, i) => (
          <div key={i} className="edu-counter">
            <div className="edu-counter__value">
              {stat.prefix || ''}
              {(counts[i] ?? 0).toLocaleString()}
              {stat.suffix}
            </div>
            <div className="edu-counter__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
