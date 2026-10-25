'use client';

import React, { useState } from 'react';
import { DepartmentFaq } from '@/data/departmentsData';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface Props {
  faqs: DepartmentFaq[];
  accentHex: string;
}

export default function DepartmentFaqs({ faqs, accentHex }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="space-y-6">
      {/* ── Section Header ── */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
          style={{
            backgroundColor: `${accentHex}15`,
            color: accentHex,
          }}
        >
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Department FAQs & Admissions Guide
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Official answers regarding admissions, laboratory training, council affiliation, lateral entry, placements, and campus amenities.
        </p>
      </div>

      {/* ── Accordion List ── */}
      <div className="max-w-4xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-50/70"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {faq.q}
                </span>
                <span 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
