
import { Link } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { englishLevels, levelOrder } from '../data/levels'
import { extraActivities } from '../data/activities'
import { useLearningStats } from '../hooks/useLearningStats'

export default function Levels() {
  const { completedIds } = useLearningStats()

  function getLevelActivityIds(levelId: string): number[] {
    const lessonIds = lessons
      .filter(lesson => lesson.level === levelId)
      .map(lesson => lesson.id)

    const extraIds = extraActivities
      .filter(activity => activity.level === levelId)
      .map(activity => activity.id)

    return [...lessonIds, ...extraIds]
  }

  const levelsProgress = englishLevels.map((level, index) => {
    const activityIds = getLevelActivityIds(level.id)

    const completed = activityIds.filter(
      id => completedIds.has(id)
    ).length

    const total = activityIds.length

    const percentage =
      total > 0 ? Math.round((completed / total) * 100) : 0

    const previousLevelId =
      index > 0 ? levelOrder[index - 1] : null

    const previousIds = previousLevelId
      ? getLevelActivityIds(previousLevelId)
      : []

    const previousCompleted =
      previousIds.length > 0 &&
      previousIds.every(id => completedIds.has(id))

    const unlocked =
      index === 0 || previousCompleted

    return {
      ...level,
      total,
      completed,
      percentage,
      unlocked,
      finished: total > 0 && completed === total,
    }
  })

  const currentLevel =
    levelsProgress.find(
      level => level.unlocked && !level.finished
    ) ?? levelsProgress[0]

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          🌍 Mes niveaux d'anglais
        </h1>

        <p className="mt-3 text-slate-600">
          Progresse du niveau préparatoire A0 jusqu'au niveau C2.
        </p>
      </div>

      <div className="rounded-2xl bg-blue-50 p-6">
        <p className="font-semibold text-blue-700">
          🎯 Ton parcours actuel
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Niveau {currentLevel.id} — {currentLevel.title}
        </h2>

        <p className="mt-2 text-slate-600">
          {currentLevel.objective}
        </p>

        <p className="mt-3 text-sm text-slate-500">
          Ces niveaux indiquent ta progression pédagogique
          dans l'application, et non une certification officielle.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {levelsProgress.map(level => {
          const levelExtras = extraActivities.filter(
            activity => activity.level === level.id
          )

          return (
            <article
              key={level.id}
              className={`rounded-2xl border p-6 shadow-sm ${
                level.unlocked
                  ? 'border-slate-200 bg-white'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Niveau {level.id}
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    {level.title}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    level.finished
                      ? 'bg-green-100 text-green-700'
                      : level.unlocked
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {level.finished
                    ? '✓ Terminé'
                    : level.unlocked
                      ? 'Disponible'
                      : '🔒 Verrouillé'}
                </span>
              </div>

              <p className="mt-4 text-slate-600">
                {level.description}
              </p>

              <div className="mt-4 rounded-xl bg-slate-100 p-4">
                <p className="text-sm font-semibold">
                  Objectif pédagogique
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  {level.objective}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  Progression
                </span>

                <span className="font-bold text-blue-600">
                  {level.completed}/{level.total} activités
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${level.percentage}%` }}
                />
              </div>

              <p className="mt-2 text-right text-sm text-slate-500">
                {level.percentage} %
              </p>

              {level.total === 0 && (
                <p className="mt-4 text-sm text-amber-700">
                  Les activités de ce niveau seront ajoutées prochainement.
                </p>
              )}

              {!level.unlocked && (
                <p className="mt-4 text-sm text-slate-500">
                  🔒 Termine le niveau précédent pour débloquer ce parcours.
                </p>
              )}

              {level.unlocked && levelExtras.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {levelExtras.map(activity => (
                    <Link
                      key={activity.id}
                      to={activity.path}
                      className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      {activity.icon} {activity.title}
                    </Link>
                  ))}
                </div>
              )}

              {level.unlocked && level.total > 0 && (
                <Link
                  to="/lessons"
                  className="mt-5 inline-block rounded-lg bg-slate-800 px-5 py-3 font-semibold text-white hover:bg-slate-900"
                >
                  Voir les leçons
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
