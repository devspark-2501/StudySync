'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Check } from 'lucide-react';

export default function AnalogClockPicker({ isOpen, onClose, onSelectTime }) {
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');

  if (!isOpen) return null;

  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minutes = ['00', '15', '30', '45'];

  const handleConfirm = () => {
    const formattedHour = selectedHour < 10 ? `0${selectedHour}` : `${selectedHour}`;
    const timeString = `${formattedHour}:${selectedMinute} ${ampm}`;
    onSelectTime(timeString);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        className="w-full max-w-sm bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center"
      >
        <div className="flex items-center justify-between w-full pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-800">Select Time Slot</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Display */}
        <div className="my-4 text-center">
          <span className="text-3xl font-extrabold text-slate-800">
            {selectedHour < 10 ? `0${selectedHour}` : selectedHour}:{selectedMinute}
          </span>
          <span className="ml-2 text-sm font-bold text-sky-600">{ampm}</span>
        </div>

        {/* Analog Clock Circle Visual */}
        <div className="relative w-48 h-48 rounded-full border-4 border-slate-100 bg-slate-50/50 flex items-center justify-center my-2 shadow-inner">
          {/* Clock Dial Center */}
          <div className="w-3 h-3 rounded-full bg-slate-800 z-10" />

          {/* Hour Dial Numbers Positioned Radially */}
          {hours.map((hour, idx) => {
            const angle = (idx * 30 - 90) * (Math.PI / 180);
            const radius = 70; // Position radius
            const x = Math.round(radius * Math.cos(angle));
            const y = Math.round(radius * Math.sin(angle));

            const isSelected = selectedHour === hour;

            return (
              <button
                key={hour}
                type="button"
                onClick={() => setSelectedHour(hour)}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className={`absolute w-7 h-7 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#1a1b26] text-white shadow-md scale-110'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {hour}
              </button>
            );
          })}
        </div>

        {/* Minute and AM/PM Controls */}
        <div className="flex items-center justify-between w-full gap-2 mt-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMinute(m)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedMinute === m ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                :{m}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['AM', 'PM'].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setAmpm(period)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  ampm === period ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full mt-5 bg-[#1a1b26] hover:bg-black text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-md"
        >
          <Check className="w-4 h-4" />
          <span>Confirm Time</span>
        </button>
      </motion.div>
    </div>
  );
}