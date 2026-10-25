import React from 'react';

const galleryItems = [
  { src: '/images/hero-campus.jpg', alt: 'NHIT campus main building', caption: 'Main Block', delay: '0' },
  { src: '/images/hero-computers.jpg', alt: 'Computer laboratory', caption: 'Computer Lab', delay: '80' },
  { src: '/images/lab-automobile.jpg', alt: 'Automobile engine laboratory', caption: 'Engine Lab', delay: '160' },
  { src: '/images/lab-mechanical.jpg', alt: 'Hydraulics laboratory', caption: 'Hydraulics Lab', delay: '240' },
  { src: '/images/lab-electronics.jpg', alt: 'Electronics laboratory session', caption: 'Electronics Lab', delay: '0' },
  { src: '/images/about-survey.jpg', alt: 'Surveying field practice', caption: 'Survey Practice', delay: '80' },
  { src: '/images/hero-electronics.jpg', alt: 'Electrical measurement lab', caption: 'Measurement Lab', delay: '160' },
  { src: '/images/gallery-event.jpg', alt: 'Farewell ceremony', caption: 'Farewell 2024', delay: '240' },
  { src: '/images/campus-01.jpg', alt: 'Campus life at NHIT', caption: 'Campus Life', delay: '0' },
  { src: '/images/campus-03.jpg', alt: 'Training session', caption: 'Training Session', delay: '80' },
  { src: '/images/campus-11.jpg', alt: 'Industry visit', caption: 'Industry Visit', delay: '160' },
  { src: '/images/campus-21.jpg', alt: 'Campus event', caption: 'Campus Event', delay: '240' },
];

export default function CampusGallery() {
  return (
    <section id="campus" className="wp-block-group edu-gallery">
      <div className="wp-block-group edu-container">
        {/* Section Header */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center edu-reveal is-inview">
          <p className="edu-sec-head__kicker">Campus Life</p>
          <h2 className="edu-sec-head__title">Inside the NHIT Campus</h2>
        </div>

        {/* 12-Image Masonry / Grid */}
        <div className="wp-block-group alignwide edu-gallery__grid">
          {galleryItems.map((item, i) => (
            <figure
              key={i}
              className="edu-gallery__item edu-reveal is-inview"
              data-delay={item.delay}
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
