import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLearningStats } from '../hooks/useLearningStats'
import { useDailyGoal, setDailyGoal, type DailyGoalValue } from '../hooks/useDailyGoal'
import { useDailyMissions } from '../hooks/useDailyMissions'
import { useStreak } from '../hooks/useStreak'
import { useA0Progress } from '../hooks/useA0Progress'
import { useSmartReview } from '../hooks/useSmartReview'
import SentenceBuilder from '../components/exercises/SentenceBuilder'
import { readHomePathProgress, HOME_CEFR_TOTAL, HOME_COURSES_TOTAL } from '../lib/homeProgress'

const featured = [
  { to: '/path', icon: '🌱', title: 'Mon parcours A0', description: 'Premiers niveaux et exercices guidés', action: 'Continuer', tone: 'indigo' },
  { to: '/alphabet', icon: '🔤', title: 'Alphabet anglais', description: '26 lettres et leur prononciation', action: 'Apprendre', tone: 'sky' },
  { to: '/listening', icon: '🎧', title: 'Listening', description: 'Comprendre les phrases à l’oral', action: 'Écouter', tone: 'blue' },
  { to: '/speaking', icon: '🎤', title: 'Speaking', description: 'Parler avec le microphone', action: 'Parler', tone: 'violet' },
  { to: '/writing', icon: '✍️', title: 'Writing', description: 'Écrire et corriger les phrases', action: 'Écrire', tone: 'cyan' },
  { to: '/reading', icon: '📖', title: 'Reading', description: 'Lire et répondre aux questions', action: 'Lire', tone: 'emerald' },
] as const

const exploration = [
  { to: '/library', icon: '📚', title: 'Bibliothèque libre', description: 'Verbes, temps, pronoms, grammaire, quiz — sans cadenas' },
  { to: '/courses', icon: '🧠', title: '35 unités A0 à C2', description: 'Cours mixtes avec répétition des notions' },
  { to: '/courses/references', icon: '📑', title: 'Fiches de référence', description: 'Chercher une règle ou un sujet' },
  { to: '/cefr', icon: '🌍', title: 'Parcours A1–C2', description: '18 unités et progression par niveaux' },
  { to: '/reviews', icon: '🔁', title: 'Révisions intelligentes', description: 'Retravailler les réponses incorrectes' },
  { to: '/lessons', icon: '📘', title: 'Mes leçons', description: 'Vocabulaire, grammaire et conjugaison' },
  { to: '/numbers', icon: '🔢', title: 'Nombres anglais', description: 'Compter et prononcer les nombres' },
  { to: '/colors', icon: '🎨', title: 'Couleurs', description: 'Apprendre les couleurs en anglais' },
  { to: '/calendar', icon: '📅', title: 'Jours et mois', description: 'Se repérer dans le calendrier' },
  { to: '/family', icon: '👨‍👩‍👧‍👦', title: 'La famille', description: 'Décrire sa famille et ses proches' },
  { to: '/achievements', icon: '🏆', title: 'Récompenses', description: 'Retrouver ses badges' },
  { to: '/practice-history', icon: '🗓️', title: 'Historique', description: 'Voir les jours de pratique' },
  { to: '/library/practice', icon: '🎯', title: 'Exercices libres', description: 'QCM, associations, traductions et plus' },
  { to: '/library/verbs', icon: '⏱️', title: 'Verbes et temps', description: 'Conjugaisons et exercices libres' },
  { to: '/progress', icon: '📊', title: 'Ma progression', description: 'Statistiques et scores' },
  { to: '/backup', icon: '💾', title: 'Sauvegarde locale', description: 'Exporter et restaurer ses données' },
] as const

function Meter({ value, label }: { value: number; label: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
    <div className="h-full rounded-full bg-indigo-600 transition-[width]" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
}

function safeReadHomeProgress() {
  try { return readHomePathProgress(window.localStorage) }
  catch { return { cefrCount: 0, coursesCount: 0 } }
}

export default function Home() {
  const stats = useLearningStats()
  const daily = useDailyGoal()
  const missions = useDailyMissions()
  const streak = useStreak()
  const a0 = useA0Progress()
  const [paths, setPaths] = useState(safeReadHomeProgress)
  useEffect(() => {
    const refresh = () => setPaths(safeReadHomeProgress())
    window.addEventListener('storage', refresh)
    window.addEventListener('focus', refresh)
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('focus', refresh) }
  }, [])
  const reviews = useSmartReview()
  const [showExtras, setShowExtras] = useState(false)
  const [showPractice, setShowPractice] = useState(false)

  return (
    <div className="home-dashboard space-y-5 pb-6">
      <header className="mb-5 space-y-1 sm:mb-6">
        <p className="text-xs font-semibold tracking-wide text-indigo-600">English Learning AI</p>
        <h1 className="text-[1.55rem] font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl">
          Apprends l’anglais à ton rythme
        </h1>
        <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
          Mots, prononciation et phrases, à ton rythme et sans compte utilisateur.
        </p>
      </header>

      <section aria-labelledby="home-stats-title" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="home-stats-title" className="text-base font-bold text-slate-900">📊 Mon tableau de bord</h2>
          <Link to="/progress" className="text-xs font-semibold text-indigo-700 underline-offset-2 hover:underline">Voir ma progression →</Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {[
            { label: '⭐ XP gagnés', number: stats.totalXP, tone: 'text-amber-600' },
            { label: '📖 Leçons', number: `${stats.completedLessonCount}/${stats.totalLessons}`, tone: 'text-blue-600' },
            { label: '🎯 Activités', number: `${stats.completedActivities}/${stats.totalActivities}`, tone: 'text-emerald-600' },
            { label: '📈 Progression', number: `${stats.percentage} %`, tone: 'text-violet-600' },
          ].map(item => <div key={item.label} className="home-panel min-w-0 px-3 py-3 sm:px-4">
            <p className="text-[11px] font-medium text-slate-500 sm:text-xs">{item.label}</p>
            <p className={`mt-1 text-2xl font-extrabold tabular-nums sm:text-[1.7rem] ${item.tone}`}>{item.number}</p>
          </div>)}
        </div>
        <div className="home-panel space-y-2 px-3 py-3 sm:px-4">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold">
            <span>Progression des activités de base</span>
            <span className="text-indigo-700">{stats.percentage} %</span>
          </div>
          <Meter value={stats.percentage} label="Progression des activités de base" />
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate-500">
            <span>A0 : {a0.completedCount}/20</span>
            <span>A1–C2 : {paths.cefrCount}/{HOME_CEFR_TOTAL}</span>
            <span>Cours mixtes : {paths.coursesCount}/{HOME_COURSES_TOTAL}</span>
            {reviews.dueCount > 0 && <Link to="/reviews" className="font-semibold text-indigo-700">{reviews.dueCount} révision(s) à faire</Link>}
          </div>
        </div>
        <Link to={stats.nextLesson ? '/lessons' : '/courses'} className="home-cta flex min-h-11 items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-center text-xs font-bold text-white transition hover:bg-indigo-700 sm:hidden">
          {stats.nextLesson ? 'Continuer mes leçons →' : 'Découvrir les cours →'}
        </Link>
      </section>

      <section className="grid gap-3 md:grid-cols-2" aria-label="Objectif et série quotidienne">
        <div className="home-panel space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-950">🎯 Objectif du jour</h2>
            <label className="text-[11px] text-slate-500">
              <span className="sr-only">Exercices par jour</span>
              <select aria-label="Objectif quotidien en exercices" className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700" value={daily.goal} onChange={event => setDailyGoal(Number(event.target.value) as DailyGoalValue)}>
                {[1, 3, 5, 10].map(n => <option key={n} value={n}>{n}/jour</option>)}
              </select>
            </label>
          </div>
          <p className="text-xs text-slate-600">Encore {daily.remaining} exercice(s) pour atteindre ton objectif.</p>
          <Meter value={daily.percentage} label="Objectif de la journée" />
          <p className="text-[11px] text-slate-500">{daily.completedToday}/{daily.goal} réussi(s) aujourd’hui</p>
        </div>
        <div className="home-panel space-y-2 border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-slate-900">🔥 Série quotidienne</h2>
            <span className="rounded-lg bg-white px-2 py-1 text-[11px] text-amber-800">Record : {streak.bestStreak}</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-700">{streak.currentStreak} jour{streak.currentStreak > 1 ? 's' : ''}</p>
          <p className="text-xs text-slate-700">{streak.practicedToday ? 'Bravo, tu as pratiqué aujourd’hui !' : 'Réussis un exercice pour maintenir ta série.'}</p>
        </div>
      </section>

      <section className="home-panel space-y-3 p-4" aria-labelledby="home-missions-title">
        <div className="flex items-center justify-between gap-3">
          <h2 id="home-missions-title" className="text-sm font-bold">🏆 Missions du jour</h2>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">{missions.completedCount}/{missions.totalCount}</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {missions.missions.map(mission => <div key={mission.id} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
            <div className="mb-1 flex items-start justify-between gap-1">
              <span className="text-xs font-semibold">{mission.icon} {mission.title}</span>
              <span className="whitespace-nowrap text-[10px] font-bold text-amber-700">+{mission.reward} XP</span>
            </div>
            <p className="mb-2 text-[11px] text-slate-500">{mission.progress}/{mission.target} exercices</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigo-500" style={{width:`${mission.progress / mission.target * 100}%`}} /></div>
          </div>)}
        </div>
        {missions.allCompleted && <p className="text-xs font-semibold text-emerald-700">Toutes les missions du jour sont terminées !</p>}
      </section>

      <section className="space-y-3" aria-labelledby="home-activities-title">
        <div className="flex items-center justify-between gap-3">
          <h2 id="home-activities-title" className="text-base font-bold">📚 Mes activités</h2>
          <button type="button" onClick={() => setShowExtras(!showExtras)} aria-expanded={showExtras} aria-controls="home-more-activities" className="text-xs font-semibold text-indigo-700 hover:underline">{showExtras ? 'Réduire ↑' : 'Tout explorer →'}</button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(activity => <Link key={activity.to} to={activity.to} className={`home-activity home-activity--${activity.tone} group min-w-0 rounded-xl border p-3 transition hover:-translate-y-0.5 hover:shadow-md sm:p-4`}>
            <div className="flex items-start gap-2 sm:block">
              <span className="text-xl" aria-hidden="true">{activity.icon}</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-bold text-slate-950 sm:mt-2">{activity.title}</h3>
                <p className="mt-1 text-xs leading-snug text-slate-600">{activity.description}</p>
              </div>
              <span aria-hidden="true" className="mt-1 text-indigo-500 sm:hidden">›</span>
            </div>
            <span className="mt-3 hidden min-h-9 items-center justify-center rounded-lg bg-indigo-600 px-3 text-xs font-bold text-white sm:flex">{activity.action}</span>
          </Link>)}
        </div>
        {showExtras && <div id="home-more-activities" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Tous les autres modules">
          {exploration.map(item => <Link key={item.to} to={item.to} className="home-panel group flex min-w-0 items-center gap-3 p-3 transition hover:border-indigo-300 hover:bg-indigo-50">
            <span aria-hidden="true" className="text-lg">{item.icon}</span>
            <span className="min-w-0"><span className="block text-xs font-bold text-slate-900">{item.title}</span><span className="block text-[11px] leading-snug text-slate-500">{item.description}</span></span>
          </Link>)}
        </div>}
      </section>

      <section className="home-panel overflow-hidden" aria-label="Entraînement rapide">
        <button type="button" className="flex min-h-12 w-full items-center justify-between gap-3 p-4 text-left text-sm font-bold" aria-expanded={showPractice} aria-controls="home-practice" onClick={() => setShowPractice(!showPractice)}>
          <span>✨ Entraînement rapide · Construis la phrase</span>
          <span aria-hidden="true">{showPractice ? '−' : '+'}</span>
        </button>
        {showPractice && <div id="home-practice" className="border-t border-slate-100 p-4"><SentenceBuilder /></div>}
      </section>
      <div className="flex flex-wrap justify-between gap-3 text-xs text-slate-500">
        <Link to="/backup" className="hover:text-indigo-700">💾 Sauvegarder ma progression</Link>
        <Link to="/library" className="font-semibold text-indigo-700">📚 Bibliothèque libre · sans cadenas →</Link>
      </div>
    </div>
  )
}
