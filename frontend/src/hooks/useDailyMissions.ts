
import { useDailyGoal } from './useDailyGoal'

export type DailyMission = {
  id: string
  title: string
  description: string
  icon: string
  target: number
  reward: number
  progress: number
  completed: boolean
}

const missionDefinitions = [
  {
    id: 'first-exercise',
    title: 'Premiers pas',
    description: 'Réussis 1 exercice aujourd’hui',
    icon: '📖',
    target: 1,
    reward: 5,
  },
  {
    id: 'regular-practice',
    title: 'Garder le rythme',
    description: 'Réussis 3 exercices aujourd’hui',
    icon: '🔥',
    target: 3,
    reward: 10,
  },
  {
    id: 'daily-champion',
    title: 'Champion du jour',
    description: 'Réussis 5 exercices aujourd’hui',
    icon: '🏆',
    target: 5,
    reward: 20,
  },
]

export function useDailyMissions() {
  const { completedToday } = useDailyGoal()

  const missions: DailyMission[] = missionDefinitions.map(
    mission => ({
      ...mission,
      progress: Math.min(completedToday, mission.target),
      completed: completedToday >= mission.target,
    })
  )

  const completedCount = missions.filter(
    mission => mission.completed
  ).length

  const totalCount = missions.length

  const percentage = Math.round(
    (completedCount / totalCount) * 100
  )

  return {
    missions,
    completedCount,
    totalCount,
    percentage,
    allCompleted: completedCount === totalCount,
  }
}
