
import { useSyncExternalStore } from 'react'
import { recordPractice } from './useStreak'
import {
  getLocalDay,
  recordDailyExercise,
} from './useDailyGoal'

const STORAGE_KEY = 'english-learning-progress'

type ProgressData = {
  completedLessons: number[]
  totalXP: number
}

const INITIAL_PROGRESS: ProgressData = {
  completedLessons: [],
  totalXP: 0,
}

const listeners = new Set<() => void>()

function readProgress(): ProgressData {
  if (typeof window === 'undefined') return INITIAL_PROGRESS

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return INITIAL_PROGRESS

    const parsed: unknown = JSON.parse(saved)

    if (
      typeof parsed !== 'object' ||
      parsed === null
    ) {
      return INITIAL_PROGRESS
    }

    const value = parsed as Partial<ProgressData>

    if (
      !Array.isArray(value.completedLessons) ||
      typeof value.totalXP !== 'number' ||
      !Number.isFinite(value.totalXP)
    ) {
      return INITIAL_PROGRESS
    }

    return {
      completedLessons: value.completedLessons.filter(
        (id): id is number =>
          typeof id === 'number' &&
          Number.isSafeInteger(id)
      ),
      totalXP: value.totalXP,
    }
  } catch {
    return INITIAL_PROGRESS
  }
}

let currentProgress = readProgress()

// Synchroniser la progression entre les onglets du même navigateur.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) {
      currentProgress = readProgress()
      listeners.forEach(listener => listener())
    }
  })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return currentProgress
}

function updateProgress(progress: ProgressData): boolean {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    )

    currentProgress = progress
    listeners.forEach(listener => listener())
    return true
  } catch {
    return false
  }
}

type MissionReward = {
  threshold: number
  xp: number
  index: number
}

const missionRewards: MissionReward[] = [
  { threshold: 1, xp: 5, index: 1 },
  { threshold: 3, xp: 10, index: 2 },
  { threshold: 5, xp: 20, index: 3 },
]

// Identifiants réservés aux bonus de missions.
// Exemple : 202611071 pour la première mission du 07/11/2026.
function missionRewardId(index: number): number {
  const date = getLocalDay().replaceAll('-', '')
  return Number(`${date}${index}`)
}

export function completeLesson(
  lessonId: number,
  xp: number
): void {
  if (
    !Number.isSafeInteger(lessonId) ||
    !Number.isFinite(xp) ||
    xp < 0
  ) {
    return
  }

  // Une réussite = une progression quotidienne.
  recordPractice()
  const completedToday = recordDailyExercise()

  // Les XP de la leçon ne sont accordés qu'une fois.
  const completedLessons = [...currentProgress.completedLessons]
  let totalXP = currentProgress.totalXP
  let changed = false

  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId)
    totalXP += xp
    changed = true
  }

  // Débloquer les bonus atteints aujourd'hui.
  for (const mission of missionRewards) {
    const rewardId = missionRewardId(mission.index)

    if (
      completedToday >= mission.threshold &&
      !completedLessons.includes(rewardId)
    ) {
      completedLessons.push(rewardId)
      totalXP += mission.xp
      changed = true
    }
  }

  if (changed) {
    updateProgress({
      completedLessons,
      totalXP,
    })
  }
}

export function useProgress() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => INITIAL_PROGRESS
  )
}
