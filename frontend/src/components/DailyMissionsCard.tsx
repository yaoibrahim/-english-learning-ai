
import { Link } from 'react-router-dom'
import { useDailyMissions } from '../hooks/useDailyMissions'

export default function DailyMissionsCard() {
  const {
    missions,
    completedCount,
    totalCount,
    percentage,
    allCompleted,
  } = useDailyMissions()

  return (
    <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-amber-600">
            Défis quotidiens
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
            🏆 Mes missions du jour
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Réussis des exercices pour terminer tes missions.
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-4 py-2 font-extrabold text-amber-800">
          {completedCount}/{totalCount}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm font-bold text-slate-700">
          <span>Progression des missions</span>
          <span>{percentage}%</span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {missions.map(mission => (
          <article
            key={mission.id}
            className={`rounded-xl border-2 p-4 ${
              mission.completed
                ? 'border-green-300 bg-green-50'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{mission.icon}</span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900">
                    {mission.title}
                  </h3>

                  <span className="text-sm font-bold text-amber-700">
                    {mission.reward} points
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-600">
                  {mission.description}
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{
                      width: `${
                        (mission.progress / mission.target) * 100
                      }%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>
                    {mission.progress}/{mission.target} exercices
                  </span>

                  <span
                    className={
                      mission.completed
                        ? 'text-green-700'
                        : 'text-slate-500'
                    }
                  >
                    {mission.completed
                      ? '✓ Mission terminée'
                      : 'En cours'}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {allCompleted ? (
        <div className="mt-6 rounded-xl bg-green-100 p-4 text-center font-bold text-green-800">
          🎉 Bravo ! Tu as terminé toutes les missions du jour.
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          💡 Chaque exercice réussi te rapproche de tes récompenses.
        </div>
      )}

      <Link
        to="/path"
        className="mt-5 inline-block rounded-xl bg-amber-600 px-5 py-3 font-bold text-white hover:bg-amber-700"
      >
        🚀 Réaliser une mission →
      </Link>
    </section>
  )
}
