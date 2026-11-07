
import type { Question } from '../../data/questions'

type Props = {
  title: string
  questions: Question[]
  onStartQuiz: () => void
}

export default function LessonContent({
  title,
  questions,
  onStartQuiz,
}: Props) {
  function pronounce(text: string) {
    if (!('speechSynthesis' in window)) {
      alert('La synthèse vocale est indisponible.')
      return
    }

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-US'
    speech.rate = 0.8

    window.speechSynthesis.speak(speech)
  }

  return (
    <section className="space-y-6">

      {/* Présentation du cours */}
      <div className="rounded-2xl bg-blue-50 p-6">
        <p className="font-semibold text-blue-600">
          📚 Cours d'anglais
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-slate-600">
          Découvre les mots suivants, écoute leur
          prononciation, apprends leur traduction et
          comprends comment les utiliser dans des phrases.
        </p>
      </div>

      {/* Liste des mots à apprendre */}
      <div className="grid gap-4 sm:grid-cols-2">
        {questions.map((question, index) => (
          <article
            key={question.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {/* Numéro du mot */}
            <p className="text-sm font-semibold text-blue-600">
              Mot {index + 1} / {questions.length}
            </p>

            {/* Mot anglais */}
            <p className="mt-4 text-sm font-medium text-slate-500">
              Anglais
            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-600">
              {question.word}
            </h3>

            {/* Traduction française */}
            <p className="mt-4 text-sm font-medium text-slate-500">
              Français
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {question.translation}
            </p>

            {/* Prononciation du mot */}
            <button
              type="button"
              onClick={() => pronounce(question.word)}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              🔊 Écouter le mot
            </button>

            {/* Exemple de phrase */}
            {question.example && (
              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">
                  Exemple en anglais
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {question.example}
                </p>

                {question.exampleTranslation && (
                  <p className="mt-2 text-sm text-slate-600">
                    {question.exampleTranslation}
                  </p>
                )}

                {/* Prononciation de la phrase */}
                <button
                  type="button"
                  onClick={() => pronounce(question.example!)}
                  className="mt-4 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                >
                  🔊 Écouter la phrase
                </button>
              </div>
            )}

            {/* Explication pédagogique */}
            {question.explanation && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4">
                <p className="font-semibold text-amber-800">
                  💡 À retenir
                </p>

                <p className="mt-2 text-sm leading-relaxed text-amber-900">
                  {question.explanation}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Passage au quiz */}
      <div className="rounded-2xl bg-green-50 p-6">
        <h3 className="text-xl font-bold text-green-800">
          🎯 Prêt à tester tes connaissances ?
        </h3>

        <p className="mt-2 text-green-900">
          Tu as terminé la partie apprentissage.
          Réponds maintenant aux questions pour valider
          cette leçon et gagner tes points XP.
        </p>

        <button
          type="button"
          onClick={onStartQuiz}
          disabled={questions.length === 0}
          className="mt-5 w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Commencer le quiz →
        </button>
      </div>
    </section>
  )
}
