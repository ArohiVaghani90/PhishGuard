import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Shield, Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth, SignupData } from '../../context/AuthContext';

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? <CheckCircle size={12} className="text-emerald-400" /> : <XCircle size={12} className="text-slate-500" />}
      <span className={`text-xs ${met ? 'text-emerald-400' : 'text-slate-500'}`}>{label}</span>
    </div>
  );
}

export function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState<SignupData & { confirmPassword: string }>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRules = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    symbol: /[^a-zA-Z0-9]/.test(form.password),
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName || form.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (!/^[A-Z]/.test(form.firstName)) {
      newErrors.firstName = 'First name must start with an uppercase letter';
    }

    if (!form.lastName || form.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (!/^[A-Z]/.test(form.lastName)) {
      newErrors.lastName = 'Last name must start with an uppercase letter';
    }

    if (!form.username || form.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    } else if (!(/[A-Z]/.test(form.username) && /[0-9]/.test(form.username) && /[^a-zA-Z0-9]/.test(form.username))) {
      newErrors.username = 'Username must contain an uppercase letter, number, and symbol';
    }

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!Object.values(passwordRules).every(Boolean)) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const { confirmPassword, ...signupData } = form;
    signup(signupData);
    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#070e1a] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-white mb-2">Account Created!</h2>
          <p className="text-slate-400 mb-4">Welcome to PhishGuard. Redirecting you to your dashboard...</p>
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070e1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
            <Shield size={18} className="text-slate-900" />
          </div>
          <span className="text-white font-bold text-xl">PHISHGUARD</span>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-white mb-1">Create Your Account</h2>
          <p className="text-slate-400 text-sm mb-6">Join thousands of organizations protecting their teams</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">First Name *</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => update('firstName', e.target.value)}
                  placeholder="Alex"
                  className={`w-full bg-slate-700/50 border text-white placeholder-slate-500 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${errors.firstName ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/50'}`}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Last Name *</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => update('lastName', e.target.value)}
                  placeholder="Johnson"
                  className={`w-full bg-slate-700/50 border text-white placeholder-slate-500 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${errors.lastName ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/50'}`}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1">Username *</label>
              <input
                type="text"
                value={form.username}
                onChange={e => update('username', e.target.value)}
                placeholder="Alex_J1!"
                className={`w-full bg-slate-700/50 border text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${errors.username ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/50'}`}
              />
              {errors.username ? (
                <p className="text-red-400 text-xs mt-1">{errors.username}</p>
              ) : (
                <p className="text-slate-500 text-xs mt-1">Must contain uppercase, number, and symbol (2–30 chars)</p>
              )}
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="you@company.com"
                className={`w-full bg-slate-700/50 border text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/50'}`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-slate-700/50 border text-white placeholder-slate-500 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-1 transition-colors ${errors.password ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/50'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="grid grid-cols-2 gap-1 mt-2">
                  <PasswordRule met={passwordRules.length} label="At least 8 characters" />
                  <PasswordRule met={passwordRules.uppercase} label="One uppercase letter" />
                  <PasswordRule met={passwordRules.number} label="One number" />
                  <PasswordRule met={passwordRules.symbol} label="One special character" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-slate-700/50 border text-white placeholder-slate-500 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-1 transition-colors ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/50'}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-bold py-3 rounded-lg transition-all duration-200 text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">Sign in</Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">← Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}
