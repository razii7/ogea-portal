import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  getPrograms,
  addProgram,
  updateProgram,
  deleteProgram,
  getApplications,
  updateApplicationStatus,
} from '@/lib/programsStore'
import { listStudents } from '@/lib/auth'
import { Badge } from '@/components/ui/badge'

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'programs', label: 'Manage Programs', icon: ClipboardList },
  { id: 'applications', label: 'Applications', icon: ClipboardList },
  { id: 'students', label: 'Students', icon: Users },
]

const emptyProgram = {
  title: '',
  wing: 'scholarcraft',
  wingLabel: 'ScholarCraft',
  category: '',
  eventDate: '',
  deadline: '',
  status: 'Upcoming',
  eligibility: 'All Batches',
  description: '',
  seats: '',
  link: '',
  posterUrl: '',
  featured: false,
}

const WING_OPTIONS = [
  { value: 'inkspire', label: 'InkSpire' },
  { value: 'scholarcraft', label: 'ScholarCraft' },
  { value: 'talentpulse', label: 'TalentPulse' },
]

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [programs, setPrograms] = useState([])
  const [applications, setApplications] = useState([])
  const [students, setStudents] = useState([])
  const [toast, setToast] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyProgram)
  const [appFilter, setAppFilter] = useState('all')

  const reload = () => {
    setPrograms(getPrograms())
    setApplications(getApplications())
    setStudents(listStudents())
  }

  useEffect(() => { reload() }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const openNewForm = () => {
    setForm(emptyProgram)
    setEditingId(null)
    setFormOpen(true)
  }

  const openEditForm = (p) => {
    setForm(p)
    setEditingId(p.id)
    setFormOpen(true)
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProgram = (e) => {
    e.preventDefault()
    const wingLabel = WING_OPTIONS.find((w) => w.value === form.wing)?.label || form.wing
    const payload = { ...form, wingLabel }
    if (editingId) {
      updateProgram(editingId, payload)
      setToast('Program updated.')
    } else {
      addProgram(payload)
      setToast('Program published.')
    }
    setFormOpen(false)
    reload()
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this program? This cannot be undone.')) return
    deleteProgram(id)
    setToast('Program deleted.')
    reload()
  }

  const handleAppDecision = (id, status) => {
    updateApplicationStatus(id, status)
    setToast(`Application ${status}.`)
    reload()
  }

  const filteredApps = appFilter === 'all' ? applications : applications.filter((a) => a.status === appFilter)

  const stats = {
    programs: programs.length,
    students: students.length,
    applications: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
  }

  return (
    <div className="max-w-7xl mx-auto py-8 grid md:grid-cols-[240px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="navy-surface text-white rounded-2xl p-5 h-fit md:sticky md:top-24">
        <p className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold mb-1">Admin Portal</p>
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
          onClick={() => { logout(); navigate('/') }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-white/10 mt-4"
        >
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </aside>

      <main className="space-y-6">
        {toast && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl">
            {toast}
          </div>
        )}

        {tab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Outreach Coordination Overview</h1>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { label: 'Active Programs', value: stats.programs },
                { label: 'Registered Students', value: stats.students },
                { label: 'Total Applications', value: stats.applications },
                { label: 'Pending Review', value: stats.pending, color: 'text-amber-600' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${s.color || 'text-slate-900'}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Applications</h3>
              <div className="space-y-2">
                {applications.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-sm py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-700">{a.studentName} → {a.programTitle}</span>
                    <Badge variant="outline" className="capitalize badge-gold">{a.status}</Badge>
                  </div>
                ))}
                {applications.length === 0 && <p className="text-sm text-slate-400">No applications yet.</p>}
              </div>
            </div>
          </div>
        )}

        {tab === 'programs' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-bold text-slate-900">Manage Programs</h1>
              <button
                onClick={openNewForm}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                <Plus className="w-4 h-4" /> New Program
              </button>
            </div>

            <div className="space-y-3">
              {programs.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4">
                  {p.posterUrl && (
                    <img src={p.posterUrl} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0 hidden sm:block" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-800 truncate">{p.title}</p>
                      {p.featured && <Badge className="badge-gold" variant="outline">Featured</Badge>}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{p.wingLabel} · {p.status} · {p.deadline}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEditForm(p)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'applications' && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Student Applications</h1>
              <div className="flex gap-1.5">
                {['all', 'pending', 'approved', 'rejected'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAppFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                      appFilter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredApps.map((a) => (
                <div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-slate-800">{a.studentName} <span className="text-slate-400 font-normal">· {a.studentEmail}</span></p>
                    <p className="text-sm text-slate-600 mt-0.5">{a.programTitle}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Applied {new Date(a.appliedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {a.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleAppDecision(a.id, 'approved')}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleAppDecision(a.id, 'rejected')}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    ) : (
                      <Badge variant="outline" className="capitalize">{a.status}</Badge>
                    )}
                  </div>
                </div>
              ))}
              {filteredApps.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-10">No applications in this filter.</p>
              )}
            </div>
          </div>
        )}

        {tab === 'students' && (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-5">Registered Students</h1>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Batch</th>
                    <th className="text-left px-4 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                      <td className="px-4 py-3 text-slate-500">{s.email}</td>
                      <td className="px-4 py-3 text-slate-500">{s.batch}</td>
                      <td className="px-4 py-3 text-slate-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr><td colSpan={4} className="text-center text-slate-400 py-8">No students registered yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Program form modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setFormOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900 mb-4">{editingId ? 'Edit Program' : 'New Program'}</h3>
            <form onSubmit={handleSaveProgram} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Title</label>
                <input required value={form.title} onChange={(e) => handleFormChange('title', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Wing</label>
                  <select value={form.wing} onChange={(e) => handleFormChange('wing', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm">
                    {WING_OPTIONS.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Status</label>
                  <select value={form.status} onChange={(e) => handleFormChange('status', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm">
                    {['Upcoming', 'Open Applications', 'Active', 'Closed'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Category</label>
                <input value={form.category} onChange={(e) => handleFormChange('category', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Event Date</label>
                  <input value={form.eventDate} onChange={(e) => handleFormChange('eventDate', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Deadline</label>
                  <input value={form.deadline} onChange={(e) => handleFormChange('deadline', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Eligibility</label>
                <input value={form.eligibility} onChange={(e) => handleFormChange('eligibility', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => handleFormChange('description', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Seats / Quota</label>
                  <input value={form.seats} onChange={(e) => handleFormChange('seats', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">External Link</label>
                  <input value={form.link} onChange={(e) => handleFormChange('link', e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Poster Image URL (from the web)</label>
                <input value={form.posterUrl} onChange={(e) => handleFormChange('posterUrl', e.target.value)} placeholder="https://…" className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm" />
                {form.posterUrl && (
                  <div className="mt-2 relative h-28 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={form.posterUrl} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded font-mono">Image Preview</span>
                  </div>
                )}
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" checked={form.featured} onChange={(e) => handleFormChange('featured', e.target.checked)} />
                Feature in &ldquo;Upcoming Programs&rdquo; spotlight on the homepage
              </label>
              <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl mt-2">
                {editingId ? 'Save Changes' : 'Publish Program'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
