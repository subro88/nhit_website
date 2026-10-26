import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHIT Admin Panel',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-root bg-slate-100 min-h-screen">{children}</div>;
}
