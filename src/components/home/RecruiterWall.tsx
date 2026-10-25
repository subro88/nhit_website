import React from 'react';

const recruiterImages = [
  { src: '/images/rec-tata.png', alt: 'Tata Motors' },
  { src: '/images/rec-lt.png', alt: 'Larsen & Toubro' },
  { src: '/images/rec-cummins.png', alt: 'Cummins India' },
  { src: '/images/rec-magna.png', alt: 'Magna Automotive' },
  { src: '/images/rec-force.png', alt: 'Force Motors' },
  { src: '/images/rec-kiswok.jpg', alt: 'Kiswok' },
  { src: '/images/rec-mate.jpg', alt: 'MATE' },
  { src: '/images/rec-wmark.jpg', alt: 'Campus recruiter partner' },
  { src: '/images/rec-hex.png', alt: 'Piaggio' },
];

const recruiterMarks = [
  { name: 'JOHN DEERE', sub: 'Agri-Machinery' },
  { name: 'JBM GROUP', sub: 'Auto Systems' },
  { name: 'TIL INDIA', sub: 'Heavy Equipment' },
  { name: 'ANAND GROUP', sub: 'Components' },
  { name: 'SHARDA MOTORS', sub: 'Automotive' },
  { name: 'HCL', sub: 'Technology Partner' },
];

export default function RecruiterWall() {
  return (
    <section id="placement" className="wp-block-group edu-placement">
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center edu-reveal is-inview">
          <p className="edu-sec-head__kicker">Placements &amp; Industry</p>
          <h2 className="edu-sec-head__title">Recruiters Who Hire NHIT Engineers</h2>
          <p className="edu-head__sub" style={{ color: 'var(--edu-body)' }}>
            Automotive, construction and technology employers from NHIT&apos;s placement records.
          </p>
        </div>

        {/* Recruiter Wall Grid */}
        <div className="wp-block-group alignwide">
          <div className="edu-recwall edu-reveal is-inview">
            {recruiterImages.map((rec, i) => (
              <div key={i} className="edu-recwall__cell">
                <img src={rec.src} alt={rec.alt} loading="lazy" />
              </div>
            ))}
            {recruiterMarks.map((rec, i) => (
              <div key={i} className="edu-recwall__cell">
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
