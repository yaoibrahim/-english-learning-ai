
import { useState } from 'react'
import { englishNumbers } from '../../data/numbers'
import {
  NUMBERS_ACTIVITY_ID,
  NUMBERS_ACTIVITY_XP,
} from '../../data/activities'
import { completeLesson, useProgress } from '../../hooks/useProgress'

type NumberQuestion = {
  value: number
  answer: string
  options: string[]
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function generateQuestions(): NumberQuestion[] {
  return shuffle(englishNumbers)
    .slice(0, 10)
    .map(number => {
      const wrongAnswers = shuffle(
        englishNumbers.filter(item => item.value !== number.value)
      )
        .slice(0, 3)
        .map(item => item.english)

      return {
        value: number.value,
        answer: number.english,
        options: shuffle([number.english, ...wrongAnswers]),
      }
    })
}

export default function NumbersQuiz() {
  const { completedLessons } = useProgress()

  const [questions, setQuestions] = useState(generateQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const requiredScore = Math.ceil(questions.length * 0.8)

  const alreadyCompleted = completedLessons.includes(
    NUMBERS_ACTIVITY_ID
  )

  function pronounce(text: string) {
    if (!('speechSynthesis' in window)) {
      alert('La synthèse vocale est indisponible.')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.75

    window.speechSynthesis.speak(utterance)
  }

  function selectAnswer(answer: string) {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answer)

    if (answer === currentQuestion.answer) {
      setScore(previous => previous + 1)
    }
  }

  function nextQuestion() {
    if (selectedAnswer === null) return

    if (currentIndex + 1 >= questions.length) {
      if (score >= requiredScore) {
        completeLesson(
          NUMBERS_ACTIVITY_ID,
          NUMBERS_ACTIVITY_XP
        )
      }

      setFinished(true)
    } else {
      setCurrentIndex(previous => previous + 1)
      setSelectedAnswer(null)
    }
  }

  function restart() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    setQuestions(generateQuestions())
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const passed = score >= requiredScore

    return (
      <section className="space-y-6 rounded-2xl border bg-white p-6 text-center shadow-sm">
        <div className="text-5xl">
          {passed ? '🏆' : '📚'}
        </div>

        <h2 className="text-2xl font-bold">
          {passed
            ? 'Quiz des nombres réussi !'
            : 'Continue à t’entraîner !'}
        </h2>

        <p className="text-4xl font-bold text-blue-600">
          {score}/{questions.length}
        </p>

        {passed ? (
          <div className="rounded-xl bg-green-50 p-5">
            <p className="font-bold text-green-700">
              🎉 Activité validée !
            </p>

            <p className="mt-2 text-green-700">
              {alreadyCompleted
                ? 'Les XP de cette activité sont déjà enregistrés.'
                : 'Bravo ! Tu as réussi le quiz.'}
            </p>

            <p className="mt-3 font-semibold text-amber-600">
              ⭐ {NUMBERS_ACTIVITY_XP} XP
              {' '}attribués à la première réussite.
            </p>
          </div>
        ) : (
          <p className="text-slate-600">
            Il faut au moins {requiredScore} bonnes réponses
            pour réussir ce quiz.
          </p>
        )}

        <button
          type="button"
          onClick={restart}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          🔄 Recommencer
        </button>
      </section>
    )
  }

  return (
    <section className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">
          🧠 Quiz des nombres
        </h2>

        <span className="font-semibold text-blue-600">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {alreadyCompleted && (
        <p className="rounded-lg bg-green-50 p-3 font-semibold text-green-700">
          ✓ Activité déjà terminée
        </p>
      )}

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="rounded-xl bg-blue-50 p-6 text-center">
        <p className="text-slate-600">
          Comment écrit-on ce nombre en anglais ?
        </p>

        <p className="mt-4 text-6xl font-bold text-blue-600">
          {currentQuestion.value}
        </p>

        <button
          type="button"
          onClick={() => pronounce(currentQuestion.answer)}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          🔊 Écouter le nombre
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {currentQuestion.options.map(option => {
          const isCorrect = option === currentQuestion.answer
          const isSelected = option === selectedAnswer

          let style =
            'border-slate-200 bg-white hover:bg-slate-50'

          if (selectedAnswer !== null) {
            if (isCorrect) {
              style =
                'border-green-500 bg-green-50 text-green-800'
            } else if (isSelected) {
              style =
                'border-red-500 bg-red-50 text-red-800'
            } else {
              style =
                'border-slate-200 bg-slate-50 text-slate-500'
            }
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => selectAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`rounded-xl border-2 p-4 text-left font-semibold transition ${style}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selectedAnswer !== null && (
        <div
          className={`rounded-xl p-4 ${
            selectedAnswer === currentQuestion.answer
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <p className="font-bold">
            {selectedAnswer === currentQuestion.answer
              ? '✓ Bonne réponse !'
              : '✗ Réponse incorrecte'}
          </p>

          <p className="mt-2">
            Bonne réponse : {currentQuestion.answer}
          </p>

          <button
            type="button"
            onClick={() => pronounce(currentQuestion.answer)}
            className="mt-3 font-semibold underline"
          >
            🔊 Écouter la bonne réponse
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={nextQuestion}
        disabled={selectedAnswer === null}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {currentIndex + 1 === questions.length
          ? 'Voir mon résultat'
          : 'Question suivante →'}
      </button>
    </section>
  )
}
