import AdminShell from '@/components/admin/AdminShell';
import NoticesManager from '@/components/admin/NoticesManager';
import { requireAdmin } from '@/lib/adminGuard';

export default function AdminNoticesPage() {
  const user = requireAdmin();

  return (
    <AdminShell user={user} title="Notice Board">
      <NoticesManager user={user} />
    </AdminShell>
  );
}
