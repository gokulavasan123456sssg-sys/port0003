import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { login, isSupabaseConnected } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide email and password.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const res = await login(email, password);
    if (!res.success) {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 relative select-none">
      {/* Ambient Red Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cinema-red/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Return to site button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-950/80 text-xs font-mono text-neutral-400 hover:text-white transition-all cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO PORTFOLIO</span>
      </button>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0a0a0f] border border-neutral-800/90 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-cinema-red shadow-[0_0_20px_rgba(229,9,20,0.3)]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-wider uppercase text-white">
            ADMINISTRATIVE PORTAL
          </h2>
          <p className="text-xs font-mono tracking-widest text-neutral-400 mt-1 uppercase">
            GOKULAVASAN PORTFOLIO MANAGEMENT
          </p>

          {/* Connection Mode Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono mt-4">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSupabaseConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-neutral-400">
              {isSupabaseConnected ? 'Supabase Backend Active' : 'Local / Offline Management Mode'}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-2 text-xs font-mono text-red-200">
            <ShieldAlert className="w-4 h-4 text-cinema-red flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              ADMIN EMAIL
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gokulavasan.com"
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cinema-red transition-colors pl-10"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cinema-red transition-colors pl-10"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-cinema-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(229,9,20,0.5)] transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'AUTHENTICATING...' : 'ENTER DASHBOARD'}
          </button>
        </form>

        {/* Demo Credentials Helper Notice for Local Mode */}
        {!isSupabaseConnected && (
          <div className="mt-8 pt-6 border-t border-neutral-900 text-center">
            <p className="text-[11px] font-mono text-neutral-500 mb-2">
              PRE-CONFIGURED LOCAL ACCESS:
            </p>
            <button
              onClick={() => {
                setEmail('admin@gokulavasan.com');
                setPassword('admin123');
              }}
              className="text-xs font-mono text-cinema-red hover:underline"
            >
              Autofill: admin@gokulavasan.com / admin123
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
