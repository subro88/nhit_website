'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Sign in failed');
        setBusy(false);
        return;
      }
      router.replace('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Network error — please try again');
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5"
    >
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Username
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. admin or hod.ce"
            autoFocus
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] focus:ring-2 focus:ring-[#9E0B0F]/10 bg-slate-50 focus:bg-white transition"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] focus:ring-2 focus:ring-[#9E0B0F]/10 bg-slate-50 focus:bg-white transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full py-3 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-sm font-bold shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <LogIn className="w-4 h-4" />
        {busy ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
