import React from 'react';
import Link from 'next/link';
import type { CtaBandData } from '@/lib/homeTypes';

/*
 * Slim accent gradient band shown just before the footer:
 * headline + short note on the left, "Apply Now" + call button on the right.
 * Content comes from the CMS: ctaBand in homepage.json.
 */
export default function CtaBand({ data }: { data: CtaBandData }) {
  return (
    <section className="wp-block-group edu-ctaband-wrap" id="apply-cta">
      <div className="wp-block-group edu-container">
        <div className="edu-cta-band edu-reveal is-inview">
          <div>
            <h2 className="edu-cta-band__title">{data.title}</h2>
            {data.note ? <p className="edu-cta-band__note">{data.note}</p> : null}
          </div>
          <div className="edu-btn-row">
            {data.btn1Text ? (
              <Link className="edu-btn edu-btn--light" href={data.btn1Href || '/admissions'}>
                {data.btn1Text}
              </Link>
            ) : null}
            {data.btn2Text ? (
              <Link className="edu-btn edu-btn--ghost" href={data.btn2Href || '#'}>
                {data.btn2Text}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
