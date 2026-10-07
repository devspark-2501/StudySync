'use client';

import { motion } from 'framer-motion';
import { X, Award, AlertCircle, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';

export default function EvaluationModal({ isOpen, onClose, stats, date }) {
  if (!isOpen) return null;

  const { total, completed, failed, pending, percentage } = stats;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 shadow-2xl overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-sky-100 rounded-xl text-sky-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Daily Performance Evaluation</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Stats Overview */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-4 flex flex-col justify-between shadow-md">
            <span className="text-xs font-medium opacity-80">Completion Rate</span>
            <div className="text-3xl font-extrabold my-1">{percentage}%</div>
            <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">Tasks Handled</span>
            <div className="text-2xl font-bold text-slate-800 mt-1">
              {completed} / {total}
            </div>
            <p className="text-[11px] text-slate-400">
              {pending} pending • {failed} missed
            </p>
          </div>
        </div>

        {/* Progress Breakdown Graph */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" /> Distribution Breakdown
            </span>
          </div>

          <div className="h-4 w-full bg-slate-200 rounded-full flex overflow-hidden shadow-inner">
            <div
              style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title="Completed"
            />
            <div
              style={{ width: `${total ? (failed / total) * 100 : 0}%` }}
              className="bg-rose-500 transition-all duration-500"
              title="Failed"
            />
            <div
              style={{ width: `${total ? (pending / total) * 100 : 0}%` }}
              className="bg-amber-400 transition-all duration-500"
              title="Pending"
            />
          </div>

          <div className="flex items-center justify-around text-[11px] text-slate-600 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Completed ({completed})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Missed ({failed})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Pending ({pending})</span>
            </div>
          </div>
        </div>

        {/* AI Insight Summary */}
        <div className="p-3.5 bg-sky-50/80 border border-sky-100 rounded-2xl text-xs text-sky-900 leading-relaxed">
          <span className="font-bold flex items-center gap-1 mb-1 text-sky-800">
            {percentage >= 80 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />)}
            Feedback Summary:
          </span>
          {percentage >= 80
            ? 'Outstanding discipline! You stuck tightly to your timetable today and cleared almost all planned activities.'
            : percentage >= 50
            ? 'Good progress! You completed over half your targets. Focus on knocking out remaining high-priority routines.'
            : 'Low consistency today. Try reducing task overlap or re-organizing your schedule to build momentum.'}
        </div>
      </motion.div>
    </div>
  );
}