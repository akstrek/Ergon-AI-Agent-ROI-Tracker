'use client'

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const TOOLS = [
  { id: 'vision', name: 'TASK LOGGING', desc: 'Telemetry capture.' },
  { id: 'forge', name: 'ROI SCORECARD', desc: 'Wealth synthesis.' },
  { id: 'nexus', name: 'A/B EXPERIMENT', desc: 'Node iteration.' },
  { id: 'team', name: 'TEAM AGGREGATION', desc: 'Cluster synergy.' },
];

const svgVariants = {
  initial: { opacity: 0.2, filter: 'grayscale(100%)' },
  hover: { opacity: 1, filter: 'grayscale(0%)', transition: { duration: 0.3 } }
};

const VisionSvg = () => {
  const tracks = [
    { delay: 0.1, slowDur: 3.2, fastDur: 1.1, opacity: 0.2 },
    { delay: 0.8, slowDur: 2.5, fastDur: 0.9, opacity: 0.5 },
    { delay: 0.4, slowDur: 4.0, fastDur: 1.3, opacity: 0.3 },
    { delay: 1.5, slowDur: 2.1, fastDur: 0.7, opacity: 0.7 },
    { delay: 0.6, slowDur: 3.5, fastDur: 1.2, opacity: 0.4 },
    { delay: 1.2, slowDur: 2.8, fastDur: 1.0, opacity: 0.6 },
  ];

  return (
    <div
      className="relative w-full h-[140px] flex flex-col justify-between py-3"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)'
      }}
    >
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[150px] bg-[#FF3131]/20 rounded-full blur-[45px] pointer-events-none"
        variants={{
          initial: { opacity: 0.4 },
          hover: { opacity: 0.7, transition: { duration: 0.4 } }
        }}
      />

      {tracks.map((track, i) => (
        <div key={i} className="relative h-[1px] w-full rounded-full">
          <div className="absolute inset-0 bg-[#FF3131]" style={{ opacity: track.opacity }} />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-[2px] w-[50px] bg-white rounded-full shadow-[0_0_12px_2px_#ffffff,0_0_20px_4px_#FF3131]"
            variants={{
              initial: {
                left: ['-20%', '120%'],
                transition: { duration: track.slowDur, repeat: Infinity, ease: 'linear', delay: track.delay }
              },
              hover: {
                left: ['-20%', '120%'],
                transition: { duration: track.fastDur, repeat: Infinity, ease: 'linear', delay: track.delay }
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

const ForgeSvg = () => (
  <motion.svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-[#14b8a6]" variants={svgVariants}>
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
    <motion.circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2"
      variants={{
        initial: { pathLength: 0.2, rotate: 0 },
        hover: { pathLength: 1, rotate: 360, stroke: ['#ffffff', '#14b8a6', '#ffffff'], transition: { duration: 2, repeat: Infinity, ease: 'linear' } }
      }}
    />
  </motion.svg>
);

const NexusSvg = () => (
  <motion.svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-[#14b8a6]" variants={svgVariants}>
    <path d="M 10 50 H 40 L 50 20 L 60 80 L 70 50 H 90" fill="none" stroke="currentColor" strokeWidth="1" />
    <motion.circle cx="50" cy="20" r="3" fill="white"
      variants={{
        initial: { opacity: 0.2 },
        hover: { opacity: [0.2, 1, 0.2], transition: { duration: 1, repeat: Infinity } }
      }}
    />
    <motion.circle cx="60" cy="80" r="3" fill="white"
      variants={{
        initial: { opacity: 0.2 },
        hover: { opacity: [0.2, 1, 0.2], transition: { duration: 1, delay: 0.5, repeat: Infinity } }
      }}
    />
  </motion.svg>
);

const TeamSvg = () => (
  <motion.svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-[#14b8a6]" variants={svgVariants}>
    <circle cx="50" cy="50" r="8" fill="white" />
    {[0, 120, 240].map((deg, i) => (
      <g key={i} transform={`rotate(${deg} 50 50)`}>
        <path d="M 50 42 V 15" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="15" r="4" fill="none" stroke="white" strokeWidth="1" />
        <motion.circle cx="50" cy="42" r="2" fill="#14b8a6"
          variants={{
            initial: { cy: 42, opacity: 0 },
            hover: { cy: [42, 15], opacity: [0, 1, 0], transition: { duration: 1, delay: i * 0.3, repeat: Infinity } }
          }}
        />
      </g>
    ))}
  </motion.svg>
);

const ToolTile = ({ tool, onClick }: { tool: any, onClick: () => void }) => {
  const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <motion.div
      whileHover="hover"
      className="w-full h-full flex-shrink-0 cursor-pointer group relative overflow-visible"
      onClick={onClick}
    >
      <motion.div
        variants={{
          initial: { y: 0, scale: 1 },
          hover: { y: -12, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }
        }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF3131]/80 via-white/10 to-transparent p-[1px] opacity-80 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_rgba(255,49,49,0.15)]">
          <div className="w-full h-full rounded-[calc(2rem-1px)] bg-[rgba(5,5,5,0.7)] backdrop-blur-3xl relative overflow-hidden flex flex-col p-8 z-10">
            <div className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none" style={{ backgroundImage: noiseUrl }} />

            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#7f8c8d]/50 pointer-events-none" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-[#7f8c8d]/50 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-[#7f8c8d]/50 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#7f8c8d]/50 pointer-events-none" />

            <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center opacity-70 group-hover:opacity-100 transition-colors duration-300 z-20">
              <ArrowUpRight className="w-4 h-4 text-[#7f8c8d] group-hover:text-[#FF3131] transition-colors" />
            </div>

            <div className="relative z-20 flex flex-col h-full w-full">
              <div className="flex flex-col gap-1.5 items-start mt-2">
                <span className="font-mono text-[9px] font-bold text-[#FF3131] uppercase tracking-[0.25em] animate-pulse">
                  {tool.id === 'vision' ? '> SYS_STREAM_ACTIVE // 99.8%' : '> SYS_NODE_STANDBY // 0.0%'}
                </span>
                <span className="font-brand font-bold text-white/90 uppercase tracking-[2px] text-[20px] shadow-black drop-shadow-md group-hover:text-[#FF3131] group-hover:drop-shadow-[0_0_15px_rgba(255,49,49,0.4)] transition-all duration-300">
                  {tool.name}
                </span>
              </div>

              <div className="flex-1 w-full relative flex items-center justify-center pt-8">
                {tool.id === 'vision' && <VisionSvg />}
                {tool.id === 'forge' && <ForgeSvg />}
                {tool.id === 'nexus' && <NexusSvg />}
                {tool.id === 'team' && <TeamSvg />}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function LandingLayout({ setActiveTool }: { activeTool: string | null; setActiveTool: (id: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex w-full h-[calc(100vh-100px)] mt-[100px] items-center pb-20 justify-between">
      <div className="pl-12 flex h-full items-center">
        <div className="flex flex-col gap-6 mr-12 z-20">
          {TOOLS.map((tool, idx) => (
            <div key={tool.id} className="flex flex-col items-center gap-4 cursor-pointer py-2 h-16 group" onClick={() => setCurrentIndex(idx)}>
              <div className={`w-1 transition-all duration-500 rounded-full ${idx === currentIndex ? 'h-full bg-white shadow-[0_0_15px_#fff]' : 'h-1/3 bg-[#7f8c8d]/30 group-hover:bg-[#7f8c8d]'}`} />
            </div>
          ))}
        </div>

        <div className="max-w-xl z-20">
          <motion.h1
            className="text-6xl lg:text-8xl xl:text-8xl font-brand font-bold text-[#7f8c8d] leading-[0.85] tracking-tighter cursor-default transition-all duration-700 hover:text-white hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] select-none pl-4"
          >
            <div className="overflow-hidden pb-4"><motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut" }}>Every Agent.</motion.div></div>
            <div className="overflow-hidden"><motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}>Measured.</motion.div></div>
          </motion.h1>
        </div>
      </div>

      <div className="w-[45vw] h-full flex flex-col justify-center relative pr-12 perspective-[1500px]">
        <div className="relative h-[65%] w-full max-w-[450px] mx-auto hidden-scrollbar flex items-center justify-center pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 200, scale: 0.85, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, x: -200, scale: 0.85, rotateY: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-[450px]"
            >
              <ToolTile tool={TOOLS[currentIndex]} onClick={() => setActiveTool(TOOLS[currentIndex].id)} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-6 mt-12 z-20 opacity-80 mix-blend-screen relative">
          <button
            onClick={() => setCurrentIndex(c => (c > 0 ? c - 1 : TOOLS.length - 1))}
            className="p-4 border border-[#7f8c8d]/30 rounded-full hover:bg-white hover:text-black transition-all text-[#7f8c8d]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex(c => (c < TOOLS.length - 1 ? c + 1 : 0))}
            className="p-4 border border-[#7f8c8d]/30 rounded-full hover:bg-white hover:text-black transition-all text-[#7f8c8d]"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
