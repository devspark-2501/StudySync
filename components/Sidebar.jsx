'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center py-6 px-3 bg-white/70 backdrop-blur-xl border border-white/80 rounded-full shadow-xl space-y-6">
      {/* Dashboard Icon */}
      <Link
        href="/dashboard"
        className={`p-3 rounded-full transition-all ${
          pathname === '/dashboard'
            ? 'bg-[#1a1b26] text-white shadow-md'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }`}
        title="Dashboard"
      >
        <LayoutDashboard className="w-5 h-5" />
      </Link>

      {/* Task Icon */}
      <Link
        href="/dashboard"
        className={`p-3 rounded-full transition-all ${
          pathname === '/tasks'
            ? 'bg-[#1a1b26] text-white shadow-md'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }`}
        title="Tasks"
      >
        <CheckSquare className="w-5 h-5" />
      </Link>

      {/* Sign Out / Auth Icon */}
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="p-3 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </aside>
  );
}