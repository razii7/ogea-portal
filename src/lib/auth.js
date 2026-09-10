// Lightweight client-side auth store for the Outreach Management Portal.
// NOTE: This portal currently has no backend server, so accounts and sessions
// are persisted in the browser's localStorage. This is intentional for a
// static Vercel deployment and is clearly a demo-grade auth layer — wire up
// a real API (e.g. via VITE_API_BASE_URL) later without changing the
// call-sites in AuthContext.

const USERS_KEY = 'ogea_portal_users'
const SESSION_KEY = 'ogea_portal_session'

const ADMIN_SEED = {
  id: 'admin-001',
  name: 'Portal Administrator',
  email: 'admin@ogea.edu',
  password: 'Admin@123',
  role: 'admin',
  batch: null,
  phone: null,
  createdAt: new Date().toISOString(),
}

const STUDENT_SEED = {
  id: 'stu-demo-001',
  name: 'Demo Student',
  email: 'student@ogea.edu',
  password: 'Student@123',
  role: 'student',
  batch: 'UG 2022-26',
  phone: '9876543210',
  createdAt: new Date().toISOString(),
}

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) {
      const seeded = [ADMIN_SEED, STUDENT_SEED]
      localStorage.setItem(USERS_KEY, JSON.stringify(seeded))
      return seeded
    }
    const parsed = JSON.parse(raw)
    let updated = false
    // Ensure the seeded admin always exists
    if (!parsed.some((u) => u.email === ADMIN_SEED.email || u.role === 'admin')) {
      parsed.unshift(ADMIN_SEED)
      updated = true
    }
    // Ensure the seeded student demo account exists
    if (!parsed.some((u) => u.email === STUDENT_SEED.email)) {
      parsed.push(STUDENT_SEED)
      updated = true
    }
    if (updated) {
      localStorage.setItem(USERS_KEY, JSON.stringify(parsed))
    }
    return parsed
  } catch {
    const seeded = [ADMIN_SEED, STUDENT_SEED]
    localStorage.setItem(USERS_KEY, JSON.stringify(seeded))
    return seeded
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSessionUserId() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw).userId : null
  } catch {
    return null
  }
}

export function getCurrentUser() {
  const id = getSessionUserId()
  if (!id) return null
  const users = readUsers()
  const user = users.find((u) => u.id === id)
  if (!user) return null
  const { password: _pw, ...safe } = user
  return safe
}

export function registerStudent({ name, email, password, batch, phone }) {
  const users = readUsers()
  const emailNorm = email.trim().toLowerCase()
  if (users.some((u) => u.email.toLowerCase() === emailNorm)) {
    throw new Error('An account with this email already exists.')
  }
  const newUser = {
    id: `stu-${Date.now()}`,
    name: name.trim(),
    email: emailNorm,
    password,
    role: 'student',
    batch: batch || 'Unspecified',
    phone: phone || '',
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  writeUsers(users)
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: newUser.id }))
  const { password: _pw, ...safe } = newUser
  return safe
}

export function login({ email, password, expectedRole }) {
  const users = readUsers()
  const emailNorm = email.trim().toLowerCase()
  const user = users.find((u) => u.email.toLowerCase() === emailNorm)
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.')
  }
  if (expectedRole && user.role !== expectedRole) {
    throw new Error(
      expectedRole === 'admin'
        ? 'This account is not registered as an administrator.'
        : 'This account is not registered as a student. Use the admin tab to sign in.'
    )
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }))
  const { password: _pw, ...safe } = user
  return safe
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function listStudents() {
  return readUsers()
    .filter((u) => u.role === 'student')
    .map(({ password: _pw, ...safe }) => safe)
}

export function updateProfile(userId, updates) {
  const users = readUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx === -1) throw new Error('User not found.')
  users[idx] = { ...users[idx], ...updates, id: users[idx].id, role: users[idx].role }
  writeUsers(users)
  const { password: _pw, ...safe } = users[idx]
  return safe
}
