import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Shield, BookOpen } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@cove.ac.ke');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#1e40af] relative overflow-hidden">
        <div className="login-pattern absolute inset-0" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center font-bold text-xl text-white border border-white/20">
                C
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Cove High School</h1>
                <p className="text-blue-200 text-sm">Lavington, Nairobi</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              School Management<br />System
            </h2>
            <p className="text-blue-200 text-lg max-w-md leading-relaxed">
              Comprehensive platform for managing students, academics, assessments, fees, and communications — built for the Cambridge curriculum.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-4">
              <GraduationCap className="w-8 h-8 text-blue-300 mb-3" />
              <p className="text-white font-semibold text-sm">IGCSE & A-Level</p>
              <p className="text-blue-300 text-xs mt-1">Cambridge curriculum tracking</p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-4">
              <Shield className="w-8 h-8 text-emerald-300 mb-3" />
              <p className="text-white font-semibold text-sm">Secure Access</p>
              <p className="text-blue-300 text-xs mt-1">Role-based permissions</p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-4">
              <BookOpen className="w-8 h-8 text-amber-300 mb-3" />
              <p className="text-white font-semibold text-sm">Real-Time Reports</p>
              <p className="text-blue-300 text-xs mt-1">Grades, attendance & fees</p>
            </div>
          </div>

          <p className="text-blue-300/60 text-sm mt-8">
            © 2026 Cove High School. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center font-bold text-lg text-white">
              C
            </div>
            <div>
              <h1 className="font-bold text-lg">Cove High School</h1>
              <p className="text-slate-500 text-xs">School Management System</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to access the school management portal</p>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Sign in as</label>
              <div className="grid grid-cols-4 gap-2">
                {['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                      role === r
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {r.charAt(0) + r.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                placeholder="you@cove.ac.ke"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-11 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50 shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40"
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

          <p className="text-center text-xs text-slate-400 mt-8">
            Need help? Contact IT support at <span className="text-blue-600">support@cove.ac.ke</span>
          </p>
        </div>
      </div>
    </div>
  );
}
