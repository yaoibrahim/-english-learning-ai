import { useRef, useState } from 'react'
import {
  recordReviewAnswer,
  type ReviewItem,
} from '../../hooks/useSmartReview'

type Props = {
  exercises: ReviewItem[]
  onSuccess: () => void
  onClose: () => void
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function SmartReviewQuiz({ exercises, onSuccess, onClose }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const rewarded = useRef(false)
  const processing = useRef(false)
  const current = exercises[index]

  function verify() {
    if (!current || checked || processing.current) return
    if (current.format === 'choice' && selected === null) return
    if (current.format === 'text' && !answer.trim()) return

    const actual = current.format === 'choice'
      ? (current.options?.[selected ?? -1] ?? '')
      : answer
    const candidates = [current.correctAnswer, ...(current.acceptedAnswers ?? [])]
    const correct = candidates.some(candidate => normalize(candidate) === normalize(actual))
    setIsCorrect(correct)
    setChecked(true)
    recordReviewAnswer(current.id, correct)
  }

  function next() {
    if (!checked || processing.current) return
    processing.current = true
    const newCount = correctCount + (isCorrect ? 1 : 0)
    setCorrectCount(newCount)
    if (index + 1 === exercises.length) {
      setFinished(true)
      if (newCount / exercises.length >= 0.8 && !rewarded.current) {
        rewarded.current = true
        onSuccess()
      }
    } else {
      setIndex(value => value + 1)
      setSelected(null)
      setAnswer('')
      setChecked(false)
      setIsCorrect(false)
    }
    processing.current = false
  }

  if (!exercises.length) return null
  if (finished) {
    const percentage = Math.round(correctCount / exercises.length * 100)
    return (
      <section className="space-y-4 rounded-2xl bg-white p-7 text-center shadow-sm">
        <div className="text-5xl">{percentage >= 80 ? '🏆' : '💪'}</div>
        <h2 className="text-2xl font-bold">Séance terminée</h2>
        <p className="text-3xl font-bold text-violet-700">{correctCount}/{exercises.length}</p>
        <p>{percentage} % de bonnes réponses</p>
        <p className="text-sm text-slate-600">
          Les réponses correctes seront proposées plus tard. Les erreurs restent à revoir.
        </p>
        <button type="button" onClick={onClose} className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white">
          Retour à mes révisions →
        </button>
      </section>
    )
  }
  if (!current) return null

  return (
    <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">🧠 Question {index + 1}/{exercises.length}</h2>
        <span className="text-sm font-semibold text-violet-700">{current.source.toUpperCase()}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full bg-violet-600" style={{ width: `${(index + 1) / exercises.length * 100}%` }} />
      </div>

      {current.context && (
        <details open className="rounded-xl bg-indigo-50 p-4">
          <summary className="cursor-pointer font-semibold">📖 Texte de référence</summary>
          <p className="mt-3 whitespace-pre-wrap leading-7">{current.context}</p>
        </details>
      )}

      <h3 className="text-lg font-bold">{current.prompt}</h3>

      {current.format === 'choice' ? (
        <div className="grid gap-3">
          {(current.options ?? []).map((option, optionIndex) => (
            <button
              type="button"
              key={`${current.id}-${optionIndex}`}
              disabled={checked}
              onClick={() => setSelected(optionIndex)}
              className={`rounded-xl border-2 p-3 text-left transition ${
                checked && normalize(option) === normalize(current.correctAnswer)
                  ? 'border-green-600 bg-green-50'
                  : checked && selected === optionIndex && !isCorrect
                    ? 'border-red-500 bg-red-50'
                    : selected === optionIndex
                      ? 'border-violet-600 bg-violet-50'
                      : 'border-slate-200 hover:border-violet-300'
              }`}
            >
              {String.fromCharCode(65 + optionIndex)}. {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <label htmlFor="review-answer" className="block font-medium">Écris ta réponse :</label>
          <textarea
            id="review-answer"
            rows={3}
            disabled={checked}
            value={answer}
            onChange={event => setAnswer(event.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 p-3 focus:border-violet-500"
            placeholder="Ta réponse en anglais..."
          />
        </div>
      )}

      {!checked ? (
        <button
          type="button"
          onClick={verify}
          disabled={current.format === 'choice' ? selected === null : !answer.trim()}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          Vérifier
        </button>
      ) : (
        <div className={`space-y-3 rounded-xl p-4 ${isCorrect ? 'bg-green-50' : 'bg-amber-50'}`}>
          <p className="font-bold">{isCorrect ? '✅ Bonne réponse !' : '📚 À retravailler'}</p>
          <p><strong>Bonne réponse :</strong> {current.correctAnswer}</p>
          {current.explanation && <p className="text-sm">{current.explanation}</p>}
          <p className="text-xs text-slate-600">
            {isCorrect ? 'La prochaine révision est programmée.' : 'Cette question reste disponible pour une nouvelle révision.'}
          </p>
          <button type="button" onClick={next} className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white">
            {index + 1 === exercises.length ? 'Voir mon résultat →' : 'Question suivante →'}
          </button>
        </div>
      )}
    </section>
  )
}
