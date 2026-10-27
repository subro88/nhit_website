import React from 'react';
import { DepartmentData } from '@/data/departmentsData';
import DepartmentPillars from './DepartmentPillars';
import { Award, CheckCircle2, ShieldCheck, Clock, Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';

interface Props {
  dept: DepartmentData;
}

export default function DepartmentSummary({ dept }: Props) {
  const accent = dept.accentHex || '#0EA5E9';

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm space-y-8">
      {/* ── Header: Program Specification Pill & Affiliations ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2.5"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
            }}
          >
            [PROGRAM SPECIFICATION] // DEPT CODE: {dept.code}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Course Summary: {dept.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Approved by All India Council for Technical Education (AICTE), New Delhi, and affiliated to West Bengal State Council of Technical and Vocational Education and Skill Development (WBSCTVESD).
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border"
            style={{
              color: accent,
              borderColor: `${accent}40`,
              backgroundColor: '#FFFFFF',
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            ISO 9001:2015 CERTIFIED
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            OUTCOME-BASED EDUCATION (OBE)
          </span>
        </div>
      </div>

      {/* ── Quick Key Specs Telemetry Grid (6 Metrics) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Spec 1: Duration */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Program Duration
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-slate-900 block">
            {dept.duration}
          </span>
        </div>

        {/* Spec 2: Intake */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Approved Intake
          </span>
          <span className="text-xs sm:text-sm font-extrabold block" style={{ color: accent }}>
            {dept.intake}
          </span>
        </div>

        {/* Spec 3: Regulatory Body */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Regulatory Body
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-slate-900 block">
            AICTE & WBSCTVESD
          </span>
        </div>

        {/* Spec 4: Practical Ratio */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Practical:Theory
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-sky-600 block">
            {dept.practicalRatio}
          </span>
        </div>

        {/* Spec 5: Placement Success */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Career Conversion
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-emerald-600 block">
            {dept.stats.placementRate} Placed/JELET
          </span>
        </div>

        {/* Spec 6: CTC Package */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Compensation Range
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-orange-600 block">
            {dept.stats.highestCtc} <span className="text-[10px] text-slate-600 font-normal">(Med: {dept.stats.medianCtc})</span>
          </span>
        </div>

      </div>

      {/* ── Core Technical Pillars ── */}
      <DepartmentPillars pillars={dept.pillars} accentHex={accent} />

      {/* ── Department Technical Narrative Prose Block ── */}
      <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4" style={{ color: accent }} />
          Department Academic & Laboratory Narrative
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {dept.narrative}
        </p>
      </div>
    </section>
  );
}
