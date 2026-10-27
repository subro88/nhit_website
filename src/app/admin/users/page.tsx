import AdminShell from '@/components/admin/AdminShell';
import UsersManager from '@/components/admin/UsersManager';
import { requireSuperAdmin } from '@/lib/adminGuard';

export default function AdminUsersPage() {
  const user = requireSuperAdmin();

  return (
    <AdminShell user={user} title="Users">
      <UsersManager current={user.username} />
    </AdminShell>
  );
}
