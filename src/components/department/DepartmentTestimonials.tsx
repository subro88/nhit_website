import React from 'react';
import Image from 'next/image';
import { DepartmentTestimonial } from '@/data/departmentsData';
import { Quote, Sparkles } from 'lucide-react';

interface Props {
  testimonials: DepartmentTestimonial[];
  accentHex: string;
}

export default function DepartmentTestimonials({ testimonials, accentHex }: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
          style={{
            backgroundColor: `${accentHex}15`,
            color: accentHex,
          }}
        >
          SUCCESS STORIES // JELET TOPPERS & CORPORATE STARS
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Alumni & Topper Testimonials
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Hear from NHIT graduates thriving across premier multinational industries and leading state government engineering institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <Quote className="w-6 h-6 text-slate-300 group-hover:text-amber-500 transition-colors" />
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: accentHex }}>
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {t.name}
                </h4>
                <div className="text-[10px] text-slate-600 truncate font-medium">
                  {t.role}
                </div>
                <div className="text-[10px] font-bold truncate" style={{ color: accentHex }}>
                  {t.org}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
