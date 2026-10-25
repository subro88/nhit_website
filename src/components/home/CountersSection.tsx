'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CounterData {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: CounterData[] = [
  { target: 17, suffix: '+', label: 'Years of Academic Excellence' },
  { target: 5000, suffix: '+', label: 'Placements' },
  { target: 200, suffix: '+', label: 'Recruiters' },
  { target: 6000, suffix: '+', label: 'Alumni Members' },
];

export default function CountersSection() {
  const [counts, setCounts] = useState<number[]>([17, 5000, 200, 6000]);
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
  }, []);

  return (
    <section ref={sectionRef} className="wp-block-group edu-counters">
      <div className="wp-block-group edu-container edu-counters__grid">
        {stats.map((stat, i) => (
          <div key={i} className="edu-counter">
            <div className="edu-counter__value">
              {counts[i].toLocaleString()}
              {stat.suffix}
            </div>
            <div className="edu-counter__label">{stat.label}</div>
          </div>
        ))}
      </div>

      <svg
        className="edu-counters__tilt"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2600 131.1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="#f9f9f9" d="M0 0L2600 0 2600 69.1 0 0z" />
        <path fill="#f9f9f9" opacity="0.5" d="M0 0L2600 0 2600 69.1 0 69.1z" />
        <path fill="#f9f9f9" opacity="0.25" d="M2600 0L0 0 0 130.1 2600 69.1z" />
      </svg>
    </section>
  );
}
