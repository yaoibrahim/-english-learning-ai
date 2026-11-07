
import { Link } from 'react-router-dom'
import { extraActivities } from '../data/activities'
import { useLearningStats } from '../hooks/useLearningStats'

export default function Dashboard() {
  const {
    completedIds,
    totalXP,
    completedLessonCount,
    totalLessons,
    completedActivities,
    totalActivities,
    percentage,
    nextLesson,
  } = useLearningStats()

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          📊 Mon tableau de bord
        </h2>

        <p className="mt-2 text-slate-600">
          Suis tes progrès et continue ton apprentissage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            ⭐ XP gagnés
          </p>
          <p className="mt-3 text-3xl font-bold text-amber-600">
            {totalXP}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            📖 Leçons
          </p>
          <p className="mt-3 text-3xl font-bold text-blue-600">
            {completedLessonCount}/{totalLessons}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            🎯 Activités
          </p>
          <p className="mt-3 text-3xl font-bold text-green-600">
            {completedActivities}/{totalActivities}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            📈 Progression
          </p>
          <p className="mt-3 text-3xl font-bold text-purple-600">
            {percentage} %
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold">
            Progression globale
          </h3>
          <span className="font-bold text-blue-600">
            {percentage} %
          </span>
        </div>

        <div
          className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-label="Progression globale"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-600">
          {completedActivities} activité(s) terminée(s)
          sur {totalActivities}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-blue-50 p-6">
          <h3 className="text-xl font-bold">
            📖 Mes leçons
          </h3>

          <p className="mt-3 text-slate-700">
            {nextLesson
              ? `Prochaine leçon : ${nextLesson.title}`
              : 'Toutes les leçons disponibles sont terminées !'}
          </p>

          <Link
            to="/lessons"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Continuer mes leçons →
          </Link>
        </div>

        <div className="rounded-2xl bg-purple-50 p-6">
          <h3 className="text-xl font-bold">
            🎓 Activités A0
          </h3>

          <div className="mt-4 space-y-3">
            {extraActivities.map(activity => {
              const completed = completedIds.has(activity.id)

              return (
                <div
                  key={activity.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm font-medium">
                    {activity.icon} {activity.title}
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      completed
                        ? 'text-green-700'
                        : 'text-slate-500'
                    }`}
                  >
                    {completed ? '✓ Terminée' : 'À faire'}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {extraActivities.map(activity => (
              <Link
                key={activity.id}
                to={activity.path}
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700"
              >
                {activity.icon} Ouvrir
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
