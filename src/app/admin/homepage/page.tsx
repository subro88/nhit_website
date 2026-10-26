import { requireSuperAdmin } from '@/lib/adminGuard';
import AdminShell from '@/components/admin/AdminShell';
import HomeEditor from '@/components/admin/HomeEditor';

export default function AdminHomePage() {
  const user = requireSuperAdmin();

  return (
    <AdminShell user={user} title="Home Page Editor">
      <HomeEditor />
    </AdminShell>
  );
}
