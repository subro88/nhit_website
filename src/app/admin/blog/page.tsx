import AdminShell from '@/components/admin/AdminShell';
import BlogManager from '@/components/admin/BlogManager';
import { requireSuperAdmin } from '@/lib/adminGuard';

export default function AdminBlogPage() {
  const user = requireSuperAdmin();

  return (
    <AdminShell user={user} title="Blog Posts">
      <BlogManager />
    </AdminShell>
  );
}
