import {
  getSessionFromRequest,
  unauthorized,
} from '@/lib/auth';
import {
  createFaculty,
  facultyForDepartment,
  listFaculty,
} from '@/lib/facultyStore';

/*
 * GET  /api/admin/faculty?dept=<slug>  — list faculty (dept users: own dept only)
 * POST /api/admin/faculty              — create a staff entry
 *   Dept users can only create inside their own department.
 */
export async function GET(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  const url = new URL(req.url);
  const requested = url.searchParams.get('dept') || '';

  if (user.role === 'department') {
    return Response.json({ faculty: facultyForDepartment(user.dept || '') });
  }

  if (requested) {
    return Response.json({ faculty: facultyForDepartment(requested) });
  }
  return Response.json({ faculty: listFaculty() });
}

export async function POST(req: Request) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const department = user.role === 'department' ? user.dept || '' : String(body.department || '');
  if (!department) {
    return Response.json({ error: 'A department must be selected' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  if (!name) {
    return Response.json({ error: 'Staff name is required' }, { status: 400 });
  }

  const member = createFaculty({
    name,
    department,
    designation: body.designation,
    qualification: body.qualification,
    experience: body.experience,
    order: body.order,
    avatar: body.avatar,
  });
  return Response.json({ ok: true, member });
}
