
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  listeningQuestions,
  type ListeningDifficulty,
  type ListeningQuestion,
} from '../../data/listening'

type Props = {
  difficulty: ListeningDifficulty
  onSuccess: () => void
}

const PASS_PERCENTAGE = 80

function shuffle<T,>(items: T[]): T[] {
  const copy = [...items]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export default function ListeningQuiz({
  difficulty,
  onSuccess,
}: Props) {
  const questions = useMemo(
    () =>
      shuffle(
        listeningQuestions.filter(
          question => question.difficulty === difficulty
        )
      ).slice(0, 10),
    [difficulty]
  )

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [voiceAvailable, setVoiceAvailable] = useState(true)

  const rewardedRef = useRef(false)

  const orderedQuestions = useMemo(
    () => shuffle(questions),
    [questions, attempt]
  )

  const question: ListeningQuestion | undefined =
    orderedQuestions[index]

  const options = useMemo(
    () => question ? shuffle(question.options) : [],
    [question]
  )

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [difficulty])

  function speak(text: string, slow = false) {
    if (
      !('speechSynthesis' in window) ||
      !('SpeechSynthesisUtterance' in window)
    ) {
      setVoiceAvailable(false)
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = slow ? 0.65 : 0.9
    utterance.pitch = 1

    const voices = window.speechSynthesis.getVoices()
    const englishVoice = voices.find(
      voice => voice.lang.toLowerCase().startsWith('en')
    )

    if (englishVoice) {
      utterance.voice = englishVoice
    }

    window.speechSynthesis.speak(utterance)
  }

  function nextQuestion() {
    if (!question || selected === null) return

    const nextScore =
      score + (selected === question.french ? 1 : 0)

    setScore(nextScore)
    setSelected(null)

    if (index + 1 >= orderedQuestions.length) {
      setFinished(true)

      const percentage = Math.round(
        (nextScore / orderedQuestions.length) * 100
      )

      if (
        percentage >= PASS_PERCENTAGE &&
        !rewardedRef.current
      ) {
        rewardedRef.current = true
        onSuccess()
      }
    } else {
      setIndex(previous => previous + 1)
    }
  }

  function restart() {
    window.speechSynthesis?.cancel()
    rewardedRef.current = false
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAttempt(previous => previous + 1)
  }

  if (finished) {
    const percentage = Math.round(
      (score / orderedQuestions.length) * 100
    )
    const passed = percentage >= PASS_PERCENTAGE

    return (
      <section className="space-y-5 rounded-2xl bg-white p-6 text-center shadow-sm">
        <div className="text-6xl">
          {passed ? '🏆' : '📚'}
        </div>

        <h2 className="text-2xl font-bold">
          {passed ? 'Écoute réussie !' : 'Continue à t’entraîner !'}
        </h2>

        <p className="text-4xl font-bold text-blue-600">
          {score}/{orderedQuestions.length}
        </p>

        <p className="text-slate-600">
          {percentage} % de bonnes réponses
        </p>

        <p className={passed ? 'text-green-700' : 'text-amber-700'}>
          {passed
            ? 'Bravo ! Ta réussite est enregistrée dans ta progression quotidienne.'
            : 'Il faut au moins 80 % pour valider cette activité.'}
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

  if (!question) {
    return <p>Aucune question disponible.</p>
  }

  const correct = selected === question.french

  return (
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-700">
          Question {index + 1}/{orderedQuestions.length}
        </span>

        <span className="font-semibold text-amber-700">
          ⭐ {score} bonne(s) réponse(s)
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{
            width: `${((index + 1) / orderedQuestions.length) * 100}%`,
          }}
        />
      </div>

      <div className="space-y-4 rounded-2xl bg-blue-50 p-6 text-center">
        <div className="text-5xl">🎧</div>

        <h2 className="text-xl font-bold text-slate-800">
          Écoute la phrase en anglais
        </h2>

        <p className="text-sm text-slate-600">
          Choisis ensuite la bonne traduction française.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => speak(question.english)}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            🔊 Écouter
          </button>

          <button
            type="button"
            onClick={() => speak(question.english, true)}
            className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
          >
            🐢 Écouter lentement
          </button>
        </div>

        {!voiceAvailable && (
          <p className="text-sm text-red-600">
            La synthèse vocale n'est pas disponible dans ce navigateur.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {options.map(option => {
          const isCorrectOption = option === question.french
          const isSelected = option === selected

          let className =
            'w-full rounded-xl border-2 p-4 text-left font-medium transition '

          if (selected !== null && isCorrectOption) {
            className += 'border-green-500 bg-green-50 text-green-800'
          } else if (selected !== null && isSelected) {
            className += 'border-red-500 bg-red-50 text-red-800'
          } else {
            className +=
              'border-slate-200 bg-white hover:border-blue-400'
          }

          return (
            <button
              key={option}
              type="button"
              disabled={selected !== null}
              onClick={() => setSelected(option)}
              className={className}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div
          className={`rounded-xl p-4 ${
            correct ? 'bg-green-50' : 'bg-amber-50'
          }`}
        >
          <p className="font-bold">
            {correct ? '✅ Bonne réponse !' : '❌ Pas tout à fait.'}
          </p>

          <p className="mt-2">
            <strong>Phrase :</strong> {question.english}
          </p>

          <p className="mt-1">
            <strong>Traduction :</strong> {question.french}
          </p>

          <button
            type="button"
            onClick={nextQuestion}
            className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {index + 1 === orderedQuestions.length
              ? 'Voir mon résultat →'
              : 'Question suivante →'}
          </button>
        </div>
      )}
    </section>
  )
}
