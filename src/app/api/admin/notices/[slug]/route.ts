import {
  canManageNotice,
  readNotices,
  removeNotice,
  saveNoticeFiles,
} from '@/lib/noticesStore';
import {
  getSessionFromRequest,
  unauthorized,
  forbidden,
} from '@/lib/auth';

interface RouteParams {
  params: { slug: string };
}

/* ── PUT: edit an existing notice ───────────────────────────────────── */
export async function PUT(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  const notices = readNotices();
  const entry = notices.find((n) => n.slug === params.slug);
  if (!entry) {
    return Response.json({ error: 'Notice not found' }, { status: 404 });
  }
  if (!canManageNotice(user, entry)) return forbidden();

  let body: { title?: string; category?: string; date?: string; summary?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const title = (body.title || '').trim();
  const summary = (body.summary || '').trim();
  if (!title || !summary) {
    return Response.json(
      { error: 'Title and notice text are required' },
      { status: 400 }
    );
  }

  entry.title = title;
  entry.summary = summary;
  entry.category = body.category || entry.category;
  if (body.date?.trim()) entry.date = body.date.trim();

  saveNoticeFiles(entry);
  return Response.json({ ok: true, notice: entry });
}

/* ── DELETE: remove a notice ────────────────────────────────────────── */
export async function DELETE(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  const notices = readNotices();
  const entry = notices.find((n) => n.slug === params.slug);
  if (!entry) {
    return Response.json({ error: 'Notice not found' }, { status: 404 });
  }
  if (!canManageNotice(user, entry)) return forbidden();

  removeNotice(params.slug);
  return Response.json({ ok: true });
}
