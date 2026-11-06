
import { lessons } from '../data/lessons'
import { completeLesson, useProgress } from '../hooks/useProgress'

export default function Lesson() {
  const { completedLessons } = useProgress()

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Mes leçons
      </h1>

      <p className="text-slate-600">
        Découvre les cours disponibles pour apprendre l'anglais.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map(lesson => {
          const isCompleted = completedLessons.includes(lesson.id)

          return (
            <article
              key={lesson.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-blue-600">
                Niveau {lesson.level} · {lesson.category}
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {lesson.title}
              </h2>

              <p className="mt-2 text-slate-600">
                {lesson.description}
              </p>

              <p className="mt-4 font-semibold text-amber-600">
                ⭐ {lesson.xp} XP
              </p>

              {/* Statut de la leçon */}
              {isCompleted && (
                <p className="mt-3 font-medium text-green-600">
                  ✓ Leçon terminée
                </p>
              )}

              {/* Bouton pour terminer la leçon */}
              <button
                type="button"
                onClick={() => completeLesson(lesson.id, lesson.xp)}
                disabled={isCompleted}
                className={`mt-4 rounded-lg px-4 py-2 font-medium text-white transition ${
                  isCompleted
                    ? 'cursor-not-allowed bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isCompleted
                  ? '✓ Terminée'
                  : 'Terminer la leçon'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
