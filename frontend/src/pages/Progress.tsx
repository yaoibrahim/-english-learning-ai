
import { lessons } from '../data/lessons'
import { useProgress } from '../hooks/useProgress'

export default function Progress() {
  const { completedLessons, totalXP } = useProgress()

  const percentage = lessons.length
    ? Math.round(
        (completedLessons.length / lessons.length) * 100
      )
    : 0

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Ma progression
      </h1>

      <p className="text-slate-600">
        Suis ton apprentissage de l'anglais.
      </p>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-slate-600">
          Progression globale
        </p>

        <p className="mt-2 text-3xl font-bold text-blue-600">
          {percentage} %
        </p>

        <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-4 text-slate-600">
          {completedLessons.length} leçons terminées
          sur {lessons.length}
        </p>

        <p className="mt-2 font-semibold text-amber-600">
          ⭐ {totalXP} XP
        </p>
      </div>
    </section>
  )
}
