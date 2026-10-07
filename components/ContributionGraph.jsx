'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContributionGraph({ activities = [] }) {
  const activityMap = new Map();
  activities.forEach((act) => activityMap.set(act.date, act.count));

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
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 150 }}
      className="w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-4 sm:p-6 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-800">
          Contribution Activity ({currentYear})
        </h3>
        <span className="text-xs text-slate-500">Last 365 Days</span>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[650px] p-1">
          {days.map((day, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.5, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              title={`${day.date}: ${day.count} contributions`}
              className={`w-3.5 h-3.5 rounded-sm cursor-pointer ${getColor(day.count)}`}
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
    </motion.div>
  );
}