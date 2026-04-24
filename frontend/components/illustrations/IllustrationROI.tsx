'use client'

import { motion } from 'motion/react';

export const IllustrationROI = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full opacity-90 overflow-visible">
    <circle cx="100" cy="50" r="35" fill="none" stroke="#7f8c8d" strokeWidth="1" opacity="0.3" />
    <motion.circle
      cx="100" cy="50" r="35"
      fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"
      transform="rotate(-90 100 50)"
      strokeDasharray="220"
      initial={{ strokeDashoffset: 220 }}
      animate={{ strokeDashoffset: [220, 0, 220] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      className="drop-shadow-[0_0_12px_#FF3131]"
    />
    <motion.text
      x="100" y="54"
      textAnchor="middle" fill="#FF3131" fontSize="12" fontFamily="monospace" fontWeight="bold"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      className="drop-shadow-[0_0_8px_#FF3131]"
    >
      99%
    </motion.text>
  </svg>
);
