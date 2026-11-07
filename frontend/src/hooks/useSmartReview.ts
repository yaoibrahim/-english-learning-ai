import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'english-learning-smart-reviews-v1'
const DAY = 24 * 60 * 60 * 1000
const INTERVALS = [1, 3, 7, 14, 30, 60]

export type ReviewSource = 'reading' | 'writing' | 'listening' | 'speaking'
export type ReviewFormat = 'choice' | 'text'

export type ReviewInput = {
  id: string
  source: ReviewSource
  format: ReviewFormat
  prompt: string
  correctAnswer: string
  acceptedAnswers?: string[]
  context?: string
  explanation?: string
  options?: string[]
}

export type ReviewItem = ReviewInput & {
  createdAt: number
  lastAttemptAt: number
  nextReviewAt: number
  mistakes: number
  reviews: number
  successStreak: number
  intervalDays: number
}

function validItem(value: unknown): value is ReviewItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<ReviewItem>
  return (
    typeof item.id === 'string' &&
    typeof item.prompt === 'string' &&
    typeof item.correctAnswer === 'string' &&
    (item.format === 'choice' || item.format === 'text') &&
    typeof item.nextReviewAt === 'number' &&
    Number.isFinite(item.nextReviewAt) &&
    typeof item.successStreak === 'number' &&
    typeof item.mistakes === 'number' &&
    typeof item.reviews === 'number' &&
    (item.source === 'reading' || item.source === 'writing' ||
      item.source === 'listening' || item.source === 'speaking')
  )
}

function readStorage(): ReviewItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter(validItem) : []
  } catch {
    return []
  }
}

// Important : useSyncExternalStore attend une référence stable
// entre deux modifications du stockage.
let snapshot: ReviewItem[] = readStorage()
const subscribers = new Set<() => void>()

function emitChange() {
  subscribers.forEach(callback => callback())
}

function subscribe(callback: () => void) {
  subscribers.add(callback)
  return () => {
    subscribers.delete(callback)
  }
}

function getSnapshot() {
  return snapshot
}

function getServerSnapshot(): ReviewItem[] {
  return []
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) {
      snapshot = readStorage()
      emitChange()
    }
  })
}

function save(next: ReviewItem[]) {
  snapshot = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // L'application fonctionne encore en mémoire si le stockage est bloqué.
  }
  emitChange()
}

/** Enregistrer une erreur dans l'exercice d'origine. */
export function recordReviewMistake(input: ReviewInput) {
  const now = Date.now()
  const existing = snapshot.find(item => item.id === input.id)
  if (existing) {
    save(snapshot.map(item => item.id === input.id ? {
      ...item,
      ...input,
      mistakes: item.mistakes + 1,
      successStreak: 0,
      intervalDays: 0,
      lastAttemptAt: now,
      nextReviewAt: now,
    } : item))
    return
  }

  save([...snapshot, {
    ...input,
    createdAt: now,
    lastAttemptAt: now,
    nextReviewAt: now,
    mistakes: 1,
    reviews: 0,
    successStreak: 0,
    intervalDays: 0,
  }])
}

/** Enregistrer une réponse pendant une séance de révision. */
export function recordReviewAnswer(id: string, correct: boolean) {
  const now = Date.now()
  save(snapshot.map(item => {
    if (item.id !== id) return item
    const newStreak = correct ? item.successStreak + 1 : 0
    const interval = correct
      ? INTERVALS[Math.min(newStreak - 1, INTERVALS.length - 1)]
      : 0
    return {
      ...item,
      mistakes: item.mistakes + (correct ? 0 : 1),
      reviews: item.reviews + 1,
      successStreak: newStreak,
      intervalDays: interval,
      lastAttemptAt: now,
      nextReviewAt: now + interval * DAY,
    }
  }))
}

export function useSmartReview() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const now = Date.now()
  const dueItems = items
    .filter(item => item.nextReviewAt <= now)
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
  const mastered = items.filter(item => item.successStreak >= 3).length
  const nextDate = items
    .filter(item => item.nextReviewAt > now)
    .reduce<number | null>(
      (min, item) => min === null ? item.nextReviewAt : Math.min(min, item.nextReviewAt),
      null
    )

  return {
    items,
    dueItems,
    dueCount: dueItems.length,
    total: items.length,
    mastered,
    nextDate,
  }
}
