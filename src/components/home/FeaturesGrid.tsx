import React from 'react';

const features = [
  {
    icon: 'fa-graduation-cap',
    title: 'Est. 2007 — 18+ Years',
    desc: 'First session began 16 August 2007; 14+ batches have passed out into industry and B.Tech programmes.',
    delay: '0',
  },
  {
    icon: 'fa-university',
    title: 'WBSCT&VE&SD Affiliated',
    desc: 'All diploma programmes under the West Bengal State Council of Technical & Vocational Education and Skill Development.',
    delay: '90',
  },
  {
    icon: 'fa-flask',
    title: '40+ Laboratories',
    desc: 'Department-wise lab floors — from CNC machining and solar power to embedded systems and concrete testing.',
    delay: '180',
  },
  {
    icon: 'fa-handshake-o',
    title: 'Industry MoUs',
    desc: 'CSIR-CMERI and NEN MoUs, an HCL technology tie-up, ISTE & IE(India) memberships and British Council Library access.',
    delay: '270',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="wp-block-group edu-features rs-services">
      <div className="wp-block-group edu-container">
        <div className="row">
          {features.map((feat, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div
                className="services-item rs-animation-hover edu-reveal is-inview"
                data-delay={feat.delay}
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
