'use client';

import React from 'react';
import Link from 'next/link';

interface NoticeItem {
  day: string;
  mon: string;
  title: string;
  link: string;
  isNew?: boolean;
}

const defaultNotices: NoticeItem[] = [
  {
    day: '02',
    mon: 'OCT',
    title: '5th Internal Assessment — Schedule Released',
    link: '/circulars/5th-internal-assessment-schedule',
    isNew: true,
  },
  {
    day: '15',
    mon: 'SEP',
    title: '1st Internal Examination — Session 2026 Schedule',
    link: '/circulars/1st-internal-examination-2026-schedule',
    isNew: true,
  },
  {
    day: '20',
    mon: 'AUG',
    title: 'Odd Semester Fee Payment Window',
    link: '/circulars/odd-semester-fee-payment-window',
    isNew: false,
  },
  {
    day: '10',
    mon: 'JUL',
    title: 'Seminar: Green & Clean Energy',
    link: '/circulars/seminar-green-clean-energy',
    isNew: false,
  },
  {
    day: '18',
    mon: 'JUN',
    title: 'NHIT Private ITI — Trade Admissions Open',
    link: '/circulars/nhit-private-iti-admission-notice',
    isNew: false,
  },
  {
    day: '10',
    mon: 'JUN',
    title: 'Farewell Ceremony — Batch 2021–2024',
    link: '/circulars/farewell-ceremony-batch-2021-2024',
    isNew: false,
  },
];

export default function NewsTicker() {
  return (
    <div className="edu-news edu-reveal is-inview">
      <div className="edu-news__head">
        <span className="edu-news__dot" aria-hidden="true" />
        Latest News
      </div>
      <div className="edu-news__body">
        <div className="edu-news__track" style={{ animationDuration: '30s' }}>
          {[0, 1].map((setIndex) => (
            <ul
              key={setIndex}
              className="edu-news__set"
              aria-hidden={setIndex === 1 ? 'true' : undefined}
            >
              {defaultNotices.map((item, i) => (
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
      <Link className="edu-news__foot" href="/circulars">
        View All Notices →
      </Link>
    </div>
  );
}
