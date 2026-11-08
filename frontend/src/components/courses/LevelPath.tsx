import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { courseLevels, courseUnits, type CourseLevel } from '../../data/courses'
import { useCourseProgress } from '../../hooks/useCourseProgress'

/** Parcours unique A0 → C2 : « Continuer » + les 7 niveaux avec leurs unités. */
export default function LevelPath() {
  const progress = useCourseProgress()
  const next = courseUnits.find(unit => !progress.isCompleted(unit.id))
  const [open, setOpen] = useState<CourseLevel | null>(next?.level ?? 'A0')

  const learnedWords = useMemo(() => {
    const words = new Set<string>()
    for (const unit of courseUnits) if (progress.isCompleted(unit.id)) unit.vocabulary.forEach(word => words.add(word.english.toLocaleLowerCase('en-US')))
    return words.size
  }, [progress])

  return <div className="space-y-4">
    <section className="rounded-2xl bg-gradient-to-r from-indigo-700 to-sky-700 p-5 text-white shadow-sm" aria-labelledby="continue-title">
      {next ? <>
        <p className="text-xs font-bold text-indigo-100">{progress.completedCount === 0 ? 'Commence ici' : 'Reprends où tu t’es arrêté'}</p>
        <h2 id="continue-title" className="mt-1 text-xl font-extrabold">{next.level} · Unité {next.index % 5 + 1} — {next.title}</h2>
        <p className="mt-2 text-sm text-indigo-50">Découvre les phrases une à une, apprends les mots et les notions, puis entraîne-toi à les reconnaître et à construire tes phrases.</p>
        <Link to={`/courses/${next.id}`} className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 font-bold text-indigo-800">{progress.completedCount === 0 ? 'Commencer →' : 'Continuer →'}</Link>
      </> : <>
        <h2 id="continue-title" className="text-xl font-extrabold">🎉 Parcours A0 → C2 terminé !</h2>
        <p className="mt-2 text-sm text-indigo-50">Tu peux refaire n’importe quelle unité pour réviser tes mots.</p>
      </>}
      <p className="mt-4 text-xs font-semibold text-indigo-100">{progress.completedCount}/{progress.totalCount} unités réussies · {learnedWords} mots appris</p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/25"><div className="h-full bg-lime-300" style={{ width: `${progress.percentage}%` }} /></div>
    </section>

    <section className="space-y-2" aria-labelledby="levels-title">
      <h2 id="levels-title" className="text-base font-bold">🎓 Choisis ton niveau</h2>
      {courseLevels.map(level => {
        const units = courseUnits.filter(unit => unit.level === level.id)
        const stat = progress.progressForLevel(level.id)
        const unlocked = progress.isUnlocked(units[0].id)
        const expanded = open === level.id
        return <article key={level.id} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${stat.completed === stat.total ? 'border-green-300' : unlocked ? 'border-indigo-200' : 'border-slate-200'}`}>
          <button type="button" onClick={() => setOpen(expanded ? null : level.id)} aria-expanded={expanded} aria-controls={`level-${level.id}`} className="flex min-h-14 w-full items-center gap-3 p-4 text-left">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${unlocked ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-500'}`}>{level.id}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">{level.title}</span>
              <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-slate-200"><span className="block h-full rounded-full bg-indigo-600" style={{ width: `${stat.percent}%` }} /></span>
            </span>
            <span className="text-xs font-semibold text-slate-600">{unlocked ? `${stat.completed}/${stat.total}` : '🔒'}</span>
            <span aria-hidden="true" className="text-slate-400">{expanded ? '−' : '+'}</span>
          </button>
          {expanded && <ul id={`level-${level.id}`} className="divide-y divide-slate-100 border-t border-slate-100">
            {units.map(unit => {
              const done = progress.isCompleted(unit.id)
              const available = progress.isUnlocked(unit.id)
              const inner = <>
                <span className="text-lg" aria-hidden="true">{done ? '✅' : available ? '▶️' : '🔒'}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">Unité {unit.index % 5 + 1} · {unit.title}</span>
                  <span className="block text-xs text-slate-500">{unit.vocabulary.map(word => word.english).join(' · ')}</span>
                </span>
                {done && <span className="text-xs font-semibold text-green-700">{progress.bestScores[unit.id] ?? 0} %</span>}
              </>
              return <li key={unit.id}>{available
                ? <Link to={`/courses/${unit.id}`} className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-indigo-50">{inner}</Link>
                : <div className="flex min-h-14 items-center gap-3 px-4 py-3 text-slate-400" aria-disabled="true">{inner}</div>}</li>
            })}
          </ul>}
        </article>
      })}
    </section>
  </div>
}
