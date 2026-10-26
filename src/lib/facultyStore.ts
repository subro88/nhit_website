import {
  FACULTY_FILE,
  readJson,
  writeJson,
} from './cmsStore';

/*
 * NHIT CMS — faculty roster store.
 *
 * content/faculty/faculty-roster.json holds every staff entry across all
 * departments. Department users may only touch rows whose `department`
 * matches their own; super admins can edit everything.
 */

export interface FacultyMember {
  id: number;
  name: string;
  slug: string;
  designation: string;
  qualification: string;
  experience: string;
  department: string;
  order: number;
  avatar: string;
}

export function listFaculty(): FacultyMember[] {
  return readJson<FacultyMember[]>(FACULTY_FILE, []);
}

export function facultyForDepartment(dept: string): FacultyMember[] {
  return listFaculty()
    .filter((f) => f.department === dept)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

function nextId(rows: FacultyMember[]): number {
  const max = rows.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0);
  return max + 1;
}

export function createFaculty(
  input: Partial<FacultyMember> & { name: string; department: string }
): FacultyMember {
  const rows = listFaculty();
  const member: FacultyMember = {
    id: nextId(rows),
    name: String(input.name).trim(),
    slug: slugifyName(String(input.name)) || `staff-${Date.now()}`,
    designation: String(input.designation ?? 'Lecturer'),
    qualification: String(input.qualification ?? ''),
    experience: String(input.experience ?? ''),
    department: input.department,
    order: Number.isFinite(Number(input.order)) ? Number(input.order) : rows.length + 1,
    avatar: String(input.avatar ?? ''),
  };
  rows.push(member);
  writeJson(FACULTY_FILE, rows);
  return member;
}

export function updateFaculty(
  id: number,
  patch: Partial<FacultyMember>
): FacultyMember | null {
  const rows = listFaculty();
  const idx = rows.findIndex((r) => Number(r.id) === id);
  if (idx === -1) return null;

  const current = rows[idx];
  const merged: FacultyMember = {
    ...current,
    ...patch,
    id: current.id, // never allow id change
    department: current.department, // department tag stays fixed
  };
  if (patch.name && patch.name !== current.name) {
    merged.slug = slugifyName(patch.name) || current.slug;
  }
  merged.name = String(merged.name ?? '').trim() || current.name;
  rows[idx] = merged;
  writeJson(FACULTY_FILE, rows);
  return merged;
}

export function deleteFaculty(id: number): FacultyMember | null {
  const rows = listFaculty();
  const idx = rows.findIndex((r) => Number(r.id) === id);
  if (idx === -1) return null;
  const [removed] = rows.splice(idx, 1);
  writeJson(FACULTY_FILE, rows);
  return removed;
}
