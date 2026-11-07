
import { useStreak } from '../hooks/useStreak'

export default function StreakCard() {
  const {
    currentStreak,
    bestStreak,
    practicedToday,
    totalPracticeDays,
  } = useStreak()

  return (
    <section className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-700">
            Ma série quotidienne
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-orange-600">
            🔥 {currentStreak} jour{currentStreak > 1 ? 's' : ''}
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            {practicedToday
              ? 'Bravo ! Tu as pratiqué aujourd’hui.'
              : currentStreak > 0
                ? 'Pratique aujourd’hui pour prolonger ta série.'
                : 'Réussis un exercice pour démarrer ta série.'}
          </p>
        </div>

        <div className="rounded-xl bg-white px-5 py-4 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Meilleur record
          </p>

          <p className="mt-1 text-2xl font-extrabold text-amber-600">
            🏆 {bestStreak}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-orange-200 pt-4">
        <span className="text-sm font-semibold text-slate-700">
          📅 {totalPracticeDays} jour(s) de pratique enregistrés
        </span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-bold ${
            practicedToday
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}
        >
          {practicedToday
            ? '✓ Objectif du jour atteint'
            : '○ En attente de pratique'}
        </span>
      </div>
    </section>
  )
}
