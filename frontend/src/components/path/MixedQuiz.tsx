import { playFeedback } from '../../lib/audioFeedback'

import { useState } from 'react'
import type { A0Question } from '../../data/a0Questions'

// Mélange local pour éviter les problèmes d'importation
function shuffleItems<T>(items: T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

// Normaliser une réponse
function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/g, '')
    .replace(/\s+/g, ' ')
}

// Vérifier une réponse
function isAnswerCorrect(
  question: A0Question,
  response: string
): boolean {
  const acceptedAnswers = [
    question.answer,
    ...(question.type === 'writing'
      ? question.acceptedAnswers ?? []
      : []),
  ]

  return acceptedAnswers.some(
    answer =>
      normalizeAnswer(answer) ===
      normalizeAnswer(response)
  )
}

type MixedQuizProps = {
  questions: A0Question[]
  onFinish: (score: number, total: number) => void
}

type WordTile = {
  id: number
  word: string
}

function createTiles(words: string[]): WordTile[] {
  return shuffleItems(
    words.map((word, index) => ({
      id: index,
      word,
    }))
  )
}

export default function MixedQuiz({
  questions,
  onFinish,
}: MixedQuizProps) {
  const [index, setIndex] = useState(0)

  const [selectedOption, setSelectedOption] =
    useState('')

  const [selectedTiles, setSelectedTiles] =
    useState<WordTile[]>([])

  const [tiles, setTiles] = useState<WordTile[]>(() => {
    const firstQuestion = questions[0]

    return firstQuestion?.type === 'word-order'
      ? createTiles(firstQuestion.words)
      : []
  })

  const [writtenAnswer, setWrittenAnswer] =
    useState('')

  const [checked, setChecked] = useState(false)

  const [score, setScore] = useState(0)

  const question = questions[index]

  if (!question) {
    return (
      <div className="rounded-xl bg-amber-50 p-6 text-amber-800">
        Aucune question disponible pour ce niveau.
      </div>
    )
  }

  // Réponse donnée par l'utilisateur
  const response =
    question.type === 'word-order'
      ? selectedTiles.map(tile => tile.word).join(' ')
      : question.type === 'writing'
        ? writtenAnswer
        : selectedOption

  const correct = isAnswerCorrect(question, response)

  const canVerify =
    question.type === 'word-order'
      ? selectedTiles.length === tiles.length
      : response.trim().length > 0

  // Vérification
  function verify() {
    if (!canVerify || checked) return

    playFeedback(correct ? 'correct' : 'incorrect')
    setChecked(true)

    if (correct) {
      setScore(previous => previous + 1)
    }
  }

  // Question suivante
  function next() {
    if (!checked) return

    if (index + 1 === questions.length) {
      onFinish(score, questions.length)
      return
    }

    const nextIndex = index + 1
    const nextQuestion = questions[nextIndex]

    setIndex(nextIndex)
    setSelectedOption('')
    setSelectedTiles([])
    setWrittenAnswer('')
    setChecked(false)

    setTiles(
      nextQuestion.type === 'word-order'
        ? createTiles(nextQuestion.words)
        : []
    )
  }

  // Ajouter un mot à la phrase
  function addWord(tile: WordTile) {
    if (checked) return

    setSelectedTiles(previous => [
      ...previous,
      tile,
    ])
  }

  // Retirer un mot de la phrase
  function removeWord(tileId: number) {
    if (checked) return

    setSelectedTiles(previous =>
      previous.filter(tile => tile.id !== tileId)
    )
  }

  return (
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">

      {/* EN-TÊTE */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          🧠 Exercice A0
        </h2>

        <span className="font-semibold text-blue-600">
          {index + 1}/{questions.length}
        </span>
      </div>

      {/* PROGRESSION */}
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{
            width: `${
              ((index + 1) / questions.length) * 100
            }%`,
          }}
        />
      </div>

      {/* QUESTION */}
      <div className="rounded-xl bg-blue-50 p-5">
        <p className="text-sm font-semibold text-blue-700">
          {question.type === 'multiple-choice'
            ? 'Choisis la bonne réponse'
            : question.type === 'word-order'
              ? 'Remets les mots dans le bon ordre'
              : 'Écris la bonne réponse'}
        </p>

        <h3 className="mt-3 text-xl font-bold text-slate-900">
          {question.prompt}
        </h3>
      </div>

      {/* QCM */}
      {question.type === 'multiple-choice' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map(option => (
            <button
              key={option}
              type="button"
              disabled={checked}
              onClick={() => setSelectedOption(option)}
              className={`rounded-xl border-2 p-4 text-left font-semibold transition ${
                selectedOption === option
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-blue-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* CONSTRUCTION DE PHRASES */}
      {question.type === 'word-order' && (
        <div className="space-y-4">

          <p className="text-sm text-slate-600">
            Clique sur les mots pour construire
            la phrase anglaise.
          </p>

          {/* Phrase construite */}
          <div className="min-h-20 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex flex-wrap gap-2">
              {selectedTiles.map(tile => (
                <button
                  key={tile.id}
                  type="button"
                  disabled={checked}
                  onClick={() => removeWord(tile.id)}
                  className="rounded-lg bg-white px-4 py-2 font-semibold shadow-sm"
                >
                  {tile.word}
                </button>
              ))}
            </div>
          </div>

          {/* Mots disponibles */}
          <div className="flex flex-wrap gap-2">
            {tiles
              .filter(
                tile =>
                  !selectedTiles.some(
                    selected => selected.id === tile.id
                  )
              )
              .map(tile => (
                <button
                  key={tile.id}
                  type="button"
                  disabled={checked}
                  onClick={() => addWord(tile)}
                  className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-800 hover:bg-blue-100"
                >
                  {tile.word}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* RÉPONSE ÉCRITE */}
      {question.type === 'writing' && (
        <div>
          <label
            htmlFor="a0-written-answer"
            className="mb-2 block font-medium text-slate-700"
          >
            Ta réponse :
          </label>

          <input
            id="a0-written-answer"
            type="text"
            value={writtenAnswer}
            disabled={checked}
            onChange={event =>
              setWrittenAnswer(event.target.value)
            }
            placeholder="Écris ta réponse en anglais..."
            className="w-full rounded-xl border-2 border-slate-200 p-4 outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* CORRECTION */}
      {checked && (
        <div
          className={`rounded-xl p-5 ${
            correct
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          <p className="text-lg font-bold">
            {correct
              ? '✓ Bonne réponse !'
              : '✗ Réponse incorrecte'}
          </p>

          <p className="mt-2">
            <strong>Bonne réponse :</strong>{' '}
            {question.answer}
          </p>

          {question.explanation && (
            <p className="mt-3 text-sm">
              💡 {question.explanation}
            </p>
          )}
        </div>
      )}

      {/* BOUTONS */}
      {!checked ? (
        <button
          type="button"
          disabled={!canVerify}
          onClick={verify}
          className="w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Vérifier ma réponse
        </button>
      ) : (
        <button
          type="button"
          onClick={next}
          className="w-full rounded-xl bg-green-600 px-5 py-4 font-bold text-white hover:bg-green-700"
        >
          {index + 1 === questions.length
            ? '🏆 Voir mon résultat'
            : 'Question suivante →'}
        </button>
      )}

      {/* SCORE */}
      <div className="border-t border-slate-200 pt-4 text-center text-sm text-slate-500">
        Bonnes réponses : {score}/{questions.length}
      </div>

    </section>
  )
}
