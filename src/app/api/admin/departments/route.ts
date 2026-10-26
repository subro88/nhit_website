import { getSessionFromRequest, unauthorized } from '@/lib/auth';
import { DEPARTMENTS_FILE, readJson } from '@/lib/cmsStore';

interface DeptBrief {
  slug: string;
  title: string;
  code: string;
  order: number;
}

export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  const all = readJson<Record<string, DeptBrief>>(DEPARTMENTS_FILE, {});
  const list = Object.values(all)
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      code: d.code,
      order: d.order,
    }))
    .sort((a, b) => (a.order || 99) - (b.order || 99));

  // Department users only see their own department in the list.
  const visible =
    user.role === 'superadmin' ? list : list.filter((d) => d.slug === user.dept);

  return Response.json({ departments: visible });
}
