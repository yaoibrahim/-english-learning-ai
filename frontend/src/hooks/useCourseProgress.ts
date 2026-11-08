import { useSyncExternalStore } from 'react'
import { completeLesson } from './useProgress'
import { courseUnits, type CourseLevel } from '../data/courses'
import { getUnitTestTotal } from '../lib/unitTests'

const KEY = 'english-learning-courses-v1'
export type CourseProgress = { completedIds: string[]; attempts: Record<string, number>; bestScores: Record<string, number> }
const empty = (): CourseProgress => ({ completedIds: [], attempts: {}, bestScores: {} })
const knownIds = new Set(courseUnits.map(unit => unit.id))
function load(): CourseProgress {
  if (typeof window === 'undefined') return empty()
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(KEY) || 'null')
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return empty()
    const data = raw as Partial<CourseProgress>
    const completedIds = Array.isArray(data.completedIds) ? data.completedIds.filter((id): id is string => typeof id === 'string' && knownIds.has(id)) : []
    const bestScores: Record<string, number> = {}
    const attempts: Record<string, number> = {}
    for (const unit of courseUnits) {
      const score = data.bestScores?.[unit.id]
      const n = data.attempts?.[unit.id]
      if (typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 100) bestScores[unit.id] = score
      if (typeof n === 'number' && Number.isInteger(n) && n >= 0) attempts[unit.id] = n
    }
    return { completedIds: [...new Set(completedIds)], bestScores, attempts }
  } catch { return empty() }
}
let snapshot = load()
const subscribers = new Set<() => void>()
function notify() { subscribers.forEach(callback => callback()) }
function subscribe(callback: () => void) { subscribers.add(callback); return () => { subscribers.delete(callback) } }
function getSnapshot() { return snapshot }
const serverSnapshot = empty()
function getServerSnapshot() { return serverSnapshot }
if (typeof window !== 'undefined') window.addEventListener('storage', e => { if (e.key === KEY) { snapshot = load(); notify() } })

export function canOpenCourse(id: string, completed = snapshot.completedIds) {
  const i = courseUnits.findIndex(unit => unit.id === id)
  return i === 0 || (i > 0 && completed.includes(courseUnits[i-1].id))
}
export function recordCourseResult(id: string, correct: number, total: number) {
  const unit = courseUnits.find(item => item.id === id)
  if (!unit || total !== getUnitTestTotal(id) || !Number.isInteger(correct) || correct < 0 || correct > total || !canOpenCourse(id)) {
    return { passed: false, firstTime: false, percentage: 0 }
  }
  const percentage = Math.round(correct * 100 / total)
  const passed = percentage >= 80
  const firstTime = passed && !snapshot.completedIds.includes(id)
  snapshot = {
    completedIds: firstTime ? [...snapshot.completedIds, id] : snapshot.completedIds,
    attempts: { ...snapshot.attempts, [id]: (snapshot.attempts[id] || 0) + 1 },
    bestScores: { ...snapshot.bestScores, [id]: Math.max(snapshot.bestScores[id] || 0, percentage) },
  }
  try { window.localStorage.setItem(KEY, JSON.stringify(snapshot)) } catch { /* stockage indisponible : session en mémoire */ }
  notify()
  if (passed) completeLesson(unit.lessonId, unit.xp)
  return { passed, firstTime, percentage }
}
export function useCourseProgress() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const set = new Set(data.completedIds)
  const completedCount = courseUnits.filter(unit => set.has(unit.id)).length
  return {
    ...data,
    completedCount,
    totalCount: courseUnits.length,
    percentage: Math.round(completedCount * 100 / courseUnits.length),
    isCompleted: (id: string) => set.has(id),
    isUnlocked: (id: string) => canOpenCourse(id, data.completedIds),
    progressForLevel: (level: CourseLevel) => {
      const units = courseUnits.filter(unit => unit.level === level)
      const done = units.filter(unit => set.has(unit.id)).length
      return { completed: done, total: units.length, percent: Math.round(done * 100 / units.length) }
    },
  }
}
