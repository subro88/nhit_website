'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Slide {
  bg: string;
  kicker: string;
  title: string;
  titleEm: string;
  titleAfter: string;
  text: string;
  btnPrimaryText: string;
  btnPrimaryHref: string;
  btnGhostText: string;
  btnGhostHref: string;
}

const slides: Slide[] = [
  {
    bg: '/images/hero-campus.jpg',
    kicker: 'Welcome to NHIT · Est. 2007',
    title: 'Build Your Engineering Career ',
    titleEm: 'Hands-On',
    titleAfter: ' in Durgapur',
    text: "One of eastern India's largest diploma engineering institutes — six branches, two ITI trades and 40+ laboratories, affiliated to WBSCT&VE&SD.",
    btnPrimaryText: 'Apply — Session 2026 →',
    btnPrimaryHref: '/admissions',
    btnGhostText: 'Explore Departments',
    btnGhostHref: '/departments',
  },
  {
    bg: '/images/hero-computers.jpg',
    kicker: 'Learn By Doing',
    title: 'Labs You Work In From ',
    titleEm: 'Semester One',
    titleAfter: ', Not Year Three',
    text: 'From compiler labs to solar-power rigs and live engine teardowns — every branch runs its own laboratory programme with industry MoUs behind it.',
    btnPrimaryText: 'See Lab Floors →',
    btnPrimaryHref: '/departments',
    btnGhostText: 'Placement Record',
    btnGhostHref: '/placements',
  },
  {
    bg: '/images/hero-electronics.jpg',
    kicker: 'Placements & Pathways',
    title: '80–85% of Eligible Students ',
    titleEm: 'Placed',
    titleAfter: ' or in B.Tech',
    text: 'Recruiters from Tata Motors to L&T, MoUs with CSIR-CMERI and HCL, and a proven ladder into B.Tech lateral entry.',
    btnPrimaryText: 'Placement Story →',
    btnPrimaryHref: '/placements',
    btnGhostText: 'Visit the Campus',
    btnGhostHref: '/contact',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section
      id="hero"
      className="wp-block-group edu-hero relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="edu-slider" data-edu-slider>
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={index}
              className={`edu-slide ${isActive ? 'is-active' : ''}`}
              style={{
                opacity: isActive ? 1 : 0,
                visibility: isActive ? 'visible' : 'hidden',
                transition: 'opacity 1s ease, visibility 1s ease',
              }}
            >
              <div
                className="edu-slide__bg"
                style={{
                  backgroundImage: `url(${slide.bg})`,
                  transform: 'translateY(0px)',
                }}
              />
              <div className="edu-slide__inner edu-container">
                <p className="edu-slide__kicker">{slide.kicker}</p>
                <h2 className="edu-slide__title">
                  {slide.title}
                  <em>{slide.titleEm}</em>
                  {slide.titleAfter}
                </h2>
                <p className="edu-slide__text">{slide.text}</p>
                <p className="edu-btn-row">
                  <Link className="edu-btn edu-btn--primary" href={slide.btnPrimaryHref}>
                    {slide.btnPrimaryText}
                  </Link>
                  <Link className="edu-btn edu-btn--ghost" href={slide.btnGhostHref}>
                    {slide.btnGhostText}
                  </Link>
                </p>
              </div>
            </div>
          );
        })}

        {/* Slide Indicator Dots */}
        <div className="edu-slider__dots" role="tablist" aria-label="Hero slides">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`edu-slider__dot ${i === current ? 'is-active' : ''}`}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          className="edu-slider__arrow edu-slider__arrow--prev"
          type="button"
          aria-label="Previous slide"
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
        <button
          className="edu-slider__arrow edu-slider__arrow--next"
          type="button"
          aria-label="Next slide"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        >
          ›
        </button>
      </div>

      {/* 3D Floating Chips */}
      <div className="edu-chip3d edu-chip3d--a">
        <span className="edu-chip3d__label">Placement Record</span>
        <span className="edu-chip3d__value is-red">80–85%*</span>
      </div>
      <div className="edu-chip3d edu-chip3d--b">
        <span className="edu-chip3d__label">Labs on Campus</span>
        <span className="edu-chip3d__value">40+ Tracked</span>
      </div>
      <div className="edu-chip3d edu-chip3d--c">
        <span className="edu-chip3d__label">R&D MoU</span>
        <span className="edu-chip3d__value">CSIR-CMERI</span>
      </div>
    </section>
  );
}
