import { useSyncExternalStore } from 'react'
import { cefrUnits, type CEFRLevel } from '../data/cefr'
import { completeLesson } from './useProgress'

const STORAGE_KEY = 'english-learning-cefr-v1'
const PASS_SCORE = 80

type CEFRProgress = {
  completedIds: string[]
  attempts: Record<string, number>
  bestScores: Record<string, number>
}

export type CEFRResult = {
  passed: boolean
  firstTime: boolean
  percentage: number
}

function emptyProgress(): CEFRProgress {
  return { completedIds: [], attempts: {}, bestScores: {} }
}

function readStorage(): CEFRProgress {
  if (typeof window === 'undefined') return emptyProgress()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object') return emptyProgress()
    const record = value as Partial<CEFRProgress>
    const validIds = new Set(cefrUnits.map(unit => unit.id))
    const completedIds = Array.isArray(record.completedIds)
      ? record.completedIds.filter((id): id is string =>
          typeof id === 'string' && validIds.has(id))
      : []
    return {
      completedIds: [...new Set(completedIds)],
      attempts: record.attempts && typeof record.attempts === 'object'
        ? record.attempts : {},
      bestScores: record.bestScores && typeof record.bestScores === 'object'
        ? record.bestScores : {},
    }
  } catch {
    return emptyProgress()
  }
}

let snapshot = readStorage()
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

function getSnapshot() { return snapshot }
const emptyServerSnapshot = emptyProgress()
function getServerSnapshot() { return emptyServerSnapshot }

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) {
      snapshot = readStorage()
      listeners.forEach(listener => listener())
    }
  })
}

function save(next: CEFRProgress) {
  snapshot = next
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) }
  catch { /* Stockage impossible : conservation en mémoire pour cette session */ }
  listeners.forEach(listener => listener())
}

export function canOpenCEFRUnit(id: string, completedIds: string[] = snapshot.completedIds) {
  const index = cefrUnits.findIndex(unit => unit.id === id)
  return index >= 0 && (index === 0 || completedIds.includes(cefrUnits[index - 1].id))
}

/** Enregistre un quiz terminé et alimente le système XP déjà en place. */
export function recordCEFRResult(id: string, correct: number, total: number): CEFRResult {
  const unit = cefrUnits.find(item => item.id === id)
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0
  if (!unit || total !== unit.questions.length || correct < 0 || correct > total || !canOpenCEFRUnit(id)) {
    return { passed: false, firstTime: false, percentage: 0 }
  }

  const passed = percentage >= PASS_SCORE
  const firstTime = passed && !snapshot.completedIds.includes(id)
  const next: CEFRProgress = {
    completedIds: firstTime ? [...snapshot.completedIds, id] : snapshot.completedIds,
    attempts: { ...snapshot.attempts, [id]: (snapshot.attempts[id] || 0) + 1 },
    bestScores: { ...snapshot.bestScores, [id]: Math.max(snapshot.bestScores[id] || 0, percentage) },
  }
  save(next)

  // completeLesson récompense la première réussite une seule fois,
  // mais compte aussi les réussites suivantes pour l'objectif du jour.
  if (passed) completeLesson(unit.lessonId, unit.xp)
  return { passed, firstTime, percentage }
}

export function useCEFRProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const completed = new Set(progress.completedIds)
  const completedCount = cefrUnits.filter(unit => completed.has(unit.id)).length
  const levelProgress = (level: CEFRLevel) => {
    const units = cefrUnits.filter(unit => unit.level === level)
    const done = units.filter(unit => completed.has(unit.id)).length
    return { completed: done, total: units.length, percentage: Math.round(100 * done / units.length) }
  }
  return {
    ...progress,
    completedCount,
    totalUnits: cefrUnits.length,
    percentage: Math.round(completedCount * 100 / cefrUnits.length),
    isCompleted: (id: string) => completed.has(id),
    isUnlocked: (id: string) => canOpenCEFRUnit(id, progress.completedIds),
    levelProgress,
  }
}
