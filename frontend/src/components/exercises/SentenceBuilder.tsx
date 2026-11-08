import { playFeedback } from '../../lib/audioFeedback'

import { useState } from 'react'

type Exercise = {
  french: string
  english: string[]
}

const exercises: Exercise[] = [
  {
    french: "J'apprends l'anglais.",
    english: ['I', 'learn', 'English'],
  },
  {
    french: "Je parle anglais.",
    english: ['I', 'speak', 'English'],
  },
  {
    french: "C'est une belle maison.",
    english: ['It', 'is', 'a', 'beautiful', 'house'],
  },
  {
    french: "J'apprends tous les jours.",
    english: ['I', 'learn', 'every day'],
  },
]

function shuffle<T,>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function SentenceBuilder() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [validated, setValidated] = useState(false)

  const [wordOrders] = useState(() =>
    exercises.map(exercise => shuffle(
      exercise.english.map((word, id) => ({ word, id }))
    ))
  )

  const exercise = exercises[index]
  const available = wordOrders[index]

  const answer = selected.map(id =>
    available.find(item => item.id === id)!.word
  )

  const correct =
    answer.join(' ') === exercise.english.join(' ')

  function addWord(id: number) {
    if (!validated && !selected.includes(id)) {
      setSelected([...selected, id])
    }
  }

  function removeWord(id: number) {
    if (!validated) {
      setSelected(selected.filter(value => value !== id))
    }
  }

  function nextExercise() {
    setIndex((index + 1) % exercises.length)
    setSelected([])
    setValidated(false)
  }

  function pronounce() {
    if (!('speechSynthesis' in window)) return

    const utterance = new SpeechSynthesisUtterance(
      exercise.english.join(' ')
    )
    utterance.lang = 'en-US'
    utterance.rate = 0.85

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section className="mt-12 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Construis la phrase
      </h2>

      <p className="mt-3 text-slate-600">
        Traduis cette phrase :
      </p>

      <p className="mt-2 text-xl font-semibold">
        {exercise.french}
      </p>

      <div className="mt-6 flex min-h-20 flex-wrap gap-2 rounded-xl bg-slate-100 p-4">
        {selected.map(id => (
          <button
            key={id}
            onClick={() => removeWord(id)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            {available.find(item => item.id === id)?.word}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {available
          .filter(item => !selected.includes(item.id))
          .map(item => (
            <button
              key={item.id}
              onClick={() => addWord(item.id)}
              disabled={validated}
              className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
            >
              {item.word}
            </button>
          ))}
      </div>

      {validated && (
        <div className={`mt-5 rounded-lg p-4 ${
          correct
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          <p className="font-semibold">
            {correct ? 'Bravo ! Bonne réponse.' : 'Pas encore !'}
          </p>
          <p className="mt-2">
            Correction : {exercise.english.join(' ')}
          </p>

          <button
            onClick={pronounce}
            className="mt-3 rounded-lg bg-white px-4 py-2 text-slate-900"
          >
            🔊 Écouter la phrase
          </button>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {!validated ? (
          <button
            onClick={() => { playFeedback(correct ? 'correct' : 'incorrect'); setValidated(true) }}
            disabled={selected.length === 0}
            className="rounded-lg bg-green-600 px-5 py-3 text-white disabled:opacity-50"
          >
            Vérifier
          </button>
        ) : (
          <button
            onClick={nextExercise}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Exercice suivant
          </button>
        )}
      </div>
    </section>
  )
}
