import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../lib/authContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogleCredential, loginWithCustomUser } = useAuth();
  const [emailInput, setEmailInput] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');
  const [isSignUp, setIsSignUp] = React.useState(false);

  if (!isAuthModalOpen) return null;

  const handleDemoGoogleSignIn = () => {
    loginWithCustomUser({
      name: 'Alex Mercer',
      email: 'alex.mercer@gmail.com',
      picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      provider: 'google',
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    loginWithCustomUser({
      name: nameInput || emailInput.split('@')[0],
      email: emailInput,
      provider: 'email',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md p-8 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 border border-white/15 rounded-3xl shadow-2xl"
        >
          {/* Neon Background Accents */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/30 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 border border-white/10 rounded-2xl">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              {isSignUp ? 'Join AnimeVerse' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign in with Google for 1-click checkout and exclusive drop access
            </p>
          </div>

          {/* Google Sign In Section */}
          <div className="space-y-4">
            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    loginWithGoogleCredential(credentialResponse.credential);
                  }
                }}
                onError={() => {
                  console.warn('Google Auth Popup closed or failed');
                }}
                theme="filled_black"
                shape="pill"
                size="large"
                width="100%"
                text={isSignUp ? 'signup_with' : 'signin_with'}
              />
            </div>

            {/* Quick Demo Google Sign In Fallback Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemoGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.29B11.86 8.89 10.5 12 10.5s-1.64 1.36-3.21 3.77l3.99 3.01z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.59l3.99 3.01c.95-2.83 3.6-4.85 6.72-4.85z"
                />
              </svg>
              <span>Continue with Google (Demo User)</span>
            </motion.button>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest bg-black">
              or continue with email
            </span>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Sung Jinwoo"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="otaku@animeverse.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all text-sm mt-2"
            >
              {isSignUp ? 'Create Account' : 'Sign In with Email'}
            </motion.button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-6 text-center text-xs text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-cyan-400 hover:underline ml-1"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Secure 256-bit encrypted authentication</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
