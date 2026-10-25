import React from 'react';
import Link from 'next/link';
import NewsTicker from './NewsTicker';

export default function AboutSection() {
  return (
    <section id="about" className="wp-block-group edu-about">
      <div className="wp-block-group edu-container edu-about__grid edu-about__grid--news">
        {/* Left Media Image with Badge */}
        <div className="edu-about__media edu-reveal is-inview">
          <img
            className="edu-about__img"
            src="/images/about-survey.jpg"
            alt="NHIT civil engineering students during a surveying field exercise"
            loading="lazy"
          />
          <div className="edu-about__badge">
            <b>2007</b>
            <span>Serving Since</span>
          </div>
        </div>

        {/* Center Content Column */}
        <div className="wp-block-group edu-reveal is-inview">
          <p className="edu-sec-head__kicker">About NHIT</p>
          <h2 className="edu-sec-head__title" style={{ fontSize: 'clamp(1.5rem,2.6vw,2rem)' }}>
            Welcome to The New Horizons Institute of Technology
          </h2>
          <p style={{ fontSize: '0.92rem' }}>
            NHIT opened its first academic session on 16 August 2007 at Durgapur. Today it is one
            of eastern India&apos;s largest diploma engineering institutes by student intake — with
            six diploma branches, a Private ITI, and a first pass-out batch that set the standard:{' '}
            <strong>85% moved into jobs or B.Tech lateral entry</strong>.
          </p>
          <ul className="edu-checklist">
            <li>Six diploma branches — three years, six semesters each</li>
            <li>Private ITI trades: Electrician &amp; Fitter</li>
            <li>MoUs with CSIR-CMERI (Govt. of India) and NEN; HCL tie-up</li>
            <li>Life Member, Institution of Engineers (India); ISTE member</li>
          </ul>
          <p className="edu-btn-row">
            <Link className="edu-btn edu-btn--primary" href="/about">
              Know More →
            </Link>
            <Link className="edu-btn edu-btn--outline" href="/contact">
              Visit Campus
            </Link>
          </p>
        </div>

        {/* Right Column: Live News Ticker */}
        <NewsTicker />
      </div>
    </section>
  );
}
