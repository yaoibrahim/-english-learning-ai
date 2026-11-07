
import { useState } from 'react'
import { familyWords } from '../../data/family'
import { FAMILY_ACTIVITY_XP } from '../../data/activities'
import {
  markFamilyQuizPassed,
  useFamilyProgress,
} from '../../hooks/useFamilyProgress'

type FamilyQuestion = {
  id: number
  english: string
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

function generateQuestions(): FamilyQuestion[] {
  return shuffle(familyWords)
    .slice(0, 10)
    .map(word => {
      const wrongAnswers = shuffle(
        familyWords.filter(item => item.id !== word.id)
      )
        .slice(0, 3)
        .map(item => item.french)

      return {
        id: word.id,
        english: word.english,
        answer: word.french,
        options: shuffle([word.french, ...wrongAnswers]),
      }
    })
}

export default function FamilyQuiz() {
  const { sentencesPassed } = useFamilyProgress()

  const [questions, setQuestions] = useState(generateQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const requiredScore = 8

  function pronounce(text: string) {
    if (!('speechSynthesis' in window)) return

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

    if (currentIndex + 1 === questions.length) {
      if (score >= requiredScore) {
        markFamilyQuizPassed()
      }

      setFinished(true)
    } else {
      setCurrentIndex(previous => previous + 1)
      setSelectedAnswer(null)
    }
  }

  function restart() {
    setQuestions(generateQuestions())
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const passed = score >= requiredScore

    return (
      <section className="space-y-6 rounded-2xl bg-white p-6 text-center shadow-sm">
        <div className="text-5xl">
          {passed ? '🏆' : '📚'}
        </div>

        <h2 className="text-2xl font-bold">
          {passed ? 'Quiz réussi !' : 'Continue à apprendre !'}
        </h2>

        <p className="text-4xl font-bold text-blue-600">
          {score}/{questions.length}
        </p>

        {passed ? (
          <div className="rounded-xl bg-green-50 p-5">
            <p className="font-bold text-green-700">
              ✓ Quiz validé !
            </p>

            <p className="mt-3 text-slate-700">
              {sentencesPassed
                ? 'Les deux exercices sont réussis. Activité terminée !'
                : 'Il te reste à réussir les exercices de phrases.'}
            </p>

            <p className="mt-3 font-semibold text-amber-600">
              ⭐ {FAMILY_ACTIVITY_XP} XP après validation des deux exercices.
            </p>
          </div>
        ) : (
          <p className="text-slate-600">
            Il faut au moins 8 bonnes réponses sur 10.
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
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          🧠 Quiz de la famille
        </h2>

        <span className="font-semibold text-blue-600">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="rounded-xl bg-blue-50 p-6 text-center">
        <p className="text-slate-600">
          Que signifie ce mot en français ?
        </p>

        <h3 className="mt-4 text-4xl font-bold text-blue-600">
          {currentQuestion.english}
        </h3>

        <button
          type="button"
          onClick={() => pronounce(currentQuestion.english)}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          🔊 Écouter
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {currentQuestion.options.map(option => {
          const isCorrect = option === currentQuestion.answer
          const isSelected = option === selectedAnswer

          let style = 'border-slate-200 bg-white'

          if (selectedAnswer !== null) {
            if (isCorrect) {
              style = 'border-green-500 bg-green-50 text-green-800'
            } else if (isSelected) {
              style = 'border-red-500 bg-red-50 text-red-800'
            }
          }

          return (
            <button
              key={option}
              type="button"
              disabled={selectedAnswer !== null}
              onClick={() => selectAnswer(option)}
              className={`rounded-xl border-2 p-4 text-left font-semibold ${style}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="rounded-xl bg-blue-50 p-4">
          <p className="font-bold">
            {selectedAnswer === currentQuestion.answer
              ? '✓ Bonne réponse !'
              : '✗ Réponse incorrecte'}
          </p>

          <p className="mt-2">
            Bonne réponse : {currentQuestion.answer}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={nextQuestion}
        disabled={selectedAnswer === null}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300"
      >
        {currentIndex + 1 === questions.length
          ? 'Voir mon résultat'
          : 'Question suivante →'}
      </button>
    </section>
  )
}
