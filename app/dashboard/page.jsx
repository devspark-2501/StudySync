'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ContributionGraph from '@/components/ContributionGraph';
import { User, Edit2, Check, Plus, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
        setBio(data.user.bio || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveBio = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio }),
      });
      if (res.ok) {
        setIsEditing(false);
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogActivity = async () => {
    try {
      const res = await fetch('/api/user/profile', { method: 'POST' });
      if (res.ok) {
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bde0fe] via-[#e3f2fd] to-[#ffffff]">
        <p className="text-slate-600 text-sm font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-b from-[#bde0fe] via-[#e3f2fd] to-[#ffffff] overflow-x-hidden p-6 pl-24 sm:pl-28">
      {/* Background Radial Effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-[800px] h-[800px] rounded-full border border-white/60 absolute" />
      </div>

      <Sidebar />

      <main className="max-w-5xl mx-auto space-y-8 relative z-10 pt-4">
        {/* Top Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left Top: Profile Picture & Basic Info */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-white shadow-md flex items-center justify-center mb-4 text-slate-500 overflow-hidden">
              {userData?.avatarUrl ? (
                <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-slate-400" />
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{userData?.name || 'Student User'}</h2>
            <p className="text-xs text-slate-500 mb-4">{userData?.email}</p>

            <button
              onClick={handleLogActivity}
              className="w-full bg-[#1a1b26] hover:bg-black text-white py-2.5 rounded-xl text-xs font-medium flex items-center justify-center space-x-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Log Task / Activity</span>
            </button>
          </div>

          {/* Right Side: Editable About / Bio Section */}
          <div className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl relative min-h-[220px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <h3 className="text-base font-bold text-slate-800">About Me</h3>
                </div>
                {isEditing ? (
                  <button
                    onClick={handleSaveBio}
                    className="p-1.5 bg-sky-600 text-white rounded-lg text-xs font-medium hover:bg-sky-700 transition-all flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-all flex items-center space-x-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full h-32 p-3 bg-slate-100/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/50 resize-none"
                  placeholder="Tell us about your learning goals and projects..."
                />
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {userData?.bio || 'No bio available yet. Click edit to add one!'}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div>
                Total Logged Tasks:{' '}
                <span className="font-bold text-slate-800">
                  {userData?.activities?.reduce((acc, curr) => acc + curr.count, 0) || 0}
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Section: Contribution Graph */}
        <ContributionGraph activities={userData?.activities || []} />
      </main>
    </div>
  );
}