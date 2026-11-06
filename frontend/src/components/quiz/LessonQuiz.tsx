
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
  const [finished, setFinished] = useState(false)

  if (questions.length === 0) {
    return <p>Aucune question disponible.</p>
  }

  const currentQuestion = questions[currentIndex]
  const requiredScore = Math.ceil(questions.length * 0.8)

  function pronounce(word: string) {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(word)
    speech.lang = 'en-US'
    speech.rate = 0.85

    window.speechSynthesis.speak(speech)
  }

  function validateAnswer() {
    if (selectedAnswer === null) return

    const isCorrect =
      selectedAnswer === currentQuestion.translation

    const newScore = score + (isCorrect ? 1 : 0)

    setScore(newScore)

    if (currentIndex === questions.length - 1) {
      setFinished(true)

      if (newScore >= requiredScore) {
        onSuccess()
      }
    } else {
      setCurrentIndex(index => index + 1)
      setSelectedAnswer(null)
    }
  }

  function restartQuiz() {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const passed = score >= requiredScore

    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-3xl font-bold">
          {passed ? '🎉 Leçon réussie !' : 'Continue tes efforts !'}
        </h2>

        <p className="mt-4 text-xl">
          Ton score : {score}/{questions.length}
        </p>

        <p className="mt-2 text-slate-600">
          Il faut au moins {requiredScore} bonnes réponses.
        </p>

        <button
          onClick={restartQuiz}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Recommencer
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
        onClick={() => pronounce(currentQuestion.word)}
        className="mt-3 rounded-lg bg-blue-50 px-4 py-2 text-blue-700"
      >
        🔊 Écouter
      </button>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => setSelectedAnswer(option)}
            className={`rounded-xl border-2 p-4 text-left transition ${
              selectedAnswer === option
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={validateAnswer}
        disabled={selectedAnswer === null}
        className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Valider ma réponse
      </button>
    </div>
  )
}
