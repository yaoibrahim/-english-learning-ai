
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'english-learning-daily-goal'

export type DailyGoalValue = 1 | 3 | 5 | 10

type DailyGoalData = {
  goal: DailyGoalValue
  history: Record<string, number>
}

const EMPTY_DATA: DailyGoalData = {
  goal: 3,
  history: {},
}

let cachedRaw: string | null | undefined
let cachedData: DailyGoalData = EMPTY_DATA

const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedRaw = undefined
      listeners.forEach(listener => listener())
    }
  })
}

export function getLocalDay(date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function isGoal(value: unknown): value is DailyGoalValue {
  return value === 1 || value === 3 ||
    value === 5 || value === 10
}

function readData(): DailyGoalData {
  if (typeof window === 'undefined') return EMPTY_DATA

  let raw: string | null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return EMPTY_DATA
  }

  if (raw === cachedRaw) return cachedData
  cachedRaw = raw

  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {}

    if (typeof parsed !== 'object' || parsed === null) {
      cachedData = EMPTY_DATA
      return cachedData
    }

    const value = parsed as Partial<DailyGoalData>
    const history: Record<string, number> = {}

    if (
      value.history &&
      typeof value.history === 'object' &&
      !Array.isArray(value.history)
    ) {
      for (const [date, count] of Object.entries(value.history)) {
        if (
          /^\d{4}-\d{2}-\d{2}$/.test(date) &&
          typeof count === 'number' &&
          Number.isSafeInteger(count) &&
          count >= 0
        ) {
          history[date] = count
        }
      }
    }

    cachedData = {
      goal: isGoal(value.goal) ? value.goal : 3,
      history,
    }
  } catch {
    cachedData = EMPTY_DATA
  }

  return cachedData
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function saveData(data: DailyGoalData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    cachedRaw = undefined
    listeners.forEach(listener => listener())
    return true
  } catch {
    return false
  }
}

export function setDailyGoal(goal: DailyGoalValue): void {
  if (!isGoal(goal)) return
  saveData({ ...readData(), goal })
}

// Renvoie le nombre de réussites enregistrées aujourd'hui.
export function recordDailyExercise(): number {
  const current = readData()
  const today = getLocalDay()
  const count = (current.history[today] ?? 0) + 1

  const saved = saveData({
    ...current,
    history: {
      ...current.history,
      [today]: count,
    },
  })

  return saved ? count : (current.history[today] ?? 0)
}

export function useDailyGoal() {
  const data = useSyncExternalStore(
    subscribe,
    readData,
    () => EMPTY_DATA
  )

  const completedToday = data.history[getLocalDay()] ?? 0
  const percentage = Math.min(
    100,
    Math.round((completedToday / data.goal) * 100)
  )

  return {
    goal: data.goal,
    completedToday,
    percentage,
    goalReached: completedToday >= data.goal,
    remaining: Math.max(0, data.goal - completedToday),
    history: data.history,
  }
}
