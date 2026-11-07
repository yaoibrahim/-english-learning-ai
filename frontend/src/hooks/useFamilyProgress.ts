
import { useSyncExternalStore } from 'react'
import {
  FAMILY_ACTIVITY_ID,
  FAMILY_ACTIVITY_XP,
} from '../data/activities'
import { completeLesson } from './useProgress'

type FamilyProgress = {
  quizPassed: boolean
  sentencesPassed: boolean
}

const STORAGE_KEY = 'english-learning-family-progress'

const EMPTY_PROGRESS: FamilyProgress = {
  quizPassed: false,
  sentencesPassed: false,
}

let cachedRaw: string | null | undefined
let cachedProgress: FamilyProgress = EMPTY_PROGRESS

const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedRaw = undefined
      listeners.forEach(listener => listener())
    }
  })
}

function readProgress(): FamilyProgress {
  if (typeof window === 'undefined') {
    return EMPTY_PROGRESS
  }

  const raw = localStorage.getItem(STORAGE_KEY)

  if (raw === cachedRaw) {
    return cachedProgress
  }

  cachedRaw = raw

  try {
    const parsed = raw ? JSON.parse(raw) : {}

    cachedProgress = {
      quizPassed: parsed.quizPassed === true,
      sentencesPassed: parsed.sentencesPassed === true,
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

function saveProgress(progress: FamilyProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))

  cachedRaw = undefined
  notify()

  if (progress.quizPassed && progress.sentencesPassed) {
    completeLesson(FAMILY_ACTIVITY_ID, FAMILY_ACTIVITY_XP)
  }
}

export function markFamilyQuizPassed() {
  const current = readProgress()

  if (current.quizPassed) return

  saveProgress({
    ...current,
    quizPassed: true,
  })
}

export function markFamilySentencesPassed() {
  const current = readProgress()

  if (current.sentencesPassed) return

  saveProgress({
    ...current,
    sentencesPassed: true,
  })
}

export function useFamilyProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    readProgress,
    () => EMPTY_PROGRESS
  )

  return {
    ...progress,
    allPassed:
      progress.quizPassed && progress.sentencesPassed,
  }
}
