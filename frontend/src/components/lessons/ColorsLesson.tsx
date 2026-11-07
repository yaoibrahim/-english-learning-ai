
import { englishColors } from '../../data/colors'

export default function ColorsLesson() {
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

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-blue-900">
          🎨 Les couleurs en anglais
        </h2>

        <p className="mt-3 text-slate-700">
          Découvre les couleurs, écoute leur prononciation
          et apprends à les utiliser dans des phrases simples.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {englishColors.map(color => (
          <article
            key={color.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div
              className="h-28 border-b border-slate-200"
              style={{ backgroundColor: color.hex }}
              aria-label={`Couleur ${color.french}`}
            />

            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold">
                    {color.english}
                  </h3>

                  <p className="mt-1 text-slate-600">
                    {color.french}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => pronounce(color.english)}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
                >
                  🔊
                </button>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">
                  {color.example}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  {color.exampleTranslation}
                </p>

                <button
                  type="button"
                  onClick={() => pronounce(color.example)}
                  className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
                >
                  🔊 Écouter la phrase
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
