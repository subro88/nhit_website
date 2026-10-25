'use client';

import React, { useState } from 'react';

export default function LeadCaptureSection() {
  const [formData, setFormData] = useState({
    student_name: '',
    whatsapp_number: '',
    email: '',
    qualification: '',
    target_program: '',
    city_district: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Trigger download of prospectus after brief delay
    setTimeout(() => {
      window.open(
        'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf',
        '_blank'
      );
    }, 800);
  };

  return (
    <section className="wp-block-group nhit-inst-lead-section" id="admission">
      <span
        id="lead-capture"
        style={{ position: 'relative', top: '-100px', display: 'block', visibility: 'hidden' }}
      />
      <div className="nhit-inst-container">
        <div className="nhit-inst-lead-box">
          {/* Left Column: Perks & Info */}
          <div className="nhit-inst-lead-content">
            <h2>Begin Your Journey at NHIT Durgapur</h2>
            <p>
              Admissions are now open for Session 2026–2027. Speak directly with our Senior Academic
              Counselors for branch eligibility, JEXPO/MAKAUT counseling guidance, hostel
              availability, and merit scholarships.
            </p>

            <ul className="nhit-inst-lead-perks">
              <li className="nhit-inst-lead-perk-item">
                <span className="nhit-inst-lead-perk-icon">✓</span>
                <span>Official 2026–27 Institute Prospectus &amp; Fee Structure PDF</span>
              </li>
              <li className="nhit-inst-lead-perk-item">
                <span className="nhit-inst-lead-perk-icon">✓</span>
                <span>SVMCM, OASIS &amp; Aikyashree Scholarship Assistance</span>
              </li>
              <li className="nhit-inst-lead-perk-item">
                <span className="nhit-inst-lead-perk-icon">✓</span>
                <span>One-on-One Counseling &amp; Campus Lab Tour Invitation</span>
              </li>
              <li className="nhit-inst-lead-perk-item">
                <span className="nhit-inst-lead-perk-icon">✓</span>
                <span>Institute Bus Route Details (Asansol, Raniganj, Bardhaman)</span>
              </li>
            </ul>

            <div
              style={{
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#94A3B8',
              }}
            >
              🔒 Your contact information is kept strictly confidential according to NHIT
              institutional privacy guidelines.
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div>
            <form
              id="nhitInstitutionalLeadForm"
              className="nhit-inst-lead-form"
              onSubmit={handleSubmit}
            >
              <div className="nhit-inst-field nhit-inst-form-full">
                <label htmlFor="lead_student_name">Full Name of Student *</label>
                <input
                  type="text"
                  id="lead_student_name"
                  name="student_name"
                  placeholder="Enter student's full name"
                  required
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                />
              </div>

              <div className="nhit-inst-field">
                <label htmlFor="lead_whatsapp">WhatsApp Mobile Number *</label>
                <input
                  type="tel"
                  id="lead_whatsapp"
                  name="whatsapp_number"
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  required
                  value={formData.whatsapp_number}
                  onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                />
              </div>

              <div className="nhit-inst-field">
                <label htmlFor="lead_email">Email Address</label>
                <input
                  type="email"
                  id="lead_email"
                  name="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="nhit-inst-field">
                <label htmlFor="lead_qual">Current Qualification *</label>
                <select
                  id="lead_qual"
                  name="qualification"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                >
                  <option value="">Select Qualification</option>
                  <option value="10th Appearing / Passed">Class 10th (Appearing / Passed)</option>
                  <option value="12th Science (PCM/PCB)">Class 12th Science (PCM/PCB)</option>
                  <option value="12th Commerce">Class 12th Commerce</option>
                  <option value="12th Arts">Class 12th Arts</option>
                  <option value="ITI Pass (VOCLET Aspirant)">ITI Pass (2 Years NCVT)</option>
                  <option value="Graduate / Other">Graduate / Other</option>
                </select>
              </div>

              <div className="nhit-inst-field">
                <label htmlFor="lead_program">Target Program of Interest *</label>
                <select
                  id="lead_program"
                  name="target_program"
                  required
                  value={formData.target_program}
                  onChange={(e) => setFormData({ ...formData, target_program: e.target.value })}
                >
                  <option value="">Select Program</option>
                  <optgroup label="UG University Degrees (MAKAUT)">
                    <option value="BCA - Computer Applications">BCA (Bachelor of Computer Applications)</option>
                    <option value="BBA - Business Administration">BBA (Bachelor of Business Administration)</option>
                    <option value="BBA - Hospital Management">BBA in Hospital Management (BBA-HM)</option>
                  </optgroup>
                  <optgroup label="3-Year Diploma Engineering (WBSCTE)">
                    <option value="Diploma in Computer Science (CST)">Diploma in Computer Science &amp; Tech (CST)</option>
                    <option value="Diploma in Mechanical Engineering">Diploma in Mechanical Engineering (ME)</option>
                    <option value="Diploma in Electrical Engineering">Diploma in Electrical Engineering (EE)</option>
                    <option value="Diploma in Civil Engineering">Diploma in Civil Engineering (CE)</option>
                    <option value="Diploma in Automobile Engineering">Diploma in Automobile Engineering (AE)</option>
                    <option value="Diploma in Electronics &amp; Telecom (ETCE)">Diploma in Electronics &amp; Telecom (ETCE)</option>
                  </optgroup>
                  <optgroup label="NCVT ITI Trade Certifications">
                    <option value="ITI Electrician Trade">NCVT ITI Electrician</option>
                    <option value="ITI Fitter Trade">NCVT ITI Fitter</option>
                  </optgroup>
                </select>
              </div>

              <div className="nhit-inst-field nhit-inst-form-full">
                <label htmlFor="lead_district">City / Home District *</label>
                <select
                  id="lead_district"
                  name="city_district"
                  required
                  value={formData.city_district}
                  onChange={(e) => setFormData({ ...formData, city_district: e.target.value })}
                >
                  <option value="">Select Your District</option>
                  <option value="Paschim Bardhaman (Durgapur/Asansol)">
                    Paschim Bardhaman (Durgapur / Asansol / Raniganj)
                  </option>
                  <option value="Purba Bardhaman">Purba Bardhaman</option>
                  <option value="Bankura">Bankura</option>
                  <option value="Birbhum (Bolpur/Suri)">Birbhum (Bolpur / Suri / Rampurhat)</option>
                  <option value="Purulia">Purulia</option>
                  <option value="Dhanbad / Bokaro (Jharkhand)">Dhanbad / Bokaro (Jharkhand)</option>
                  <option value="Kolkata / Howrah / Hooghly">Kolkata / Howrah / Hooghly</option>
                  <option value="Murshidabad / Malda">Murshidabad / Malda</option>
                  <option value="Other West Bengal District">Other West Bengal District</option>
                  <option value="Other State">Other State</option>
                </select>
              </div>

              <div className="nhit-inst-form-full" style={{ marginTop: '10px' }}>
                <button type="submit" className="nhit-inst-form-submit-btn">
                  <span>Register Admission Inquiry &amp; Download Brochure ↘</span>
                </button>
                {submitted && (
                  <div
                    id="nhitLeadFormMsg"
                    className="nhit-inst-form-msg"
                    style={{
                      display: 'block',
                      marginTop: '12px',
                      padding: '12px',
                      background: '#DCFCE7',
                      color: '#15803D',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '13px',
                      textAlign: 'center',
                    }}
                  >
                    ✓ Thank you, {formData.student_name}! Your inquiry has been registered. The
                    admissions desk will reach out on WhatsApp ({formData.whatsapp_number}).
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
