import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, Phone, Eye, EyeOff, Key, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { supabase, isAdmin, updateAdminLogin } from "../../lib/supabase";
import { adminLogin, adminForgotPassword, adminResetPassword } from "../../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  // Mode: 'login' | 'forgot' | 'reset'
  const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>('login');

  // Form State
  const [email, setEmail] = useState("admin@animeverse.com");
  const [password, setPassword] = useState("admin123");
  const [phone, setPhone] = useState("9685982012");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot / Reset State
  const [secretKey, setSecretKey] = useState("9685982012");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback State
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Admin Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // 1. Attempt backend API login with email, password, and phone
      try {
        await adminLogin(email, password, phone);
        navigate('/admin');
        return;
      } catch (e: any) {
        console.log("Backend login fallback notice:", e.message);
      }

      // 2. Check if email is admin authorized
      const adminCheck = await isAdmin(email);
      if (!adminCheck && email !== 'admin@animeverse.com' && !email.includes('admin')) {
        setError("Unauthorized. Only administrator accounts can access this panel.");
        setLoading(false);
        return;
      }

      // 3. Fallback credential validation
      const storedCustomPw = localStorage.getItem('admin_custom_password') || 'admin123';
      const isEmailValid = email === 'admin@animeverse.com' || email === 'admin' || email.includes('admin');
      const isPhoneValid = phone === '9685982012';
      const isPwValid = password === storedCustomPw || password === 'admin123' || (isPhoneValid && !password);

      if ((isEmailValid || isPhoneValid) && isPwValid) {
        await updateAdminLogin(email);
        localStorage.setItem('admin_email', email);
        localStorage.setItem('admin_authenticated', 'true');
        navigate('/admin');
      } else {
        const { data } = await supabase
          .from('admin_users')
          .select('phone')
          .eq('email', email)
          .single();

        if (data && data.phone === phone) {
          await updateAdminLogin(email);
          localStorage.setItem('admin_email', email);
          localStorage.setItem('admin_authenticated', 'true');
          navigate('/admin');
        } else {
          setError("Invalid Admin Credentials. Please check your Admin Email, Password, or Phone.");
        }
      }
    } catch (err) {
      setError("An error occurred during authentication. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Handle Forgot Password Verification
  async function handleVerifyAdmin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await adminForgotPassword(email, phone);
      if (res.success) {
        setSuccessMsg("Admin identity verified! Enter your new password below.");
        setMode('reset');
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify admin account.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Password Reset Submission
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await adminResetPassword(email, newPassword, secretKey);
      if (res.success) {
        setPassword(newPassword);
        localStorage.setItem('admin_custom_password', newPassword);
        setSuccessMsg("Password reset successfully! You can now login with your new password.");
        setMode('login');
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background glowing aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          {/* Top Lock Icon & Title Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="inline-block p-5 bg-gradient-to-tr from-white/10 to-white/5 border border-white/20 rounded-3xl mb-4 shadow-2xl backdrop-blur-xl"
            >
              {mode === 'login' ? (
                <Lock size={44} className="text-cyan-400" />
              ) : (
                <Key size={44} className="text-purple-400" />
              )}
            </motion.div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              {mode === 'login' && 'Admin Portal'}
              {mode === 'forgot' && 'Verify Admin Identity'}
              {mode === 'reset' && 'Reset Admin Password'}
            </h1>
            <p className="text-gray-400 text-sm">
              {mode === 'login' && 'Enter your credentials to access the management panel'}
              {mode === 'forgot' && 'Provide your Admin Email or Security Phone to verify access'}
              {mode === 'reset' && 'Create a new secure password for your Admin account'}
            </p>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-emerald-300 text-sm font-medium"
            >
              <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/15 border border-red-500/40 rounded-2xl flex items-center gap-3 text-red-300 text-sm font-medium"
            >
              <ShieldCheck size={20} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleLogin}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-5"
            >
              {/* Admin Email / ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Admin Email / ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@animeverse.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setSuccessMsg("");
                      setMode('forgot');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Phone / Security Key */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Security Phone Key
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9685982012"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold rounded-xl text-base shadow-lg hover:brightness-110 transition-all disabled:opacity-50 mt-2"
              >
                {loading ? "Authenticating..." : "Login to Admin Dashboard"}
              </motion.button>
            </motion.form>
          )}

          {/* FORGOT PASSWORD STEP 1: VERIFY ADMIN */}
          {mode === 'forgot' && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleVerifyAdmin}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Registered Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@animeverse.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Admin Phone / Secret Key
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9685982012"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMsg("");
                    setMode('login');
                  }}
                  className="px-5 py-3.5 bg-white/10 border border-white/15 text-white rounded-xl text-sm font-semibold hover:bg-white/20 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-sm shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* FORGOT PASSWORD STEP 2: RESET PASSWORD */}
          {mode === 'reset' && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleResetPassword}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Security Phone Key
                </label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="9685982012"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMsg("");
                    setMode('forgot');
                  }}
                  className="px-5 py-3.5 bg-white/10 border border-white/15 text-white rounded-xl text-sm font-semibold hover:bg-white/20 flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-bold rounded-xl text-sm shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Admin Password"}
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* DEFAULT CREDENTIALS INFO CARD */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl text-xs space-y-2 text-gray-300"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                🔑 Default Admin Credentials
              </span>
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-[10px] font-mono">
                SYSTEM DEFAULT
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 font-mono">
              <p><span className="text-gray-400">Admin Email:</span> <span className="text-cyan-300 font-bold">admin@animeverse.com</span></p>
              <p><span className="text-gray-400">Default Password:</span> <span className="text-purple-300 font-bold">admin123</span></p>
              <p><span className="text-gray-400">Security Phone Key:</span> <span className="text-emerald-300 font-bold">9685982012</span></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
