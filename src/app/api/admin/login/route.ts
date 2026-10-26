import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  verifyCredentials,
} from '@/lib/auth';

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const username = (body.username || '').trim();
  const password = body.password || '';
  if (!username || !password) {
    return Response.json(
      { error: 'Please enter both username and password' },
      { status: 400 }
    );
  }

  const user = verifyCredentials(username, password);
  if (!user) {
    return Response.json(
      { error: 'Wrong username or password' },
      { status: 401 }
    );
  }

  const token = createSessionToken(user);
  return new Response(JSON.stringify({ ok: true, user }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `${SESSION_COOKIE}=${encodeURIComponent(
        token
      )}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`,
    },
  });
}
