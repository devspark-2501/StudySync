'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-100">
        <LogIn className="w-5 h-5 text-slate-700" />
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-1">Sign in with email</h1>
      <p className="text-xs text-slate-500 mb-6 max-w-xs">
        Organize your project tasks, resources, and teammates together. For free.
      </p>

      {error && <div className="w-full bg-red-50 text-red-500 text-xs p-2.5 rounded-xl mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <div className="relative">
          <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-slate-100/70 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-100/70 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
          />
        </div>

        <div className="text-right">
          <a href="#" className="text-xs text-slate-500 hover:text-slate-800">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1a1b26] hover:bg-black text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-md"
        >
          Get Started
        </button>
      </form>

      <p className="mt-6 text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-slate-800 font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}