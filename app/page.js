import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between bg-gradient-to-b from-[#bde0fe] via-[#e3f2fd] to-[#ffffff] overflow-hidden px-6 py-10">
      {/* Background radial ring effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[600px] h-[600px] rounded-full border border-white/60 absolute" />
        <div className="w-[900px] h-[900px] rounded-full border border-white/40 absolute" />
      </div>

      {/* Navigation Bar */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="font-semibold text-slate-800 text-xl tracking-tight">
            StudySync
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-[#1a1b26] hover:bg-black text-white px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-2xl my-auto">
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-medium text-slate-700">
            Student Project Management Simplified
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Bring your team, tasks, and ideas together.
        </h1>

        <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
          StudySync provides everything your group needs to manage deadlines, share resources, and collaborate seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-[#1a1b26] hover:bg-black text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-all shadow-md"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto bg-white/80 hover:bg-white text-slate-800 px-6 py-3 rounded-xl font-medium text-sm border border-slate-200 transition-all shadow-sm flex items-center justify-center"
          >
            Log In
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} StudySync. All rights reserved.
      </footer>
    </div>
  );
}