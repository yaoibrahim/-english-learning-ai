
import { useState } from 'react'
import SentenceBuilder from './components/exercises/SentenceBuilder'

const vocabulary = [
  { english: 'Learn', french: 'Apprendre', type: 'Verbe' },
  { english: 'Speak', french: 'Parler', type: 'Verbe' },
  { english: 'Beautiful', french: 'Beau / Belle', type: 'Adjectif' },
  { english: 'House', french: 'Maison', type: 'Nom' },
  { english: 'Every day', french: 'Tous les jours', type: 'Expression' },
]

function App() {
  const [selected, setSelected] = useState<number | null>(null)

  function pronounce(word: string) {
    if (!('speechSynthesis' in window)) {
      alert('La synthèse vocale n’est pas disponible.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="font-semibold text-blue-600">
            English Learning AI
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Apprends l'anglais à ton rythme
          </h1>
          <p className="mt-3 text-slate-600">
            Découvre les mots, écoute leur prononciation
            et apprends à construire des phrases.
          </p>
        </header>

        <section>
          <h2 className="mb-5 text-2xl font-bold">
            Leçon 1 — Premiers mots
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {vocabulary.map((word, index) => (
              <div
                key={word.english}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-blue-600">
                  {word.type}
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {word.english}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => pronounce(word.english)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    🔊 Écouter
                  </button>

                  <button
                    onClick={() =>
                      setSelected(selected === index ? null : index)
                    }
                    className="rounded-lg bg-slate-100 px-4 py-2 text-slate-800"
                  >
                    Traduction
                  </button>
                </div>

                {selected === index && (
                  <p className="mt-4 rounded-lg bg-green-50 p-3 font-medium text-green-800">
                    {word.french}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
         <SentenceBuilder />
      </div>
    </main>
  )
}

export default App
