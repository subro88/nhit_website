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
  Building
} from 'lucide-react';
import DepartmentTabs from '@/components/department/DepartmentTabs';
import SubpageHero from '@/components/layout/SubpageHero';

interface Props {
  params: { slug: string };
}

// Generate static params for all 6 departments
export async function generateStaticParams() {
  const deptsDir = path.join(process.cwd(), 'content', 'departments');
  if (!fs.existsSync(deptsDir)) return [];
  const files = fs.readdirSync(deptsDir);
  return files
    .filter(f => f.endsWith('.mdx'))
    .map(f => ({ slug: f.replace('.mdx', '') }));
}

function getDepartmentData(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'departments', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  try {
    const data = JSON.parse(frontmatterMatch[1]);
    return data;
  } catch (e) {
    return null;
  }
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
  return {
    title: `${dept.title} | Diploma Engineering — NHIT Durgapur`,
    description: `${dept.tagline}. Approved intake: ${dept.intake}. Affiliated with WBSCTVESD, AICTE approved technical diploma at NHIT Durgapur.`,
  };
}

export default function DepartmentDetailPage({ params }: Props) {
  const dept = getDepartmentData(params.slug);
  if (!dept) notFound();

  const faculty = getDepartmentFaculty(params.slug);
  const accent = dept.accentHex || '#FF3115';

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      {/* ── Subpage Hero Banner ─────────────────────────────────── */}
      <SubpageHero
        kicker={`${dept.code} · WBSCTVESD Affiliated · 3-Year Diploma`}
        title={dept.title}
        subtitle={dept.tagline}
        breadcrumbs={[
          { label: 'Academic Departments', href: '/departments' },
          { label: dept.title },
        ]}
      />

      {/* ── Quick Stats Strip ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="border-r border-gray-100 last:border-0">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Placement Success</span>
            <div className="text-xl font-black text-gray-900 mt-0.5">{dept.stats?.placementRate || '85%'}</div>
          </div>
          <div className="border-r border-gray-100 last:border-0">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Highest Package</span>
            <div className="text-xl font-black text-[#ff3115] mt-0.5">{dept.stats?.highestCtc || '₹4.8 LPA'}</div>
          </div>
          <div className="border-r border-gray-100 last:border-0">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Median Compensation</span>
            <div className="text-xl font-black text-gray-900 mt-0.5">{dept.stats?.medianCtc || '₹2.8 LPA'}</div>
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase">AICTE Sanction</span>
            <div className="text-xl font-black text-gray-900 mt-0.5">{dept.intake}</div>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Tabs + Sticky Action Sidebar ──────────────── */}
      <main className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Column: Interactive Tabs (8 Cols) */}
          <div className="lg:col-span-8">
            <DepartmentTabs dept={dept} faculty={faculty} />
          </div>

          {/* Right Sidebar: Quick Actions & Helpline (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-20 space-y-6">
              
              {/* Apply / Counseling Desk Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3115] bg-orange-50 px-2.5 py-1 rounded-full">
                  Admission Counseling 2026–27
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Join {dept.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">
                  Admissions open via JEXPO Merit Counseling, VOCLET Lateral Entry, and Direct Institutional Seats.
                </p>
                <div className="space-y-2.5">
                  <Link
                    href="/admissions"
                    className="w-full py-2.5 px-4 bg-[#ff3115] hover:bg-[#e0260c] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    Apply for Admission Now &rarr;
                  </Link>
                  <a
                    href="tel:03432542103"
                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#ff3115]" />
                    Call Desk: (0343) 2542103
                  </a>
                </div>
              </div>

              {/* Download Syllabus PDF Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#ff3115]" />
                  Download Curriculum PDF
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  Get the official course structure, marks distribution, and lab assignments guide.
                </p>
                <a
                  href={dept.syllabusPdf || 'https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Syllabus
                </a>
              </div>

              {/* Navigation to other departments */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  All Diploma Engineering Disciplines
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {[
                    { slug: 'computer-science-technology', name: 'Computer Science & Technology' },
                    { slug: 'diploma-in-mechanical-engineering', name: 'Mechanical Engineering' },
                    { slug: 'diploma-in-electrical-engineering', name: 'Electrical Engineering' },
                    { slug: 'diploma-in-civil-engineering', name: 'Civil Engineering' },
                    { slug: 'diploma-in-electronics-telecommunications-engineering', name: 'Electronics & Telecom' },
                    { slug: 'diploma-in-automobile-engineering', name: 'Automobile Engineering' },
                  ].map((d, dIdx) => (
                    <li key={dIdx}>
                      <Link
                        href={`/departments/${d.slug}`}
                        className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                          d.slug === params.slug
                            ? 'bg-orange-50 text-[#ff3115] font-bold'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
