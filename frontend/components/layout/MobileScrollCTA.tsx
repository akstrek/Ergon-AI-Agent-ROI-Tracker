'use client'

import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const MobileScrollCTA = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      setAtBottom(bottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="md:hidden fixed bottom-24 right-6 z-[9990]">
      <button
        onClick={() => {
          if (atBottom) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
          }
        }}
        className="glass w-12 h-12 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-white/10 transition-all duration-300 pointer-events-auto"
      >
        {atBottom ? <ArrowUp className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" /> : <ArrowDown className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />}
      </button>
    </div>
  );
};
