'use client';

import React from 'react';
import Link from 'next/link';
import type { CoursesData } from '@/lib/homeTypes';

export default function CourseGridSection({ data }: { data: CoursesData }) {
  const courses = data.items ?? [];
  const iti = data.itiHub ?? {};

  return (
    <section id="courses" className="wp-block-group edu-courses">
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center edu-reveal is-inview">
          <p className="edu-sec-head__kicker">{data.kicker}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
          <p className="edu-sec-head__sub">{data.sub}</p>
        </div>

        {/* 6-Card Grid */}
        <div className="wp-block-group alignwide">
          <div className="edu-course-grid">
            {courses.map((c, i) => (
              <div
                key={c.slug ?? i}
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
        {iti.title && (
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
                {iti.badge}
              </span>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '8px 0 4px 0',
                }}
              >
                {iti.title}
              </h3>
              <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>{iti.text}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {iti.btn1Text && (
                <Link
                  href={iti.btn1Href || '#'}
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
                  {iti.btn1Text}
                </Link>
              )}
              {iti.btn2Text && (
                <Link
                  href={iti.btn2Href || '#'}
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
                  {iti.btn2Text}
                </Link>
              )}
              {iti.btn3Text && (
                <Link
                  href={iti.btn3Href || '#'}
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
                  {iti.btn3Text}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
