import React from 'react';
import type { RecruitersData } from '@/lib/homeTypes';

export default function RecruiterWall({ data }: { data: RecruitersData }) {
  const logos = data.logos ?? [];
  const marks = data.marks ?? [];

  return (
    <section id="placement" className="wp-block-group edu-placement">
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center edu-reveal is-inview">
          <p className="edu-sec-head__kicker">{data.kicker}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
          <p className="edu-head__sub" style={{ color: 'var(--edu-body)' }}>
            {data.sub}
          </p>
        </div>

        {/* Recruiter Wall Grid */}
        <div className="wp-block-group alignwide">
          <div className="edu-recwall edu-reveal is-inview">
            {logos.map((rec, i) => (
              <div key={`logo-${i}`} className="edu-recwall__cell">
                <img src={rec.src} alt={rec.alt} loading="lazy" />
              </div>
            ))}
            {marks.map((rec, i) => (
              <div key={`mark-${i}`} className="edu-recwall__cell">
                <span className="edu-recwall__mark">
                  {rec.name}
                  <small>{rec.sub}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
