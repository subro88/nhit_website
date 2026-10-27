import { getSessionFromRequest, unauthorized } from '@/lib/auth';
import {
  VALID_CATEGORIES,
  createNotice,
  readNotices,
} from '@/lib/noticesStore';

/* ── GET: list all notices (any signed-in user) ─────────────────────── */
export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  return Response.json({ notices: readNotices() });
}

/* ── POST: publish a new notice ─────────────────────────────────────── */
export async function POST(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  let body: {
    title?: string;
    category?: string;
    date?: string;
    summary?: string;
    department?: string;
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const title = (body.title || '').trim();
  const summary = (body.summary || '').trim();
  const category = VALID_CATEGORIES.includes(body.category || '')
    ? (body.category as string)
    : 'general';

  if (!title || !summary) {
    return Response.json(
      { error: 'Title and notice text are required' },
      { status: 400 }
    );
  }

  // Department users can only publish under their own department.
  let department: string | undefined;
  if (user.role === 'department') {
    department = user.dept;
  } else if (body.department && body.department !== 'central') {
    department = body.department;
  }

  const entry = createNotice({ title, category, summary, date: body.date, department });
  return Response.json({ ok: true, notice: entry }, { status: 201 });
}
