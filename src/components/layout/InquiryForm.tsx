'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, Building } from 'lucide-react';
import type { PageSection } from '@/lib/pageTypes';

/*
 * InquiryForm — client island for the CMS 'inquiryForm' section (contact page).
 * All labels / options / texts come from pages.json so the CMS can edit them.
 * Submission is a front-end confirmation (no backend call), like the original page.
 */
export default function InquiryForm({ s }: { s: PageSection }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: '',
    query: '',
  });

  const opts = s.options ?? [];
  const successLine = (s.successText ?? '')
    .replace('{name}', formData.name || '—')
    .replace('{phone}', formData.phone || '—')
    .replace('{branch}', formData.branch || opts[0] || '—');

  const inputCls =
    'w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[color:var(--edu-primary)] bg-gray-50 focus:bg-white transition-colors';
  const labelCls = 'block text-xs font-bold text-gray-700 mb-1';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form card */}
      <div className="lg:col-span-8 bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
        {s.tag && (
          <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--edu-primary)]">{s.tag}</span>
        )}
        {s.heading && <h2 className="text-2xl font-bold font-heading text-gray-900 mt-1 mb-2">{s.heading}</h2>}
        {s.sub && <p className="text-xs text-gray-500 mb-6">{s.sub}</p>}

        {submitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900">{s.successTitle ?? 'Inquiry Received Successfully!'}</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">{successLine}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              {s.resendLabel ?? 'Send Another Inquiry'}
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>{s.nameLabel ?? 'Name *'}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={s.namePh ?? ''}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>{s.phoneLabel ?? 'Phone *'}</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={s.phonePh ?? ''}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>{s.emailLabel ?? 'Email'}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={s.emailPh ?? ''}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>{s.branchLabel ?? 'Course of Interest *'}</label>
                <select
                  value={formData.branch || opts[0] || ''}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className={inputCls}
                >
                  {opts.map((o, i) => (
                    <option key={i}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>{s.queryLabel ?? 'Questions'}</label>
              <textarea
                rows={4}
                value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                placeholder={s.queryPh ?? ''}
                className={inputCls}
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[color:var(--edu-primary)] hover:bg-[color:var(--edu-primary-dark)] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              {s.submitLabel ?? 'Submit Inquiry'}
            </button>
          </form>
        )}
      </div>

      {/* Side panel: hours + transit */}
      <div className="lg:col-span-4 space-y-6">
        {!!s.hoursRows?.length && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[color:var(--edu-primary)]" />
              {s.hoursTitle ?? 'Administrative Hours'}
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              {s.hoursRows.map((r, i) => (
                <div
                  key={i}
                  className={`flex justify-between py-1 ${
                    r.danger ? 'text-red-600 font-semibold' : 'border-b border-gray-100'
                  }`}
                >
                  <span className={r.danger ? '' : 'font-semibold text-gray-800'}>{r.day}</span>
                  <span>{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(s.transitTitle || s.transitText) && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              {s.transitTitle}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">{s.transitText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
