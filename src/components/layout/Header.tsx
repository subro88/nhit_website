'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronDown, Download, ShieldCheck, Wrench, GraduationCap, Building } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileDeptsOpen, setMobileDeptsOpen] = useState(false);
  const [mobileItiOpen, setMobileItiOpen] = useState(false);

  // The admin panel renders its own shell — never show the site header there.
  if (pathname?.startsWith('/admin')) return null;

  const institutionalLinks = [
    { title: 'About Society (DEMDS)', href: '/about-society' },
    { title: 'President & Secretary Messages', href: '/messages-from-president-secretary' },
    { title: 'Message from Principal', href: '/message-from-principal' },
    { title: 'Message from Vice Principal', href: '/message-from-vice-principal' },
    { title: 'Approval, Affiliation & MoUs', href: '/approval-affiliation-association' },
    { title: 'Campus Infrastructure & 40+ Labs', href: '/our-infrastructure' },
    { title: 'Quality Policy & ISO Certification', href: '/quality-policy-iso-certification' },
    { title: 'Anti-Ragging Committee & Helpline', href: '/anti-ragging-committee' },
    { title: 'RTI Process & PIO Officer', href: '/rti-process-officer' },
    { title: 'AICTE Mandatory Disclosure', href: '/mandatory-disclosure' },
  ];

  const departments = [
    { title: 'Computer Science & Technology (CST)', href: '/departments/computer-science-technology' },
    { title: 'Diploma in Mechanical Engineering (ME)', href: '/departments/diploma-in-mechanical-engineering' },
    { title: 'Diploma in Electrical Engineering (EE)', href: '/departments/diploma-in-electrical-engineering' },
    { title: 'Diploma in Civil Engineering (CE)', href: '/departments/diploma-in-civil-engineering' },
    { title: 'Electronics & Telecom (ETCE)', href: '/departments/diploma-in-electronics-telecommunications-engineering' },
    { title: 'Diploma in Automobile Engineering (AE)', href: '/departments/diploma-in-automobile-engineering' },
  ];

  const itiTrades = [
    { title: 'ITI Trades Overview (NCVT CTS)', href: '/iti-courses' },
    { title: 'ITI Electrician Trade (20 Seats)', href: '/iti-courses/iti-electrician' },
    { title: 'ITI Fitter Trade (20 Seats)', href: '/iti-courses/iti-fitter' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top Utility Bar */}
      <div className="bg-[#151515] text-white text-xs py-2 px-4 hidden md:block border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:03432542103" className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
              (0343) 2542103 / 06 / 08 | +91 98005 71423
            </a>
            <a href="mailto:info@nhit.in" className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
              info@nhit.in
            </a>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 text-[11px] font-semibold">
            <span className="text-[color:var(--edu-primary)]">AICTE Permanent ID: 1-475249561</span>
            <span>•</span>
            <span>WBSCT&amp;VE&amp;SD Affiliated</span>
            <span>•</span>
            <span>NCVT Approved ITI</span>
            <span>•</span>
            <span className="text-amber-400">Est. 2007</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[color:var(--edu-primary)] flex items-center justify-center text-white font-black text-xl shadow-md">
            N
          </div>
          <div>
            <div className="font-extrabold text-lg leading-tight text-gray-900 tracking-tight">
              NHIT <span className="text-[color:var(--edu-primary)]">Durgapur</span>
            </div>
            <div className="text-[10px] text-gray-500 font-medium tracking-wide">
              The New Horizons Institute of Technology
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-gray-700">
          <Link href="/" className="hover:text-[color:var(--edu-primary)] transition-colors py-2">Home</Link>
          
          {/* About Dropdown */}
          <div className="relative group">
            <Link href="/about" className="flex items-center gap-1 hover:text-[color:var(--edu-primary)] transition-colors py-2">
              About NHIT <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <Link
                href="/about"
                className="block px-3 py-2 text-xs font-bold text-[color:var(--edu-primary)] hover:bg-orange-50 rounded-lg transition-colors border-b border-gray-100 mb-1"
              >
                About NHIT (Overview &amp; Genesis)
              </Link>
              {institutionalLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[color:var(--edu-primary)] rounded-lg transition-colors font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Departments Dropdown */}
          <div className="relative group">
            <Link href="/departments" className="flex items-center gap-1 hover:text-[color:var(--edu-primary)] transition-colors py-2">
              Departments <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <Link
                href="/departments"
                className="block px-3 py-2 text-xs font-bold text-[color:var(--edu-primary)] hover:bg-orange-50 rounded-lg transition-colors border-b border-gray-100 mb-1"
              >
                All 6 Diploma Disciplines Overview
              </Link>
              {departments.map((dept, i) => (
                <Link
                  key={i}
                  href={dept.href}
                  className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-[color:var(--edu-primary)] rounded-lg transition-colors font-medium"
                >
                  {dept.title}
                </Link>
              ))}
            </div>
          </div>

          {/* ITI Courses Dropdown */}
          <div className="relative group">
            <Link href="/iti-courses" className="flex items-center gap-1 hover:text-[color:var(--edu-primary)] transition-colors py-2">
              ITI Trades <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              {itiTrades.map((trade, i) => (
                <Link
                  key={i}
                  href={trade.href}
                  className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[color:var(--edu-primary)] rounded-lg transition-colors font-medium"
                >
                  {trade.title}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/admissions" className="hover:text-[color:var(--edu-primary)] transition-colors py-2">Admissions</Link>
          <Link href="/placements" className="hover:text-[color:var(--edu-primary)] transition-colors py-2">Placements</Link>
          <Link href="/student-life" className="hover:text-[color:var(--edu-primary)] transition-colors py-2">Student Life</Link>
          <Link href="/circulars" className="hover:text-[color:var(--edu-primary)] transition-colors py-2">Notice Board</Link>
          <Link href="/blog" className="hover:text-[color:var(--edu-primary)] transition-colors py-2">Blog</Link>
          <Link href="/contact" className="hover:text-[color:var(--edu-primary)] transition-colors py-2">Contact</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://nhit.in/wp-content/uploads/2024/06/Brochure-Final-2_compressed-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[color:var(--edu-primary)]" />
            Prospectus
          </a>
          <Link
            href="/admissions"
            className="px-5 py-2.5 rounded-xl bg-[color:var(--edu-primary)] hover:bg-[color:var(--edu-primary-dark)] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
          >
            Apply 2026 →
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-5 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="block text-xs font-bold text-gray-800" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          
          {/* Mobile About Accordion */}
          <div>
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-800 py-1"
            >
              <span>About NHIT Institutional</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileAboutOpen && (
              <div className="pl-3 mt-1.5 space-y-1.5 border-l-2 border-orange-200">
                <Link href="/about" className="block text-[11px] text-gray-600 font-semibold" onClick={() => setMobileMenuOpen(false)}>About Overview</Link>
                {institutionalLinks.map((item, i) => (
                  <Link key={i} href={item.href} className="block text-[11px] text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Departments Accordion */}
          <div>
            <button
              onClick={() => setMobileDeptsOpen(!mobileDeptsOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-800 py-1"
            >
              <span>Academic Departments</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileDeptsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileDeptsOpen && (
              <div className="pl-3 mt-1.5 space-y-1.5 border-l-2 border-orange-200">
                <Link href="/departments" className="block text-[11px] text-gray-600 font-semibold" onClick={() => setMobileMenuOpen(false)}>All Departments</Link>
                {departments.map((dept, i) => (
                  <Link key={i} href={dept.href} className="block text-[11px] text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    {dept.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile ITI Trades */}
          <div>
            <button
              onClick={() => setMobileItiOpen(!mobileItiOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-800 py-1"
            >
              <span>NCVT ITI Trades</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileItiOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileItiOpen && (
              <div className="pl-3 mt-1.5 space-y-1.5 border-l-2 border-orange-200">
                {itiTrades.map((trade, i) => (
                  <Link key={i} href={trade.href} className="block text-[11px] text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    {trade.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/admissions" className="block text-xs font-bold text-gray-800" onClick={() => setMobileMenuOpen(false)}>Admissions 2026</Link>
          <Link href="/placements" className="block text-xs font-bold text-gray-800" onClick={() => setMobileMenuOpen(false)}>Placements &amp; Recruiters</Link>
          <Link href="/student-life" className="block text-xs font-bold text-gray-800" onClick={() => setMobileMenuOpen(false)}>Student Life &amp; Innovation</Link>
          <Link href="/circulars" className="block text-xs font-bold text-gray-800" onClick={() => setMobileMenuOpen(false)}>Notice Board &amp; Circulars</Link>
          <Link href="/blog" className="block text-xs font-bold text-gray-800" onClick={() => setMobileMenuOpen(false)}>Campus Blog</Link>
          <Link href="/contact" className="block text-xs font-bold text-gray-800" onClick={() => setMobileMenuOpen(false)}>Contact &amp; Helplines</Link>
        </div>
      )}
    </header>
  );
}
