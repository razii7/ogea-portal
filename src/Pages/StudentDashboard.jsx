import { useState, useEffect, useMemo } from 'react'
import {
  LayoutDashboard,
  ListChecks,
  Compass,
  UserCircle,
  LogOut,
  CalendarClock,
  CheckCircle2,
  Clock3,
  XCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  getPrograms,
  getApplicationsForStudent,
  applyToProgram,
  withdrawApplication,
} from '@/lib/programsStore'
import { updateProfile } from '@/lib/auth'
import { Badge } from '@/components/ui/badge'
import { BATCH_LIST } from '@/lib/mockData'

const statusStyles = {
  pending: { label: 'Pending Review', cls: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock3 },
  approved: { label: 'Approved', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  rejected: { label: 'Not Selected', cls: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'browse', label: 'Browse Programs', icon: Compass },
  { id: 'applications', label: 'My Applications', icon: ListChecks },
  { id: 'profile', label: 'Profile', icon: UserCircle },
]

const StudentDashboard = () => {
  const { user, logout, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [programs, setPrograms] = useState([])
  const [applications, setApplications] = useState([])
  const [toast, setToast] = useState('')
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '', batch: user?.batch || BATCH_LIST[0] })

  const reload = () => {
    setPrograms(getPrograms())
    if (user) setApplications(getApplicationsForStudent(user.id))
  }

  useEffect(() => {
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2800)
    return () => clearTimeout(t)
  }, [toast])

  const appliedProgramIds = useMemo(() => new Set(applications.map((a) => a.programId)), [applications])

  const handleApply = (program) => {
    try {
      applyToProgram({
        programId: program.id,
        programTitle: program.title,
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
      })
      setToast(`Applied to "${program.title}"`)
      reload()
    } catch (err) {
      setToast(err.message)
    }
  }

  const handleWithdraw = (appId) => {
    withdrawApplication(appId)
    setToast('Application withdrawn.')
    reload()
  }

  const handleProfileSave = (e) => {
    e.preventDefault()
    updateProfile(user.id, profileForm)
    refreshUser()
    setToast('Profile updated.')
  }

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    approved: applications.filter((a) => a.status === 'approved').length,
  }

  return (
    <div className="max-w-7xl mx-auto py-8 grid md:grid-cols-[240px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="navy-surface text-white rounded-2xl p-5 h-fit md:sticky md:top-24">
        <p className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold mb-1">Student Portal</p>
        <h2 className="font-bold text-lg mb-6 truncate">{user?.name}</h2>
        <nav className="space-y-1">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  tab === t.id ? 'admin-nav-active' : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            )
          })}
        </nav>
        <button
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-white/10 mt-4"
        >
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </aside>

      {/* Main content */}
      <main className="space-y-6">
        {toast && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl">
            {toast}
          </div>
        )}

        {tab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
              <p className="text-slate-500 text-sm mt-1">Batch {user?.batch} · {user?.email}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Applications Submitted', value: stats.total, color: 'text-slate-900' },
                { label: 'Pending Review', value: stats.pending, color: 'text-amber-600' },
                { label: 'Approved', value: stats.approved, color: 'text-emerald-600' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Recommended for you
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {programs.slice(0, 2).map((p) => (
                  <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                    {p.posterUrl && (
                      <img src={p.posterUrl} alt="" className="w-full h-28 object-cover" loading="lazy" />
                    )}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm leading-snug">{p.title}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                      </div>
                      <button
                        onClick={() => setTab('browse')}
                        className="text-xs font-semibold text-[#0f2545] mt-3 hover:underline text-left cursor-pointer"
                      >
                        View program →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'browse' && (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-5">Browse Outreach Programs</h1>
            <div className="grid md:grid-cols-2 gap-5">
              {programs.map((p) => {
                const applied = appliedProgramIds.has(p.id)
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition">
                    {p.posterUrl && (
                      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                        <img src={p.posterUrl} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <Badge variant="outline" className="badge-gold backdrop-blur-md bg-white/90">{p.wingLabel}</Badge>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-sm">{p.status}</span>
                        </div>
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {!p.posterUrl && (
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <Badge variant="outline" className="badge-gold">{p.wingLabel}</Badge>
                            <span className="text-xs font-semibold text-slate-500">{p.status}</span>
                          </div>
                        )}
                        <h3 className="font-bold text-slate-900 leading-snug">{p.title}</h3>
                        <p className="text-sm text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">{p.description}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1"><CalendarClock className="w-3.5 h-3.5" /> {p.deadline}</span>
                        <span>{p.seats}</span>
                      </div>
                      <button
                        disabled={applied}
                        onClick={() => handleApply(p)}
                        className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                          applied
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {applied ? 'Application Submitted' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'applications' && (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-5">My Applications</h1>
            {applications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                You haven&apos;t applied to any programs yet.
                <div>
                  <button onClick={() => setTab('browse')} className="text-slate-900 font-semibold hover:underline mt-2">
                    Browse programs →
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((a) => {
                  const st = statusStyles[a.status] || statusStyles.pending
                  const StIcon = st.icon
                  return (
                    <div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-semibold text-slate-800">{a.programTitle}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Applied {new Date(a.appliedAt).toLocaleDateString()}
                          {a.note && ` · ${a.note}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${st.cls}`}>
                          <StIcon className="w-3.5 h-3.5" /> {st.label}
                        </span>
                        {a.status === 'pending' && (
                          <button
                            onClick={() => handleWithdraw(a.id)}
                            className="text-xs font-semibold text-red-600 hover:underline"
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'profile' && (
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold text-slate-900 mb-5">My Profile</h1>
            <form onSubmit={handleProfileSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Full Name</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Email</label>
                <input disabled value={user?.email} className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-sm text-slate-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Batch</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                    value={profileForm.batch}
                    onChange={(e) => setProfileForm((p) => ({ ...p, batch: e.target.value }))}
                  >
                    {BATCH_LIST.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Phone</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition">
                Save Changes
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default StudentDashboard
