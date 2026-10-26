'use client';

import React, { useState } from 'react';
import type { VideoCardItem, VideoStripData } from '@/lib/homeTypes';

/*
 * "Life at NHIT" video strip — lightweight YouTube embeds (thumbnail first,
 * the iframe only loads after the visitor clicks play, so the page stays fast).
 * Content: videoStrip in homepage.json (Admin → Home Page Editor).
 */

function VideoCard({ video }: { video: VideoCardItem }) {
  const [playing, setPlaying] = useState(false);
  const id = video.youtubeId;

  return (
    <figure className="edu-vidcard">
      <div className="edu-vidcard__frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="edu-vidcard__poster"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}
            style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
          >
            <span className="edu-vidcard__play">
              <i className="fa fa-play" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <h3 className="edu-vidcard__title">{video.title}</h3>
        {video.note ? <p className="edu-vidcard__note">{video.note}</p> : null}
      </figcaption>
    </figure>
  );
}

export default function VideoStrip({ data }: { data: VideoStripData }) {
  const videos = (data.videos ?? []).filter((v) => v.youtubeId);
  if (videos.length === 0) return null;

  return (
    <section className="wp-block-group edu-vidstrip" id="life-at-nhit">
      <div className="edu-container">
        <div className="wp-block-group edu-sec-head edu-sec-head--center">
          <p className="edu-sec-head__kicker">{data.kicker || 'Life At NHIT'}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
          {data.sub ? <p className="edu-sec-head__sub">{data.sub}</p> : null}
        </div>

        <div className="edu-vidstrip__grid">
          {videos.map((v, i) => (
            <VideoCard key={i} video={v} />
          ))}
        </div>

        {data.ctaText && data.ctaHref ? (
          <p className="edu-vidstrip__more">
            <a className="edu-btn edu-btn--outline" href={data.ctaHref} target="_blank" rel="noopener noreferrer">
              {data.ctaText} <i className="fa fa-external-link" aria-hidden="true" />
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
