'use client'

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { E_PATH } from '@/lib/constants';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 200);
          setTimeout(onComplete, 3000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 2) + 1;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isDone ? {
        scale: 20,
        opacity: [1, 1, 0],
        transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
      } : {}}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 filter blur-xl opacity-40">
          <motion.path
            d={E_PATH}
            fill="none"
            stroke="white"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>

        <svg viewBox="0 0 100 100" className="w-full h-full relative">
          <motion.path
            d={E_PATH}
            fill="none"
            stroke="#7f8c8d"
            strokeWidth="0.5"
            className="opacity-20"
          />
          <motion.path
            d={E_PATH}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
          />
        </svg>
      </div>

      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.4, 1] }}
        transition={{ duration: 0.1, repeat: Infinity }}
        className="absolute bottom-10 right-10 flex flex-col items-end gap-1"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Calibration Protocol</span>
        <span className="font-mono text-[18px] text-white tracking-widest">{percent.toString().padStart(3, '0')}%</span>
      </motion.div>
    </motion.div>
  );
};
