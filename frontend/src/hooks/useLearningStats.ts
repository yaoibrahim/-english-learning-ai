
import { lessons } from '../data/lessons'
import { extraActivities } from '../data/activities'
import { useProgress } from './useProgress'

export function useLearningStats() {
  const { completedLessons, totalXP } = useProgress()

  const completedIds = new Set(completedLessons)

  const completedLessonCount = lessons.filter(
    lesson => completedIds.has(lesson.id)
  ).length

  const completedExtraCount = extraActivities.filter(
    activity => completedIds.has(activity.id)
  ).length

  const totalLessons = lessons.length
  const totalExtra = extraActivities.length
  const totalActivities = totalLessons + totalExtra

  const completedActivities =
    completedLessonCount + completedExtraCount

  const percentage =
    totalActivities > 0
      ? Math.round((completedActivities / totalActivities) * 100)
      : 0

  const nextLesson = lessons.find(
    lesson => !completedIds.has(lesson.id)
  )

  return {
    completedLessons,
    completedIds,
    totalXP,
    completedLessonCount,
    completedExtraCount,
    totalLessons,
    totalExtra,
    totalActivities,
    completedActivities,
    percentage,
    nextLesson,
  }
}
