
import { useState } from 'react'
import type { Question } from '../../data/questions'

type Props = {
  questions: Question[]
  onSuccess: () => void
}

export default function LessonQuiz({
  questions,
  onSuccess,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [validated, setValidated] = useState(false)
  const [finished, setFinished] = useState(false)

  if (questions.length === 0) {
    return <p>Aucune question disponible.</p>
  }

  const currentQuestion = questions[currentIndex]
  const requiredScore = Math.ceil(questions.length * 0.8)

  const isCorrect =
    selectedAnswer === currentQuestion.translation

  function pronounce(word: string) {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(word)
    speech.lang = 'en-US'
    speech.rate = 0.85

    window.speechSynthesis.speak(speech)
  }

  function validateAnswer() {
    if (selectedAnswer === null || validated) return

    setValidated(true)

    if (isCorrect) {
      setScore(previous => previous + 1)
    }
  }

  function nextQuestion() {
    if (!validated) return

    if (currentIndex === questions.length - 1) {
      setFinished(true)

      if (score >= requiredScore) {
        onSuccess()
      }
    } else {
      setCurrentIndex(previous => previous + 1)
      setSelectedAnswer(null)
      setValidated(false)
    }
  }

  function restartQuiz() {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setValidated(false)
    setFinished(false)
  }

  if (finished) {
    const passed = score >= requiredScore

    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-3xl font-bold">
          {passed
            ? '🎉 Félicitations !'
            : 'Continue tes efforts !'}
        </h2>

        <p className="mt-4 text-2xl font-semibold">
          Score : {score}/{questions.length}
        </p>

        <p className="mt-3 text-slate-600">
          {passed
            ? 'Tu as réussi cette leçon et débloqué tes XP !'
            : `Il faut au moins ${requiredScore} bonnes réponses pour réussir.`}
        </p>

        <button
          type="button"
          onClick={restartQuiz}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Recommencer le quiz
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="font-semibold text-blue-600">
        Question {currentIndex + 1}/{questions.length}
      </p>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <h2 className="mt-8 text-2xl font-bold">
        Que signifie ce mot ?
      </h2>

      <p className="mt-5 text-3xl font-bold text-blue-600">
        {currentQuestion.word}
      </p>

      <button
        type="button"
        onClick={() => pronounce(currentQuestion.word)}
        className="mt-3 rounded-lg bg-blue-50 px-4 py-2 text-blue-700"
      >
        🔊 Écouter
      </button>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {currentQuestion.options.map(option => {
          const isSelected = selectedAnswer === option
          const isRightOption =
            option === currentQuestion.translation

          let style = 'border-slate-200 hover:border-blue-300'

          if (!validated && isSelected) {
            style = 'border-blue-600 bg-blue-50'
          }

          if (validated && isRightOption) {
            style = 'border-green-600 bg-green-50 text-green-800'
          }

          if (validated && isSelected && !isCorrect) {
            style = 'border-red-600 bg-red-50 text-red-800'
          }

          return (
            <button
              key={option}
              type="button"
              disabled={validated}
              onClick={() => setSelectedAnswer(option)}
              className={`rounded-xl border-2 p-4 text-left transition ${style}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {validated && (
        <div
          className={`mt-6 rounded-xl p-5 ${
            isCorrect
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
          role="status"
        >
          <h3 className="text-lg font-bold">
            {isCorrect
              ? '✓ Bonne réponse !'
              : '✗ Mauvaise réponse'}
          </h3>

          <p className="mt-2">
            <strong>{currentQuestion.word}</strong>
            {' signifie '}
            <strong>{currentQuestion.translation}</strong>.
          </p>

          <p className="mt-2 text-sm">
            {isCorrect
              ? 'Bravo ! Tu as bien mémorisé ce mot.'
              : 'Écoute à nouveau la prononciation et retiens cette traduction.'}
          </p>
        </div>
      )}

      {!validated ? (
        <button
          type="button"
          onClick={validateAnswer}
          disabled={selectedAnswer === null}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Vérifier ma réponse
        </button>
      ) : (
        <button
          type="button"
          onClick={nextQuestion}
          className="mt-8 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          {currentIndex === questions.length - 1
            ? 'Voir mon résultat'
            : 'Question suivante →'}
        </button>
      )}
    </div>
  )
}
