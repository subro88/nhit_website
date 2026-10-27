import { requireSuperAdmin } from '@/lib/adminGuard';
import AdminShell from '@/components/admin/AdminShell';
import PagesEditor from '@/components/admin/PagesEditor';

export default function AdminPagesManagerPage() {
  const user = requireSuperAdmin();

  return (
    <AdminShell user={user} title="Info Pages">
      <PagesEditor />
    </AdminShell>
  );
}
