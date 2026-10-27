import { getSessionFromRequest, forbidden, unauthorized } from '@/lib/auth';
import { HOMEPAGE_FILE, readJson, writeJson } from '@/lib/cmsStore';

/*
 * NHIT CMS — home page content API (super admin only).
 * GET  → full homepage.json content
 * PUT  → save full homepage.json content (any JSON object)
 */
export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  const data = readJson<Record<string, unknown>>(HOMEPAGE_FILE, {});
  return Response.json({ homepage: data });
}

export async function PUT(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  let body: { homepage?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const data = body.homepage;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return Response.json({ error: 'homepage must be a JSON object' }, { status: 400 });
  }

  writeJson(HOMEPAGE_FILE, data);
  return Response.json({ ok: true });
}
