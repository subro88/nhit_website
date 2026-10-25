'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  Calendar, 
  FileText, 
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';
import noticesData from '../../../content/circulars/notices-index.json';

export default function CircularsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Notices' },
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
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="Official Academic Notice Board"
        title="Circulars & Notifications"
        subtitle="Stay updated with real-time examination rosters, fee payment windows, seminar registrations, and statutory Council announcements."
        breadcrumbs={[
          { label: 'Notice Board' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-8">
        
        {/* Search & Filter Strip */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars, exams, fees, seminars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff3115] bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice: any, idx: number) => (
              <Link 
                key={idx}
                href={`/circulars/${notice.slug}`}
                className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#ff3115] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 block"
              >
                <div className="space-y-2 max-w-4xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-orange-100 text-[#ff3115]">
                      {notice.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {notice.date.split(' ')[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#ff3115] transition-colors">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {notice.summary}
                  </p>
                </div>

                <div className="shrink-0 w-full sm:w-auto flex justify-end">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ff3115] group-hover:translate-x-1 transition-transform">
                    <span>View Notice</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-base font-bold text-gray-800">No circulars matched your search</div>
              <div className="text-xs text-gray-500 mt-1">Try resetting the filter or searching for another keyword</div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
