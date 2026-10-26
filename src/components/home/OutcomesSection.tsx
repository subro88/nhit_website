import React from 'react';
import type { OutcomesData } from '@/lib/homeTypes';

export default function OutcomesSection({ data }: { data: OutcomesData }) {
  const bars = data.bars ?? [];
  const outcomes = data.outcomes ?? [];

  return (
    <section className="wp-block-group edu-outcomes">
      <div className="wp-block-group edu-container edu-outcomes__grid">
        {/* 3D Isometric Bar Chart — dense mode when showing year-wise data (5+ bars) */}
        <div
          className={`edu-chart3d edu-reveal is-inview is-live${bars.length > 4 ? ' edu-chart3d--dense' : ''}`}
          data-edu-parallax="-0.06"
        >
          <div className="edu-chart3d__scene">
            {bars.map((bar, i) => (
              <div key={i} className="edu-bar3d">
                <div className="edu-bar3d__value">{bar.value}</div>
                <div
                  className="edu-bar3d__shaft"
                  style={
                    {
                      '--bar-h': bar.heightPct || '60%',
                      '--bar-color': bar.color || 'var(--edu-primary)',
                      '--bar-color-dark': bar.colorDark || '#c92810',
                    } as React.CSSProperties
                  }
                />
                <div className="edu-bar3d__label">{bar.label}</div>
              </div>
            ))}
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
