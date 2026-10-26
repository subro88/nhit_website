import React from 'react';
import type { SocialWallData } from '@/lib/homeTypes';

/*
 * Social wall — the three official NHIT pages (Facebook, LinkedIn, YouTube)
 * with live follower counts gathered from research. Hover lift + accent
 * border. Content: socialWall in homepage.json.
 */
export default function SocialWall({ data }: { data: SocialWallData }) {
  const cards = (data.cards ?? []).filter((c) => c.url);
  if (cards.length === 0) return null;

  return (
    <section className="wp-block-group edu-social" id="social">
      <div className="edu-container">
        <div className="wp-block-group edu-sec-head edu-sec-head--center">
          <p className="edu-sec-head__kicker">{data.kicker || 'Join The Community'}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
          {data.sub ? <p className="edu-sec-head__sub">{data.sub}</p> : null}
        </div>

        <div className="edu-social__grid">
          {cards.map((c, i) => (
            <a key={i} className="edu-social__card" href={c.url} target="_blank" rel="noopener noreferrer">
              <span className="edu-social__icon">
                <i className={`fa ${c.icon || 'fa-globe'}`} aria-hidden="true" />
              </span>
              <span className="edu-social__name">{c.name}</span>
              <span className="edu-social__stat">{c.stat}</span>
              <span className="edu-social__handle">{c.handle}</span>
              {c.note ? <span className="edu-social__note">{c.note}</span> : null}
              <span className="edu-social__cta">
                Follow Us <i className="fa fa-angle-right" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
