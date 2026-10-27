import {
  forbidden,
  getSessionFromRequest,
  unauthorized,
} from '@/lib/auth';
import {
  deleteFaculty,
  listFaculty,
  updateFaculty,
} from '@/lib/facultyStore';

/*
 * PUT    /api/admin/faculty/[id] — update a staff entry
 * DELETE /api/admin/faculty/[id] — remove a staff entry
 *   Dept users may only touch entries that belong to their own department.
 */
interface RouteParams {
  params: { id: string };
}

export async function PUT(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return Response.json({ error: 'Invalid staff id' }, { status: 400 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const existing = listFaculty().find((r) => Number(r.id) === id);
  if (!existing) {
    return Response.json({ error: 'Staff member not found' }, { status: 404 });
  }
  if (user.role === 'department' && existing.department !== user.dept) {
    return forbidden();
  }

  const member = updateFaculty(id, {
    name: body.name,
    designation: body.designation,
    qualification: body.qualification,
    experience: body.experience,
    order: body.order !== undefined ? Number(body.order) : undefined,
    avatar: body.avatar,
  });
  return Response.json({ ok: true, member });
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const user = getSessionFromRequest(req);
  if (!user) return unauthorized();

  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return Response.json({ error: 'Invalid staff id' }, { status: 400 });
  }

  const existing = listFaculty().find((r) => Number(r.id) === id);
  if (!existing) {
    return Response.json({ error: 'Staff member not found' }, { status: 404 });
  }
  if (user.role === 'department' && existing.department !== user.dept) {
    return forbidden();
  }

  const removed = deleteFaculty(id);
  return Response.json({ ok: true, removed });
}
