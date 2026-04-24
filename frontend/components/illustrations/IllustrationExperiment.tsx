'use client'

import { motion } from 'motion/react';

export const IllustrationExperiment = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full opacity-80">
    <rect x="30" y="15" width="60" height="70" rx="4" fill="none" stroke="#7f8c8d" strokeWidth="1" opacity="0.3"/>
    <rect x="110" y="15" width="60" height="70" rx="4" fill="none" stroke="#7f8c8d" strokeWidth="1" opacity="0.3"/>

    {[...Array(3)].map((_, i) => (
      <line key={`a-${i}`} x1="40" y1={30 + i * 15} x2="80" y2={30 + i * 15} stroke="#7f8c8d" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
    ))}
    {[...Array(3)].map((_, i) => (
      <motion.line key={`b-${i}`} x1="120" y1={30 + i * 15} x2="160" y2={30 + i * 15} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"
        animate={{ opacity: [0.1, 1, 0.1] }}
        transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
        className="drop-shadow-[0_0_6px_#FF3131]"
      />
    ))}

    <motion.rect x="110" y="15" width="60" height="70" rx="4" fill="#FF3131" opacity="0"
      animate={{ opacity: [0, 0, 0.15, 0] }}
      transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 0.8, 1] }}
    />

    <motion.line
      x1="20" x2="180" stroke="#FF3131" strokeWidth="1.5"
      animate={{ y1: [10, 90, 10], y2: [10, 90, 10] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      className="drop-shadow-[0_0_8px_#FF3131]"
    />
  </svg>
);
