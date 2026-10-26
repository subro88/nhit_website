'use client';

import React from 'react';
import Link from 'next/link';
import type { TickerData } from '@/lib/homeTypes';

export default function NewsTicker({ data }: { data: TickerData }) {
  const items = data.items ?? [];

  return (
    <div className="edu-news edu-reveal is-inview">
      <div className="edu-news__head">
        <span className="edu-news__dot" aria-hidden="true" />
        {data.heading || 'Latest News'}
      </div>
      <div className="edu-news__body">
        <div className="edu-news__track" style={{ animationDuration: '30s' }}>
          {[0, 1].map((setIndex) => (
            <ul
              key={setIndex}
              className="edu-news__set"
              aria-hidden={setIndex === 1 ? 'true' : undefined}
            >
              {items.map((item, i) => (
                <li key={i}>
                  <Link className="edu-news__item" href={item.link}>
                    <span className="edu-news__date">
                      <b>{item.day}</b>
                      {item.mon}
                    </span>
                    <span className="edu-news__title">
                      {item.title}
                      {item.isNew && <em className="edu-news__tag">NEW</em>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <Link className="edu-news__foot" href={data.footHref || '/circulars'}>
        {data.footText || 'View All Notices →'}
      </Link>
    </div>
  );
}
