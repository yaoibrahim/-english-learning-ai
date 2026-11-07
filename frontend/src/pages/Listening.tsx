
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ListeningQuiz from '../components/listening/ListeningQuiz'
import {
  listeningDifficulties,
  type ListeningDifficulty,
} from '../data/listening'
import {
  LISTENING_ACTIVITY_ID,
  LISTENING_ACTIVITY_XP,
} from '../data/activities'
import { completeLesson, useProgress } from '../hooks/useProgress'

export default function Listening() {
  const [difficulty, setDifficulty] =
    useState<ListeningDifficulty>('easy')

  const { completedLessons } = useProgress()
  const alreadyCompleted =
    completedLessons.includes(LISTENING_ACTIVITY_ID)

  function handleSuccess() {
    completeLesson(
      LISTENING_ACTIVITY_ID,
      LISTENING_ACTIVITY_XP
    )
  }

  return (
    <main className="space-y-6">
      <Link
        to="/"
        className="inline-block rounded-xl bg-slate-200 px-4 py-2 font-medium text-slate-800"
      >
        ← Accueil
      </Link>

      <header className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-7 text-white">
        <p className="font-semibold text-indigo-100">
          🎧 Compréhension orale
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Listening — Écouter l'anglais
        </h1>

        <p className="mt-3 text-indigo-100">
          Écoute des phrases en anglais et retrouve
          leur traduction en français.
        </p>

        <p className="mt-4 font-bold">
          ⭐ {LISTENING_ACTIVITY_XP} XP à la première réussite
        </p>
      </header>

      {alreadyCompleted && (
        <div className="rounded-xl bg-green-50 p-4 font-medium text-green-700">
          ✅ Activité déjà validée. Tu peux continuer à
          t'entraîner pour progresser dans tes missions quotidiennes.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold">
          Choisis ton niveau de difficulté
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          {listeningDifficulties.map(item => {
            const active = difficulty === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDifficulty(item.id)}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  active
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <p className="font-bold">{item.label}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {item.description}
                </p>
              </button>
            )
          })}
        </div>
      </section>

      <ListeningQuiz
        key={difficulty}
        difficulty={difficulty}
        onSuccess={handleSuccess}
      />
    </main>
  )
}
