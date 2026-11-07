
import { Link } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { extraActivities } from '../data/activities'
import { useLearningStats } from '../hooks/useLearningStats'

export default function Progress() {
  const {
    completedIds,
    totalXP,
    completedLessonCount,
    totalLessons,
    completedActivities,
    totalActivities,
    percentage,
  } = useLearningStats()

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          📈 Ma progression
        </h1>

        <p className="mt-3 text-slate-600">
          Retrouve tes leçons, tes activités et tes XP.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            ⭐ Total XP
          </p>
          <p className="mt-3 text-3xl font-bold text-amber-600">
            {totalXP}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            📖 Leçons validées
          </p>
          <p className="mt-3 text-3xl font-bold text-blue-600">
            {completedLessonCount}/{totalLessons}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            🎯 Activités validées
          </p>
          <p className="mt-3 text-3xl font-bold text-green-600">
            {completedActivities}/{totalActivities}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            Progression générale
          </h2>

          <span className="font-bold text-blue-600">
            {percentage} %
          </span>
        </div>

        <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-600">
          {completedActivities} activité(s) sur {totalActivities}.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          🎓 Activités complémentaires
        </h2>

        <div className="mt-5 space-y-3">
          {extraActivities.map(activity => {
            const completed = completedIds.has(activity.id)

            return (
              <div
                key={activity.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-semibold">
                    {activity.icon} {activity.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Niveau {activity.level} · {activity.xp} XP
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${
                      completed
                        ? 'text-green-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {completed ? '✓ Terminée' : 'À faire'}
                  </p>
                </div>

                <Link
                  to={activity.path}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Ouvrir →
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          📚 Mes leçons
        </h2>

        <div className="mt-5 space-y-3">
          {lessons.map(lesson => {
            const completed = completedIds.has(lesson.id)

            return (
              <div
                key={lesson.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-semibold">
                    {lesson.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Niveau {lesson.level} · {lesson.xp} XP
                  </p>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    completed
                      ? 'text-green-600'
                      : 'text-slate-500'
                  }`}
                >
                  {completed ? '✓ Terminée' : 'À faire'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
