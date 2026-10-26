'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { PlacementBarsData } from '@/lib/homeTypes';

/*
 * Branch-wise placement percentage bars (real T&P records) plus the
 * institutional trust strip (MoUs & memberships). Bars fill smoothly when
 * scrolled into view. Content: placementBars in homepage.json.
 */
export default function PlacementBarsSection({ data }: { data: PlacementBarsData }) {
  const bars = (data.bars ?? []).filter((b) => b.show !== false);
  const trust = data.trust ?? [];
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (bars.length === 0) return null;

  return (
    <section className="wp-block-group edu-pbars" id="placement-record">
      <div className="edu-container" ref={rootRef}>
        <div className="wp-block-group edu-sec-head edu-sec-head--center">
          <p className="edu-sec-head__kicker">{data.kicker || 'Placement Record'}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
          {data.sub ? <p className="edu-sec-head__sub">{data.sub}</p> : null}
        </div>

        <div className={`edu-pbars__grid ${inView ? 'is-inview' : ''}`}>
          <div className="edu-pbars__bars">
            {bars.map((b, i) => {
              const pct = Math.max(0, Math.min(100, parseFloat(b.pct) || 0));
              return (
                <div key={i} className="edu-pbar">
                  <div className="edu-pbar__meta">
                    <span className="edu-pbar__label">{b.label}</span>
                    <span className="edu-pbar__pct">{b.pct}%</span>
                  </div>
                  <div className="edu-pbar__track">
                    <div
                      className="edu-pbar__fill"
                      style={{ ['--bar-w' as never]: `${pct}%`, ['--bar-delay' as never]: `${i * 90}ms` }}
                    />
                  </div>
                </div>
              );
            })}
            {data.footnote ? <p className="edu-pbars__footnote">{data.footnote}</p> : null}
          </div>

          {trust.length > 0 ? (
            <aside className="edu-pbars__trust" aria-label="Approvals, MoUs and memberships">
              <h3 className="edu-pbars__trust-title">Approvals, MoUs &amp; Memberships</h3>
              <ul>
                {trust.map((t, i) => (
                  <li key={i}>
                    <span className="edu-pbars__trust-icon">
                      <i className={`fa ${t.icon || 'fa-check'}`} aria-hidden="true" />
                    </span>
                    <span>{t.text}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
