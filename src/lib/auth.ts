import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/*
 * NHIT CMS — authentication core.
 *
 * Users live in cms-users.json (auto-seeded on first run, git-ignored).
 * Passwords are stored as salted SHA-256 hashes — never plain text.
 * Sessions are stateless: HMAC-signed cookies valid for 7 days.
 */

export const SESSION_COOKIE = 'nhit_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
export const SESSION_TTL_SECONDS = Math.floor(SESSION_TTL_MS / 1000);

const ROOT = process.cwd();
const USERS_FILE = path.join(ROOT, 'cms-users.json');
const SECRET_FILE = path.join(ROOT, 'cms-secret.txt');

export type UserRole = 'superadmin' | 'department';

export interface SessionUser {
  username: string;
  name: string;
  role: UserRole;
  dept?: string;
}

interface StoredUser extends SessionUser {
  salt: string;
  hash: string;
}

function sha256(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function ensureSecret(): string {
  if (!fs.existsSync(SECRET_FILE)) {
    fs.writeFileSync(SECRET_FILE, crypto.randomBytes(32).toString('hex'), {
      mode: 0o600,
    });
  }
  return fs.readFileSync(SECRET_FILE, 'utf-8').trim();
}

function makeCreds(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  return { salt, hash: sha256(salt + password) };
}

function seedUsers(): void {
  if (fs.existsSync(USERS_FILE)) return;

  const deptUsers: Array<[string, string, string]> = [
    ['hod.cst', 'Computer Science & Technology (HOD)', 'computer-science-technology'],
    ['hod.me', 'Mechanical Engineering (HOD)', 'diploma-in-mechanical-engineering'],
    ['hod.ee', 'Electrical Engineering (HOD)', 'diploma-in-electrical-engineering'],
    ['hod.ce', 'Civil Engineering (HOD)', 'diploma-in-civil-engineering'],
    ['hod.etce', 'Electronics & Telecom (HOD)', 'diploma-in-electronics-telecommunications-engineering'],
    ['hod.ae', 'Automobile Engineering (HOD)', 'diploma-in-automobile-engineering'],
  ];

  const users: StoredUser[] = [
    {
      username: 'admin',
      name: 'Super Admin',
      role: 'superadmin',
      ...makeCreds('NHIT@Admin2026'),
    },
    ...deptUsers.map(([username, name, dept]) => ({
      username,
      name,
      role: 'department' as UserRole,
      dept,
      ...makeCreds('nhit@dept123'),
    })),
  ];

  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2), {
    mode: 0o600,
  });
}

export function getUsers(): StoredUser[] {
  seedUsers();
  try {
    const parsed = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    return Array.isArray(parsed.users) ? parsed.users : [];
  } catch {
    return [];
  }
}

export function verifyCredentials(
  username: string,
  password: string
): SessionUser | null {
  const user = getUsers().find((u) => u.username === username);
  if (!user) return null;
  if (!safeEqual(user.hash, sha256(user.salt + password))) return null;
  const session: SessionUser = {
    username: user.username,
    name: user.name,
    role: user.role,
  };
  if (user.dept) session.dept = user.dept;
  return session;
}

export function setPassword(username: string, newPassword: string): boolean {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) return false;
  const { salt, hash } = makeCreds(newPassword);
  user.salt = salt;
  user.hash = hash;
  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify({ users }, null, 2),
    { mode: 0o600 }
  );
  return true;
}

export function createSessionToken(user: SessionUser): string {
  const payload = {
    ...user,
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto
    .createHmac('sha256', ensureSecret())
    .update(body)
    .digest('base64url');
  return `${body}.${sig}`;
}

export function readSessionToken(token?: string | null): SessionUser | null {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto
    .createHmac('sha256', ensureSecret())
    .update(body)
    .digest('base64url');
  if (!safeEqual(sig, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }
    const session: SessionUser = {
      username: payload.username,
      name: payload.name,
      role: payload.role,
    };
    if (payload.dept) session.dept = payload.dept;
    return session;
  } catch {
    return null;
  }
}

/* ── Helpers shared by the admin API routes ─────────────────────────── */

export function getSessionFromRequest(
  req: Request
): SessionUser | null {
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  if (!match) return null;
  return readSessionToken(decodeURIComponent(match.slice(SESSION_COOKIE.length + 1)));
}

export function canEditDepartment(
  user: SessionUser,
  slug: string
): boolean {
  if (user.role === 'superadmin') return true;
  return user.role === 'department' && user.dept === slug;
}

export function unauthorized() {
  return Response.json({ error: 'Not signed in' }, { status: 401 });
}

export function forbidden() {
  return Response.json(
    { error: 'You do not have access to this action' },
    { status: 403 }
  );
}
