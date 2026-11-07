
import { alphabet } from '../../data/alphabet'

export default function AlphabetLesson() {
  function pronounce(text: string) {
    if (!('speechSynthesis' in window)) {
      alert('La synthèse vocale est indisponible.')
      return
    }

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-US'
    speech.rate = 0.75

    window.speechSynthesis.speak(speech)
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-blue-900">
          🔤 L'alphabet anglais
        </h2>

        <p className="mt-3 text-slate-700">
          Apprends les 26 lettres de l'alphabet anglais.
          Écoute leur prononciation et découvre un mot
          associé à chaque lettre.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {alphabet.map(item => (
          <article
            key={item.letter}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
          >
            <p className="text-5xl font-bold text-blue-600">
              {item.letter}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Prononciation approximative
            </p>

            <p className="mt-1 font-semibold">
              {item.pronunciation}
            </p>

            <button
              type="button"
              onClick={() => pronounce(item.letter)}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              🔊 Écouter
            </button>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="font-bold">
                {item.example}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {item.translation}
              </p>

              <button
                type="button"
                onClick={() => pronounce(item.example)}
                className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
              >
                🔊 Écouter le mot
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
