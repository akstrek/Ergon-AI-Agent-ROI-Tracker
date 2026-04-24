'use client'

import { motion } from 'motion/react';

export const IllustrationLogging = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full opacity-80">
    {[...Array(4)].map((_, i) => (
      <g key={i} transform={`translate(35, ${15 + i * 20})`}>
        <rect x="0" y="0" width="10" height="10" rx="2" fill="none" stroke="#7f8c8d" strokeWidth="1" opacity="0.5" />
        <motion.path
          d="M2,5 L4,8 L8,2"
          fill="none" stroke="#FF3131" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 1.5 }}
        />
        <line x1="20" y1="5" x2="35" y2="5" stroke="#7f8c8d" strokeWidth="1" strokeDasharray="1 2" opacity="0.3" />
        <motion.line
          x1="40" y1="5" x2="130" y2="5"
          stroke="#FF3131" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: i * 0.4 + 0.2, repeat: Infinity, repeatDelay: 1.5 }}
          className="drop-shadow-[0_0_4px_#FF3131]"
        />
      </g>
    ))}
  </svg>
);
