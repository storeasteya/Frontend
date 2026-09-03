import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ShieldCheck, Eye, EyeOff, AlertCircle, Loader2, Lock, Mail, User } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../lib/authContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithGoogleCredential,
    loginWithCustomUser,
    loginWithEmail,
    registerWithEmail,
    isLoading,
    authError,
    clearAuthError,
  } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleToggleMode = (signUp: boolean) => {
    setIsSignUp(signUp);
    setLocalError(null);
    clearAuthError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearAuthError();

    if (!emailInput.trim() || !passwordInput.trim()) {
      setLocalError('Please fill in all required fields.');
      return;
    }

    if (passwordInput.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    if (isSignUp) {
      if (!nameInput.trim()) {
        setLocalError('Please enter your full name.');
        return;
      }
      await registerWithEmail(nameInput, emailInput, passwordInput);
    } else {
      await loginWithEmail(emailInput, passwordInput);
    }
  };

  const activeError = localError || authError;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-md p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 border border-white/15 rounded-3xl shadow-2xl"
        >
          {/* Ambient Glow Accents */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 mb-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-7 h-7 text-cyan-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isSignUp ? 'Join ASTEYA' : 'Welcome Back'}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-400">
              {isSignUp
                ? 'Create an account for 1-click checkout and exclusive drop access'
                : 'Sign in to access your saved wishlist, orders, and exclusive drops'}
            </p>
          </div>

          {/* Error Alert Banner */}
          {activeError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-xs sm:text-sm"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{activeError}</div>
            </motion.div>
          )}

          {/* Real Google Sign In Section */}
          <div className="w-full flex flex-col items-center justify-center py-1">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  loginWithGoogleCredential(credentialResponse.credential);
                }
              }}
              onError={() => {
                setLocalError('Google Auth is blocked on localhost. Please ensure your Google Client ID is configured correctly.');
              }}
              theme="filled_black"
              shape="pill"
              size="large"
              width="360"
              text={isSignUp ? 'signup_with' : 'signin_with'}
            />
          </div>

          {/* Separator */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 text-[10px] sm:text-xs font-semibold text-cyan-400/80 uppercase tracking-widest bg-gray-950">
              or continue with email
            </span>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block mb-1.5 text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                  Your Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-cyan-400/70" />
                  <input
                    type="text"
                    required={isSignUp}
                    placeholder="Enter your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block mb-1.5 text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-cyan-400/70" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                {!isSignUp && (
                  <span className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer font-medium">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-cyan-400/70" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-cyan-400/70 hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {isSignUp && (
                <p className="mt-1 text-[11px] text-gray-400">Must be at least 6 characters long</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black hover:bg-gray-200 font-bold text-base rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-black" />
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </motion.button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-5 text-center text-xs text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => handleToggleMode(!isSignUp)}
              className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline ml-1"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Secure 256-bit encrypted authentication</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
