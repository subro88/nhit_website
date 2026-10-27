'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { HeroData } from '@/lib/homeTypes';
import HeroEstdBadge from './HeroEstdBadge';
import VideoTourModal from './VideoTourModal';

export default function HeroSlider({ data }: { data: HeroData }) {
  const slides = data.slides ?? [];
  const chips = data.chips ?? [];
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    /* depends on `current` too so manual navigation restarts both the
       timer and the dot fill animation together */
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length, current]);

  return (
    <section
      id="hero"
      className={`wp-block-group edu-hero relative overflow-hidden ${
        data.estdBadge?.visible !== false ? 'edu-hero--estd' : ''
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="edu-slider" data-edu-slider data-paused={isPaused ? 'true' : 'false'}>
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
      {chips.map((chip, i) => (
        <div key={i} className={`edu-chip3d edu-chip3d--${['a', 'b', 'c', 'd', 'e'][i] || 'e'}`}>
          <span className="edu-chip3d__label">{chip.label}</span>
          <span className={`edu-chip3d__value ${chip.tone === 'red' ? 'is-red' : ''}`}>{chip.value}</span>
        </div>
      ))}

      {/* Campus tour pill — opens the YouTube lightbox */}
      {data.tourVideo ? (
        <button
          type="button"
          className="edu-hero__tour"
          onClick={() => setTourOpen(true)}
          aria-haspopup="dialog"
        >
          <span className="edu-hero__tour-icon">
            <i className="fa fa-play" aria-hidden="true" />
          </span>
          <span className="edu-hero__tour-text">{data.tourLabel || 'Watch Campus Tour'}</span>
        </button>
      ) : null}

      {/* Estd semicircle badge — expands on hover to show key features */}
      {data.estdBadge?.visible !== false && <HeroEstdBadge data={data.estdBadge || {}} />}

      {/* Campus tour lightbox */}
      {tourOpen && data.tourVideo ? (
        <VideoTourModal
          youtubeId={data.tourVideo}
          title={data.tourLabel || 'NHIT Campus Tour'}
          onClose={() => setTourOpen(false)}
        />
      ) : null}
    </section>
  );
}
