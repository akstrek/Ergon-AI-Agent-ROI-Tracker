'use client'

import { motion } from 'motion/react';

export const IllustrationTeam = () => {
  const nodes = [{x: 40, y: 25}, {x: 160, y: 25}, {x: 40, y: 75}, {x: 160, y: 75}];
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full opacity-80 overflow-visible">
      <circle cx="100" cy="50" r="40" fill="none" stroke="#7f8c8d" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />

      {nodes.map((node, i) => (
        <g key={i}>
          <line x1={node.x} y1={node.y} x2="100" y2="50" stroke="#7f8c8d" strokeWidth="1" opacity="0.3" />
          <circle cx={node.x} cy={node.y} r="4" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
          <circle cx={node.x} cy={node.y} r="2" fill="#FF3131" className="drop-shadow-[0_0_4px_#FF3131]" />
          <motion.circle r="2.5" fill="#FFFFFF"
            animate={{ cx: [node.x, 100], cy: [node.y, 50], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, ease: "easeIn" }}
            className="drop-shadow-[0_0_6px_#FFFFFF]"
          />
        </g>
      ))}

      <motion.circle cx="100" cy="50" r="8" fill="#FF3131"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="drop-shadow-[0_0_12px_#FF3131]"
      />
      <circle cx="100" cy="50" r="3" fill="#FFFFFF" />
    </svg>
  );
};
