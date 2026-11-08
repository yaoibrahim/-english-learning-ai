import { playFeedback } from '../../lib/audioFeedback'
import { useMemo, useRef, useState } from 'react'
import { recordReviewMistake } from '../../hooks/useSmartReview'
import {
  writingQuestions,
  type WritingDifficulty,
  type WritingQuestion,
} from '../../data/writing'

type Props = {
  difficulty: WritingDifficulty
  onSuccess: () => void
}

type Correction = {
  accepted: boolean
  similarity: number
  expected: string
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function compareWords(expected: string, actual: string): number {
  const a = normalize(expected).split(' ').filter(Boolean)
  const b = normalize(actual).split(' ').filter(Boolean)
  if (!a.length) return 0

  const dp = Array.from(
    { length: a.length + 1 },
    () => Array<number>(b.length + 1).fill(0)
  )
  for (let i = 0; i <= a.length; i++) dp[i][0] = i
  for (let j = 0; j <= b.length; j++) dp[0][j] = j

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      )
    }
  }

  return Math.max(
    0,
    Math.round((1 - dp[a.length][b.length] / Math.max(a.length, b.length)) * 100)
  )
}

function checkAnswer(question: WritingQuestion, answer: string): Correction {
  const candidates = [question.english, ...(question.acceptedAnswers ?? [])]
  return {
    accepted: candidates.some(candidate => normalize(candidate) === normalize(answer)),
    similarity: Math.max(...candidates.map(candidate => compareWords(candidate, answer))),
    expected: question.english,
  }
}

export default function WritingQuiz({ difficulty, onSuccess }: Props) {
  const questions = useMemo(
    () => writingQuestions.filter(question => question.difficulty === difficulty),
    [difficulty]
  )
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [correction, setCorrection] = useState<Correction | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const rewardedRef = useRef(false)
  const advancingRef = useRef(false)
  const question = questions[index]

  function verify() {
    if (!question || !answer.trim() || correction) return
    const result = checkAnswer(question, answer)
    playFeedback(result.accepted ? 'correct' : 'incorrect')
    if (!result.accepted) {
      recordReviewMistake({
        id: `writing:${question.id}`,
        source: 'writing',
        format: 'text',
        prompt: question.french,
        correctAnswer: question.english,
        acceptedAnswers: question.acceptedAnswers ?? [],
        explanation: question.hint,
      })
    }
    setCorrection(result)
  }

  function next() {
    if (!correction || advancingRef.current) return
    advancingRef.current = true

    const nextCorrectCount = correctCount + (correction.accepted ? 1 : 0)
    setCorrectCount(nextCorrectCount)

    if (index + 1 >= questions.length) {
      setFinished(true)
      if (nextCorrectCount / questions.length >= 0.8 && !rewardedRef.current) {
        rewardedRef.current = true
        onSuccess()
      }
    } else {
      setIndex(previous => previous + 1)
      setAnswer('')
      setCorrection(null)
      setShowHint(false)
    }

    advancingRef.current = false
  }

  function restart() {
    rewardedRef.current = false
    advancingRef.current = false
    setIndex(0)
    setAnswer('')
    setCorrection(null)
    setCorrectCount(0)
    setFinished(false)
    setShowHint(false)
    setAttempt(previous => previous + 1)
  }

  if (!questions.length) return <p>Aucune phrase disponible pour ce niveau.</p>

  if (finished) {
    const percentage = Math.round(correctCount / questions.length * 100)
    const passed = percentage >= 80
    return (
      <section className="space-y-5 rounded-2xl bg-white p-6 text-center shadow-sm">
        <div className="text-6xl">{passed ? '🏆' : '📚'}</div>
        <h2 className="text-2xl font-bold">
          {passed ? 'Writing réussi !' : 'Continue à t’entraîner !'}
        </h2>
        <p className="text-4xl font-bold text-blue-600">{correctCount}/{questions.length}</p>
        <p className="text-slate-600">{percentage} % de réponses correctes</p>
        <p className={passed ? 'text-green-700' : 'text-amber-700'}>
          {passed
            ? 'Bravo ! Cette réussite compte pour ton objectif quotidien.'
            : 'Il faut au moins 80 % pour réussir ce quiz.'}
        </p>
        <button
          type="button"
          onClick={restart}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          🔄 Recommencer
        </button>
      </section>
    )
  }

  if (!question) return null
  return (
    <section key={attempt} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-bold">Phrase {index + 1}/{questions.length}</span>
        <span className="font-semibold text-green-700">{correctCount} bonne(s) réponse(s)</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>
      <div className="rounded-2xl bg-blue-50 p-6 text-center">
        <p className="text-sm font-semibold text-blue-700">Traduis cette phrase en anglais</p>
        <h2 className="mt-3 text-2xl font-bold">{question.french}</h2>
      </div>
      <div className="space-y-3">
        <label htmlFor="writing-answer" className="block font-semibold text-slate-700">
          Ta réponse en anglais
        </label>
        <textarea
          id="writing-answer"
          value={answer}
          onChange={event => setAnswer(event.target.value)}
          disabled={correction !== null}
          rows={3}
          placeholder="Écris ta traduction ici..."
          className="w-full rounded-xl border-2 border-slate-200 p-4 outline-none focus:border-blue-500 disabled:bg-slate-100"
        />
        {!correction && (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={verify}
              disabled={!answer.trim()}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              Vérifier ma réponse
            </button>
            <button
              type="button"
              onClick={() => setShowHint(previous => !previous)}
              className="rounded-xl bg-amber-100 px-5 py-3 font-semibold text-amber-800"
            >
              💡 {showHint ? 'Masquer l’indice' : 'Voir un indice'}
            </button>
          </div>
        )}
        {showHint && !correction && (
          <p className="rounded-xl bg-amber-50 p-4 text-amber-900">💡 {question.hint}</p>
        )}
      </div>
      {correction && (
        <div className={`space-y-3 rounded-xl p-5 ${
          correction.accepted ? 'bg-green-50' : 'bg-amber-50'
        }`}>
          <h3 className="font-bold">
            {correction.accepted ? '✅ Bonne réponse !' : '📚 Voici la correction'}
          </h3>
          <p><strong>Ta réponse :</strong> {answer}</p>
          <p><strong>Réponse attendue :</strong> {correction.expected}</p>
          <p className="text-sm text-slate-600">Correspondance des mots : {correction.similarity} %</p>
          {!correction.accepted && (
            <p className="text-sm text-amber-800">
              Cette réponse n'est pas dans les variantes acceptées.
              Compare-la à la correction pour progresser.
            </p>
          )}
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            {index + 1 === questions.length ? 'Voir mon résultat →' : 'Phrase suivante →'}
          </button>
        </div>
      )}
    </section>
  )
}
