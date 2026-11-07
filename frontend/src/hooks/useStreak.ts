
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'english-learning-streak'

type StreakData = {
  practiceDates: string[]
}

const EMPTY_STREAK: StreakData = {
  practiceDates: [],
}

let cachedRaw: string | null | undefined
let cachedData: StreakData = EMPTY_STREAK

const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedRaw = undefined
      listeners.forEach(listener => listener())
    }
  })
}

// Date locale : YYYY-MM-DD
function localDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getToday(): string {
  return localDate(new Date())
}

function previousDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number)
  const result = new Date(year, month - 1, day - 1, 12)

  return localDate(result)
}

function readStreak(): StreakData {
  if (typeof window === 'undefined') {
    return EMPTY_STREAK
  }

  let raw: string | null = null

  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return EMPTY_STREAK
  }

  if (raw === cachedRaw) {
    return cachedData
  }

  cachedRaw = raw

  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {}

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'practiceDates' in parsed &&
      Array.isArray(parsed.practiceDates)
    ) {
      const today = getToday()

      const dates = parsed.practiceDates.filter(
        (date: unknown): date is string =>
          typeof date === 'string' &&
          /^\d{4}-\d{2}-\d{2}$/.test(date) &&
          date <= today
      )

      cachedData = {
        practiceDates: [...new Set(dates)].sort(),
      }
    } else {
      cachedData = EMPTY_STREAK
    }
  } catch {
    cachedData = EMPTY_STREAK
  }

  return cachedData
}

function subscribe(callback: () => void) {
  listeners.add(callback)

  return () => {
    listeners.delete(callback)
  }
}

function notify() {
  listeners.forEach(listener => listener())
}

// À appeler lorsqu'un exercice est réussi.
export function recordPractice(): void {
  const today = getToday()
  const current = readStreak()

  if (current.practiceDates.includes(today)) {
    return
  }

  const updated: StreakData = {
    practiceDates: [...current.practiceDates, today].sort(),
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    )

    cachedRaw = undefined
    notify()
  } catch {
    // Le stockage peut être indisponible.
  }
}

function calculateCurrentStreak(dates: string[]): number {
  const completed = new Set(dates)
  const today = getToday()
  const yesterday = previousDate(today)

  // Une série reste active pendant la journée suivante.
  let cursor = completed.has(today) ? today : yesterday

  if (!completed.has(cursor)) {
    return 0
  }

  let count = 0

  while (completed.has(cursor)) {
    count++
    cursor = previousDate(cursor)
  }

  return count
}

function calculateBestStreak(dates: string[]): number {
  if (dates.length === 0) {
    return 0
  }

  let best = 0
  let current = 0
  let previous = ''

  for (const date of dates) {
    if (previous && previousDate(date) === previous) {
      current++
    } else {
      current = 1
    }

    best = Math.max(best, current)
    previous = date
  }

  return best
}

export function useStreak() {
  const data = useSyncExternalStore(
    subscribe,
    readStreak,
    () => EMPTY_STREAK
  )

  const today = getToday()
  const practicedToday = data.practiceDates.includes(today)

  return {
    currentStreak: calculateCurrentStreak(data.practiceDates),
    bestStreak: calculateBestStreak(data.practiceDates),
    practicedToday,
    practiceDates: data.practiceDates,
    totalPracticeDays: data.practiceDates.length,
  }
}
