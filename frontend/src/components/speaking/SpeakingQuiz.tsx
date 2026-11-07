
import { useEffect, useRef, useState } from 'react'
import {
  speakingQuestions,
  type SpeakingDifficulty,
} from '../../data/speaking'

// Types locaux pour les navigateurs dont TypeScript
// ne connaît pas encore l'API SpeechRecognition.
type SpeechResult = {
  isFinal: boolean
  0: { transcript: string }
}

type SpeechEvent = {
  results: ArrayLike<SpeechResult>
}

type RecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechEvent) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type RecognitionConstructor = new () => RecognitionInstance

type SpeechWindow = Window & {
  SpeechRecognition?: RecognitionConstructor
  webkitSpeechRecognition?: RecognitionConstructor
}

type Props = {
  difficulty: SpeakingDifficulty
  onSuccess: () => void
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function calculateSimilarity(expected: string, actual: string) {
  const a = normalize(expected).split(' ').filter(Boolean)
  const b = normalize(actual).split(' ').filter(Boolean)

  if (a.length === 0) return 0

  // Distance d'édition entre les suites de mots.
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

  const distance = dp[a.length][b.length]
  const maximum = Math.max(a.length, b.length)

  return Math.max(
    0,
    Math.round((1 - distance / maximum) * 100)
  )
}

export default function SpeakingQuiz({
  difficulty,
  onSuccess,
}: Props) {
  const questions = speakingQuestions.filter(
    question => question.difficulty === difficulty
  )

  const [index, setIndex] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [similarity, setSimilarity] = useState<number | null>(null)
  const [listening, setListening] = useState(false)
  const [error, setError] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const recognitionRef = useRef<RecognitionInstance | null>(null)
  const rewardedRef = useRef(false)
  const listeningRef = useRef(false)

  const question = questions[index]

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
      recognitionRef.current = null
      listeningRef.current = false

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [difficulty])

  function playPhrase(slow = false) {
    if (!question) return

    if (!('speechSynthesis' in window)) {
      setError('La lecture vocale est indisponible.')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(question.english)
    utterance.lang = 'en-US'
    utterance.rate = slow ? 0.65 : 0.9

    const englishVoice = window.speechSynthesis
      .getVoices()
      .find(voice => voice.lang.toLowerCase().startsWith('en'))

    if (englishVoice) utterance.voice = englishVoice

    window.speechSynthesis.speak(utterance)
  }

  function startListening() {
    if (!question || listeningRef.current || similarity !== null) {
      return
    }

    const speechWindow = window as SpeechWindow
    const Recognition =
      speechWindow.SpeechRecognition ??
      speechWindow.webkitSpeechRecognition

    if (!Recognition) {
      setError(
        'Reconnaissance vocale indisponible. Essaie Chrome ou Edge.'
      )
      return
    }

    window.speechSynthesis?.cancel()
    setError('')
    setTranscript('')
    setSimilarity(null)

    const recognition = new Recognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript ?? ''
      setTranscript(text)
      setSimilarity(calculateSimilarity(question.english, text))
    }

    recognition.onerror = (event) => {
      const messages: Record<string, string> = {
        'not-allowed': 'Autorise le microphone dans ton navigateur.',
        'audio-capture': 'Aucun microphone disponible.',
        'no-speech': 'Aucune voix détectée. Réessaie.',
        'network': 'Le service de reconnaissance vocale est indisponible.',
      }

      setError(
        messages[event.error] ??
        `Erreur de reconnaissance : ${event.error}`
      )
    }

    recognition.onend = () => {
      listeningRef.current = false
      setListening(false)
      recognitionRef.current = null
    }

    recognitionRef.current = recognition
    listeningRef.current = true

    try {
      recognition.start()
      setListening(true)
    } catch {
      listeningRef.current = false
      recognitionRef.current = null
      setListening(false)
      setError('Impossible de démarrer le microphone.')
    }
  }

  function stopListening() {
    recognitionRef.current?.stop()
  }

  function retry() {
    recognitionRef.current?.abort()
    recognitionRef.current = null
    listeningRef.current = false
    setListening(false)
    setTranscript('')
    setSimilarity(null)
    setError('')
  }

  function nextQuestion() {
    if (similarity === null || listeningRef.current) return

    const nextCorrectCount =
      correctCount + (similarity >= 80 ? 1 : 0)

    setCorrectCount(nextCorrectCount)

    if (index + 1 >= questions.length) {
      setFinished(true)

      if (
        (nextCorrectCount / questions.length) * 100 >= 80 &&
        !rewardedRef.current
      ) {
        rewardedRef.current = true
        onSuccess()
      }
    } else {
      setIndex(previous => previous + 1)
      setTranscript('')
      setSimilarity(null)
      setError('')
    }
  }

  function restart() {
    recognitionRef.current?.abort()
    recognitionRef.current = null
    listeningRef.current = false
    window.speechSynthesis?.cancel()

    rewardedRef.current = false
    setIndex(0)
    setAttempt(previous => previous + 1)
    setTranscript('')
    setSimilarity(null)
    setListening(false)
    setError('')
    setCorrectCount(0)
    setFinished(false)
  }

  if (finished) {
    const percentage = Math.round(
      (correctCount / questions.length) * 100
    )
    const passed = percentage >= 80

    return (
      <section className="space-y-5 rounded-2xl bg-white p-6 text-center shadow-sm">
        <div className="text-6xl">
          {passed ? '🏆' : '📚'}
        </div>

        <h2 className="text-2xl font-bold">
          {passed ? 'Speaking réussi !' : 'Continue à pratiquer !'}
        </h2>

        <p className="text-4xl font-bold text-blue-600">
          {correctCount}/{questions.length}
        </p>

        <p className="text-slate-600">
          {percentage} % de phrases reconnues correctement
        </p>

        <p className={passed ? 'text-green-700' : 'text-amber-700'}>
          {passed
            ? 'Bravo ! Ta pratique quotidienne est enregistrée.'
            : 'Atteins 80 % pour valider cette activité.'}
        </p>

        <button
          type="button"
          onClick={restart}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          🔄 Recommencer
        </button>
      </section>
    )
  }

  if (!question) {
    return <p>Aucune phrase disponible.</p>
  }

  return (
    <section key={attempt} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-bold">
          Phrase {index + 1}/{questions.length}
        </span>
        <span className="font-semibold text-blue-600">
          {correctCount} réussite(s)
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="space-y-3 rounded-2xl bg-indigo-50 p-6 text-center">
        <div className="text-5xl">🗣️</div>

        <h2 className="text-2xl font-bold">
          {question.english}
        </h2>

        <p className="text-slate-600">
          {question.french}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => playPhrase()}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            🔊 Écouter
          </button>

          <button
            type="button"
            onClick={() => playPhrase(true)}
            className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white"
          >
            🐢 Lentement
          </button>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <p className="text-slate-600">
          Écoute la phrase, puis prononce-la en anglais.
        </p>

        {similarity === null && (
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            className={`rounded-xl px-7 py-4 font-bold text-white ${
              listening ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {listening ? '⏹ Arrêter' : '🎤 Commencer à parler'}
          </button>
        )}

        {listening && (
          <p className="animate-pulse font-semibold text-red-600">
            🔴 Microphone actif — parle maintenant…
          </p>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">
            {error}
          </p>
        )}

        {similarity !== null && (
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 text-left">
            <p>
              <strong>Tu as prononcé :</strong> {transcript}
            </p>

            <p>
              <strong>Phrase attendue :</strong> {question.english}
            </p>

            <p className="text-2xl font-bold text-blue-600">
              Correspondance : {similarity} %
            </p>

            <p className={similarity >= 80 ? 'text-green-700' : 'text-amber-700'}>
              {similarity >= 80
                ? '✅ Phrase correctement reconnue !'
                : '🔄 Essaie de mieux articuler les mots.'}
            </p>

            <p className="text-xs text-slate-500">
              Ce pourcentage compare les mots transcrits, pas la qualité de ton accent.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={retry}
                className="rounded-xl bg-slate-200 px-5 py-3 font-semibold"
              >
                🎤 Réessayer
              </button>

              <button
                type="button"
                onClick={nextQuestion}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                {index + 1 === questions.length
                  ? 'Voir mon résultat →'
                  : 'Phrase suivante →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
