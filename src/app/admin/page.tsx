import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, readSessionToken } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  // Already signed in? Go straight to the dashboard.
  const token = cookies().get(SESSION_COOKIE)?.value;
  const user = readSessionToken(token);
  if (user) redirect('/admin/dashboard');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
      {/* Ambient brand glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#9E0B0F]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-red-900/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#9E0B0F] text-white text-2xl font-black tracking-tight shadow-2xl mb-4">
            NHIT
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin Control Panel
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            The New Horizons Institute of Technology, Durgapur
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-slate-500 mt-8">
          Department users sign in with the account issued by the institute
          office.
        </p>
      </div>
    </div>
  );
}
