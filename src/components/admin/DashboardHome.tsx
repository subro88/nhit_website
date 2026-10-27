'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Bell,
  Newspaper,
  Users,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { ShellUser } from './AdminShell';

interface Stats {
  departments: number;
  notices: number;
  posts: number;
}

export default function DashboardHome({ user }: { user: ShellUser }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [d, n] = await Promise.all([
          fetch('/api/admin/departments').then((r) => r.json()),
          fetch('/api/admin/notices').then((r) => r.json()),
        ]);
        const next: Stats = {
          departments: (d.departments || []).length,
          notices: (n.notices || []).length,
          posts: 0,
        };
        if (user.role === 'superadmin') {
          const b = await fetch('/api/admin/blog').then((r) => r.json());
          next.posts = (b.posts || []).length;
        }
        setStats(next);
      } catch {
        /* stats are optional */
      }
    })();
  }, [user.role]);

  const isSuper = user.role === 'superadmin';

  const cards = [
    ...(isSuper
      ? [
          {
            href: '/admin/departments',
            icon: Building2,
            label: 'Departments',
            desc: 'Edit any department page content',
            stat: stats ? `${stats.departments} pages` : '…',
            accent: 'bg-sky-50 text-sky-700 border-sky-200',
          },
          {
            href: '/admin/notices',
            icon: Bell,
            label: 'Notices',
            desc: 'Publish circulars to the notice board',
            stat: stats ? `${stats.notices} live` : '…',
            accent: 'bg-orange-50 text-orange-700 border-orange-200',
          },
          {
            href: '/admin/blog',
            icon: Newspaper,
            label: 'Blog Posts',
            desc: 'Write news and campus stories',
            stat: stats ? `${stats.posts} posts` : '…',
            accent: 'bg-violet-50 text-violet-700 border-violet-200',
          },
          {
            href: '/admin/users',
            icon: Users,
            label: 'Users',
            desc: 'Manage accounts and passwords',
            stat: '7 accounts',
            accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          },
        ]
      : [
          {
            href: `/admin/departments/${user.dept}`,
            icon: Building2,
            label: 'My Department',
            desc: 'Edit your department page content',
            stat: '1 page',
            accent: 'bg-sky-50 text-sky-700 border-sky-200',
          },
          {
            href: '/admin/notices',
            icon: Bell,
            label: 'My Notices',
            desc: 'Post notices for your department',
            stat: stats ? `${stats.notices} on board` : '…',
            accent: 'bg-orange-50 text-orange-700 border-orange-200',
          },
        ]),
  ];

  return (
    <div className="space-y-8">
      {/* Welcome strip */}
      <div className="rounded-2xl bg-gradient-to-br from-[#9E0B0F] to-[#7B080B] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Welcome, {user.name}
        </h2>
        <p className="text-sm text-red-100 mt-1 max-w-xl leading-relaxed">
          {isSuper
            ? 'You have full control — department pages, notices, blog posts and user accounts.'
            : 'You can edit your own department page and post notices for your department. Changes appear on the live site instantly.'}
        </p>
      </div>

      {/* Quick access cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center ${card.accent}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#9E0B0F] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-4 font-bold text-slate-900">{card.label}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {card.desc}
              </div>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {card.stat}
              </div>
            </Link>
          );
        })}
      </div>

      <ChangePasswordCard username={user.username} />
    </div>
  );
}

function ChangePasswordCard({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (pw1.length < 8) {
      setMsg({ ok: false, text: 'Password must be at least 8 characters.' });
      return;
    }
    if (pw1 !== pw2) {
      setMsg({ ok: false, text: 'The two passwords do not match.' });
      return;
    }
    setBusy(true);
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: pw1 }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok) {
      setMsg({ ok: true, text: 'Password changed successfully.' });
      setPw1('');
      setPw2('');
    } else {
      setMsg({ ok: false, text: data.error || 'Could not change password.' });
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3 font-bold text-slate-900 text-sm">
          <KeyRound className="w-4 h-4 text-slate-400" />
          Change my password
        </span>
        <span className="text-xs font-bold text-[#9E0B0F]">
          {open ? 'Hide' : 'Open'}
        </span>
      </button>
      {open && (
        <form onSubmit={submit} className="px-5 pb-5 space-y-3">
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
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="password"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              placeholder="New password (min 8 characters)"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white"
            />
            <input
              type="password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              placeholder="Repeat new password"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-60"
          >
            {busy ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
}
