import React from 'react';
import type { GalleryData } from '@/lib/homeTypes';

export default function CampusGallery({ data }: { data: GalleryData }) {
  const galleryItems = data.items ?? [];

  return (
    <section id="campus" className="wp-block-group edu-gallery">
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center edu-reveal is-inview">
          <p className="edu-sec-head__kicker">{data.kicker}</p>
          <h2 className="edu-sec-head__title">{data.title}</h2>
        </div>

        {/* 12-Image Masonry / Grid */}
        <div className="wp-block-group alignwide edu-gallery__grid">
          {galleryItems.map((item, i) => (
            <figure
              key={i}
              className="edu-gallery__item edu-reveal is-inview"
              data-delay={String((i % 4) * 80)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
