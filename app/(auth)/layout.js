import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-b from-[#bde0fe] via-[#e3f2fd] to-[#ffffff] overflow-hidden p-4">
      {/* Background radial ring effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[600px] h-[600px] rounded-full border border-white/60 absolute" />
        <div className="w-[900px] h-[900px] rounded-full border border-white/40 absolute" />
      </div>

      {/* Brand logo at top left */}
      <div className="absolute top-6 left-8 flex items-center space-x-2">
        <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center text-white font-bold text-xs">S</div>
        <span className="font-semibold text-slate-800 text-lg tracking-tight">StudySync</span>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
}