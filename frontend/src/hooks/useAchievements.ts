
import { achievements } from '../data/achievements'
import { useA0Progress } from './useA0Progress'

export function useAchievements() {
  const {
    completedCount,
    percentage,
    totalXP,
  } = useA0Progress()

  const achievementStatus = achievements.map(achievement => {
    const unlocked =
      completedCount >= achievement.requiredLevels

    const progress = Math.min(
      100,
      Math.round(
        (completedCount / achievement.requiredLevels) * 100
      )
    )

    return {
      ...achievement,
      unlocked,
      progress,
    }
  })

  const unlockedAchievements = achievementStatus.filter(
    achievement => achievement.unlocked
  )

  const lockedAchievements = achievementStatus.filter(
    achievement => !achievement.unlocked
  )

  const nextAchievement = lockedAchievements[0] ?? null

  return {
    achievementStatus,
    unlockedAchievements,
    lockedAchievements,
    nextAchievement,
    unlockedCount: unlockedAchievements.length,
    totalAchievements: achievements.length,
    completedCount,
    percentage,
    totalXP,
  }
}
