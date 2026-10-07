'use client';

import React from 'react';

export default function ContributionGraph({ activities = [] }) {
  const activityMap = new Map();
  activities.forEach((act) => activityMap.set(act.date, act.count));

  // Generate last 365 days dates
  const days = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      count: activityMap.get(dateStr) || 0,
    });
  }

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-200/60';
    if (count === 1) return 'bg-sky-200';
    if (count === 2) return 'bg-sky-400';
    if (count >= 3) return 'bg-sky-600';
    return 'bg-slate-200/60';
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">
          Contribution Activity ({currentYear})
        </h3>
        <span className="text-xs text-slate-500">Last 365 Days</span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[700px]">
          {days.map((day, idx) => (
            <div
              key={idx}
              title={`${day.date}: ${day.count} contributions`}
              className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 ${getColor(
                day.count
              )}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 mt-3 text-xs text-slate-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-slate-200/60" />
        <div className="w-3 h-3 rounded-sm bg-sky-200" />
        <div className="w-3 h-3 rounded-sm bg-sky-400" />
        <div className="w-3 h-3 rounded-sm bg-sky-600" />
        <span>More</span>
      </div>
    </div>
  );
}