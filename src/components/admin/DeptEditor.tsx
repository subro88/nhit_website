'use client';

import React, { useEffect, useState } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  FileJson,
  FormInput,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

interface Dept {
  slug: string;
  title?: string;
  tagline?: string;
  [key: string]: unknown;
}

const inputCls =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white transition';

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

export default function DeptEditor({ slug }: { slug: string }) {
  const [dept, setDept] = useState<Dept | null>(null);
  const [tab, setTab] = useState<'form' | 'json'>('form');
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/departments/${slug}`);
      const data = await res.json();
      if (res.ok) {
        setDept(data.department);
        setJsonText(JSON.stringify(data.department, null, 2));
      } else {
        setMsg({ ok: false, text: data.error || 'Could not load department' });
      }
      setLoading(false);
    })();
  }, [slug]);

  function set(path: string, value: string) {
    setDept((prev) => {
      if (!prev) return prev;
      const next: any = { ...prev };
      const parts = path.split('.');
      let obj: any = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...obj[parts[i]] };
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  }

  function get(path: string): string {
    if (!dept) return '';
    return path
      .split('.')
      .reduce<any>((o, k) => (o == null ? o : o[k]), dept) ?? '';
  }

  async function save() {
    setMsg(null);
    let payload = dept;

    if (tab === 'json') {
      try {
        payload = JSON.parse(jsonText);
      } catch (e: any) {
        setMsg({ ok: false, text: `JSON error: ${e.message}` });
        return;
      }
    }

    if (!payload || payload.slug !== slug) {
      setMsg({ ok: false, text: 'The slug must stay unchanged.' });
      return;
    }

    setBusy(true);
    const res = await fetch(`/api/admin/departments/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: payload }),
    });
    const data = await res.json();
    setBusy(false);

    if (res.ok) {
      setDept(payload);
      if (tab === 'json') setJsonText(JSON.stringify(payload, null, 2));
      setMsg({ ok: true, text: 'Saved! The live page is updated.' });
    } else {
      setMsg({ ok: false, text: data.error || 'Could not save' });
    }
  }

  function resetJson() {
    if (dept) setJsonText(JSON.stringify(dept, null, 2));
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Loading department content…
      </div>
    );
  }

  if (!dept) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-sm text-red-700">
        {msg?.text || 'Department not found.'}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Tab bar + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
          <button
            onClick={() => {
              setTab('form');
              setJsonText(JSON.stringify(dept, null, 2));
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'form' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FormInput className="w-3.5 h-3.5" /> Content Form
          </button>
          <button
            onClick={() => setTab('json')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'json' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" /> Advanced JSON
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/departments/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Page
          </a>
          <button
            onClick={save}
            disabled={busy}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" />
            {busy ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Message */}
      {msg && (
        <div
          className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
            msg.ok
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          {msg.ok ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {msg.text}
        </div>
      )}

      {tab === 'form' ? (
        <div className="space-y-5">
          {/* Basic info */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Basic Information
            </h3>
            <Field label="Department Title">
              <input className={inputCls} value={get('title')} onChange={(e) => set('title', e.target.value)} />
            </Field>
            <Field label="Tagline" hint="Shown in the hero area and search results.">
              <textarea rows={2} className={inputCls} value={get('tagline')} onChange={(e) => set('tagline', e.target.value)} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Intake">
                <input className={inputCls} value={get('intake')} onChange={(e) => set('intake', e.target.value)} />
              </Field>
              <Field label="Duration">
                <input className={inputCls} value={get('duration')} onChange={(e) => set('duration', e.target.value)} />
              </Field>
              <Field label="Regulatory">
                <input className={inputCls} value={get('regulatory')} onChange={(e) => set('regulatory', e.target.value)} />
              </Field>
              <Field label="Practical Ratio">
                <input className={inputCls} value={get('practicalRatio')} onChange={(e) => set('practicalRatio', e.target.value)} />
              </Field>
            </div>
            <Field label="Accent Color (hex)" hint="Used for the department theme, e.g. #0284C7">
              <input className={inputCls} value={get('accentHex')} onChange={(e) => set('accentHex', e.target.value)} />
            </Field>
            <Field label="Syllabus PDF Link">
              <input className={inputCls} value={get('syllabusPdf')} onChange={(e) => set('syllabusPdf', e.target.value)} />
            </Field>
          </section>

          {/* HOD */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Head of Department
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name">
                <input className={inputCls} value={get('hod.name')} onChange={(e) => set('hod.name', e.target.value)} />
              </Field>
              <Field label="Designation">
                <input className={inputCls} value={get('hod.desig')} onChange={(e) => set('hod.desig', e.target.value)} />
              </Field>
            </div>
            <Field label="Message">
              <textarea rows={5} className={inputCls} value={get('hod.message')} onChange={(e) => set('hod.message', e.target.value)} />
            </Field>
          </section>

          {/* Stats */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Placement Stats
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Placement Rate">
                <input className={inputCls} value={get('stats.placementRate')} onChange={(e) => set('stats.placementRate', e.target.value)} />
              </Field>
              <Field label="Highest CTC">
                <input className={inputCls} value={get('stats.highestCtc')} onChange={(e) => set('stats.highestCtc', e.target.value)} />
              </Field>
              <Field label="Median CTC">
                <input className={inputCls} value={get('stats.medianCtc')} onChange={(e) => set('stats.medianCtc', e.target.value)} />
              </Field>
            </div>
          </section>

          {/* Long text */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Long Text Sections
            </h3>
            <Field label="Eligibility" hint="One line per rule. Blank lines separate sections.">
              <textarea rows={6} className={inputCls} value={get('eligibility')} onChange={(e) => set('eligibility', e.target.value)} />
            </Field>
            <Field label="Narrative / Overview Text">
              <textarea rows={6} className={inputCls} value={get('narrative')} onChange={(e) => set('narrative', e.target.value)} />
            </Field>
          </section>

          <p className="text-xs text-slate-400">
            Need to edit labs, subjects, events, projects, testimonials, careers
            or FAQs? Open the <strong>Advanced JSON</strong> tab above.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Full department data (JSON)
            </span>
            <button
              onClick={resetJson}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
            className="w-full h-[560px] p-5 font-mono text-xs leading-relaxed text-slate-800 focus:outline-none resize-y bg-white"
          />
        </div>
      )}
    </div>
  );
}
