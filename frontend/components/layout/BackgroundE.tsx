'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { E_PATH } from '@/lib/constants';

export const BackgroundE = ({ isSubpage }: { isSubpage: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const rotateX = useTransform(springY, [-1, 1], [30, -30]);
  const rotateY = useTransform(springX, [-1, 1], [-30, 30]);

  const shiftX = useTransform(springX, [-1, 1], [-40, 40]);
  const shiftY = useTransform(springY, [-1, 1], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove as any);
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, [mouseX, mouseY]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center perspective-[2500px] transition-all duration-1500 ${isSubpage ? 'opacity-30 scale-125 blur-xl' : 'opacity-100 scale-[0.85] md:scale-100'}`}
    >
      <motion.div
        style={{ rotateX, rotateY, x: shiftX, y: shiftY }}
        className="relative w-[90vw] h-[90vw] md:w-[85vw] md:h-[85vw] max-w-[1400px] max-h-[1400px]"
      >
        <motion.div
          animate={{ opacity: 0.05, scale: 1.3 }}
          className="absolute inset-0 blur-[100px] bg-white rounded-full transition-all duration-1000"
        />

        <motion.div
          animate={{
            rotateY: [0, 8, -8, 0],
            rotateX: [0, -5, 5, 0],
            scale: 1.05,
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <filter id="neon-bloom">
                <feGaussianBlur stdDeviation="0.1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {[...Array(12)].map((_, i) => (
              <motion.path
                key={i}
                d={E_PATH}
                fill="none"
                stroke="white"
                strokeWidth={0.5 + i * 0.15}
                strokeDasharray="15 35"
                initial={{ strokeDashoffset: 0 }}
                animate={{
                  strokeDashoffset: [0, -100],
                  opacity: [0, 0.2 - i * 0.02, 0],
                  scale: [1, 1 + i * 0.03, 1],
                }}
                transition={{
                  duration: 4 + i * 0.6,
                  repeat: Infinity,
                  ease: "linear"
                }}
                filter="url(#neon-bloom)"
              />
            ))}

            <motion.path
              d={E_PATH}
              fill="none"
              stroke="#ffffff"
              strokeWidth={1.5}
              opacity={0.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_2.2px_rgba(255,255,255,0.22)]"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
