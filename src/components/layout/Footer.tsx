'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BrandData } from '@/lib/homeTypes';

export default function Footer({ brand }: { brand?: BrandData }) {
  const footerLogo = brand?.logo || '/images/logo-nhit.png';
  const footerLogoAlt = brand?.sub || 'The New Horizons Institute of Technology Logo';
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [prospectusForm, setProspectusForm] = useState({
    student_name: '',
    student_phone: '',
    interested_course: '',
  });

  // The admin panel renders its own shell — never show the site footer there.
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const handleProspectusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => {
      window.open(
        'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf',
        '_blank'
      );
      setTimeout(() => {
        setModalOpen(false);
        setDownloadSuccess(false);
      }, 2000);
    }, 600);
  };

  return (
    <>
      {/* Footer contact strip — deliberately straddles the seam between the
          last page section and the footer: top half floats over the page
          section, bottom half over the footer (.nhit-contact-straddle CSS). */}
      <div className="nhit-contact-straddle">
        <div className="container edu-container">
          {/* Footer Address Strip */}
          <div className="row footer-contact-desc">
              <div className="col-md-4">
                <div className="contact-inner">
                  <i className="fa fa-map-marker" />
                  <h4 className="contact-title">Campus Address</h4>
                  <p className="contact-desc">
                    Phase-II, City Center, South G.T. Road
                    <br />
                    Near Gandhi More, Durgapur — 713208
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contact-inner">
                  <i className="fa fa-phone" />
                  <h4 className="contact-title">Phone Number</h4>
                  <p className="contact-desc">
                    <a href="tel:+919800571423" style={{ color: 'inherit', textDecoration: 'none' }}>
                      +91 98005 71423
                    </a>
                    <br />
                    <a href="tel:+917407294943" style={{ color: 'inherit', textDecoration: 'none' }}>
                      +91 74072 94943 (WhatsApp)
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contact-inner">
                  <i className="fa fa-envelope-o" />
                  <h4 className="contact-title">Email Address</h4>
                  <p className="contact-desc">
                    <a href="mailto:info@nhit.in" style={{ color: 'inherit', textDecoration: 'none' }}>
                      info@nhit.in
                    </a>
                    <br />
                    <a href="https://nhit.in" style={{ color: 'inherit', textDecoration: 'none' }}>
                      www.nhit.in
                    </a>
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>

      <footer id="rs-footer" className="wp-block-group rs-footer bg3">
        {/* Giant outlined brand watermark (decorative, non-interactive) */}
        <div className="nhit-footer-watermark" aria-hidden="true">
          NHIT
        </div>

        {/* Footer Top */}
        <div className="footer-top">
          <div className="container edu-container">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <div className="about-widget">
                  {brand?.visible !== false && (
                    <img
                      src={footerLogo}
                      alt={footerLogoAlt}
                      style={{
                        maxHeight: '56px',
                        width: 'auto',
                        marginBottom: '15px',
                        background: '#ffffff',
                        padding: '6px 10px',
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <p>
                    The New Horizons Institute of Technology is one of eastern India&apos;s premier
                    polytechnic institutions, imparting top-tier diploma engineering and technical
                    training since 2007.
                  </p>
                  <p className="margin-remove" style={{ color: '#d1d5db', fontSize: '12.5px' }}>
                    Approved by AICTE (PID 1-475249561), Affiliated to WBSCT&amp;VE&amp;SD and
                    MAKAUT.
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-12">
                <h5 className="footer-title">RECENT POSTS</h5>
                <div className="recent-post-widget">
                  <div className="post-item">
                    <div className="post-date">
                      <span>02</span>
                      <span>OCT</span>
                    </div>
                    <div className="post-desc">
                      <h5 className="post-title">
                        <Link href="/circulars/5th-internal-assessment-schedule">
                          5th Internal Assessment — Schedule Released
                        </Link>
                      </h5>
                      <span className="post-category">Examination Cell</span>
                    </div>
                  </div>
                  <div className="post-item">
                    <div className="post-date">
                      <span>15</span>
                      <span>SEP</span>
                    </div>
                    <div className="post-desc">
                      <h5 className="post-title">
                        <Link href="/circulars/1st-internal-examination-2026-schedule">
                          1st Internal Examination — Session 2026 Schedule
                        </Link>
                      </h5>
                      <span className="post-category">Academic Schedule</span>
                    </div>
                  </div>
                  <div className="post-item">
                    <div className="post-date">
                      <span>20</span>
                      <span>AUG</span>
                    </div>
                    <div className="post-desc">
                      <h5 className="post-title">
                        <Link href="/circulars/odd-semester-fee-payment-window">
                          Odd Semester Fee Payment Window
                        </Link>
                      </h5>
                      <span className="post-category">Accounts &amp; Fees</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-12">
                <h5 className="footer-title">OUR SITEMAP</h5>
                <ul className="sitemap-widget">
                  <li className="active">
                    <Link href="/">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      About NHIT
                    </Link>
                  </li>
                  <li>
                    <Link href="/departments">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      Diploma Branches
                    </Link>
                  </li>
                  <li>
                    <Link href="/admissions">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      Admissions
                    </Link>
                  </li>
                  <li>
                    <Link href="/placements">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      Placements
                    </Link>
                  </li>
                  <li>
                    <Link href="/circulars">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      Circulars
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <i className="fa fa-angle-right" aria-hidden="true" />
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-12">
                <h5 className="footer-title">NEWSLETTER</h5>
                <p>Sign Up to Our Newsletter to Get Latest Updates &amp; Services</p>
                <form
                  className="news-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you for subscribing to NHIT Official Announcements.');
                  }}
                >
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter Your Email"
                    required
                  />
                  <button type="submit" className="form-button" aria-label="Subscribe">
                    <i className="fa fa-arrow-right" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-share">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/nhit.in"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/nhitdurgapur"
                    target="_blank"
                    rel="noopener"
                    aria-label="Twitter"
                  >
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/school/the-new-horizons-institute-of-technology/"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                  >
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@nhit_durgapur"
                    target="_blank"
                    rel="noopener"
                    aria-label="YouTube"
                  >
                    <i className="fa fa-youtube" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/917407294943"
                    target="_blank"
                    rel="noopener"
                    aria-label="WhatsApp"
                  >
                    <i className="fa fa-whatsapp" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container edu-container">
            <div className="copyright">
              <p>
                © 2026{' '}
                <Link href="/">The New Horizons Institute of Technology</Link>. All Rights
                Reserved. AICTE Permanent ID: 1-475249561.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Quick Action Bar */}
      <div
        className="nhit-floating-quickbar"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <a
          href="https://wa.me/917407294943?text=Hello%20NHIT%20Counseling%20Team%2C%20I%20would%20like%20information%20regarding%20Diploma%20admissions."
          target="_blank"
          rel="noopener"
          style={{
            background: '#25D366',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 18px rgba(37,211,102,0.35)',
            transition: 'transform 0.2s',
          }}
        >
          💬 WhatsApp Counselor
        </a>
        <button
          onClick={() => setModalOpen(true)}
          type="button"
          style={{
            background: 'var(--edu-primary)',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 18px',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 18px rgba(255,49,21,0.35)',
            transition: 'transform 0.2s',
          }}
        >
          📄 Download Prospectus
        </button>
      </div>

      {/* Prospectus Download Modal */}
      {modalOpen && (
        <div
          id="nhitProspectusModal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15,23,42,0.8)',
            zIndex: 99999,
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                background: '#0F172A',
                color: '#FFFFFF',
                padding: '18px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '3px solid var(--edu-primary)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
                Download Official Prospectus
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: '24px',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleProspectusSubmit} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '4px',
                  }}
                >
                  Candidate Name *
                </label>
                <input
                  type="text"
                  name="student_name"
                  required
                  placeholder="Enter student's full name"
                  value={prospectusForm.student_name}
                  onChange={(e) =>
                    setProspectusForm({ ...prospectusForm, student_name: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '4px',
                  }}
                >
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="student_phone"
                  required
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  value={prospectusForm.student_phone}
                  onChange={(e) =>
                    setProspectusForm({ ...prospectusForm, student_phone: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '4px',
                  }}
                >
                  Course of Interest *
                </label>
                <select
                  name="interested_course"
                  required
                  value={prospectusForm.interested_course}
                  onChange={(e) =>
                    setProspectusForm({ ...prospectusForm, interested_course: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">-- Choose Branch --</option>
                  <option value="CST">Diploma in Computer Science &amp; Technology</option>
                  <option value="EE">Diploma in Electrical Engineering</option>
                  <option value="ME">Diploma in Mechanical Engineering</option>
                  <option value="CE">Diploma in Civil Engineering</option>
                  <option value="ETCE">Diploma in Electronics &amp; Telecommunication</option>
                  <option value="AUTO">Diploma in Automobile Engineering</option>
                  <option value="ITI">ITI (Electrician / Fitter Trades)</option>
                </select>
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'var(--edu-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(255,49,21,0.3)',
                }}
              >
                ⬇ Instant Download Prospectus
              </button>
              {downloadSuccess && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '12px',
                    background: '#DCFCE7',
                    border: '1px solid #86EFAC',
                    color: '#166534',
                    fontSize: '13px',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}
                >
                  Thank you! Your official prospectus is downloading now.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
