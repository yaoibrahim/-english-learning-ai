
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NumbersLesson from '../components/lessons/NumbersLesson'
import NumbersQuiz from '../components/quiz/NumbersQuiz'
import { useProgress } from '../hooks/useProgress'
import {
  NUMBERS_ACTIVITY_ID,
  NUMBERS_ACTIVITY_XP,
} from '../data/activities'

type NumbersStep = 'course' | 'quiz'

export default function Numbers() {
  const [step, setStep] = useState<NumbersStep>('course')
  const { completedLessons } = useProgress()

  const completed = completedLessons.includes(
    NUMBERS_ACTIVITY_ID
  )

  function changeStep(nextStep: NumbersStep) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    setStep(nextStep)
  }

  return (
    <section className="space-y-6">
      <Link
        to="/"
        className="inline-block rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-800 hover:bg-slate-300"
      >
        ← Retour à l'accueil
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="font-semibold text-blue-600">
          Niveau A0 — Débutant absolu
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          🔢 Apprendre les nombres anglais
        </h1>

        <p className="mt-3 text-slate-600">
          Apprends à compter de 0 à 100, puis valide
          tes connaissances avec un quiz.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-amber-100 px-4 py-2 font-semibold text-amber-700">
            ⭐ {NUMBERS_ACTIVITY_XP} XP
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
          onClick={() => changeStep('course')}
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
          onClick={() => changeStep('quiz')}
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
        <NumbersLesson />
      ) : (
        <NumbersQuiz />
      )}
    </section>
  )
}
