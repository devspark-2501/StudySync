'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import EvaluationModal from '@/components/EvaluationModal';
import { Plus, Check, X, Clock, Sparkles, AlertTriangle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [category, setCategory] = useState('Routine');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, timeSlot, category }),
      });
      if (res.ok) {
        setTitle('');
        setTimeSlot('');
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetStatus = async (taskId, newStatus) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, date: today, status: newStatus }),
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTaskStatus = (task) => {
    const log = task.logs?.find((l) => l.date === today);
    return log ? log.status : 'pending';
  };

  // Compute evaluation statistics
  const total = tasks.length;
  const completed = tasks.filter((t) => getTaskStatus(t) === 'completed').length;
  const failed = tasks.filter((t) => getTaskStatus(t) === 'failed').length;
  const pending = tasks.filter((t) => getTaskStatus(t) === 'pending').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-b from-[#bde0fe] via-[#e3f2fd] to-[#ffffff] overflow-x-hidden p-4 sm:p-6 pb-24 md:pb-6 md:pl-28">
      <Sidebar />

      <main className="max-w-5xl mx-auto space-y-6 relative z-10 pt-2 sm:pt-4">
        {/* Top Title & Actions */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-xl border border-white/80 p-5 rounded-3xl shadow-xl"
        >
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">Daily Timetable & Sheet</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" /> Date: {today}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#1a1b26] hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Evaluate Today&apos;s Stuff</span>
          </motion.button>
        </motion.div>

        {/* Add Task Entry Bar */}
        <motion.form
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleAddTask}
          className="bg-white/70 backdrop-blur-xl border border-white/80 p-4 rounded-3xl shadow-xl flex flex-wrap sm:flex-nowrap items-center gap-3"
        >
          <input
            type="text"
            placeholder="New Task (e.g., Wake up, Bath, Study Chemistry)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-1 bg-slate-100/70 border border-slate-200/60 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
          />
          <input
            type="text"
            placeholder="Time/Slot (e.g., 07:00 AM)"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full sm:w-36 bg-slate-100/70 border border-slate-200/60 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-medium flex items-center justify-center space-x-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Row</span>
          </button>
        </motion.form>

        {/* Excel-style Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-100/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Time / Slot</th>
                  <th className="py-3 px-4">Task Item</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No tasks listed yet. Add your daily routine tasks above!
                    </td>
                  </tr>
                ) : (
                  tasks.map((task, index) => {
                    const status = getTaskStatus(task);
                    return (
                      <tr key={task._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.timeSlot || 'Anytime'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{task.title}</td>
                        <td className="py-3 px-4 text-center">
                          {status === 'completed' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              <Check className="w-3 h-3" /> Done
                            </span>
                          )}
                          {status === 'failed' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                              <X className="w-3 h-3" /> Missed
                            </span>
                          )}
                          {status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleSetStatus(task._id, 'completed')}
                              className={`p-1.5 rounded-lg border transition-all ${
                                status === 'completed'
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                  : 'bg-white text-slate-400 border-slate-200 hover:text-emerald-600 hover:border-emerald-300'
                              }`}
                              title="Mark as Completed"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSetStatus(task._id, 'failed')}
                              className={`p-1.5 rounded-lg border transition-all ${
                                status === 'failed'
                                  ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                  : 'bg-white text-slate-400 border-slate-200 hover:text-rose-600 hover:border-rose-300'
                              }`}
                              title="Mark as Missed"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <EvaluationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stats={{ total, completed, failed, pending, percentage }}
        date={today}
      />
    </div>
  );
}