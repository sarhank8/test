import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      if (email.trim().toLowerCase() === 'yahya@gmail.com' && password === 'yahya123') {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid Admin Credentials. Please check your email and password.');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-4 text-[#3D282D]">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#FFD6DF] shadow-2xl p-8 space-y-6">
        
        {/* Back Link */}
        <button
          onClick={onBackToStore}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9E4B5C] hover:text-[#3D282D] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE5EC] border border-[#FFC0CB] text-[#FF8DA1] flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-light text-[#3D282D]">Rosé Atelier Admin Login</h2>
          <p className="text-xs text-[#9E4B5C] font-mono">
            Protected Administrator Control Gateway
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block font-mono text-gray-600 mb-1">Admin Email ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="yahya@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1] font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-gray-600 mb-1">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1] font-mono"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-[#3D282D] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#573A41] transition shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[10px] text-gray-400 font-mono">
          Authorized personnel only • Rosé Atelier Security
        </div>

      </div>
    </div>
  );
};
