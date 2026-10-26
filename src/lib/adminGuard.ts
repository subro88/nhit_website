import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, SessionUser, readSessionToken } from './auth';

/*
 * Server-side guard for admin pages. Verifies the signed session cookie
 * and redirects to the login page when missing or invalid.
 */
export function requireAdmin(): SessionUser {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const user = readSessionToken(token);
  if (!user) redirect('/admin');
  return user;
}

export function requireSuperAdmin(): SessionUser {
  const user = requireAdmin();
  if (user.role !== 'superadmin') redirect('/admin/dashboard');
  return user;
}
