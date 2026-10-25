'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  Calendar, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import noticesData from '../../../content/circulars/notices-index.json';

export default function CircularsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Circulars' },
    { id: 'exam', label: 'Examinations' },
    { id: 'fee', label: 'Fees & Accounts' },
    { id: 'admission', label: 'Admissions' },
    { id: 'event', label: 'Events & Seminars' },
  ];

  const filteredNotices = noticesData.filter((item: any) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-[1140px] mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#C10A0C] text-xs font-bold uppercase tracking-wider mb-3">
            <Bell className="w-3.5 h-3.5" />
            Official Notice Board
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Institutional Circulars & Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Real-time examination rosters, fee submission windows, and statutory academic council directives.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars, exams, fees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#C10A0C] transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Circulars List */}
        <div className="space-y-3">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice: any, idx: number) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 text-[#C10A0C] border border-red-100 font-mono">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {notice.date.split(' ')[0]}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 hover:text-[#C10A0C] transition-colors cursor-pointer">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {notice.summary}
                  </p>
                </div>

                <div className="shrink-0 w-full sm:w-auto flex justify-end">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C10A0C] hover:underline cursor-pointer">
                    <span>Read Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <div className="text-sm font-bold text-slate-700">No circulars matched your search</div>
              <div className="text-xs text-slate-400 mt-1">Try resetting the filter or changing your keywords</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
