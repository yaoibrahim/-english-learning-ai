import { Link } from 'react-router-dom'
import { cefrLevels, cefrUnits } from '../data/cefr'
import { useCEFRProgress } from '../hooks/useCEFRProgress'

export default function CEFRPath() {
  const { completedCount, totalUnits, percentage, levelProgress, isUnlocked, isCompleted, bestScores } = useCEFRProgress()

  return (
    <div className="space-y-7">
      <Link to="/" className="inline-block rounded-xl bg-slate-200 px-4 py-2 font-medium">← Accueil</Link>
      <header className="rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-600 p-7 text-white">
        <p className="font-semibold text-indigo-100">🌍 TP 27.17 — Parcours avancés</p>
        <h1 className="mt-2 text-3xl font-bold">Mon parcours A1 à C2</h1>
        <p className="mt-3 text-indigo-100">18 unités progressives. Réussis chaque quiz à 80 % pour accéder à l'unité suivante.</p>
        <p className="mt-4 font-semibold">{completedCount} / {totalUnits} unités validées — {percentage} %</p>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/30">
          <div className="h-full rounded-full bg-amber-300 transition-all" style={{ width: `${percentage}%` }} />
        </div>
      </header>

      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        📌 Ces niveaux indiquent la difficulté du contenu, sans constituer une certification CECRL. Le parcours A0 reste accessible séparément depuis la page d'accueil. A1 est disponible pour commencer ; les autres unités se débloquent dans l'ordre.
      </p>

      {cefrLevels.map(level => {
        const units = cefrUnits.filter(unit => unit.level === level.id)
        const stats = levelProgress(level.id)
        const levelUnlocked = isUnlocked(units[0].id)
        return (
          <section key={level.id} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{levelUnlocked ? '📚' : '🔒'} {level.id} — {level.label}</h2>
                <p className="mt-1 text-slate-600">{level.description}</p>
              </div>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-800">{stats.completed}/{stats.total}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: `${stats.percentage}%` }} />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {units.map((unit, index) => {
                const unlocked = isUnlocked(unit.id)
                const completed = isCompleted(unit.id)
                const content = (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xl">{completed ? '✅' : unlocked ? '📝' : '🔒'}</span>
                      <span className="text-xs font-semibold">+{unit.xp} XP</span>
                    </div>
                    <h3 className="mt-3 font-bold">{index + 1}. {unit.title}</h3>
                    <p className="mt-2 text-xs text-slate-600">{unit.description}</p>
                    <p className="mt-3 text-xs font-semibold">{completed ? `Validé — meilleur score ${bestScores[unit.id] ?? 0} %` : unlocked ? 'Commencer →' : 'Termine l’unité précédente'}</p>
                  </>
                )
                return unlocked ? (
                  <Link key={unit.id} to={`/cefr/${unit.id}`} className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4 transition hover:border-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600">
                    {content}
                  </Link>
                ) : (
                  <div key={unit.id} aria-label={`${unit.title} : verrouillé`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-500">
                    {content}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
