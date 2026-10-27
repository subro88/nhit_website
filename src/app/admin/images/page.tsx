import { requireSuperAdmin } from '@/lib/adminGuard';
import AdminShell from '@/components/admin/AdminShell';
import ImageLibraryManager from '@/components/admin/ImageLibraryManager';

export default function AdminImagesPage() {
  const user = requireSuperAdmin();

  return (
    <AdminShell user={user} title="Photo Library">
      <ImageLibraryManager />
    </AdminShell>
  );
}
