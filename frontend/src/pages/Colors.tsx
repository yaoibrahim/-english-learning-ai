
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ColorsLesson from '../components/lessons/ColorsLesson'
import ColorsQuiz from '../components/quiz/ColorsQuiz'
import { useProgress } from '../hooks/useProgress'
import {
  COLORS_ACTIVITY_ID,
  COLORS_ACTIVITY_XP,
} from '../data/activities'

type ColorsStep = 'course' | 'quiz'

export default function Colors() {
  const [step, setStep] = useState<ColorsStep>('course')
  const { completedLessons } = useProgress()

  const completed = completedLessons.includes(
    COLORS_ACTIVITY_ID
  )

  return (
    <section className="space-y-6">
      <Link
        to="/"
        className="inline-block rounded-lg bg-slate-200 px-4 py-2 font-medium"
      >
        ← Retour à l'accueil
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="font-semibold text-blue-600">
          Niveau A0 — Débutant absolu
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          🎨 Les couleurs en anglais
        </h1>

        <p className="mt-3 text-slate-600">
          Apprends les couleurs, écoute les exemples,
          puis réussis le quiz.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-amber-100 px-4 py-2 font-semibold text-amber-700">
            ⭐ {COLORS_ACTIVITY_XP} XP
          </span>

          <span
            className={`rounded-full px-4 py-2 font-semibold ${
              completed
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {completed ? '✓ Terminée' : 'À découvrir'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setStep('course')}
          className={`rounded-xl px-4 py-3 font-semibold ${
            step === 'course'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          📖 Cours
        </button>

        <button
          type="button"
          onClick={() => setStep('quiz')}
          className={`rounded-xl px-4 py-3 font-semibold ${
            step === 'quiz'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          🧠 Quiz
        </button>
      </div>

      {step === 'course' ? (
        <ColorsLesson />
      ) : (
        <ColorsQuiz />
      )}
    </section>
  )
}
