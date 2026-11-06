
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'english-learning-progress'

type ProgressData = {
  completedLessons: number[]
  totalXP: number
}

const initialProgress: ProgressData = {
  completedLessons: [],
  totalXP: 0,
}

function readProgress(): ProgressData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      const parsed = JSON.parse(saved)

      if (
        Array.isArray(parsed.completedLessons) &&
        typeof parsed.totalXP === 'number'
      ) {
        return parsed
      }
    }
  } catch {
    // Utiliser la progression initiale
  }

  return initialProgress
}

let currentProgress = readProgress()
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return currentProgress
}

function updateProgress(progress: ProgressData) {
  currentProgress = progress

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    )
  } catch {
    // La progression reste disponible en mémoire
  }

  listeners.forEach(listener => listener())
}

export function completeLesson(
  lessonId: number,
  xp: number
) {
  if (currentProgress.completedLessons.includes(lessonId)) {
    return
  }

  updateProgress({
    completedLessons: [
      ...currentProgress.completedLessons,
      lessonId,
    ],
    totalXP: currentProgress.totalXP + xp,
  })
}

export function useProgress() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
