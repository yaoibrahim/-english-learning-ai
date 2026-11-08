import { playFeedback } from '../../lib/audioFeedback'
import { useMemo, useRef, useState } from 'react'
import { recordReviewMistake } from '../../hooks/useSmartReview'
import {
  readingPassages,
  type ReadingDifficulty,
} from '../../data/reading'

type Props = {
  difficulty: ReadingDifficulty
  onSuccess: () => void
}

export default function ReadingQuiz({ difficulty, onSuccess }: Props) {
  // Deux textes de cinq questions = dix questions par niveau.
  const exercises = useMemo(
    () =>
      readingPassages
        .filter(passage => passage.difficulty === difficulty)
        .flatMap(passage =>
          passage.questions.map(question => ({ passage, question }))
        ),
    [difficulty]
  )

  const [position, setPosition] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const rewardedRef = useRef(false)

  const current = exercises[position]

  function verify() {
    const exercise = exercises[position]
    if (!exercise || selected === null || checked) return

    playFeedback(selected === exercise.question.correctIndex ? 'correct' : 'incorrect')
    if (selected === exercise.question.correctIndex) {
      setCorrectCount(previous => previous + 1)
    } else {
      recordReviewMistake({
        id: `reading:${exercise.passage.id}:${exercise.question.id}`,
        source: 'reading',
        format: 'choice',
        prompt: exercise.question.question,
        context: `${exercise.passage.title}\n\n${exercise.passage.text}`,
        options: [...exercise.question.options],
        correctAnswer: exercise.question.options[exercise.question.correctIndex],
        explanation: exercise.question.explanation,
      })
    }
    setChecked(true)
  }

  function nextQuestion() {
    if (!checked) return

    if (position + 1 === exercises.length) {
      setFinished(true)
      const passed = correctCount >= Math.ceil(exercises.length * 0.8)

      // Le hook de progression s'occupe des XP uniques et
      // du comptage quotidien des relectures réussies.
      if (passed && !rewardedRef.current) {
        rewardedRef.current = true
        onSuccess()
      }
      return
    }

    setPosition(previous => previous + 1)
    setSelected(null)
    setChecked(false)
  }

  function restart() {
    rewardedRef.current = false
    setPosition(0)
    setSelected(null)
    setChecked(false)
    setCorrectCount(0)
    setFinished(false)
  }

  if (!exercises.length) {
    return <p>Aucun texte disponible pour ce niveau.</p>
  }

  if (finished) {
    const percentage = Math.round((correctCount / exercises.length) * 100)
    const passed = percentage >= 80

    return (
      <section className="space-y-5 rounded-2xl bg-white p-6 text-center shadow-sm">
        <div className="text-6xl" aria-hidden="true">
          {passed ? '🏆' : '📚'}
        </div>
        <h2 className="text-2xl font-bold">
          {passed ? 'Reading réussi !' : 'Continue à pratiquer !'}
        </h2>
        <p className="text-4xl font-bold text-blue-600">
          {correctCount}/{exercises.length}
        </p>
        <p className="text-slate-600">
          {percentage} % de réponses correctes
        </p>
        <p className={passed ? 'text-green-700' : 'text-amber-700'}>
          {passed
            ? 'Bravo ! Cette réussite est enregistrée dans ta progression.'
            : 'Il faut au moins 8 bonnes réponses sur 10 pour valider.'}
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

  if (!current) return null

  const { passage, question } = current
  const isCorrect = selected === question.correctIndex
  const currentPassageNumber =
    readingPassages
      .filter(item => item.difficulty === difficulty)
      .findIndex(item => item.id === passage.id) + 1

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold">
          <span>Question {position + 1}/{exercises.length}</span>
          <span className="text-blue-700">{correctCount} bonne(s) réponse(s)</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${((position + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      <article className="space-y-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-800">
            Texte {currentPassageNumber}/2 · {passage.level}
          </span>
          <span className="text-sm text-slate-600">📖 Lecture en anglais</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">{passage.title}</h2>

        <div className="space-y-4 leading-8 text-slate-800">
          {passage.text.split('\n\n').map((paragraph, index) => (
            <p key={`${passage.id}-${index}`}>{paragraph}</p>
          ))}
        </div>

        <details className="rounded-xl border border-indigo-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold text-indigo-700">
            📚 Voir le vocabulaire utile
          </summary>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
            {passage.vocabulary.map(item => (
              <li key={item.english}>
                <strong>{item.english}</strong> — {item.french}
              </li>
            ))}
          </ul>
        </details>
      </article>

      <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">{question.question}</h3>
        <p className="text-sm text-slate-500">
          Relis le texte et choisis une seule réponse.
        </p>

        <div className="grid gap-3">
          {question.options.map((option, index) => {
            const selectedOption = selected === index
            const correctOption = checked && index === question.correctIndex
            const wrongOption = checked && selectedOption && !isCorrect

            return (
              <button
                key={`${question.id}-${index}`}
                type="button"
                disabled={checked}
                aria-pressed={selectedOption}
                onClick={() => setSelected(index)}
                className={`rounded-xl border-2 px-4 py-3 text-left font-medium transition disabled:cursor-default ${
                  correctOption
                    ? 'border-green-600 bg-green-50 text-green-900'
                    : wrongOption
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : selectedOption
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <span className="mr-2 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {correctOption ? ' ✅' : wrongOption ? ' ❌' : ''}
              </button>
            )
          })}
        </div>

        {!checked ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={verify}
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Vérifier ma réponse
          </button>
        ) : (
          <div
            role="status"
            className={`space-y-3 rounded-xl p-4 ${
              isCorrect ? 'bg-green-50' : 'bg-amber-50'
            }`}
          >
            <p className="font-bold">
              {isCorrect ? '✅ Bonne réponse !' : '📚 Correction'}
            </p>
            <p>
              <strong>Bonne réponse :</strong>{' '}
              {question.options[question.correctIndex]}
            </p>
            <p className="text-sm text-slate-700">{question.explanation}</p>
            <button
              type="button"
              onClick={nextQuestion}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {position + 1 === exercises.length
                ? 'Voir mon résultat →'
                : 'Question suivante →'}
            </button>
          </div>
        )}
      </section>
    </section>
  )
}
