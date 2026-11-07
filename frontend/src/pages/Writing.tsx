
import { useState } from 'react'
import { Link } from 'react-router-dom'
import WritingQuiz from '../components/writing/WritingQuiz'
import {
  writingDifficulties,
  type WritingDifficulty,
} from '../data/writing'
import {
  WRITING_ACTIVITY_ID,
  WRITING_ACTIVITY_XP,
} from '../data/activities'
import { completeLesson, useProgress } from '../hooks/useProgress'

export default function Writing() {
  const [difficulty, setDifficulty] =
    useState<WritingDifficulty>('easy')

  const { completedLessons } = useProgress()

  const alreadyCompleted =
    completedLessons.includes(WRITING_ACTIVITY_ID)

  function handleSuccess() {
    completeLesson(
      WRITING_ACTIVITY_ID,
      WRITING_ACTIVITY_XP
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-block rounded-xl bg-slate-200 px-4 py-2 font-medium"
      >
        ← Accueil
      </Link>

      <header className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-7 text-white">
        <p className="font-semibold text-blue-100">
          ✍️ Expression écrite
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Writing — Écrire en anglais
        </h1>

        <p className="mt-3 text-blue-100">
          Traduis des phrases françaises en anglais,
          découvre tes erreurs et améliore ta grammaire.
        </p>

        <p className="mt-4 font-bold">
          ⭐ {WRITING_ACTIVITY_XP} XP à la première réussite
        </p>
      </header>

      {alreadyCompleted && (
        <div className="rounded-xl bg-green-50 p-4 text-green-700">
          ✅ Activité déjà validée. Tu peux refaire les exercices
          pour progresser dans tes objectifs quotidiens.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          Choisis ton niveau de difficulté
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          {writingDifficulties.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDifficulty(item.id)}
              className={`rounded-xl border-2 p-4 text-left ${
                difficulty === item.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <p className="font-bold">{item.label}</p>
              <p className="mt-1 text-sm text-slate-600">
                {item.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      <WritingQuiz
        key={difficulty}
        difficulty={difficulty}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
