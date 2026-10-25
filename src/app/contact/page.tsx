import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Sparkles,
  Building
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-[#0F172A] text-white py-16 border-b border-slate-800">
        <div className="max-w-[1140px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Building className="w-3.5 h-3.5" />
            Campus Admissions & Enquiry
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Contact NHIT Durgapur
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Reach out to our campus office, admission counselors, or principal desk for program inquiries and counseling sessions.
          </p>
        </div>
      </section>

      <div className="max-w-[1140px] mx-auto px-5 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details Column */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6 md:col-span-1">
            <h3 className="font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Campus Office
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C10A0C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-0.5">Campus Location</div>
                  Phase-II, City Center, South Bidhannagar, Durgapur, Paschim Bardhaman, West Bengal – 713208
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C10A0C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-0.5">Telephone & Helplines</div>
                  +91 9434005886<br />
                  +91 9832864619<br />
                  0343-2542289 / 2542290
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C10A0C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-0.5">Email Support</div>
                  principal@nhit.in<br />
                  admission@nhit.in
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C10A0C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-0.5">Office Hours</div>
                  Monday – Saturday: 10:00 AM – 5:00 PM<br />
                  Sunday: Closed
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl md:col-span-2">
            <h3 className="font-extrabold text-lg text-slate-900 mb-2">
              Send an Admission Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our career counseling cell will contact you within 24 hours with syllabus brochures and fee details.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#C10A0C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp No. *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9876543210"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#C10A0C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#C10A0C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Branch of Interest *</label>
                  <select className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#C10A0C] bg-white">
                    <option>Computer Science & Technology (CST)</option>
                    <option>Mechanical Engineering (ME)</option>
                    <option>Electrical Engineering (EE)</option>
                    <option>Civil Engineering (CE)</option>
                    <option>Electronics & Telecom (ETCE)</option>
                    <option>Automobile Engineering (AE)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Questions or Specific Queries</label>
                <textarea
                  rows={4}
                  placeholder="Ask about hostel facilities, fee installment schedules, or scholarship eligibility..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#C10A0C]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#C10A0C] hover:bg-[#9E0B0F] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
