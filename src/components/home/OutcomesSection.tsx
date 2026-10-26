'use client';

import React, { useMemo, useState } from 'react';
import type { OutcomesData } from '@/lib/homeTypes';

/*
 * Outcomes — simple interactive bar chart (flat design, no 3D).
 * Hover / tap / keyboard-focus a bar to select that session; a detail
 * panel below shows the full T&P breakdown (total, opted, placed,
 * higher studies). Bars grow in staggered on load. All content is
 * CMS-editable: Admin → Home Page Editor → Outcomes.
 */
export default function OutcomesSection({ data }: { data: OutcomesData }) {
  const bars = data.bars ?? [];
  const outcomes = data.outcomes ?? [];
  const [active, setActive] = useState(() => Math.max(0, bars.length - 1));

  const sel = useMemo(() => bars[active] ?? bars[bars.length - 1], [active, bars]);
  const hasDetails = !!(sel && (sel.total || sel.opted || sel.placed || sel.higher));

  return (
    <section className="wp-block-group edu-outcomes">
      <div className="wp-block-group edu-container edu-outcomes__grid">
        {/* Interactive bar chart */}
        <div className="edu-barchart edu-reveal is-inview">
          <div className="edu-barchart__plot" role="tablist" aria-label="Batch-wise placement percentage">
            {bars.map((bar, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`edu-barchart__slot${i === active ? ' is-active' : ''}`}
                style={{ '--i': i } as React.CSSProperties}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="edu-barchart__value">{bar.value}</span>
                <span className="edu-barchart__barwrap">
                  <span
                    className="edu-barchart__bar"
                    style={
                      {
                        '--h': bar.heightPct || '60%',
                        '--c': bar.color || 'var(--edu-primary)',
                        '--cd': bar.colorDark || 'var(--edu-primary-dark)',
                      } as React.CSSProperties
                    }
                  />
                </span>
                <span className="edu-barchart__label">{bar.label}</span>
              </button>
            ))}
          </div>

          {/* Detail panel for the selected session */}
          <div className="edu-barchart__detail" aria-live="polite">
            {sel ? (
              <>
                <div className="edu-barchart__detail-head">
                  <span className="edu-barchart__detail-title">Session {sel.label}</span>
                  {sel.ongoing && <span className="edu-barchart__detail-badge">Ongoing</span>}
                  <span className="edu-barchart__detail-pct">{sel.value}</span>
                </div>
                <span className="edu-barchart__detail-sub">placement rate</span>
                {hasDetails && (
                  <div className="edu-barchart__stats">
                    <div className="edu-barchart__stat">
                      <span className="edu-barchart__stat-num">{sel.total || '—'}</span>
                      <span className="edu-barchart__stat-label">Total Students</span>
                    </div>
                    <div className="edu-barchart__stat">
                      <span className="edu-barchart__stat-num">{sel.opted || '—'}</span>
                      <span className="edu-barchart__stat-label">Opted for Placement</span>
                    </div>
                    <div className="edu-barchart__stat">
                      <span className="edu-barchart__stat-num">{sel.placed || '—'}</span>
                      <span className="edu-barchart__stat-label">Placed</span>
                    </div>
                    <div className="edu-barchart__stat">
                      <span className="edu-barchart__stat-num">{sel.higher || '—'}</span>
                      <span className="edu-barchart__stat-label">Higher Studies</span>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* Narrative & Outcomes Breakdown */}
        <div className="wp-block-group edu-reveal is-inview">
          <p className="edu-sec-head__kicker">{data.kicker}</p>
          <h2 className="edu-sec-head__title" style={{ color: '#fff' }}>{data.title}</h2>

          <div className="edu-outcome-list">
            {outcomes.map((item, i) => (
              <div key={i} className="edu-outcome">
                <div className="edu-outcome__icon">{item.icon}</div>
                <div>
                  <div className="edu-outcome__title">{item.title}</div>
                  <p className="edu-outcome__text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {data.footnote && (
            <p
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '0.8rem',
                color: '#8a8a8a',
                marginTop: '1rem',
              }}
            >
              {data.footnote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
