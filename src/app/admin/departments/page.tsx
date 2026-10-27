import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { requireSuperAdmin } from '@/lib/adminGuard';
import { DEPARTMENTS_FILE, readJson } from '@/lib/cmsStore';
import { ArrowRight } from 'lucide-react';

interface DeptBrief {
  slug: string;
  title: string;
  code: string;
  order: number;
}

export default function AdminDepartmentsPage() {
  const user = requireSuperAdmin();
  const all = readJson<Record<string, DeptBrief>>(DEPARTMENTS_FILE, {});
  const list = Object.values(all).sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <AdminShell user={user} title="Departments">
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          Pick a department to edit its page content. Changes appear on the
          live site immediately.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {list.map((d) => (
            <Link
              key={d.slug}
              href={`/admin/departments/${d.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  [{d.code}]
                </span>
                <div className="font-bold text-slate-900 truncate">{d.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">/{d.slug}</div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#9E0B0F] group-hover:translate-x-1 transition-transform">
                Edit <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
