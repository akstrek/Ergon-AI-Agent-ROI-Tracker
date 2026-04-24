'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, ShieldCheck, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const StarfieldComponent = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      const stars = Array.from({ length: 250 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        baseR: Math.random() * 1.2 + 0.3,
      }));
      let animationFrameId: number;
      const render = () => {
        ctx.clearRect(0, 0, w, h);
        stars.forEach(star => {
          ctx.beginPath(); ctx.arc(star.x, star.y, star.baseR, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fill();
        });
        animationFrameId = requestAnimationFrame(render);
      };
      render();
      return () => cancelAnimationFrame(animationFrameId);
    }, []);
    return <canvas ref={canvasRef} className="w-full h-full opacity-40" />;
};

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Supabase fires PASSWORD_RECOVERY when the reset link is clicked.
  // We wait for that event before allowing form submission — this is
  // the only safe way to confirm the token in the URL hash was valid.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });

    // Also check if a session already exists from the URL hash
    // (Supabase may process it before the listener fires on mount)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    setError(null);

    const { data: userData, error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    // Record when the password was changed in the profiles table
    if (userData?.user?.id) {
      await supabase
        .from('profiles')
        .update({ password_changed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('id', userData.user.id);
    }

    // Sign out the recovery session — user must log in explicitly with new password
    await supabase.auth.signOut();

    setSuccess(true);
    setLoading(false);

    // Redirect to login after a short confirmation pause
    setTimeout(() => router.push('/auth/login'), 2200);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StarfieldComponent />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-[#0a0a0f]/40 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] z-10 shadow-2xl relative"
      >
        <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FF3131] to-transparent" />

        <AnimatePresence mode="wait">
          {success ? (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-5 py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-[#22c55e]" />
              </motion.div>
              <h2 className="text-3xl font-brand font-bold text-white uppercase tracking-tight">
                Password<br />Updated
              </h2>
              <p className="text-[#8E9299] text-sm">
                Your credentials have been secured. Redirecting you to login…
              </p>
              <motion.div
                className="w-full h-[2px] bg-[#22c55e]/30 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2, ease: 'linear' }}
                />
              </motion.div>
            </motion.div>
          ) : (
            /* ── Form state ── */
            <motion.div key="form" className="space-y-8">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FF3131]/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="text-[#FF3131] w-6 h-6" />
                </div>
                <h1 className="text-4xl font-brand font-bold text-white tracking-tight uppercase">
                  New<br />Credentials
                </h1>
                <p className="text-[#8E9299]">Secure your neural access node.</p>
              </div>

              {!sessionReady && (
                <Alert className="bg-yellow-500/10 border-yellow-500/30">
                  <AlertDescription className="text-yellow-400 text-xs">
                    Validating reset token… if this persists, request a new reset link.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-[#8E9299]">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="bg-black/50 border-white/10 h-14 pr-12 text-white rounded-xl focus:border-[#FF3131]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-[#7f8c8d] hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-[#8E9299]">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      className="bg-black/50 border-white/10 h-14 pr-12 text-white rounded-xl focus:border-[#FF3131]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-4 text-[#7f8c8d] hover:text-white transition-colors"
                    >
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 py-3">
                    <AlertDescription className="text-xs text-red-400">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading || !sessionReady}
                  className="w-full bg-white text-black font-bold uppercase tracking-widest h-14 rounded-xl hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50"
                >
                  {loading ? 'Securing Node…' : 'Update Password'}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
