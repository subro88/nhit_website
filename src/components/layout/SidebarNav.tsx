'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, FileText, PhoneCall, Download } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const defaultInstitutionalLinks: NavItem[] = [
  { label: 'About NHIT Overview', href: '/about' },
  { label: 'About Society (DEMDS)', href: '/about-society' },
  { label: 'President & Secretary Messages', href: '/messages-from-president-secretary' },
  { label: 'Principal’s Desk', href: '/message-from-principal' },
  { label: 'Vice Principal’s Desk', href: '/message-from-vice-principal' },
  { label: 'Approval, Affiliation & MoUs', href: '/approval-affiliation-association' },
  { label: 'Campus Infrastructure & Labs', href: '/our-infrastructure' },
  { label: 'Quality Policy & ISO', href: '/quality-policy-iso-certification' },
  { label: 'Anti-Ragging Committee', href: '/anti-ragging-committee' },
  { label: 'RTI Process & PIO', href: '/rti-process-officer' },
  { label: 'Mandatory Disclosure', href: '/mandatory-disclosure' },
];

export default function SidebarNav({
  items = defaultInstitutionalLinks,
  title = 'Institutional Portal',
}: {
  items?: NavItem[];
  title?: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Navigation Menu Box */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="bg-[#151515] px-5 py-4 border-b border-neutral-800">
          <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF3115]" />
            {title}
          </h3>
        </div>
        <nav className="p-2 space-y-1">
          {items.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FFF0ED] text-[#FF3115] font-bold shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-[#FF3115] translate-x-0.5' : 'text-neutral-400'
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Quick Prospectus Download Card */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-[#151515] to-[#262626] text-white shadow-md">
        <div className="w-9 h-9 rounded-lg bg-[#FF3115] flex items-center justify-center text-white mb-3">
          <Download className="w-4 h-4" />
        </div>
        <h4 className="font-bold text-sm mb-1">Official Prospectus 2026</h4>
        <p className="text-neutral-400 text-xs mb-4">
          Download complete curriculum syllabus, fee slabs, and hostel policies.
        </p>
        <a
          href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-lg bg-[#FF3115] hover:bg-[#E41F05] text-white font-bold text-xs shadow-sm transition-colors"
        >
          <span>Download PDF Brochure</span>
        </a>
      </div>

      {/* Helpdesk Contacts */}
      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
        <div className="font-bold text-neutral-800 flex items-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-[#FF3115]" />
          <span>Admission Helpline</span>
        </div>
        <p className="text-neutral-600">
          Call or WhatsApp our Senior Academic Counselors daily 9 AM – 6 PM.
        </p>
        <div className="pt-2 border-t border-neutral-200">
          <a
            href="tel:+919800571423"
            className="block text-[#FF3115] font-bold hover:underline"
          >
            +91 98005 71423 / +91 74072 94943
          </a>
        </div>
      </div>
    </aside>
  );
}
