import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  CheckCircle2, 
  Download, 
  FileText, 
  Sparkles, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-[#0F172A] text-white py-16 border-b border-slate-800">
        <div className="max-w-[1140px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Admissions Hub • Session 2026–2027
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Direct & Entrance Admissions at NHIT
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Choose between 1st Year Diploma Entry (after Class 10/JEXPO) or 2nd Year Lateral Entry (after 10+2/ITI/VOCLET) across 6 diploma streams.
          </p>
        </div>
      </section>

      <div className="max-w-[1140px] mx-auto px-5 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Pathway 1: 1st Year Entry */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded bg-blue-50 text-blue-600 font-bold text-xs font-mono mb-3">
                PATHWAY 01 • 3 YEARS
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">
                1st Year Diploma Entry (After 10th)
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Direct entry for school pass-outs into foundational and applied technical sciences. Eliminates 2 years of general theory in favor of practical engineering.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Passed Class 10 / Madhyamik with min. 35% aggregate marks.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Valid rank in JEXPO or Direct Institutional Quota Counseling.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Mandatory subjects: Mathematics, Physical Science, and English.</span>
                </div>
              </div>
            </div>

            <a
              href="tel:+919434005886"
              className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call Admission Desk (+91 9434005886)
            </a>
          </div>

          {/* Pathway 2: 2nd Year Lateral Entry */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded bg-amber-50 text-amber-600 font-bold text-xs font-mono mb-3">
                PATHWAY 02 • 2 YEARS
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">
                2nd Year Lateral Entry (VOCLET / ITI)
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Fast-track 2-year diploma pathway directly into 3rd Semester with full credit recognition for 10+2 science or vocational certificate holders.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Passed 10+2 with PCM / Vocational OR 10th + 2-Year ITI.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Valid rank in VOCLET entrance examination.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Completes entire Diploma in Engineering in 4 Semesters.</span>
                </div>
              </div>
            </div>

            <a
              href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#C10A0C] hover:bg-[#9E0B0F] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Official 2026 Brochure (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
