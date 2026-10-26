import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) {
    return Response.json({ error: 'Not signed in' }, { status: 401 });
  }
  return Response.json({ user });
}
