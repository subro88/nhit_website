import {
  canEditDepartment,
  forbidden,
  getSessionFromRequest,
  unauthorized,
} from '@/lib/auth';
import {
  DEPARTMENTS_FILE,
  readJson,
  writeJson,
} from '@/lib/cmsStore';

interface RouteParams {
  params: { slug: string };
}

export async function GET(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (!canEditDepartment(user, params.slug)) return forbidden();

  const all = readJson<Record<string, unknown>>(DEPARTMENTS_FILE, {});
  const dept = all[params.slug];
  if (!dept) {
    return Response.json({ error: 'Department not found' }, { status: 404 });
  }
  return Response.json({ department: dept });
}

export async function PUT(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();
  if (!canEditDepartment(user, params.slug)) return forbidden();

  let body: { department?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const dept = body.department;
  if (!dept || typeof dept !== 'object' || Array.isArray(dept)) {
    return Response.json(
      { error: 'department must be a JSON object' },
      { status: 400 }
    );
  }

  const record = dept as Record<string, unknown>;
  if (record.slug !== params.slug) {
    return Response.json(
      { error: 'The slug inside the data must stay unchanged' },
      { status: 400 }
    );
  }

  const all = readJson<Record<string, unknown>>(DEPARTMENTS_FILE, {});
  if (!all[params.slug]) {
    return Response.json({ error: 'Department not found' }, { status: 404 });
  }

  all[params.slug] = dept;
  try {
    writeJson(DEPARTMENTS_FILE, all);
  } catch {
    return Response.json({ error: 'Could not save the file' }, { status: 500 });
  }

  return Response.json({ ok: true, savedAt: new Date().toISOString() });
}
