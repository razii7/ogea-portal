import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { GraduationCap, ShieldCheck, ArrowRight, Eye, EyeOff, Info } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { BATCH_LIST } from '@/lib/mockData'

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400 transition'

const Login = () => {
  const [mode, setMode] = useState('student') // 'student' | 'admin'
  const [authAction, setAuthAction] = useState('login') // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    batch: BATCH_LIST[0],
    phone: '',
  })

  const { login, registerStudent } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const redirectAfterAuth = (role) => {
    const from = location.state?.from
    if (from && from !== '/login') {
      navigate(from, { replace: true })
    } else {
      navigate(role === 'admin' ? '/admin' : '/student', { replace: true })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'admin') {
        const u = login({ email: form.email, password: form.password, expectedRole: 'admin' })
        redirectAfterAuth(u.role)
        return
      }

      if (authAction === 'login') {
        const u = login({ email: form.email, password: form.password, expectedRole: 'student' })
        redirectAfterAuth(u.role)
      } else {
        if (!form.name.trim()) throw new Error('Please enter your full name.')
        if (form.password.length < 6) throw new Error('Password must be at least 6 characters.')
        const u = registerStudent(form)
        redirectAfterAuth(u.role)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-14 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
      >
        {/* Left brand panel */}
        <div className="hidden md:flex flex-col justify-between navy-surface text-white p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80 font-semibold mb-3">
              Outreach Management Portal
            </p>
            <h2 className="text-3xl font-bold leading-tight font-display">
              One portal for every outreach opportunity.
            </h2>
            <p className="text-slate-300 text-sm mt-4 leading-relaxed">
              Students track and apply to programs. Coordinators manage the pipeline
              end-to-end — from announcement to selection.
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              Student accounts: apply, track status, browse programs
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              Admin accounts: publish programs, review applications
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="bg-white p-8 md:p-10">
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('student')
                setError('')
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition ${
                mode === 'student' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('admin')
                setAuthAction('login')
                setError('')
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition ${
                mode === 'admin' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </button>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            {mode === 'admin'
              ? 'Administrator Sign In'
              : authAction === 'login'
              ? 'Welcome back'
              : 'Create your student account'}
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            {mode === 'admin'
              ? 'Access the outreach coordination dashboard.'
              : authAction === 'login'
              ? 'Sign in to view and apply to outreach programs.'
              : 'Register to start applying to outreach programs.'}
          </p>

          {mode === 'admin' && (
            <div className="mb-5 flex items-center justify-between gap-2 text-xs bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-3.5 py-2.5">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-700" />
                <span>
                  Demo Admin — <strong>admin@ogea.edu</strong> / <strong>Admin@123</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, email: 'admin@ogea.edu', password: 'Admin@123' }))}
                className="text-[11px] font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-2 py-1 rounded-md transition shrink-0 cursor-pointer"
              >
                Autofill
              </button>
            </div>
          )}

          {mode === 'student' && authAction === 'login' && (
            <div className="mb-5 flex items-center justify-between gap-2 text-xs bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-3.5 py-2.5">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-700" />
                <span>
                  Demo Student — <strong>student@ogea.edu</strong> / <strong>Student@123</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, email: 'student@ogea.edu', password: 'Student@123' }))}
                className="text-[11px] font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-2 py-1 rounded-md transition shrink-0 cursor-pointer"
              >
                Autofill
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'student' && authAction === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Ahmad Rayyan"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Batch</label>
                  <select
                    name="batch"
                    value={form.batch}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {BATCH_LIST.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Phone (optional)</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="9876543210"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass + ' pr-10'}
                  placeholder="••••••••"
                  required
                  minLength={mode === 'student' && authAction === 'register' ? 6 : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition"
            >
              {loading
                ? 'Please wait…'
                : mode === 'admin'
                ? 'Sign in as Admin'
                : authAction === 'login'
                ? 'Sign in'
                : 'Create account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {mode === 'student' && (
            <p className="text-sm text-slate-500 mt-5 text-center">
              {authAction === 'login' ? "Don't have an account? " : 'Already registered? '}
              <button
                type="button"
                onClick={() => {
                  setAuthAction((a) => (a === 'login' ? 'register' : 'login'))
                  setError('')
                }}
                className="text-slate-900 font-semibold hover:underline"
              >
                {authAction === 'login' ? 'Register' : 'Sign in'}
              </button>
            </p>
          )}

          <p className="text-xs text-slate-400 mt-6 text-center">
            <Link to="/" className="hover:text-slate-600">
              ← Back to home
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default Login
