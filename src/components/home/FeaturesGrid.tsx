import React from 'react';
import type { FeaturesData } from '@/lib/homeTypes';

export default function FeaturesGrid({ data }: { data: FeaturesData }) {
  const features = data.items ?? [];

  return (
    <section className="wp-block-group edu-features rs-services">
      <div className="wp-block-group edu-container">
        <div className="row">
          {features.map((feat, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div
                className="services-item rs-animation-hover edu-reveal is-inview"
                data-delay={String(i * 90)}
              >
                <div className="services-icon">
                  <i className={`fa ${feat.icon} rs-animation-scale-up`} />
                </div>
                <div className="services-desc">
                  <h4 className="services-title">{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
