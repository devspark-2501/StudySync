'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between bg-gradient-to-b from-[#bde0fe] via-[#e3f2fd] to-[#ffffff] overflow-hidden px-4 sm:px-8 py-8 sm:py-10">
      {/* Background Radial Ring Effects */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full border border-white/60 absolute" />
        <div className="w-[550px] sm:w-[900px] h-[550px] sm:h-[900px] rounded-full border border-white/40 absolute" />
      </motion.div>

      {/* Navigation Bar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl flex items-center justify-between"
      >
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-sm shadow-md">
            S
          </div>
          <span className="font-semibold text-slate-800 text-lg sm:text-xl tracking-tight">
            StudySync
          </span>
        </Link>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-xs sm:text-sm font-medium bg-[#1a1b26] hover:bg-black text-white px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl transition-all shadow-sm active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </motion.header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-2xl my-auto py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-medium text-slate-700">
            Student Project Management Simplified
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight mb-4"
        >
          Bring your team, tasks, and ideas together.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-600 text-sm sm:text-lg mb-8 leading-relaxed max-w-lg px-2"
        >
          StudySync provides everything your group needs to manage deadlines, share resources, and collaborate seamlessly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 180 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-[#1a1b26] hover:bg-black text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto bg-white/80 hover:bg-white text-slate-800 px-6 py-3 rounded-xl font-medium text-sm border border-slate-200/80 transition-all shadow-sm flex items-center justify-center active:scale-95"
          >
            Log In
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} StudySync. All rights reserved.
      </footer>
    </div>
  );
}