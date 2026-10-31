'use client';

import React from 'react';
import Image from 'next/image';
import { UserCheck, Clock, Phone, Mail, GraduationCap } from 'lucide-react';
import CardCarousel from './CardCarousel';

interface FacultyMember {
  name: string;
  role?: string;
  designation?: string;
  desig?: string;
  qualification?: string;
  qual?: string;
  experience?: string;
  exp?: string;
  spec?: string;
  avatar?: string;
  img?: string;
  photo?: string;
  email?: string;
  phone?: string;
}

interface Props {
  faculty: FacultyMember[];
  accentHex: string;
}

function FacultyCard({ f, accentHex }: { f: FacultyMember; accentHex: string }) {
  const photo = f.avatar || f.img || f.photo || '';
  const photoUrl = photo
    ? photo.startsWith('http') || photo.startsWith('/')
      ? photo
      : `/images/faculty/${photo}`
    : '';
  const initials = f.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-between h-full hover:-translate-y-1">
      <div className="w-full flex flex-col items-center">
        {/* Pure Circular Photo Frame (170px diameter) with subtle glow */}
        <div
          className="relative w-40 h-40 rounded-full overflow-hidden border-4 shadow-md mb-5 group-hover:scale-105 transition-transform duration-300"
          style={{
            borderColor: accentHex,
            boxShadow: `0 0 20px -3px ${accentHex}30`,
          }}
        >
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={f.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-slate-100 text-4xl font-extrabold tracking-wide"
              style={{ color: accentHex }}
              aria-hidden="true"
            >
              {initials}
            </div>
          )}
        </div>

        {/* Faculty Name */}
        <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-slate-800 transition-colors mb-2">
          {f.name}
        </h4>

        {/* 3-Item Meta Row (Role, Qualification, Experience) */}
        <div className="w-full space-y-1.5 py-3 border-y border-slate-100 text-xs text-slate-600">
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
            <UserCheck className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
            <span>{f.designation || f.desig || f.role || 'Lecturer'}</span>
          </div>
          {(f.qualification || f.qual) && (
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
              <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
              <span>{f.qualification || f.qual}</span>
            </div>
          )}
          {(f.experience || f.exp) && (
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>{f.experience || f.exp}</span>
            </div>
          )}
        </div>

        {/* Core Specialization Pill */}
        {f.spec && (
          <div className="mt-3">
            <span
              className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full text-slate-800 bg-slate-100 group-hover:bg-slate-200 transition-colors"
            >
              🎯 {f.spec}
            </span>
          </div>
        )}
      </div>

      {/* Direct Engineering Contact Bar */}
      <div className="w-full pt-4 mt-4 border-t border-slate-100 flex items-center justify-center gap-3 text-xs text-slate-600">
        <a
          href="tel:03432542103"
          className="inline-flex items-center gap-1 font-semibold hover:text-slate-900 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
          (0343) 2542103
        </a>
        <span className="text-slate-300">·</span>
        <a
          href="mailto:info@nhit.in"
          className="inline-flex items-center gap-1 font-semibold hover:text-slate-900 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-sky-600" />
          info@nhit.in
        </a>
      </div>
    </div>
  );
}

export default function DepartmentFacultyRoster({ faculty, accentHex }: Props) {
  if (!faculty || faculty.length === 0) return null;

  return (
    <section className="space-y-6">
      {/* ── Section Header (Center Aligned) ── */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--edu-primary-dark)] bg-red-50 border border-red-100"
        >
          ACADEMIC DIRECTORY // NHIT FACULTY
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[color:var(--edu-primary-dark)] tracking-tight mt-1.5">
          Our Faculties ({faculty.length})
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Experienced engineering educators, licensed technical instructors, and researchers guiding students across laboratory practice and theory.
        </p>
      </div>

      <CardCarousel
        label="faculty members"
        autoScrollMs={4000}
        items={faculty.map((f, idx) => (
          <FacultyCard key={idx} f={f} accentHex={accentHex} />
        ))}
      />
    </section>
  );
}
