import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { 
  Building, 
  Award, 
  FileText, 
  Download, 
  Users, 
  CheckCircle, 
  Briefcase, 
  Sparkles,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';

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

export default function DepartmentDetailPage({ params }: Props) {
  const dept = getDepartmentData(params.slug);
  if (!dept) notFound();

  const faculty = getDepartmentFaculty(params.slug);
  const accent = dept.accentHex || '#C10A0C';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* ── Department Banner Header ───────────────────────────────── */}
      <section 
        className="relative pt-12 pb-16 text-white border-b border-slate-900"
        style={{
          background: `linear-gradient(135deg, #0F172A 0%, #1E293B 70%, ${accent} 160%)`
        }}
      >
        <div className="max-w-[1240px] mx-auto px-5">
          <Link 
            href="/departments" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Engineering Branches
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-extrabold text-white"
              style={{ backgroundColor: accent }}
            >
              {dept.code}
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              WBSCTVESD Affiliated • 3-Year Diploma
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {dept.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {dept.tagline}
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="text-[10px] text-slate-300 font-bold uppercase">Placement Rate</div>
              <div className="text-xl font-black text-white mt-0.5">{dept.stats.placementRate}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="text-[10px] text-slate-300 font-bold uppercase">Highest CTC</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">{dept.stats.highestCtc}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="text-[10px] text-slate-300 font-bold uppercase">Median Package</div>
              <div className="text-xl font-black text-white mt-0.5">{dept.stats.medianCtc}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="text-[10px] text-slate-300 font-bold uppercase">Approved Intake</div>
              <div className="text-xl font-black text-white mt-0.5">{dept.intake}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ──────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-5 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column (2 Cols): HOD Message, Labs, Curriculum */}
        <div className="lg:col-span-2 space-y-10">
          {/* HOD Welcome Card */}
          {dept.hod && dept.hod.message && (
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: accent }}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">HOD Perspective</h3>
                  <div className="text-xs text-slate-500 font-semibold">{dept.hod.name} • Head of Department</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-4 rounded-xl border-l-4" style={{ borderColor: accent }}>
                "{dept.hod.message}"
              </p>
            </div>
          )}

          {/* Laboratories & Workshop Benches */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Department Laboratories</h3>
                <p className="text-xs text-slate-500 mt-0.5">Hands-on industrial equipment and computational benches</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                {dept.labs?.length || 0} Labs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dept.labs?.map((lab: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <div className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    {lab.name}
                  </div>
                  <div className="text-xs text-slate-500 leading-normal">{lab.spec}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Semester-by-Semester Curriculum */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">State Council Curriculum (Sem 1–6)</h3>
            <p className="text-xs text-slate-500 mb-6">Syllabus prescribed by WBSCTVESD for Diploma in Engineering</p>

            <div className="space-y-4">
              {dept.sems && Object.entries(dept.sems).map(([sem, subjects]: [string, any]) => (
                <div key={sem} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="font-extrabold text-sm text-slate-900 mb-2 flex items-center justify-between">
                    <span>Semester 0{sem}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{subjects.length} Subjects</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {subjects.map((sub: string, sIdx: number) => (
                      <span key={sIdx} className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Admission Criteria, Syllabus PDF & Faculty Roster */}
        <div className="space-y-8">
          {/* Download Official Syllabus Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-600" />
              Official Syllabus Document
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Download the complete council syllabus PDF with course credits and lab evaluation schemes.
            </p>
            <a
              href={dept.syllabusPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Syllabus PDF
            </a>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Eligibility & Entry Paths
            </h4>
            <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {dept.eligibility}
            </div>
          </div>

          {/* Department Faculty Directory */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: accent }} />
                Faculty Members
              </h4>
              <span className="text-xs font-semibold text-slate-400">{faculty.length} Mentors</span>
            </div>

            <div className="space-y-3">
              {faculty.map((f: any, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    {f.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 truncate">{f.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{f.designation} • {f.qualification}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
