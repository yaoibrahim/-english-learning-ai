
import { familyWords } from '../../data/family'

export default function FamilyLesson() {
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
          👨‍👩‍👧‍👦 Family Members
        </h2>
        <p className="mt-3 text-slate-700">
          Apprends à parler de ta famille en anglais.
          Écoute chaque mot et répète-le à voix haute.
        </p>
      </div>

      <div className="rounded-2xl bg-amber-50 p-5">
        <h3 className="font-bold text-amber-900">
          💡 Règle importante
        </h3>
        <p className="mt-2 text-slate-700">
          En anglais, <strong>my</strong> signifie « mon, ma ou mes ».
          Il ne change pas selon le genre ou le nombre.
        </p>
        <p className="mt-2 text-slate-700">
          My mother = ma mère.
          My father = mon père.
          My parents = mes parents.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {familyWords.map(word => (
          <article
            key={word.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-blue-600">
              {word.english}
            </h3>
            <p className="mt-2 text-slate-600">
              {word.french}
            </p>

            <button
              type="button"
              onClick={() => pronounce(word.english)}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              🔊 Écouter
            </button>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">
                {word.example}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {word.exampleTranslation}
              </p>
              <button
                type="button"
                onClick={() => pronounce(word.example)}
                className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
              >
                🔊 Écouter la phrase
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
