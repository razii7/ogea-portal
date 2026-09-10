// Client-side data store for outreach programs and student applications.
// Persisted to localStorage so the Admin dashboard's create/edit/delete
// actions and Student applications survive page reloads without a backend.

const PROGRAMS_KEY = 'ogea_portal_programs'
const APPLICATIONS_KEY = 'ogea_portal_applications'

// A real, currently upcoming national science-outreach event is used to
// seed the "Upcoming Programs" spotlight. Its official cover image is
// hot-linked directly from the event's own public website (indiasciencefest.org).
export const UPCOMING_PROGRAM_SEED = {
  id: 'upcoming-isf-2027',
  title: 'India Science Festival 2027 (ISF 2027)',
  wing: 'scholarcraft',
  wingLabel: 'ScholarCraft',
  category: 'National Science Outreach',
  eventDate: 'January 2027 · IISER Pune',
  deadline: 'Call for Applications open',
  status: 'Upcoming',
  eligibility: 'All Batches — Science, Research & Innovation aspirants',
  description:
    "One of India's largest science festivals, hosted at IISER Pune, bringing together scientists, innovators and students for talks, exhibitions and competitions such as Spin Your Science, Science in Focus, and Talk Your Thesis. OGEA is coordinating a student delegation to attend and compete.",
  seats: 'Limited Delegation',
  link: 'https://www.indiasciencefest.org/cfa2027',
  posterUrl:
    'https://static.wixstatic.com/media/a3e476_cd23c38c09c746fea918cbfb875896fd~mv2.jpg',
  featured: true,
}

const DEFAULT_PROGRAMS = [
  UPCOMING_PROGRAM_SEED,
  {
    id: 'prog-01',
    title: 'National Inter-Varsity Scholastic Fellowship 2026',
    wing: 'scholarcraft',
    wingLabel: 'ScholarCraft',
    category: 'Research & Seminars',
    eventDate: 'April 2026',
    deadline: 'March 30, 2026',
    status: 'Open Applications',
    eligibility: 'Batches 36 - 40',
    description:
      'Empowering young research scholars to present peer-reviewed papers at premier central universities with institutional travel grants.',
    seats: '15 Fellows',
    link: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk',
    posterUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'prog-02',
    title: 'InkSpire Annual Student Anthology: Volume IV',
    wing: 'inkspire',
    wingLabel: 'InkSpire',
    category: 'Literary & Publications',
    eventDate: 'May 2026',
    deadline: 'April 15, 2026',
    status: 'Open Applications',
    eligibility: 'Batches 36 - 42',
    description:
      'Call for original student poetry, short fiction, essays, and philosophical critiques for academic peer-reviewed publication with ISBN indexing.',
    seats: 'Open Submissions',
    link: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk',
    posterUrl:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'prog-03',
    title: 'All-Kerala Parliamentary Debate Championship',
    wing: 'talentpulse',
    wingLabel: 'TalentPulse',
    category: 'Debate & Oratory',
    eventDate: 'April 2026',
    deadline: 'April 05, 2026',
    status: 'Upcoming',
    eligibility: 'Batches 38 - 42',
    description:
      'Represent the university at the prestigious state-level Oxford-style debate league addressing modern socio-ethical imperatives.',
    seats: '6 Delegations',
    link: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk',
    posterUrl:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'prog-04',
    title: 'Archival Manuscript Restoration & Digital Epigraphy Lab',
    wing: 'scholarcraft',
    wingLabel: 'ScholarCraft',
    category: 'Heritage & Epigraphy',
    eventDate: 'May 2026',
    deadline: 'May 10, 2026',
    status: 'Open Applications',
    eligibility: 'Batches 36 - 39',
    description:
      'Hands-on technical workshop training scholars in multispectral manuscript digitization, cataloging, and textual preservation techniques.',
    seats: '20 Scholars',
    link: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk',
    posterUrl:
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'prog-05',
    title: 'Civic Leadership & External Community Engagement Drive',
    wing: 'talentpulse',
    wingLabel: 'TalentPulse',
    category: 'Leadership & Outreach',
    eventDate: 'Ongoing',
    deadline: 'Ongoing',
    status: 'Active',
    eligibility: 'All Batches',
    description:
      'Coordinated social impact initiatives connecting students with educational NGOs, rural teaching drives, and youth mentorship.',
    seats: 'Continuous',
    link: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk',
    posterUrl:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'prog-06',
    title: 'Bilingual Translation Monograph Project',
    wing: 'inkspire',
    wingLabel: 'InkSpire',
    category: 'Translation Studies',
    eventDate: 'May 2026',
    deadline: 'May 25, 2026',
    status: 'Upcoming',
    eligibility: 'Batches 36 - 41',
    description:
      'Collaborative project translating classical Arabic moral philosophy treatises into contemporary academic English with analytical commentary.',
    seats: '12 Translators',
    link: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk',
    posterUrl:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
]

function readPrograms() {
  try {
    const raw = localStorage.getItem(PROGRAMS_KEY)
    if (!raw) {
      localStorage.setItem(PROGRAMS_KEY, JSON.stringify(DEFAULT_PROGRAMS))
      return DEFAULT_PROGRAMS
    }
    const parsed = JSON.parse(raw)
    let updated = false
    const merged = parsed.map((p) => {
      const match = DEFAULT_PROGRAMS.find((d) => d.id === p.id)
      if (match && !p.posterUrl && match.posterUrl) {
        updated = true
        return { ...p, posterUrl: match.posterUrl }
      }
      return p
    })
    if (updated) {
      localStorage.setItem(PROGRAMS_KEY, JSON.stringify(merged))
    }
    return merged
  } catch {
    return DEFAULT_PROGRAMS
  }
}

function writePrograms(programs) {
  localStorage.setItem(PROGRAMS_KEY, JSON.stringify(programs))
}

export function getPrograms() {
  return readPrograms()
}

export function getUpcomingPrograms() {
  return readPrograms().filter((p) => p.featured || p.status === 'Upcoming')
}

export function getFeaturedProgram() {
  const programs = readPrograms()
  return programs.find((p) => p.featured) || programs[0]
}

export function addProgram(program) {
  const programs = readPrograms()
  const newProgram = { ...program, id: `prog-${Date.now()}` }
  programs.unshift(newProgram)
  writePrograms(programs)
  return newProgram
}

export function updateProgram(id, updates) {
  const programs = readPrograms()
  const idx = programs.findIndex((p) => p.id === id)
  if (idx === -1) throw new Error('Program not found.')
  programs[idx] = { ...programs[idx], ...updates, id }
  writePrograms(programs)
  return programs[idx]
}

export function deleteProgram(id) {
  const programs = readPrograms().filter((p) => p.id !== id)
  writePrograms(programs)
}

// ---------------- Applications ----------------

function readApplications() {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeApplications(apps) {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps))
}

export function getApplications() {
  return readApplications()
}

export function getApplicationsForStudent(studentId) {
  return readApplications().filter((a) => a.studentId === studentId)
}

export function applyToProgram({ programId, programTitle, studentId, studentName, studentEmail }) {
  const apps = readApplications()
  const already = apps.find((a) => a.programId === programId && a.studentId === studentId)
  if (already) {
    throw new Error('You have already applied to this program.')
  }
  const newApp = {
    id: `app-${Date.now()}`,
    programId,
    programTitle,
    studentId,
    studentName,
    studentEmail,
    status: 'pending',
    appliedAt: new Date().toISOString(),
    note: '',
  }
  apps.unshift(newApp)
  writeApplications(apps)
  return newApp
}

export function updateApplicationStatus(id, status, note = '') {
  const apps = readApplications()
  const idx = apps.findIndex((a) => a.id === id)
  if (idx === -1) throw new Error('Application not found.')
  apps[idx] = { ...apps[idx], status, note }
  writeApplications(apps)
  return apps[idx]
}

export function withdrawApplication(id) {
  const apps = readApplications().filter((a) => a.id !== id)
  writeApplications(apps)
}
