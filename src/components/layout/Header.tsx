'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const departments = [
    { title: 'Computer Science & Technology', href: '/departments/computer-science-technology' },
    { title: 'Mechanical Engineering', href: '/departments/diploma-in-mechanical-engineering' },
    { title: 'Electronics & Telecom Engineering', href: '/departments/diploma-in-electronics-telecommunications-engineering' },
    { title: 'Electrical Engineering', href: '/departments/diploma-in-electrical-engineering' },
    { title: 'Civil Engineering', href: '/departments/diploma-in-civil-engineering' },
    { title: 'Automobile Engineering', href: '/departments/diploma-in-automobile-engineering' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Notification Bar */}
      <div className="bg-[#0F172A] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-[1240px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              +91 9434005886 / 0343-2542289
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              principal@nhit.in
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>AICTE Approved</span>
            <span>•</span>
            <span>WBSCT&VE&SD Affiliated</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">Est. 2007 Legacy</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Institutional Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C10A0C] flex items-center justify-center text-white font-black text-xl shadow-md">
            N
          </div>
          <div>
            <div className="font-extrabold text-lg leading-tight text-[#0F172A] tracking-tight">
              NHIT <span className="text-[#C10A0C]">Durgapur</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              The New Horizons Institute of Technology
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-[#C10A0C] transition-colors">Home</Link>
          <Link href="/about" className="hover:text-[#C10A0C] transition-colors">About NHIT</Link>
          
          {/* Departments Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#C10A0C] transition-colors py-2">
              Departments <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              {departments.map((dept, i) => (
                <Link
                  key={i}
                  href={dept.href}
                  className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#C10A0C] rounded-lg transition-colors"
                >
                  {dept.title}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/admissions" className="hover:text-[#C10A0C] transition-colors">Admissions</Link>
          <Link href="/placements" className="hover:text-[#C10A0C] transition-colors">Placements</Link>
          <Link href="/student-life" className="hover:text-[#C10A0C] transition-colors">Student Life</Link>
          <Link href="/circulars" className="hover:text-[#C10A0C] transition-colors">Notices</Link>
          <Link href="/contact" className="hover:text-[#C10A0C] transition-colors">Contact</Link>
        </nav>

        {/* Apply CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/admissions"
            className="px-5 py-2.5 rounded-full bg-[#C10A0C] hover:bg-[#9E0B0F] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Apply 2026 →
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <Link href="/" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>About NHIT</Link>
          <Link href="/departments" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>Academic Departments</Link>
          <Link href="/admissions" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>Admissions 2026</Link>
          <Link href="/placements" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>Placements & Industry</Link>
          <Link href="/student-life" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>Student Life</Link>
          <Link href="/circulars" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>Notices & Circulars</Link>
          <Link href="/contact" className="block text-sm font-semibold text-slate-800" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
}
