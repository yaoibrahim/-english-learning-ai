
import { useState } from 'react'
import { days, months } from '../../data/calendar'

type CalendarTab = 'days' | 'months'

export default function CalendarLesson() {
  const [tab, setTab] = useState<CalendarTab>('days')

  const words = tab === 'days' ? days : months

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

  function changeTab(nextTab: CalendarTab) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    setTab(nextTab)
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-blue-900">
          📅 Days and Months
        </h2>

        <p className="mt-3 text-slate-700">
          Apprends les jours de la semaine et les mois
          de l'année en anglais.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => changeTab('days')}
          className={`rounded-xl px-4 py-3 font-semibold ${
            tab === 'days'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          📆 Les jours
        </button>

        <button
          type="button"
          onClick={() => changeTab('months')}
          className={`rounded-xl px-4 py-3 font-semibold ${
            tab === 'months'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          🗓️ Les mois
        </button>
      </div>

      <div className="rounded-2xl bg-amber-50 p-5">
        <h3 className="font-bold text-amber-900">
          💡 Règle importante
        </h3>

        <p className="mt-2 text-slate-700">
          En anglais, les noms des jours et des mois
          commencent toujours par une majuscule.
        </p>

        <p className="mt-3 text-slate-700">
          <strong>On Monday</strong> = lundi
        </p>

        <p className="mt-1 text-slate-700">
          <strong>In January</strong> = en janvier
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {words.map(word => (
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
