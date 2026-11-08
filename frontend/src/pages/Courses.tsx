import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { courseCategories, courseLevels, courseUnits, type CourseFocus, type CourseLevel } from '../data/courses'
import { useCourseProgress } from '../hooks/useCourseProgress'
type FilterLevel = 'all' | CourseLevel
type FilterFocus = 'all' | CourseFocus
export default function Courses() {
  const [level, setLevel] = useState<FilterLevel>('all')
  const [focus, setFocus] = useState<FilterFocus>('all')
  const [query, setQuery] = useState('')
  const progress = useCourseProgress()
  const shown = useMemo(() => courseUnits.filter(unit =>
    (level === 'all' || unit.level === level) &&
    (focus === 'all' || focus === 'practice' || unit.focus.includes(focus)) &&
    `${unit.title} ${unit.description} ${unit.focus.join(' ')}`.toLocaleLowerCase('fr-FR').includes(query.toLocaleLowerCase('fr-FR').trim())
  ), [level, focus, query])
  return <div className="space-y-6">
    <Link to="/" className="inline-flex min-h-11 items-center rounded-xl bg-slate-200 px-4 font-semibold">← Accueil</Link>
    <header className="rounded-3xl bg-gradient-to-r from-indigo-700 to-sky-700 p-6 text-white sm:p-8">
      <p className="font-bold text-indigo-100">📘 Cours complets d'anglais</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Parcours en spirale, de A0 à C2</h1>
      <p className="mt-3 leading-7 text-indigo-50">35 unités : chaque nouvelle phrase introduit un mot ou une règle, puis tu t’entraînes à reconnaître les termes et à reconstruire les phrases. Les mots précédents reviennent.</p>
      <p className="mt-4 font-semibold">{progress.completedCount}/{progress.totalCount} unités réussies · {progress.percentage} %</p>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/25"><div className="h-full bg-lime-300" style={{width:`${progress.percentage}%`}} /></div>
    </header>
    <section className="space-y-3 rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold">Sections de cours</h2>
      <Link to="/courses/references" className="inline-flex min-h-11 items-center rounded-xl bg-indigo-100 px-4 py-2 font-semibold text-indigo-800">📑 173 fiches de référence →</Link></div>
      <p className="text-sm text-slate-600">Chaque unité travaille plusieurs compétences. Le filtre indique le thème principal ; les autres compétences restent mélangées dans la leçon.</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        <button type="button" onClick={() => setFocus('all')} className={`min-h-12 rounded-xl border px-2 py-3 text-left text-sm font-medium ${focus === 'all' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}>🗂️ Toutes les sections</button>
        {courseCategories.map(cat => <button key={cat.id} type="button" onClick={() => setFocus(cat.id)} className={`min-h-12 rounded-xl border px-2 py-3 text-left text-sm font-medium ${focus === cat.id ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-200 hover:border-indigo-300'}`}>{cat.icon} {cat.title}</button>)}
      </div>
    </section>
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Choisir une unité</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1 text-sm font-semibold">Niveau
          <select value={level} onChange={(event: {target: {value: string}})=>setLevel(event.target.value as FilterLevel)} className="mt-1 min-h-12 w-full rounded-xl border bg-white p-3">
          <option value="all">Tous les niveaux</option>{courseLevels.map(x => <option key={x.id} value={x.id}>{x.id} — {x.title}</option>)}
          </select>
        </label>
        <label className="flex-1 text-sm font-semibold">Recherche
          <input value={query} onChange={(event: {target: {value: string}})=>setQuery(event.target.value)} placeholder="Ex. pronoms, passé, travail..." className="mt-1 min-h-12 w-full rounded-xl border bg-white p-3" />
        </label>
      </div>
      <p aria-live="polite" className="text-sm text-slate-600">{shown.length} unité(s). Déblocage progressif après 80 % de réussite.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {shown.map(unit=>{
          const unlocked = progress.isUnlocked(unit.id); const done = progress.isCompleted(unit.id)
          return <article key={unit.id} className={`rounded-2xl border p-5 shadow-sm ${done ? 'border-green-300 bg-green-50' : unlocked ? 'border-indigo-200 bg-white' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex flex-wrap justify-between gap-2 text-sm font-semibold"><span>{unit.level} · Unité {unit.index+1}/35</span><span>{done?'✅ Terminée':unlocked?'🔓 Disponible':'🔒 Verrouillée'}</span></div>
            <h3 className="mt-3 text-xl font-bold">{unit.title}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{unit.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">{unit.focus.map(tag=><span key={tag} className="rounded bg-indigo-50 px-2 py-1 text-xs text-indigo-800">{courseCategories.find(c=>c.id===tag)?.title || tag}</span>)}</div>
            <p className="mt-3 text-sm font-semibold text-amber-800">⭐ {unit.xp} XP · 80 % requis</p>
            {unlocked ? <Link to={`/courses/${unit.id}`} className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">{done?'Réviser →':'Étudier →'}</Link> : <p className="mt-4 text-sm text-slate-500">Termine l'unité précédente pour continuer.</p>}
          </article>
        })}
      </div>
      {shown.length===0 && <p className="rounded-xl bg-amber-50 p-4">Aucun résultat avec ces filtres.</p>}
    </section>
  </div>
}
