import { requireSuperAdmin } from '@/lib/adminGuard';
import AdminShell from '@/components/admin/AdminShell';
import MessagesEditor from '@/components/admin/MessagesEditor';

export default function AdminMessagesPage() {
  const user = requireSuperAdmin();

  return (
    <AdminShell user={user} title="Message Pages">
      <MessagesEditor />
    </AdminShell>
  );
}
