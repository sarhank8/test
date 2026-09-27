import React, { useState } from 'react';
import { X, User, Lock, Mail, Eye, EyeOff, Sparkles, LogOut, Package, ShieldCheck } from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLoginSuccess: (profile: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGooglePopupOpen, setIsGooglePopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: name || (email.split('@')[0] ? email.split('@')[0] : 'Valued Client'),
        email: email || 'client@roseatelier.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        isLoggedIn: true,
      });
      onClose();
    }, 1000);
  };

  const handleGoogleSelectAccount = (accountName: string, accountEmail: string) => {
    setIsGooglePopupOpen(false);
    onLoginSuccess({
      name: accountName,
      email: accountEmail,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isLoggedIn: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-[#FFD6DF] shadow-2xl overflow-hidden p-6 sm:p-8 my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF5F7] text-[#3D282D] hover:bg-[#FFE5EC] transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGGED IN USER PROFILE VIEW */}
        {user && user.isLoggedIn ? (
          <div className="space-y-6 py-2">
            <div className="text-center space-y-3">
              <div className="relative w-20 h-20 mx-auto">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#FF8DA1] shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-light text-[#3D282D]">{user.name}</h3>
                <p className="text-xs text-[#9E4B5C] font-mono">{user.email}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5EC] text-[#9E4B5C] text-[10px] font-mono uppercase tracking-widest mt-2">
                  <ShieldCheck className="w-3 h-3 text-[#FF8DA1]" />
                  <span>VIP Atelier Member</span>
                </div>
              </div>
            </div>

            {/* Order History Preview */}
            <div className="space-y-2 pt-2 border-t border-[#FFD6DF]">
              <div className="flex justify-between items-center text-xs font-mono text-[#3D282D]">
                <span className="flex items-center gap-1.5 font-bold">
                  <Package className="w-4 h-4 text-[#FF8DA1]" />
                  Recent Orders
                </span>
                <span className="text-[#9E4B5C]">1 Dispatched</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FFF5F7] border border-[#FFD6DF] flex justify-between items-center text-xs">
                <div>
                  <span className="font-serif font-medium text-[#3D282D] block">#ROSE-98421</span>
                  <span className="text-[10px] text-gray-500 font-mono block">Céleste Pearl Necklace</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-semibold">
                  Dispatched
                </span>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 rounded-full border border-[#FFD6DF] text-rose-600 hover:bg-rose-50 text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          </div>
        ) : (
          /* AUTH LOGIN / SIGNUP FORM VIEW */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5EC] text-[#9E4B5C] text-[10px] font-mono uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-[#FF8DA1]" />
                <span>Rosé Atelier Concierge</span>
              </div>
              <h3 className="text-2xl font-serif font-light text-[#3D282D]">
                {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
              </h3>
              <p className="text-xs text-[#6B444C] font-light">
                {mode === 'login'
                  ? 'Sign in to access your saved wishlist and order history.'
                  : 'Join the Atelier for 10% off your first order & early drop access.'}
              </p>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={() => setIsGooglePopupOpen(true)}
              className="w-full py-3 px-4 rounded-full border border-[#FFD6DF] bg-white text-[#3D282D] hover:bg-[#FFF5F7] transition font-medium text-xs flex items-center justify-center gap-3 shadow-xs"
            >
              {/* Official Google SVG Logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <span className="w-full border-t border-[#FFD6DF]" />
              <span className="absolute bg-white px-3 text-[10px] font-mono text-gray-400 uppercase">
                Or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-mono text-[#3D282D] block mb-1">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-[#FF8DA1]" />
                    <input
                      type="text"
                      placeholder="Sophia Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-xs text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-mono text-[#3D282D] block mb-1">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-[#FF8DA1]" />
                  <input
                    type="email"
                    placeholder="sophia@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-xs text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#3D282D] block mb-1">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-[#FF8DA1]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-xs text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-[#3D282D]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-rose-accent text-[#3D282D] font-bold text-xs uppercase tracking-[0.2em] hover:brightness-105 transition shadow-sm mt-2"
              >
                {isSubmitting ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center text-xs text-[#6B444C] pt-2 border-t border-[#FFD6DF]">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-[#FF8DA1] font-bold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-[#FF8DA1] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </div>
        )}

      </div>

      {/* SIMULATED GOOGLE OAUTH POPUP SELECTOR */}
      {isGooglePopupOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 border border-gray-200 space-y-4">
            
            <button
              onClick={() => setIsGooglePopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <h4 className="text-base font-bold text-gray-900">Sign in with Google</h4>
              <p className="text-xs text-gray-500">to continue to Rosé Atelier</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleGoogleSelectAccount('Sophia Chen', 'sophia.chen@gmail.com')}
                className="w-full p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-left flex items-center gap-3"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Sophia"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="truncate">
                  <span className="text-xs font-bold text-gray-900 block truncate">Sophia Chen</span>
                  <span className="text-[11px] text-gray-500 block truncate">sophia.chen@gmail.com</span>
                </div>
              </button>

              <button
                onClick={() => handleGoogleSelectAccount('Elena Vance', 'elena.vance@gmail.com')}
                className="w-full p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-left flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs">
                  EV
                </div>
                <div className="truncate">
                  <span className="text-xs font-bold text-gray-900 block truncate">Elena Vance</span>
                  <span className="text-[11px] text-gray-500 block truncate">elena.vance@gmail.com</span>
                </div>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
