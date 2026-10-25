import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  FileText, 
  Share2, 
  Printer, 
  Download,
  Building,
  Bell
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';
import noticesData from '../../../../content/circulars/notices-index.json';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return noticesData.map((n: any) => ({
    slug: n.slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const notice = noticesData.find((n: any) => n.slug === params.slug);
  if (!notice) return { title: 'Notice Not Found' };
  return {
    title: `${notice.title} | Notice Board — NHIT Durgapur`,
    description: notice.summary,
  };
}

export default function CircularDetailPage({ params }: Props) {
  const notice = noticesData.find((n: any) => n.slug === params.slug);
  if (!notice) notFound();

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="Official Academic Notice & Circular"
        title={notice.title}
        subtitle="Official statutory announcement from the Controller of Examinations and Academic Registrar."
        breadcrumbs={[
          { label: 'Notice Board', href: '/circulars' },
          { label: notice.title },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm space-y-8">
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#ff3115]">
                {notice.category}
              </span>
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Published on: {notice.date}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/circulars"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Board
              </Link>
            </div>
          </div>

          {/* Notice Body */}
          <div className="space-y-6 text-gray-800 text-sm md:text-base leading-relaxed">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 font-mono text-xs text-gray-600">
              Ref No: NHIT/ADMIN/CIRCULAR/2026/{notice.slug.toUpperCase()}
            </div>

            <div className="whitespace-pre-line text-gray-700 leading-relaxed font-sans">
              {notice.summary}
            </div>

            <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs text-gray-700 leading-relaxed">
              <strong>Statutory Note:</strong> All bonafide students and concerned faculty members must acknowledge receipt and adhere to the deadlines specified above. Queries should be directed to the Exam Cell or Academic Registrar during working hours.
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              Issued by: <strong>Academic Office, NHIT Durgapur</strong>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#ff3115]" /> Download Circular PDF
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
