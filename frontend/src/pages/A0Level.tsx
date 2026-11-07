
import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MixedQuiz from '../components/path/MixedQuiz'
import {
  A0_PASS_PERCENTAGE,
  getA0Level,
} from '../data/a0Levels'
import { getA0QuestionsForLevel } from '../data/a0Questions'
import {
  completeA0Level,
  useA0Progress,
} from '../hooks/useA0Progress'

type QuizResult = {
  score: number
  total: number
  alreadyCompleted: boolean
}

export default function A0Level() {
  const { levelId } = useParams()
  const id = Number(levelId)
  const level = getA0Level(id)

  const { completedIds, isUnlocked } = useA0Progress()

  const [questions, setQuestions] = useState(() =>
    getA0QuestionsForLevel(id)
  )

  const [result, setResult] = useState<QuizResult | null>(null)
  const [attempt, setAttempt] = useState(0)

  // Évite de comptabiliser deux fois le même quiz.
  const finishedRef = useRef(false)

  function finish(score: number, total: number) {
    if (finishedRef.current || total <= 0) return

    finishedRef.current = true

    const percentage = Math.round((score / total) * 100)
    const passed = percentage >= A0_PASS_PERCENTAGE
    const alreadyCompleted = completedIds.has(id)

    if (passed) {
      completeA0Level(id)
    }

    setResult({
      score,
      total,
      alreadyCompleted,
    })
  }

  function restart() {
  finishedRef.current = false
  setAttempt(previous => previous + 1)
  setQuestions(getA0QuestionsForLevel(id))
  setResult(null)
}

  if (!level) {
    return (
      <div className="rounded-xl bg-red-50 p-6">
        Niveau introuvable.
        <Link to="/path" className="ml-2 text-blue-600">
          Retour au parcours
        </Link>
      </div>
    )
  }

  if (!isUnlocked(level.id)) {
    return (
      <div className="space-y-4 rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🔒</div>

        <h1 className="text-2xl font-bold">
          Niveau verrouillé
        </h1>

        <p className="text-slate-600">
          Termine le niveau précédent pour continuer.
        </p>

        <Link
          to="/path"
          className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          Retour au parcours
        </Link>
      </div>
    )
  }

  if (result) {
    const percentage = Math.round(
      (result.score / result.total) * 100
    )

    const passed = percentage >= A0_PASS_PERCENTAGE

    return (
      <section className="space-y-6 rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="text-6xl">
          {passed ? '🏆' : '📚'}
        </div>

        <h1 className="text-3xl font-bold">
          {passed
            ? 'Niveau réussi !'
            : 'Continue à t’entraîner !'}
        </h1>

        <p className="text-5xl font-bold text-blue-600">
          {result.score}/{result.total}
        </p>

        <p className="text-slate-600">
          {percentage} % de bonnes réponses
        </p>

        {passed ? (
          <div className="rounded-xl bg-green-50 p-5">
            <p className="font-bold text-green-700">
              ✓ Niveau validé
            </p>

            {result.alreadyCompleted ? (
              <p className="mt-2 text-sm text-green-700">
                🔄 Révision réussie : une pratique quotidienne
                supplémentaire enregistrée.
                Aucun nouvel XP de niveau.
              </p>
            ) : (
              <p className="mt-2 font-semibold text-amber-700">
                ⭐ {level.xp} XP de niveau obtenus
              </p>
            )}

            <p className="mt-3 text-sm text-slate-600">
              Les éventuels XP bonus des missions sont
              ajoutés automatiquement à ton total.
            </p>
          </div>
        ) : (
          <p className="text-red-600">
            Il faut au moins {A0_PASS_PERCENTAGE} %
            pour valider ce niveau.
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={restart}
            className="rounded-lg bg-slate-200 px-5 py-3 font-semibold hover:bg-slate-300"
          >
            🔄 Recommencer
          </button>

          <Link
            to="/path"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Retour au parcours →
          </Link>

          {passed && id < 20 && (
            <Link
              to={`/a0/level/${id + 1}`}
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              Niveau suivant →
            </Link>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <Link
        to="/path"
        className="inline-block rounded-lg bg-slate-200 px-4 py-2 font-medium"
      >
        ← Retour au parcours
      </Link>

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <p className="font-semibold text-blue-100">
          Unité {level.unit} · Niveau {level.id}/20
        </p>

        <h1 className="mt-2 text-2xl font-bold">
          {level.title}
        </h1>

        <p className="mt-2 text-blue-100">
          {level.description}
        </p>

        <p className="mt-3 font-bold">
          ⭐ {level.xp} XP · {level.questionCount} questions
        </p>
      </div>

      <MixedQuiz
  key={`${id}-${attempt}`}
  questions={questions}
  onFinish={finish}
/>
    </section>
  )
}
