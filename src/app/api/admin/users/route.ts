import {
  forbidden,
  getSessionFromRequest,
  setPassword,
  unauthorized,
  getUsers,
} from '@/lib/auth';

/* ── GET: list users (super admin only) ─────────────────────────────── */
export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (user.role !== 'superadmin') return forbidden();

  const users = getUsers().map((u) => ({
    username: u.username,
    name: u.name,
    role: u.role,
    dept: u.dept,
  }));
  return Response.json({ users });
}

/* ── PUT: change a password ───────────────────────────────────────────
 * Super admin can reset anyone. Other users can change only their own.
 * Body: { username: string, password: string }
 * ──────────────────────────────────────────────────────────────────── */
export async function PUT(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const target = (body.username || '').trim();
  const password = body.password || '';

  if (!target || !password) {
    return Response.json(
      { error: 'Username and new password are required' },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return Response.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  const isSelf = target === user.username;
  if (user.role !== 'superadmin' && !isSelf) return forbidden();

  const ok = setPassword(target, password);
  if (!ok) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json({ ok: true });
}
