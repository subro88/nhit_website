'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Building2,
  Globe,
} from 'lucide-react';
import type { ShellUser } from './AdminShell';

interface Notice {
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  department?: string;
}

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'exam', label: 'Examination' },
  { id: 'fee', label: 'Fees & Accounts' },
  { id: 'admission', label: 'Admissions' },
  { id: 'event', label: 'Events & Seminars' },
];

const inputCls =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white transition';

export default function NoticesManager({ user }: { user: ShellUser }) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Notice | 'new' | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [deleting, setDeleting] = useState<Notice | null>(null);

  const isSuper = user.role === 'superadmin';

  async function load() {
    const res = await fetch('/api/admin/notices');
    const data = await res.json();
    setNotices(data.notices || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function canManage(n: Notice) {
    if (isSuper) return true;
    return !!n.department && n.department === user.dept;
  }

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {isSuper
            ? 'All notices on the public notice board. Department-tagged notices show which dept posted them.'
            : 'Notices for your department. You can edit or delete only the ones you posted.'}
        </p>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow"
        >
          <Plus className="w-4 h-4" /> Post New Notice
        </button>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
            msg.ok
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          {msg.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {msg.text}
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Loading notices…</div>
        ) : notices.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            No notices yet. Post the first one!
          </div>
        ) : (
          notices.map((n) => (
            <div key={n.slug} className="px-5 py-4 flex flex-wrap items-start justify-between gap-3 hover:bg-slate-50/60 transition">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 text-[#ff3115]">
                    {n.category}
                  </span>
                  {n.department ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      <Building2 className="w-3 h-3" /> {n.department}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                      <Globe className="w-3 h-3" /> Central
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{n.date}</span>
                </div>
                <div className="font-bold text-slate-900 text-sm mt-1.5">{n.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-2 max-w-3xl">
                  {n.summary}
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5">
                <a
                  href={`/circulars/${n.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title="View on site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                {canManage(n) && (
                  <>
                    <button
                      onClick={() => setEditing(n)}
                      className="p-2 rounded-lg text-slate-400 hover:text-sky-700 hover:bg-sky-50"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleting(n)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor modal */}
      {editing && (
        <NoticeForm
          user={user}
          notice={editing === 'new' ? null : editing}
          onClose={(saved, text) => {
            setEditing(null);
            if (saved) {
              setMsg({ ok: true, text });
              load();
            }
          }}
        />
      )}

      {/* Delete confirm */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleting(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-slate-900">Delete this notice?</h3>
            <p className="text-sm text-slate-500">
              “{deleting.title}” will be removed from the public notice board.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleting(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const res = await fetch(`/api/admin/notices/${deleting.slug}`, {
                    method: 'DELETE',
                  });
                  setDeleting(null);
                  if (res.ok) {
                    setMsg({ ok: true, text: 'Notice deleted.' });
                    load();
                  } else {
                    const d = await res.json().catch(() => ({}));
                    setMsg({ ok: false, text: d.error || 'Delete failed' });
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoticeForm({
  user,
  notice,
  onClose,
}: {
  user: ShellUser;
  notice: Notice | null;
  onClose: (saved: boolean, text: string) => void;
}) {
  const isSuper = user.role === 'superadmin';
  const [title, setTitle] = useState(notice?.title || '');
  const [category, setCategory] = useState(notice?.category || 'general');
  const [date, setDate] = useState(notice?.date || '');
  const [summary, setSummary] = useState(notice?.summary || '');
  const [department, setDepartment] = useState(
    isSuper ? notice?.department || 'central' : user.dept || 'central'
  );
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !summary.trim()) {
      setError('Title and notice text are required.');
      return;
    }
    setBusy(true);
    const res = await fetch(
      notice ? `/api/admin/notices/${notice.slug}` : '/api/admin/notices',
      {
        method: notice ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, date, summary, department }),
      }
    );
    const data = await res.json();
    setBusy(false);
    if (res.ok) {
      onClose(true, notice ? 'Notice updated.' : 'Notice published to the board.');
    } else {
      setError(data.error || 'Could not save the notice.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose(false, '')} />
      <form
        onSubmit={submit}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-6 space-y-4"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">
            {notice ? 'Edit Notice' : 'Post New Notice'}
          </h3>
          <button
            type="button"
            onClick={() => onClose(false, '')}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Notice Title
            </span>
            <input
              className={inputCls}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Semester Exam Form Fill-up Deadline"
            />
          </label>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Category
              </span>
              <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            {isSuper ? (
              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Posted By
                </span>
                <select
                  className={inputCls}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="central">Institute (Central)</option>
                  <option value={user.dept || ''}>—</option>
                  {[
                    'computer-science-technology',
                    'diploma-in-mechanical-engineering',
                    'diploma-in-electrical-engineering',
                    'diploma-in-civil-engineering',
                    'diploma-in-electronics-telecommunications-engineering',
                    'diploma-in-automobile-engineering',
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Posted By
                </span>
                <div className="px-4 py-2.5 text-sm rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
                  Your department (automatic)
                </div>
              </div>
            )}
          </div>

          {notice && (
            <label className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Date Stamp
              </span>
              <input
                className={inputCls}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Leave as is to keep the current date"
              />
            </label>
          )}

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Notice Text
            </span>
            <textarea
              rows={8}
              className={inputCls}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Full notice text. Blank lines create paragraphs on the public page."
            />
            <span className="block text-[11px] text-slate-400">
              This text appears on the notice board list and the notice detail page.
            </span>
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onClose(false, '')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="px-6 py-2.5 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow disabled:opacity-60"
            >
              {busy ? 'Saving…' : notice ? 'Update Notice' : 'Publish Notice'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
