// Prize Submissions Store
// Handles student prize submission data with localStorage persistence

const PRIZES_KEY = 'ogea_portal_prizes'

function readPrizes() {
  try {
    const raw = localStorage.getItem(PRIZES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writePrizes(prizes) {
  localStorage.setItem(PRIZES_KEY, JSON.stringify(prizes))
}

export function submitPrize({
  studentId,
  studentName,
  studentEmail,
  programName,
  date,
  prize,
  organizer,
  posterUrl,
}) {
  const prizes = readPrizes()
  
  const newSubmission = {
    id: `prize-${Date.now()}`,
    studentId,
    studentName,
    studentEmail,
    programName,
    date,
    prize,
    organizer,
    posterUrl,
    submittedAt: new Date().toISOString(),
    status: 'pending', // pending, verified, rejected
  }
  
  prizes.push(newSubmission)
  writePrizes(prizes)
  return newSubmission
}

export function getPrizes() {
  return readPrizes()
}

export function getPrizesForStudent(studentId) {
  return readPrizes().filter((p) => p.studentId === studentId)
}

export function updatePrizeStatus(prizeId, status) {
  const prizes = readPrizes()
  const idx = prizes.findIndex((p) => p.id === prizeId)
  if (idx === -1) throw new Error('Prize submission not found.')
  prizes[idx].status = status
  writePrizes(prizes)
  return prizes[idx]
}

export function deletePrize(prizeId) {
  const prizes = readPrizes()
  const filtered = prizes.filter((p) => p.id !== prizeId)
  writePrizes(filtered)
}
