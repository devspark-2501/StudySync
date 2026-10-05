'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-100">
        <UserPlus className="w-5 h-5 text-slate-700" />
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-1">Create an account</h1>
      <p className="text-xs text-slate-500 mb-6 max-w-xs">
        Join StudySync to start managing your student projects with ease.
      </p>

      {error && <div className="w-full bg-red-50 text-red-500 text-xs p-2.5 rounded-xl mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <div className="relative">
          <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-slate-100/70 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
          />
        </div>

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

        <button
          type="submit"
          className="w-full bg-[#1a1b26] hover:bg-black text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-md mt-2"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-xs text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="text-slate-800 font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}