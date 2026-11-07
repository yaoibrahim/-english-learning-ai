import { useState } from 'react'
import { Link } from 'react-router-dom'
import { courseCategories, type CourseFocus } from '../data/courses'
import { courseReferences } from '../data/courseReferences'

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const voice = new SpeechSynthesisUtterance(text)
  voice.lang = 'en-US'
  voice.rate = 0.85
  window.speechSynthesis.speak(voice)
}

export default function CourseReferences() {
  const [category, setCategory] = useState<CourseFocus>('grammaire')
  const [search, setSearch] = useState('')
  const source = courseCategories.find(item => item.id === category)
  const filter = search.toLocaleLowerCase('fr-FR').trim()
  const topics = courseReferences[category].filter(topic =>
    !filter || `${topic.title} ${topic.explanation} ${topic.english} ${topic.french}`.toLocaleLowerCase('fr-FR').includes(filter)
  )
  return (
    <div className="space-y-6">
      <Link to="/courses" className="inline-flex min-h-11 items-center rounded-xl bg-slate-200 px-4 font-semibold">← Retour au parcours</Link>
      <header className="rounded-3xl bg-indigo-700 p-6 text-white sm:p-8">
        <h1 className="text-3xl font-extrabold">📚 Toutes les fiches de cours</h1>
        <p className="mt-3 leading-7 text-indigo-50">Grammaire, verbes, pronoms, tous les temps, orthographe, prononciation, mots confondus, phrasal verbs, IT English et bien d'autres sujets. Ce sont des fiches synthétiques complémentaires aux unités guidées.</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">Choisir une section
          <select value={category} onChange={(event: {target: {value: string}}) => setCategory(event.target.value as CourseFocus)} className="mt-1 min-h-12 w-full rounded-xl border bg-white px-4">
            {courseCategories.map(item => <option key={item.id} value={item.id}>{item.icon} {item.title}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">Chercher dans cette section
          <input value={search} onChange={(event: {target: {value: string}}) => setSearch(event.target.value)} placeholder="Ex. past simple, their, prépositions..." className="mt-1 min-h-12 w-full rounded-xl border bg-white px-4" />
        </label>
      </div>
      <h2 className="text-2xl font-bold">{source?.icon} {source?.title}</h2>
      <p aria-live="polite" className="text-sm text-slate-600">{topics.length} fiche(s) affichée(s)</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map(topic => (
          <article key={topic.title} className="space-y-3 rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">{topic.title}</h3>
            <p className="leading-7 text-slate-700">{topic.explanation}</p>
            <div className="space-y-2 rounded-xl bg-indigo-50 p-4">
              <p className="font-semibold text-indigo-950">{topic.english}</p>
              <p className="text-sm text-slate-700">{topic.french}</p>
              <button type="button" onClick={() => speak(topic.english)} className="min-h-11 rounded-xl bg-indigo-700 px-4 py-2 font-semibold text-white">🔊 Écouter</button>
            </div>
          </article>
        ))}
      </div>
      {topics.length === 0 && <p className="rounded-xl bg-amber-50 p-4 text-amber-900">Aucun sujet trouvé dans cette catégorie.</p>}
      <Link to="/courses" className="inline-flex min-h-12 items-center rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">Étudier avec les exercices →</Link>
    </div>
  )
}
