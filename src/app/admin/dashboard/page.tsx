import AdminShell from '@/components/admin/AdminShell';
import DashboardHome from '@/components/admin/DashboardHome';
import { requireAdmin } from '@/lib/adminGuard';

export default function AdminDashboardPage() {
  const user = requireAdmin();

  return (
    <AdminShell user={user} title="Dashboard">
      <DashboardHome user={user} />
    </AdminShell>
  );
}
