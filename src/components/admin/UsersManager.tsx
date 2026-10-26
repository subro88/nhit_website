'use client';

import React, { useEffect, useState } from 'react';
import {
  KeyRound,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AdminUser {
  username: string;
  name: string;
  role: 'superadmin' | 'department';
  dept?: string;
}

const inputCls =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white transition';

export default function UsersManager({ current }: { current: string }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState<AdminUser | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500">
        Every department user can sign in and manage only their own department
        page and notices. Reset a password below if a HOD loses access.
      </p>

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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Loading users…</div>
        ) : (
          users.map((u) => (
            <div key={u.username} className="px-5 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold uppercase shrink-0">
                  {u.username.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2 flex-wrap">
                    {u.name}
                    {u.role === 'superadmin' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                        <ShieldCheck className="w-3 h-3" /> Super Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        <Building2 className="w-3 h-3" /> Dept User
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    @{u.username}
                    {u.dept ? ` · ${u.dept}` : ''}
                    {u.username === current ? ' · (you)' : ''}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setResetting(u)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50"
              >
                <KeyRound className="w-3.5 h-3.5" /> Reset Password
              </button>
            </div>
          ))
        )}
      </div>

      {resetting && (
        <ResetForm
          user={resetting}
          onClose={(done) => {
            setResetting(null);
            if (done) setMsg({ ok: true, text: `Password updated for @${resetting.username}.` });
          }}
        />
      )}
    </div>
  );
}

function ResetForm({
  user,
  onClose,
}: {
  user: AdminUser;
  onClose: (done: boolean) => void;
}) {
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (pw.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (pw !== pw2) {
      setError('The two passwords do not match.');
      return;
    }
    setBusy(true);
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, password: pw }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok) onClose(true);
    else setError(data.error || 'Could not update password.');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose(false)} />
      <form onSubmit={submit} className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-4">
        <h3 className="font-bold text-slate-900">
          Reset password — @{user.username}
        </h3>
        <p className="text-xs text-slate-500">{user.name}</p>
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
        <input
          type="password"
          className={inputCls}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="New password (min 8 characters)"
          autoFocus
        />
        <input
          type="password"
          className={inputCls}
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          placeholder="Repeat new password"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-60"
          >
            {busy ? 'Saving…' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
