
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SpeakingQuiz from '../components/speaking/SpeakingQuiz'
import {
  speakingDifficulties,
  type SpeakingDifficulty,
} from '../data/speaking'
import {
  SPEAKING_ACTIVITY_ID,
  SPEAKING_ACTIVITY_XP,
} from '../data/activities'
import { completeLesson, useProgress } from '../hooks/useProgress'

export default function Speaking() {
  const [difficulty, setDifficulty] =
    useState<SpeakingDifficulty>('easy')

  const { completedLessons } = useProgress()

  const alreadyCompleted =
    completedLessons.includes(SPEAKING_ACTIVITY_ID)

  function handleSuccess() {
    completeLesson(
      SPEAKING_ACTIVITY_ID,
      SPEAKING_ACTIVITY_XP
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

      <header className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-7 text-white">
        <p className="font-semibold text-purple-100">
          🎤 Expression orale
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Speaking — Parler anglais
        </h1>

        <p className="mt-3 text-purple-100">
          Écoute une phrase, répète-la dans ton microphone
          et découvre les mots reconnus.
        </p>

        <p className="mt-4 font-bold">
          ⭐ {SPEAKING_ACTIVITY_XP} XP à la première réussite
        </p>
      </header>

      {alreadyCompleted && (
        <div className="rounded-xl bg-green-50 p-4 text-green-700">
          ✅ Activité déjà validée. Tu peux continuer à
          t'entraîner pour tes objectifs quotidiens.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          Choisis ton niveau de difficulté
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          {speakingDifficulties.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDifficulty(item.id)}
              className={`rounded-xl border-2 p-4 text-left ${
                difficulty === item.id
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-slate-200 bg-white hover:border-purple-300'
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

      <SpeakingQuiz
        key={difficulty}
        difficulty={difficulty}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
