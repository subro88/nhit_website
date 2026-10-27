import React from 'react';
import type { TestimonialsData } from '@/lib/homeTypes';

export default function TestimonialsSection({ data }: { data: TestimonialsData }) {
  const testimonials = data.items ?? [];

  return (
    <section id="rs-testimonial" className="wp-block-group rs-testimonial bg5 sec-spacer">
      <div className="container edu-container">
        {/* Section Title — unified header pattern */}
        <div className="wp-block-group edu-sec-head edu-sec-head--center">
          <p className="edu-sec-head__kicker">{data.kicker || 'Voices Of NHIT'}</p>
          <h2 className="edu-sec-head__title">{data.heading}</h2>
          <p className="edu-sec-head__sub">{data.sub}</p>
        </div>

        {/* 2x2 Testimonials Grid */}
        <div className="row">
          {testimonials.map((testi, i) => (
            <div key={i} className="col-lg-6 col-md-12">
              <div className="testimonial-item">
                <div className="testi-img">
                  <img src={testi.image} alt={testi.name} loading="lazy" />
                </div>
                <div className="testi-desc">
                  <h4 className="testi-name">
                    {testi.name} <span>{testi.role}</span>
                  </h4>
                  <div className="testi-rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <p>{testi.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
