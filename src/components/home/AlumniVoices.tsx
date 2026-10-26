'use client';

import React, { useState } from 'react';
import type { AlumniVoicesData } from '@/lib/homeTypes';

/*
 * Alumni voices — the official NHIT alumni podcast episodes as lightweight
 * YouTube cards with a pull quote each. Content: alumniVoices in homepage.json.
 */
function VoiceCard({ id, title, role }: { id: string; title: string; role: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="edu-alumni__frame">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="edu-vidcard__poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play podcast: ${title}`}
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
        >
          <span className="edu-vidcard__play">
            <i className="fa fa-play" aria-hidden="true" />
          </span>
          <span className="edu-vidcard__badge">Podcast</span>
        </button>
      )}
      <p className="edu-alumni__role">{role}</p>
    </div>
  );
}

export default function AlumniVoices({ data }: { data: AlumniVoicesData }) {
  const voices = (data.voices ?? []).filter((v) => v.youtubeId);
  if (voices.length === 0) return null;

  return (
    <section className="wp-block-group edu-alumni" id="alumni-voices">
      <div className="edu-container">
        <div className="wp-block-group edu-sec-head edu-sec-head--center">
          <p className="edu-sec-head__kicker">{data.kicker || 'Alumni Voices'}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
          {data.sub ? <p className="edu-sec-head__sub">{data.sub}</p> : null}
        </div>

        <div className="edu-alumni__grid">
          {voices.map((v, i) => (
            <figure key={i} className="edu-alumni__card">
              <VoiceCard id={v.youtubeId} title={v.name} role={v.role} />
              <blockquote className="edu-alumni__quote">
                <i className="fa fa-quote-left" aria-hidden="true" />
                <p>{v.quote}</p>
                <figcaption>{v.name}</figcaption>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
