import AdminShell from '@/components/admin/AdminShell';
import DeptEditor from '@/components/admin/DeptEditor';
import { requireAdmin } from '@/lib/adminGuard';
import { canEditDepartment } from '@/lib/auth';
import { DEPARTMENTS_FILE, readJson } from '@/lib/cmsStore';

interface Props {
  params: { slug: string };
}

interface DeptBrief {
  slug: string;
  title: string;
  code: string;
}

export default function AdminDepartmentEditorPage({ params }: Props) {
  const user = requireAdmin();

  if (!canEditDepartment(user, params.slug)) {
    return (
      <AdminShell user={user} title="No Access">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <div className="text-lg font-bold text-red-700">
            You can only edit your own department.
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Signed in as <strong>{user.username}</strong>
            {user.dept ? ` (${user.dept})` : ''}.
          </p>
        </div>
      </AdminShell>
    );
  }

  const all = readJson<Record<string, DeptBrief>>(DEPARTMENTS_FILE, {});
  const dept = all[params.slug];

  return (
    <AdminShell
      user={user}
      title={dept ? `Edit — ${dept.title}` : 'Edit Department'}
    >
      <DeptEditor slug={params.slug} />
    </AdminShell>
  );
}
