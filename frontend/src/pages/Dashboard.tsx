
import { Link } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { useProgress } from '../hooks/useProgress'

export default function Dashboard() {
  const { completedLessons, totalXP } = useProgress()

  const totalLessons = lessons.length

  const completedCount = lessons.filter(lesson =>
    completedLessons.includes(lesson.id)
  ).length

  const percentage = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0

  const nextLesson = lessons.find(
    lesson => !completedLessons.includes(lesson.id)
  )

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Mon tableau de bord
        </h2>

        <p className="mt-2 text-slate-600">
          Continue ton apprentissage et suis tes résultats.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Niveau actuel</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            A0
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Points XP</p>
          <p className="mt-2 text-3xl font-bold text-amber-500">
            ⭐ {totalXP}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">Leçons terminées</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {completedCount}/{totalLessons}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex justify-between gap-3">
          <h3 className="font-bold text-slate-900">
            Progression globale
          </h3>
          <span className="font-bold text-blue-600">
            {percentage} %
          </span>
        </div>

        <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <h3 className="text-xl font-bold text-slate-900">
          {nextLesson
            ? 'Ta prochaine leçon'
            : 'Toutes les leçons sont terminées !'}
        </h3>

        {nextLesson ? (
          <>
            <p className="mt-2 font-semibold">
              {nextLesson.title}
            </p>

            <p className="mt-1 text-slate-600">
              {nextLesson.description}
            </p>

            <Link
              to="/lessons"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Voir les leçons
            </Link>
          </>
        ) : (
          <p className="mt-2 text-slate-600">
            Bravo ! Tu as terminé toutes les leçons disponibles.
          </p>
        )}
      </div>
    </section>
  )
}
