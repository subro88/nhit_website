import React from 'react';

const testimonials = [
  {
    name: 'Debjit Ghosh',
    role: 'Alumnus, Mechanical Engineering (Tata Motors)',
    image: '/images/campus-04.jpg',
    quote:
      'NHIT provided the ideal balance of workshop hands-on practice and rigorous theory. The state-of-the-art CNC lab made the campus interview process seamless.',
  },
  {
    name: 'Sneha Mukherjee',
    role: 'Alumna, Computer Science & Technology',
    image: '/images/campus-05.jpg',
    quote:
      'The high-speed computing lab and faculty mentoring gave me the technical edge to excel in lateral entry B.Tech and subsequent software development career.',
  },
  {
    name: 'Subhash Mondal',
    role: 'Parent of EE Diploma Graduate',
    image: '/images/campus-06.jpg',
    quote:
      'The academic discipline, anti-ragging security, and dedicated placement cell gave our family complete peace of mind. My son secured direct campus placement.',
  },
  {
    name: 'Rajesh Karmakar',
    role: 'Alumnus, Automobile Engineering (Anand Group)',
    image: '/images/campus-07.jpg',
    quote:
      'Live vehicle chassis test benches and industry visit exposure at NHIT Durgapur prepared me with real manufacturing skills that auto giants demand.',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="rs-testimonial" className="wp-block-group rs-testimonial bg5 sec-spacer">
      <div className="container edu-container">
        {/* Section Title */}
        <div className="sec-title mb-50 text-center">
          <h2 className="white-color">WHAT PEOPLE SAY</h2>
          <p className="white-color">
            Voices of our alumni, industry recruiters, and parents reflecting 18+ years of technical
            excellence at NHIT Durgapur.
          </p>
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
