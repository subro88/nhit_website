'use client';

import React from 'react';
import Link from 'next/link';

interface Course {
  slug: string;
  code: string;
  title: string;
  tagline: string;
  image: string;
  labs: string;
  intake: string;
}

const courses: Course[] = [
  {
    slug: 'computer-science-technology',
    code: 'CST',
    title: 'Computer Science & Technology',
    tagline: 'Software Development, Database Management, Computer Networks & AI Foundations',
    image: '/images/hero-computers.jpg',
    labs: '07 LABS',
    intake: '60 SEATS',
  },
  {
    slug: 'diploma-in-mechanical-engineering',
    code: 'ME',
    title: 'Mechanical Engineering',
    tagline: 'Precision Machining, Thermal Systems, Hydraulics & Industrial Manufacturing',
    image: '/images/lab-mechanical.jpg',
    labs: '11 LABS',
    intake: '120 SEATS',
  },
  {
    slug: 'diploma-in-electrical-engineering',
    code: 'EE',
    title: 'Electrical Engineering',
    tagline: 'Power Systems, Electrical Machines, Switchgear & Renewable Energy',
    image: '/images/hero-electronics.jpg',
    labs: '08 LABS',
    intake: '120 SEATS',
  },
  {
    slug: 'diploma-in-civil-engineering',
    code: 'CE',
    title: 'Civil Engineering',
    tagline: 'Total Station Surveying, Concrete Technology, Structural CAD & Soil Mechanics',
    image: '/images/about-survey.jpg',
    labs: '08 LABS',
    intake: '60 SEATS',
  },
  {
    slug: 'diploma-in-electronics-telecommunications-engineering',
    code: 'ETCE',
    title: 'Electronics & Telecommunications',
    tagline: 'Microprocessors, Embedded IoT Systems, Optical Fiber & Wireless Networks',
    image: '/images/lab-electronics.jpg',
    labs: '07 LABS',
    intake: '30 SEATS',
  },
  {
    slug: 'diploma-in-automobile-engineering',
    code: 'AE',
    title: 'Automobile Engineering',
    tagline: 'Engine Diagnostics, Vehicle Dynamics, CAD Design & Hybrid/EV Technologies',
    image: '/images/lab-automobile.jpg',
    labs: '07 LABS',
    intake: '60 SEATS',
  },
];

export default function CourseGridSection() {
  return (
    <section id="courses" className="wp-block-group edu-courses">
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center edu-reveal is-inview">
          <p className="edu-sec-head__kicker">Our Programs</p>
          <h2 className="edu-sec-head__title">Popular Diploma Courses</h2>
          <p className="edu-sec-head__sub">
            Three-year, six-semester diploma programmes after Class 10 — plus two ITI trades.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="wp-block-group alignwide">
          <div className="edu-course-grid">
            {courses.map((c, i) => (
              <div
                key={c.slug}
                className="edu-reveal is-inview"
                data-edu-tilt="8"
                data-delay={(80 * (i % 3)).toString()}
              >
                <Link className="edu-tilt edu-course" href={`/departments/${c.slug}`}>
                  <div className="edu-course__media">
                    <img src={c.image} alt={c.title} loading="lazy" />
                    <span className="edu-course__flag">Diploma · {c.code}</span>
                  </div>
                  <div className="edu-course__body">
                    <h3 className="edu-course__title edu-tilt__lift">{c.title}</h3>
                    <p className="edu-course__text">{c.tagline}</p>
                    <div className="edu-course__meta">
                      <span>
                        ⏱ <b>3 YRS · 6 SEM</b>
                      </span>
                      <span>
                        🔬 <b>{c.labs}</b>
                      </span>
                      <span>
                        🎯 <b>{c.intake}</b>
                      </span>
                    </div>
                  </div>
                  <div className="edu-course__foot">View Program</div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* NCVT ITI Hub Banner */}
        <div
          className="edu-container"
          style={{
            marginTop: '40px',
            background:
              'linear-gradient(135deg,rgba(16,185,129,0.06),rgba(99,102,241,0.06))',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: '12px',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#059669',
                background: '#ECFDF5',
                padding: '3px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
              }}
            >
              NCVT Craftsman Training Scheme (CTS)
            </span>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#0F172A',
                margin: '8px 0 4px 0',
              }}
            >
              Looking for Industrial Training (ITI)?
            </h3>
            <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
              NHIT offers 2-Year Full-Time NCVT Approved ITI in <strong>Electrician</strong> and{' '}
              <strong>Fitter</strong> with intensive workshop practice and 100% placement support.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/admissions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#10B981',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                padding: '10px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              ITI Electrician →
            </Link>
            <Link
              href="/admissions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#6366F1',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                padding: '10px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              ITI Fitter →
            </Link>
            <Link
              href="/departments"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#0F172A',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                padding: '10px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Explore ITI Hub ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
