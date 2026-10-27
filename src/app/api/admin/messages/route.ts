import { getSessionFromRequest, forbidden, unauthorized } from '@/lib/auth';
import { MESSAGES_FILE, readJson, writeJson } from '@/lib/cmsStore';

/*
 * NHIT CMS — leader message pages API (super admin only).
 * GET  → full messages.json content
 * PUT  → save full messages.json content
 */
export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  const data = readJson<Record<string, unknown>>(MESSAGES_FILE, {});
  return Response.json({ messages: data });
}

export async function PUT(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const data = body.messages;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return Response.json({ error: 'messages must be a JSON object' }, { status: 400 });
  }

  writeJson(MESSAGES_FILE, data);
  return Response.json({ ok: true });
}
