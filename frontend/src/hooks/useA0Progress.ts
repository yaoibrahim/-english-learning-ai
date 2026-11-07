
import { useSyncExternalStore } from 'react'
import { useProgress, completeLesson } from './useProgress'
import { a0Levels } from '../data/a0Levels'

const STORAGE_KEY = 'english-learning-a0-progress'
const A0_XP_ID_OFFSET = 2000

type A0Progress = {
  completedLevelIds: number[]
}

const EMPTY_PROGRESS: A0Progress = {
  completedLevelIds: [],
}

let cachedRaw: string | null | undefined
let cachedProgress: A0Progress = EMPTY_PROGRESS

const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedRaw = undefined
      listeners.forEach(listener => listener())
    }
  })
}

function readProgress(): A0Progress {
  if (typeof window === 'undefined') {
    return EMPTY_PROGRESS
  }

  let raw: string | null

  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return EMPTY_PROGRESS
  }

  if (raw === cachedRaw) {
    return cachedProgress
  }

  cachedRaw = raw

  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {}

    const ids = Array.isArray(
      (parsed as Partial<A0Progress>).completedLevelIds
    )
      ? (parsed as A0Progress).completedLevelIds
      : []

    cachedProgress = {
      completedLevelIds: [
        ...new Set(
          ids.filter(
            (id: unknown): id is number =>
              typeof id === 'number' &&
              a0Levels.some(level => level.id === id)
          )
        ),
      ],
    }
  } catch {
    cachedProgress = EMPTY_PROGRESS
  }

  return cachedProgress
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

export function completeA0Level(levelId: number): void {
  const level = a0Levels.find(item => item.id === levelId)

  if (!level) return

  const current = readProgress()

  // N'enregistrer le niveau A0 qu'une seule fois.
  if (!current.completedLevelIds.includes(levelId)) {
    const updated: A0Progress = {
      completedLevelIds: [
        ...current.completedLevelIds,
        levelId,
      ],
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      )

      cachedRaw = undefined
      notify()
    } catch {
      // Ne pas bloquer l'exercice si le stockage échoue.
    }
  }

  // IMPORTANT :
  // Appelé aussi lors d'une révision réussie.
  // useProgress empêche les XP de niveau en double,
  // mais enregistre une nouvelle pratique quotidienne.
  completeLesson(
    A0_XP_ID_OFFSET + level.id,
    level.xp
  )
}

export function useA0Progress() {
  const progress = useSyncExternalStore(
    subscribe,
    readProgress,
    () => EMPTY_PROGRESS
  )

  const { totalXP } = useProgress()
  const completedIds = new Set(progress.completedLevelIds)

  const completedCount = a0Levels.filter(level =>
    completedIds.has(level.id)
  ).length

  const percentage = Math.round(
    (completedCount / a0Levels.length) * 100
  )

  function isUnlocked(levelId: number) {
    if (levelId === 1) return true
    return completedIds.has(levelId - 1)
  }

  return {
    completedIds,
    completedCount,
    percentage,
    totalXP,
    isUnlocked,
  }
}
