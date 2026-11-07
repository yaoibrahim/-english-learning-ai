
import { useState } from 'react'
import { alphabet } from '../../data/alphabet'
import {
  ALPHABET_ACTIVITY_ID,
  ALPHABET_ACTIVITY_XP,
} from '../../data/activities'
import {
  completeLesson,
  useProgress,
} from '../../hooks/useProgress'

type AlphabetQuestion = {
  letter: string
  correctAnswer: string
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

function generateQuestions(): AlphabetQuestion[] {
  return shuffle(alphabet)
    .slice(0, 10)
    .map(item => {
      const wrongAnswers = shuffle(
        alphabet.filter(letter => letter.letter !== item.letter)
      )
        .slice(0, 3)
        .map(letter => letter.example)

      return {
        letter: item.letter,
        correctAnswer: item.example,
        options: shuffle([item.example, ...wrongAnswers]),
      }
    })
}

export default function AlphabetQuiz() {
  const { completedLessons } = useProgress()

  const [questions, setQuestions] = useState(generateQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[currentIndex]
  const requiredScore = Math.ceil(questions.length * 0.8)

  const alphabetCompleted = completedLessons.includes(
    ALPHABET_ACTIVITY_ID
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

    if (answer === currentQuestion.correctAnswer) {
      setScore(previous => previous + 1)
    }
  }

  function nextQuestion() {
    if (selectedAnswer === null) return

    if (currentIndex + 1 >= questions.length) {
      if (score >= requiredScore) {
        completeLesson(
          ALPHABET_ACTIVITY_ID,
          ALPHABET_ACTIVITY_XP
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
            ? 'Quiz de l’alphabet réussi !'
            : 'Continue à t’entraîner !'}
        </h2>

        <p className="text-4xl font-bold text-blue-600">
          {score}/{questions.length}
        </p>

        {passed ? (
          <div className="rounded-xl bg-green-50 p-5">
            <p className="font-bold text-green-700">
              🎉 Alphabet validé !
            </p>

            <p className="mt-2 text-green-700">
              {alphabetCompleted
                ? 'Cette activité est terminée. Aucun XP supplémentaire.'
                : 'Bravo ! Tu as réussi le quiz.'}
            </p>

            <p className="mt-2 font-semibold text-amber-600">
              ⭐ {ALPHABET_ACTIVITY_XP} XP
              {' '}attribués lors de la première réussite.
            </p>
          </div>
        ) : (
          <p className="text-slate-600">
            Il faut au moins {requiredScore} bonnes réponses
            pour valider l'alphabet.
          </p>
        )}

        <button
          type="button"
          onClick={restart}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          🔄 Recommencer le quiz
        </button>
      </section>
    )
  }

  return (
    <section className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">
          🧠 Quiz de l'alphabet
        </h2>

        <span className="font-semibold text-blue-600">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {alphabetCompleted && (
        <p className="rounded-lg bg-green-50 p-3 font-semibold text-green-700">
          ✓ Alphabet déjà validé
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
          Quel mot anglais est associé à cette lettre ?
        </p>

        <p className="mt-4 text-6xl font-bold text-blue-600">
          {currentQuestion.letter}
        </p>

        <button
          type="button"
          onClick={() => pronounce(currentQuestion.letter)}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          🔊 Écouter la lettre
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {currentQuestion.options.map(option => {
          const isCorrect =
            option === currentQuestion.correctAnswer

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
            selectedAnswer === currentQuestion.correctAnswer
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <p className="font-bold">
            {selectedAnswer === currentQuestion.correctAnswer
              ? '✓ Bonne réponse !'
              : '✗ Réponse incorrecte'}
          </p>

          <p className="mt-2">
            Bonne réponse : {currentQuestion.correctAnswer}
          </p>

          <button
            type="button"
            onClick={() =>
              pronounce(currentQuestion.correctAnswer)
            }
            className="mt-3 font-semibold underline"
          >
            🔊 Écouter le mot
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
