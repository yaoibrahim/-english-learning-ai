
import { useState } from 'react'
import { lessons } from '../data/lessons'
import { questions } from '../data/questions'
import { completeLesson, useProgress } from '../hooks/useProgress'
import LessonQuiz from '../components/quiz/LessonQuiz'

export default function Lesson() {
  const { completedLessons } = useProgress()
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null)

  const activeLesson = lessons.find(
    lesson => lesson.id === activeLessonId
  )

  const lessonQuestions = questions.filter(
    question => question.lessonId === activeLessonId
  )

  function handleSuccess() {
    if (!activeLesson) return

    completeLesson(activeLesson.id, activeLesson.xp)
  }

  if (activeLesson) {
    return (
      <section className="space-y-6">
        <button
          onClick={() => setActiveLessonId(null)}
          className="rounded-lg bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300"
        >
          ← Retour aux leçons
        </button>

        <div>
          <p className="font-semibold text-blue-600">
            Niveau {activeLesson.level}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {activeLesson.title}
          </h1>

          <p className="mt-2 text-slate-600">
            {activeLesson.description}
          </p>
        </div>

        <LessonQuiz
          key={activeLesson.id}
          questions={lessonQuestions}
          onSuccess={handleSuccess}
        />
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Mes leçons
      </h1>

      <p className="text-slate-600">
        Choisis une leçon pour commencer ton apprentissage.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map(lesson => {
          const isCompleted = completedLessons.includes(lesson.id)

          const hasQuestions = questions.some(
            question => question.lessonId === lesson.id
          )

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

              {isCompleted && (
                <p className="mt-3 font-semibold text-green-600">
                  ✓ Leçon terminée
                </p>
              )}

              <button
                onClick={() => setActiveLessonId(lesson.id)}
                disabled={!hasQuestions}
                className={`mt-5 rounded-lg px-5 py-3 font-medium text-white transition ${
                  hasQuestions
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'cursor-not-allowed bg-slate-400'
                }`}
              >
                {!hasQuestions
                  ? 'Bientôt disponible'
                  : isCompleted
                    ? 'Rejouer la leçon'
                    : 'Commencer la leçon'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
