
import { useState } from 'react'
import { englishNumbers } from '../../data/numbers'

type NumberRange = '0-20' | '21-50' | '51-100' | 'all'

export default function NumbersLesson() {
  const [range, setRange] = useState<NumberRange>('0-20')

  const filteredNumbers = englishNumbers.filter(number => {
    if (range === '0-20') {
      return number.value <= 20
    }

    if (range === '21-50') {
      return number.value >= 21 && number.value <= 50
    }

    if (range === '51-100') {
      return number.value >= 51 && number.value <= 100
    }

    return true
  })

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

  const ranges: {
    id: NumberRange
    label: string
  }[] = [
    { id: '0-20', label: '0 à 20' },
    { id: '21-50', label: '21 à 50' },
    { id: '51-100', label: '51 à 100' },
    { id: 'all', label: 'Tous' },
  ]

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-blue-900">
          🔢 Les nombres anglais
        </h2>

        <p className="mt-3 text-slate-700">
          Apprends à compter de 0 à 100 en anglais.
          Écoute chaque nombre et répète-le à voix haute.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-xl font-bold">
          📘 Comprendre les nombres
        </h3>

        <div className="mt-4 space-y-3 text-slate-700">
          <p>
            <strong>0 à 12 :</strong> les nombres ont des formes
            spécifiques à mémoriser.
          </p>

          <p>
            <strong>13 à 19 :</strong> plusieurs nombres se
            terminent par <strong>-teen</strong>.
          </p>

          <p>
            <strong>20, 30, 40... :</strong> les dizaines ont
            leurs propres formes :
            twenty, thirty, forty, fifty...
          </p>

          <p>
            <strong>21 à 99 :</strong> on associe une dizaine
            et une unité avec un trait d'union.
          </p>

          <p>
            Exemple : <strong>twenty-five = 25</strong>.
          </p>

          <p>
            <strong>100 :</strong> one hundred.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {ranges.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRange(item.id)}
            className={`rounded-lg px-4 py-3 font-semibold transition ${
              range === item.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500">
        {filteredNumbers.length} nombre(s) affiché(s).
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filteredNumbers.map(number => (
          <article
            key={number.value}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
          >
            <p className="text-4xl font-bold text-blue-600">
              {number.value}
            </p>

            <p className="mt-3 min-h-12 break-words font-semibold text-slate-800">
              {number.english}
            </p>

            <button
              type="button"
              onClick={() => pronounce(number.english)}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              🔊 Écouter
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
