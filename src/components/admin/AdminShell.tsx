'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Images,
  Building2,
  MessageSquareText,
  FileText,
  Bell,
  Newspaper,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

export interface ShellUser {
  username: string;
  name: string;
  role: 'superadmin' | 'department';
  dept?: string;
}

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['superadmin', 'department'] },
  { href: '/admin/homepage', label: 'Home Page', icon: Home, roles: ['superadmin'] },
  { href: '/admin/images', label: 'Photo Library', icon: Images, roles: ['superadmin'] },
  { href: '/admin/messages', label: 'Message Pages', icon: MessageSquareText, roles: ['superadmin'] },
  { href: '/admin/pages', label: 'Info Pages', icon: FileText, roles: ['superadmin'] },
  { href: '/admin/departments', label: 'Departments', icon: Building2, roles: ['superadmin'] },
  { href: '/admin/notices', label: 'Notices', icon: Bell, roles: ['superadmin', 'department'] },
  { href: '/admin/blog', label: 'Blog Posts', icon: Newspaper, roles: ['superadmin'] },
  { href: '/admin/users', label: 'Users', icon: Users, roles: ['superadmin'] },
];

export default function AdminShell({
  user,
  title,
  children,
}: {
  user: ShellUser;
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = NAV.filter((n) => n.roles.includes(user.role));

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin');
    router.refresh();
  }

  const isActive = (href: string) =>
    href === '/admin/departments'
      ? pathname.startsWith('/admin/departments')
      : pathname.startsWith(href);

  const sidebar = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 w-64">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#9E0B0F] text-white flex items-center justify-center text-sm font-black">
            NHIT
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">CMS Panel</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              nhit.in
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? 'bg-[#9E0B0F] text-white shadow-lg'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold uppercase">
            {user.username.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-bold truncate">{user.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              {user.role === 'superadmin' ? 'Super Admin' : 'Department User'}
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-red-900/60 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed inset-y-0 left-0 z-30">{sidebar}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full">{sidebar}</div>
        </div>
      )}

      <div className="flex-1 md:ml-64 min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-extrabold text-slate-900 truncate">{title}</h1>
              {user.role === 'department' && (
                <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Dept Access
                </span>
              )}
              {user.role === 'superadmin' && (
                <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  Super Admin
                </span>
              )}
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#9E0B0F] transition-colors"
            >
              View Site
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        <main className="px-4 sm:px-8 py-6 sm:py-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
