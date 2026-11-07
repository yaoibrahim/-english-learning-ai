import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReadingQuiz from '../components/reading/ReadingQuiz'
import {
  readingDifficulties,
  type ReadingDifficulty,
} from '../data/reading'
import {
  READING_ACTIVITY_ID,
  READING_ACTIVITY_XP,
} from '../data/activities'
import { completeLesson, useProgress } from '../hooks/useProgress'

export default function Reading() {
  const [difficulty, setDifficulty] = useState<ReadingDifficulty>('easy')
  const { completedLessons } = useProgress()
  const alreadyCompleted = completedLessons.includes(READING_ACTIVITY_ID)

  function handleSuccess() {
    completeLesson(READING_ACTIVITY_ID, READING_ACTIVITY_XP)
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-block rounded-xl bg-slate-200 px-4 py-2 font-medium hover:bg-slate-300"
      >
        ← Accueil
      </Link>

      <header className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-7 text-white">
        <p className="font-semibold text-emerald-100">📖 Compréhension écrite</p>
        <h1 className="mt-2 text-3xl font-bold">Reading — Lire en anglais</h1>
        <p className="mt-3 text-emerald-100">
          Lis deux textes en anglais, réponds à dix questions et découvre
          les explications de chaque réponse.
        </p>
        <p className="mt-4 font-bold">
          ⭐ {READING_ACTIVITY_XP} XP à la première réussite
        </p>
      </header>

      {alreadyCompleted && (
        <div className="rounded-xl bg-green-50 p-4 text-green-700">
          ✅ Activité déjà validée. Les nouvelles réussites comptent toujours
          pour tes objectifs quotidiens, sans redonner les 30 XP de base.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Choisis ton niveau de difficulté</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {readingDifficulties.map(item => (
            <button
              key={item.id}
              type="button"
              aria-pressed={difficulty === item.id}
              onClick={() => setDifficulty(item.id)}
              className={`rounded-xl border-2 p-4 text-left transition ${
                difficulty === item.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:border-emerald-300'
              }`}
            >
              <p className="font-bold">{item.label}</p>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </button>
          ))}
        </div>
      </section>

      <ReadingQuiz
        key={difficulty}
        difficulty={difficulty}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
