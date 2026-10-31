import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DepartmentEvent } from '@/data/departmentsData';
import { Calendar, ArrowRight } from 'lucide-react';
import CardCarousel from './CardCarousel';

interface Props {
  events: DepartmentEvent[];
  accentHex: string;
  deptCode: string;
}

export default function DepartmentEvents({ events, accentHex, deptCode }: Props) {
  if (!events || events.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
          style={{
            backgroundColor: `${accentHex}15`,
            color: accentHex,
          }}
        >
          EXPERIENTIAL LEARNING // CONFERENCES & VISITS
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Departmental Events & Industrial Exposures
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Technical symposiums, industrial field tours, hackathons, and certified technology workshops expanding students&apos; engineering horizons.
        </p>
      </div>

      <CardCarousel
        label="departmental events"
        autoScrollMs={4000}
        items={events.map((event, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between h-full"
          >
            <div>
              {/* Event Image & Badge */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Date Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-900 shadow-sm">
                    <Calendar className="w-3 h-3 text-[color:var(--edu-primary)]" />
                    {event.date_badge}
                  </span>
                </div>

                {/* Event Type Badge */}
                {event.type && (
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm"
                      style={{ backgroundColor: accentHex }}
                    >
                      {event.type}
                    </span>
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="p-5 space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-slate-800 transition-colors leading-snug">
                  {event.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </div>

            {/* Event Link */}
            <div className="p-5 pt-0">
              <Link
                href="/student-life"
                className="inline-flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2"
                style={{ color: accentHex }}
              >
                Event Details & Industrial Impact
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      />
    </section>
  );
}
