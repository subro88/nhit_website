import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { 
  ArrowLeft,
  GraduationCap,
  Download,
  PhoneCall,
  FileText,
  Calendar,
  CheckCircle2,
  Building,
  Send,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { departmentsData, DepartmentData } from '@/data/departmentsData';
import DepartmentHero from '@/components/department/DepartmentHero';
import DepartmentSummary from '@/components/department/DepartmentSummary';
import DepartmentTabs from '@/components/department/DepartmentTabs';
import DepartmentFacultyRoster from '@/components/department/DepartmentFacultyRoster';
import DepartmentEvents from '@/components/department/DepartmentEvents';
import DepartmentProjects from '@/components/department/DepartmentProjects';
import DepartmentTestimonials from '@/components/department/DepartmentTestimonials';
import DepartmentCareersSection from '@/components/department/DepartmentCareers';
import DepartmentFaqs from '@/components/department/DepartmentFaqs';

interface Props {
  params: { slug: string };
}

// Generate static params for all 6 departments
export async function generateStaticParams() {
  return Object.keys(departmentsData).map((slug) => ({ slug }));
}

function getDepartmentData(slug: string): DepartmentData | null {
  return departmentsData[slug] || null;
}

function getDepartmentFaculty(deptSlug: string) {
  const rosterPath = path.join(process.cwd(), 'content', 'faculty', 'faculty-roster.json');
  if (!fs.existsSync(rosterPath)) return [];
  try {
    const allFaculty = JSON.parse(fs.readFileSync(rosterPath, 'utf-8'));
    return allFaculty.filter((f: any) => f.department === deptSlug);
  } catch (e) {
    return [];
  }
}

export function generateMetadata({ params }: Props) {
  const dept = getDepartmentData(params.slug);
  if (!dept) return { title: 'Department Not Found' };
  
  const siteUrl = 'https://nhit.in';
  const canonicalUrl = `${siteUrl}/departments/${params.slug}`;

  return {
    title: `${dept.title} | Diploma Engineering — NHIT Durgapur`,
    description: `${dept.tagline}. Approved intake: ${dept.intake}. Affiliated with WBSCTVESD, approved by AICTE. 3-Year Diploma in Engineering at NHIT Durgapur.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${dept.title} | NHIT Durgapur`,
      description: dept.tagline,
      url: canonicalUrl,
      siteName: 'NHIT Durgapur',
      images: [
        {
          url: dept.heroSlides[0] ? `${siteUrl}${dept.heroSlides[0]}` : `${siteUrl}/images/hero-campus.jpg`,
          width: 1200,
          height: 630,
          alt: dept.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dept.title} | NHIT Durgapur`,
      description: dept.tagline,
      images: [dept.heroSlides[0] ? `${siteUrl}${dept.heroSlides[0]}` : `${siteUrl}/images/hero-campus.jpg`],
    },
  };
}

export default function DepartmentDetailPage({ params }: Props) {
  const dept = getDepartmentData(params.slug);
  if (!dept) notFound();

  const faculty = getDepartmentFaculty(params.slug);
  const accent = dept.accentHex || '#0EA5E9';

  // AI-SEO Structured Schemas
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOccupationalProgram',
        name: `Diploma in ${dept.title}`,
        description: dept.tagline,
        educationalProgramMode: 'full-time',
        timeToComplete: 'P3Y',
        occupationalCategory: 'Engineering and Technology',
        educationalCredentialAwarded: 'Diploma in Engineering',
        programPrerequisites: '10th Standard / Madhyamik Examination with 35% aggregate and JEXPO rank, or 10+2 / ITI with VOCLET rank for 2nd Year Lateral Entry.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'National Headway Institute of Technology (NHIT)',
          url: 'https://nhit.in',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Rajbandh',
            addressLocality: 'Durgapur',
            addressRegion: 'West Bengal',
            postalCode: '713212',
            addressCountry: 'IN',
          },
        },
      },
      {
        '@type': 'Course',
        name: dept.title,
        description: dept.tagline,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'NHIT Durgapur',
          sameAs: 'https://nhit.in',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'in-person',
          courseWorkload: 'PT30H',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nhit.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Academic Departments',
            item: 'https://nhit.in/departments',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: dept.title,
            item: `https://nhit.in/departments/${dept.slug}`,
          },
        ],
      },
    ],
  };

  const otherDepartments = Object.values(departmentsData)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((d) => ({
      slug: d.slug,
      name: d.title,
      code: (d.code || '').replace(/_\d+$/, ''),
    }));

  // Bottom admission CTA strip — editable per department via admin panel,
  // with the site-wide defaults as fallback.
  const cta = {
    badge: dept.cta?.badge || 'ADMISSIONS OPEN // ACADEMIC SESSION 2026–27',
    heading: dept.cta?.heading || `Ready to Begin Your Technical Career in ${dept.title}?`,
    subtext:
      dept.cta?.subtext ||
      'Direct institutional seats and state merit counseling are now underway. Connect with our admission cell today to secure your counseling rank and hostel allocation.',
    applyLabel: dept.cta?.applyLabel || 'Apply for Admission Online',
    applyHref: dept.cta?.applyHref || '/admissions',
    phoneLabel: dept.cta?.phoneLabel || 'Call Admissions: (0343) 2542103',
    phone: dept.cta?.phone || '03432542103',
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      {/* ── AI-SEO JSON-LD Structured Data ────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. Full-Height Dynamic Hero with Radar Telemetry Hub ────── */}
      <DepartmentHero dept={dept} />

      {/* ── Main Container: Full Width Sections & Sticky Helper ──── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
        
        {/* ── 2. Detailed Course Summary & Core Engineering Pillars ──── */}
        <DepartmentSummary dept={dept} />

        {/* ── 3. Interactive Tabs: Curriculum, Labs, Eligibility, HOD ── */}
        <DepartmentTabs dept={dept} />

        {/* ── 4. Academic Directory: Our Faculties ────────────────────── */}
        <DepartmentFacultyRoster faculty={faculty} accentHex={accent} />

        {/* ── 5. Departmental Events & Industrial Exposures ──────────── */}
        <DepartmentEvents 
          events={dept.events} 
          accentHex={accent} 
          deptCode={dept.code} 
        />

        {/* ── 6. Showcase Capstone Projects & Innovation ──────────────── */}
        <DepartmentProjects 
          projects={dept.projects} 
          accentHex={accent} 
          deptCode={dept.code} 
        />

        {/* ── 7. Alumni & Topper Testimonials ────────────────────────── */}
        <DepartmentTestimonials 
          testimonials={dept.testimonials} 
          accentHex={accent} 
        />

        {/* ── 8. Career Options, PSUs, Higher Studies & Recruiters ───── */}
        <DepartmentCareersSection 
          careers={dept.careers} 
          accentHex={accent} 
          placementRate={dept.stats.placementRate} 
        />

        {/* ── 9. Department FAQs Accordion ───────────────────────────── */}
        <DepartmentFaqs 
          faqs={dept.faqs} 
          accentHex={accent} 
        />

        {/* ── Quick Discipline Navigation Bar (Cross-Branch Links) ──── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Explore Other Diploma Engineering Disciplines
            </h4>
            <span className="text-xs text-slate-500">
              NHIT Durgapur · AICTE Approved
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherDepartments.map((d, dIdx) => (
              <Link
                key={dIdx}
                href={`/departments/${d.slug}`}
                className={`p-3 rounded-xl border text-center transition-all ${
                  d.slug === params.slug
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <span className="text-[10px] font-mono block opacity-75">
                  [{d.code}]
                </span>
                <span className="text-xs font-bold block mt-1">
                  {d.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Floating / Bottom Call to Action Strip (NHIT Signature Crimson) ── */}
        <div 
          className="rounded-3xl p-8 sm:p-10 text-white text-center shadow-2xl space-y-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #9E0B0F 0%, #7B080B 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Subtle Decorative Ambient Glow */}
          <div 
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/20 blur-2xl pointer-events-none" 
            aria-hidden="true" 
          />

          <span 
            className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-sm"
          >
            {cta.badge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {cta.heading}
          </h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-2xl mx-auto leading-relaxed">
            {cta.subtext}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <Link
              href={cta.applyHref}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold bg-white hover:bg-red-50 text-[#9E0B0F] transition-all shadow-lg active:scale-95"
            >
              <Send className="w-4 h-4 text-[#9E0B0F]" />
              {cta.applyLabel}
            </Link>
            <a
              href={`tel:${cta.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-black/20 hover:bg-black/30 text-white border border-white/25 transition-all backdrop-blur-sm shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              {cta.phoneLabel}
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
