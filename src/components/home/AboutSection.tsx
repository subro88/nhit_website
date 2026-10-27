import React from 'react';
import Link from 'next/link';
import NewsTicker from './NewsTicker';
import type { AboutData, TickerData } from '@/lib/homeTypes';

export default function AboutSection({
  data,
  ticker,
}: {
  data: AboutData;
  ticker: TickerData;
}) {
  const checklist = data.checklist ?? [];

  return (
    <section id="about" className="wp-block-group edu-about">
      <div className="wp-block-group edu-container edu-about__grid edu-about__grid--news">
        {/* Left Media Image with Badge */}
        <div className="edu-about__media edu-reveal is-inview">
          <img
            className="edu-about__img"
            src={data.image}
            alt={data.imageAlt || ''}
            loading="lazy"
          />
          <div className="edu-about__badge">
            <b>{data.badgeYear}</b>
            <span>{data.badgeLabel}</span>
          </div>
        </div>

        {/* Center Content Column */}
        <div className="wp-block-group edu-reveal is-inview">
          <p className="edu-sec-head__kicker">About NHIT</p>
          <h2 className="edu-sec-head__title" style={{ fontSize: 'clamp(1.5rem,2.6vw,2rem)' }}>
            {data.title}
          </h2>
          <p style={{ fontSize: '0.92rem' }}>
            {data.text}
            {data.textBold ? <> <strong>{data.textBold}</strong></> : null}
          </p>
          {checklist.length > 0 && (
            <ul className="edu-checklist">
              {checklist.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
          <p className="edu-btn-row">
            {data.btnPrimaryText && (
              <Link className="edu-btn edu-btn--primary" href={data.btnPrimaryHref || '#'}>
                {data.btnPrimaryText}
              </Link>
            )}
            {data.btnOutlineText && (
              <Link className="edu-btn edu-btn--outline" href={data.btnOutlineHref || '#'}>
                {data.btnOutlineText}
              </Link>
            )}
          </p>
        </div>

        {/* Right Column: Live News Ticker */}
        {ticker.visible !== false && <NewsTicker data={ticker} />}
      </div>
    </section>
  );
}
