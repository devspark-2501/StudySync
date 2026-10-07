'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside 
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-50 flex flex-row md:flex-col items-center py-3 px-5 md:py-6 md:px-3 bg-white/80 backdrop-blur-xl border border-white/90 rounded-full shadow-2xl space-x-4 md:space-x-0 md:space-y-6"
    >
      <Link
        href="/dashboard"
        className={`p-2.5 sm:p-3 rounded-full transition-all ${
          pathname === '/dashboard'
            ? 'bg-[#1a1b26] text-white shadow-md scale-105'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }`}
        title="Dashboard"
      >
        <LayoutDashboard className="w-5 h-5" />
      </Link>

      <Link
        href="/dashboard"
        className={`p-2.5 sm:p-3 rounded-full transition-all ${
          pathname === '/tasks'
            ? 'bg-[#1a1b26] text-white shadow-md scale-105'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }`}
        title="Tasks"
      >
        <CheckSquare className="w-5 h-5" />
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="p-2.5 sm:p-3 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </motion.aside>
  );
}