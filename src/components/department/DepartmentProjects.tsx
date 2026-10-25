import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DepartmentProject } from '@/data/departmentsData';
import { Lightbulb, ArrowRight, Layers } from 'lucide-react';

interface Props {
  projects: DepartmentProject[];
  accentHex: string;
  deptCode: string;
}

export default function DepartmentProjects({ projects, accentHex, deptCode }: Props) {
  if (!projects || projects.length === 0) return null;

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
          INNOVATION LAB // DIPLOMA CAPSTONE PROTOTYPES
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Showcase Projects & Technical Innovation
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Real engineering prototypes, automation rigs, software systems, and sustainable models designed and fabricated by NHIT scholars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Project Image & Capstone Badge */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Capstone Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/85 text-white border border-white/20 backdrop-blur-sm shadow-sm">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    CAPSTONE INNOVATION
                  </span>
                </div>
              </div>

              {/* Project Meta & Body */}
              <div className="p-5 space-y-2.5">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-semibold text-slate-600 block">
                    {proj.team}
                  </span>
                  <span 
                    className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: accentHex }}
                  >
                    {proj.stack}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-800 transition-colors leading-snug">
                  {proj.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            </div>

            {/* Project Details Link */}
            <div className="p-5 pt-0">
              <Link
                href="/student-life"
                className="inline-flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2"
                style={{ color: accentHex }}
              >
                Prototype Specifications & Defense
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
