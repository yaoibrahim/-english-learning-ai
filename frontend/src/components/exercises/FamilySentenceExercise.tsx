
import { useState } from 'react'
import { familySentences } from '../../data/family'

type WordTile = {
  id: string
  word: string
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function createTiles(sentence: string): WordTile[] {
  return shuffle(
    sentence.split(' ').map((word, index) => ({
      id: `${index}-${word}`,
      word,
    }))
  )
}

export default function FamilySentenceExercise() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [tiles, setTiles] = useState(() =>
    createTiles(familySentences[0].english)
  )
  const [selected, setSelected] = useState<WordTile[]>([])
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentSentence = familySentences[currentIndex]
  const answer = selected.map(tile => tile.word).join(' ')
  const isCorrect = answer === currentSentence.english

  function selectTile(tile: WordTile) {
    if (checked) return
    setSelected(previous => [...previous, tile])
  }

  function removeTile(tileId: string) {
    if (checked) return
    setSelected(previous =>
      previous.filter(tile => tile.id !== tileId)
    )
  }

  function verify() {
    if (selected.length !== tiles.length || checked) return

    setChecked(true)

    if (isCorrect) {
      setCorrectCount(previous => previous + 1)
    }
  }

  function next() {
    if (!checked) return

    if (currentIndex + 1 === familySentences.length) {
      setFinished(true)
      return
    }

    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex)
    setTiles(createTiles(familySentences[nextIndex].english))
    setSelected([])
    setChecked(false)
  }

  function restart() {
    setCurrentIndex(0)
    setTiles(createTiles(familySentences[0].english))
    setSelected([])
    setChecked(false)
    setCorrectCount(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <section className="space-y-5 rounded-2xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-2xl font-bold">
          🎉 Exercice terminé !
        </h2>

        <p className="text-4xl font-bold text-blue-600">
          {correctCount}/{familySentences.length}
        </p>

        <p className="text-slate-600">
          Tu as terminé les exercices de construction
          de phrases.
        </p>

        <button
          type="button"
          onClick={restart}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          🔄 Recommencer
        </button>
      </section>
    )
  }

  return (
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          🧩 Construis la phrase
        </h2>

        <span className="font-semibold text-blue-600">
          {currentIndex + 1}/{familySentences.length}
        </span>
      </div>

      <div className="rounded-xl bg-blue-50 p-5">
        <p className="text-sm text-slate-600">
          Traduis cette phrase en anglais :
        </p>

        <p className="mt-3 text-xl font-bold">
          {currentSentence.french}
        </p>
      </div>

      <div className="min-h-24 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
        <div className="flex flex-wrap gap-2">
          {selected.map(tile => (
            <button
              key={tile.id}
              type="button"
              onClick={() => removeTile(tile.id)}
              disabled={checked}
              className="rounded-lg border bg-white px-4 py-2 font-semibold disabled:opacity-70"
            >
              {tile.word}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tiles
          .filter(tile =>
            !selected.some(item => item.id === tile.id)
          )
          .map(tile => (
            <button
              key={tile.id}
              type="button"
              onClick={() => selectTile(tile)}
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-semibold hover:bg-blue-100"
            >
              {tile.word}
            </button>
          ))}
      </div>

      {checked && (
        <div
          className={`rounded-xl p-4 ${
            isCorrect
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          <p className="font-bold">
            {isCorrect
              ? '✓ Bonne réponse !'
              : '✗ Réponse incorrecte'}
          </p>

          <p className="mt-2">
            Réponse attendue : {currentSentence.english}.
          </p>
        </div>
      )}

      {!checked ? (
        <button
          type="button"
          onClick={verify}
          disabled={selected.length !== tiles.length}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:bg-slate-300"
        >
          Vérifier
        </button>
      ) : (
        <button
          type="button"
          onClick={next}
          className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white"
        >
          {currentIndex + 1 === familySentences.length
            ? 'Voir mon résultat'
            : 'Phrase suivante →'}
        </button>
      )}
    </section>
  )
}
