
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FamilyLesson from '../components/lessons/FamilyLesson'
import FamilyQuiz from '../components/quiz/FamilyQuiz'
import FamilySentenceExercise from '../components/exercises/FamilySentenceExercise'
import { useProgress } from '../hooks/useProgress'
import { useFamilyProgress } from '../hooks/useFamilyProgress'
import {
  FAMILY_ACTIVITY_ID,
  FAMILY_ACTIVITY_XP,
} from '../data/activities'

type FamilyStep = 'course' | 'quiz' | 'sentences'

export default function Family() {
  const [step, setStep] = useState<FamilyStep>('course')
  const { completedLessons } = useProgress()
  const { quizPassed, sentencesPassed } = useFamilyProgress()

  const completed = completedLessons.includes(
    FAMILY_ACTIVITY_ID
  )

  function changeStep(nextStep: FamilyStep) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    setStep(nextStep)
  }

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
          👨‍👩‍👧‍👦 La famille en anglais
        </h1>

        <p className="mt-3 text-slate-600">
          Apprends le vocabulaire familial et réussis
          les deux exercices pour valider cette activité.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-amber-100 px-4 py-2 font-semibold text-amber-700">
            ⭐ {FAMILY_ACTIVITY_XP} XP
          </span>

          <span
            className={`rounded-full px-4 py-2 font-semibold ${
              completed
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {completed ? '✓ Terminée' : 'En cours'}
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="font-semibold">
            🧠 Quiz de vocabulaire
          </p>
          <p
            className={`mt-2 text-sm font-semibold ${
              quizPassed ? 'text-green-600' : 'text-slate-500'
            }`}
          >
            {quizPassed ? '✓ Validé' : 'À faire'}
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="font-semibold">
            🧩 Construction de phrases
          </p>
          <p
            className={`mt-2 text-sm font-semibold ${
              sentencesPassed ? 'text-green-600' : 'text-slate-500'
            }`}
          >
            {sentencesPassed ? '✓ Validé' : 'À faire'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => changeStep('course')}
          className={`rounded-xl px-3 py-3 font-semibold ${
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
          className={`rounded-xl px-3 py-3 font-semibold ${
            step === 'quiz'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          🧠 Quiz
        </button>

        <button
          type="button"
          onClick={() => changeStep('sentences')}
          className={`rounded-xl px-3 py-3 font-semibold ${
            step === 'sentences'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          🧩 Phrases
        </button>
      </div>

      {step === 'course' && <FamilyLesson />}
      {step === 'quiz' && <FamilyQuiz />}
      {step === 'sentences' && <FamilySentenceExercise />}
    </section>
  )
}
