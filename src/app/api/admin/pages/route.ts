import { getSessionFromRequest, forbidden, unauthorized } from '@/lib/auth';
import { PAGES_FILE, readJson, writeJson } from '@/lib/cmsStore';

/*
 * NHIT CMS — simple pages API (super admin only).
 * GET  → full pages.json content
 * PUT  → save full pages.json content
 */
export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  const data = readJson<Record<string, unknown>>(PAGES_FILE, {});
  return Response.json({ pages: data });
}

export async function PUT(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  let body: { pages?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const data = body.pages;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return Response.json({ error: 'pages must be a JSON object' }, { status: 400 });
  }

  writeJson(PAGES_FILE, data);
  return Response.json({ ok: true });
}
