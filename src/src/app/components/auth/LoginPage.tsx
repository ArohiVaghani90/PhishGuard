import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const success = login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const demoLogin = (role: 'user' | 'admin') => {
    if (role === 'user') {
      setEmail('user@phishguard.com');
      setPassword('Password1!');
    } else {
      setEmail('admin@phishguard.com');
      setPassword('Admin1!');
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1a] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-slate-800 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="relative z-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-8">
            <Shield size={32} className="text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Back to PhishGuard</h2>
          <p className="text-slate-400 leading-relaxed">
            Continue your security training journey. Your progress is saved and ready to pick up where you left off.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '2.4M+', label: 'Trained Users' },
              { value: '78%', label: 'Risk Reduction' },
              { value: '96%', label: 'Completion Rate' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                <div className="text-cyan-400 font-bold text-lg">{stat.value}</div>
                <div className="text-slate-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
              <Shield size={18} className="text-slate-900" />
            </div>
            <span className="text-white font-bold text-xl">PHISHGUARD</span>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
            <h2 className="text-white mb-1">Sign In</h2>
            <p className="text-slate-400 text-sm mb-6">Enter your credentials to access your account</p>

            {/* Demo credentials */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 mb-6">
              <p className="text-slate-400 text-xs mb-2 font-semibold">Quick Demo Login:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => demoLogin('user')}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-3 py-2 rounded-lg transition-colors border border-slate-600"
                >
                  👤 Demo User
                </button>
                <button
                  onClick={() => demoLogin('admin')}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-3 py-2 rounded-lg transition-colors border border-slate-600"
                >
                  🛡️ Demo Admin
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 text-sm">Password</label>
                  <a href="#" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-bold py-3 rounded-lg transition-all duration-200 text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Create one free
              </Link>
            </p>
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
