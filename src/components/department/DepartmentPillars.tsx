import React from 'react';
import { DepartmentPillar } from '@/data/departmentsData';
import { Cpu, Terminal, Check } from 'lucide-react';

interface Props {
  pillars: DepartmentPillar[];
  accentHex: string;
}

export default function DepartmentPillars({ pillars, accentHex }: Props) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-mono font-bold text-xs uppercase tracking-wider text-slate-500">
          // Core Engineering Competency Framework (PEOs)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            style={{
              borderTop: `4px solid ${accentHex}`,
            }}
          >
            <div>
              {/* Pillar Tag */}
              <span 
                className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3"
                style={{
                  backgroundColor: `${accentHex}15`,
                  color: accentHex,
                }}
              >
                {pillar.tag}
              </span>

              {/* Title */}
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-slate-800 transition-colors mb-2 leading-snug">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {pillar.desc}
              </p>
            </div>

            {/* Skills Badges List */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex flex-wrap gap-1.5">
                {pillar.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md transition-colors"
                  >
                    <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
