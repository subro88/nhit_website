'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  ExternalLink,
  Download,
  Building,
  Navigation
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: 'Computer Science & Technology (CST)',
    query: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="Campus Communication & Direct Helplines"
        title="Contact NHIT Durgapur"
        subtitle="Connect with our admission desk, principal’s office, training cell, or visit our central campus in Durgapur City Centre."
        breadcrumbs={[
          { label: 'Contact Us' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-12">
        
        {/* ── 3 Core Contact Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Admissions Desk */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[#ff3115] transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ff3115] flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">// Admissions Desk</span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-4">Direct Helplines</h3>
              
              <div className="space-y-2 text-xs text-gray-700">
                <div>
                  <a href="tel:+919800571423" className="font-bold text-sm text-gray-900 hover:text-[#ff3115] transition-colors block">
                    +91 98005 71423
                  </a>
                  <span className="text-gray-400 text-[10px]">Primary Admission Mobile</span>
                </div>
                <div>
                  <a href="tel:+917407294943" className="font-bold text-sm text-gray-900 hover:text-[#ff3115] transition-colors block">
                    +91 74072 94943
                  </a>
                  <span className="text-gray-400 text-[10px]">Counseling &amp; WhatsApp Line</span>
                </div>
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <div className="text-gray-600">Landlines: (0343) 254-2102 / 03 / 06 / 08</div>
                  <div className="text-gray-600">Fax: (0343) 254-2106</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <a
                href="https://wa.me/917407294943"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Chat on WhatsApp</span> &rarr;
              </a>
            </div>
          </div>

          {/* Card 2: Campus Address */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-blue-600 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">// Campus Address</span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-4">Durgapur Campus</h3>
              
              <div className="text-xs text-gray-700 leading-relaxed space-y-2">
                <p className="font-bold text-gray-900 text-sm">
                  The New Horizons Institute of Technology
                </p>
                <p>
                  Phase-II, City Center, South G.T. Road,<br />
                  Near Gandhi More, Durgapur – 713208,<br />
                  Paschim Bardhaman, West Bengal, India.
                </p>
                <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
                  <div>• 5 mins from City Centre Bus Terminus</div>
                  <div>• 4.5 km from Durgapur Railway Station (DGR)</div>
                  <div>• 18 km from Kazi Nazrul Islam Airport (RKN)</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <a
                href="https://maps.google.com/?q=The+New+Horizons+Institute+of+Technology+Durgapur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Card 3: Digital Channels & Email */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-purple-600 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">// Digital Channels</span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-4">Official Channels</h3>
              
              <div className="space-y-3 text-xs text-gray-700">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">General Inquiries</span>
                  <a href="mailto:info@nhit.in" className="font-bold text-gray-900 hover:text-[#ff3115]">info@nhit.in</a>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Principal’s Desk</span>
                  <a href="mailto:principal@nhit.in" className="font-bold text-gray-900 hover:text-[#ff3115]">principal@nhit.in</a>
                </div>
                <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-2 text-xs">
                  <a href="https://facebook.com/nhit.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook ↗</a>
                  <span className="text-gray-300">•</span>
                  <a href="https://linkedin.com/school/the-new-horizons-institute-of-technology" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn ↗</a>
                  <span className="text-gray-300">•</span>
                  <a href="https://youtube.com/channel/UCEHFtTcABsXgNYkX-vE7BXA" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">YouTube ↗</a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <a
                href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#ff3115]" />
                <span>Institute Brochure (PDF)</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Interactive Inquiry Form + Working Hours ────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inquiry Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff3115]">Fast Academic Response</span>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mt-1 mb-2">
              Send an Academic or Admission Inquiry
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Our career counseling cell will contact you within 24 hours with syllabus brochures and fee details.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">Inquiry Received Successfully!</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. An NHIT academic counselor will contact you at <strong>{formData.phone}</strong> regarding the <strong>{formData.branch}</strong> program.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff3115] bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Mobile / WhatsApp No. *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff3115] bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff3115] bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Course / Branch of Interest *</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff3115] bg-gray-50 focus:bg-white transition-colors"
                    >
                      <option>Computer Science &amp; Technology (CST)</option>
                      <option>Diploma in Mechanical Engineering (ME)</option>
                      <option>Diploma in Electrical Engineering (EE)</option>
                      <option>Diploma in Civil Engineering (CE)</option>
                      <option>Diploma in Electronics &amp; Telecom (ETCE)</option>
                      <option>Diploma in Automobile Engineering (AE)</option>
                      <option>NCVT ITI Electrician Trade</option>
                      <option>NCVT ITI Fitter Trade</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Questions or Specific Queries</label>
                  <textarea
                    rows={4}
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    placeholder="Ask about hostel facilities, JEXPO/VOCLET counseling, fee installment schedules, or scholarship eligibility..."
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff3115] bg-gray-50 focus:bg-white transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#ff3115] hover:bg-[#e0260c] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Inquiry to Admission Cell
                </button>
              </form>
            )}
          </div>

          {/* Office Hours & Bus Transit (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ff3115]" />
                Administrative Hours
              </h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="font-semibold text-gray-800">Monday – Friday:</span>
                  <span>10:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="font-semibold text-gray-800">Saturday:</span>
                  <span>10:00 AM – 3:30 PM</span>
                </div>
                <div className="flex justify-between py-1 text-red-600 font-semibold">
                  <span>Sunday &amp; Public Holidays:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                Transit &amp; Accessibility
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                NHIT is situated in prime City Centre Durgapur, directly accessible via South Bengal State Transport (SBSTC), City Minibuses, and auto-rickshaws terminating at Gandhi More.
              </p>
            </div>
          </div>

        </div>

        {/* ── Interactive Google Map Embed ─────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm overflow-hidden">
          <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden">
            <iframe
              title="The New Horizons Institute of Technology Campus Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.4300300613247!2d87.30403337602377!3d23.553018296347077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f77227d8ce6017%3A0x1ff4a0ff8e67a4d5!2sThe%20New%20Horizons%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </main>
    </div>
  );
}
