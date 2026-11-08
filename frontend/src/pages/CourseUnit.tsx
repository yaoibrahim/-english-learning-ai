import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseUnit } from '../data/courses'
import { useCourseProgress } from '../hooks/useCourseProgress'
import CourseQuiz from '../components/courses/CourseQuiz'
import UnitTests from '../components/courses/UnitTests'
import SentenceDiscovery from '../components/courses/SentenceDiscovery'

type LessonPhase = 'lesson' | 'quiz' | 'test'

export default function CourseUnitPage() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = getCourseUnit(unitId || '')
  const progress = useCourseProgress()
  const [phase, setPhase] = useState<LessonPhase>('lesson')

  if (!unit) return <section className="rounded-xl bg-white p-6">
    <h1 className="text-2xl font-bold">Unité introuvable</h1>
    <Link to="/courses" className="text-indigo-700 underline">Retour aux cours</Link>
  </section>

  // Les unités du parcours principal restent progressives. La bibliothèque
  // indépendante (/library) n'a, elle, aucune condition de déblocage.
  if (!progress.isUnlocked(unit.id)) return <section className="space-y-3 rounded-xl bg-white p-6">
    <h1 className="text-2xl font-bold">🔒 Unité verrouillée</h1>
    <p>Réussis l'unité précédente pour la débloquer.</p>
    <Link to="/courses" className="font-semibold text-indigo-700 underline">Retour au parcours</Link>
  </section>

  function changePhase(next: LessonPhase) {
    setPhase(next)
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return <div className="space-y-6">
    <Link to="/courses" className="inline-flex min-h-11 items-center rounded-xl bg-slate-200 px-4 py-2 font-semibold">← Toutes les unités</Link>
    <header className="rounded-3xl bg-indigo-700 p-6 text-white sm:p-8">
      <p className="font-semibold text-indigo-100">{unit.level} · Unité {unit.index + 1}/35</p>
      <h1 className="mt-2 text-3xl font-extrabold">{unit.title}</h1>
      <p className="mt-3 text-indigo-50">1. Découvre les mots et les règles phrase par phrase · 2. Entraîne-toi à reconnaître et construire · 3. Valide tes acquis.</p>
      <p className="mt-3 font-bold">⭐ {unit.xp} XP à la première réussite du test final · 80 % requis</p>
      {progress.isCompleted(unit.id) && <p className="mt-2 font-bold text-green-200">✅ Déjà réussi · Meilleur score : {progress.bestScores[unit.id] || 0} %</p>}
    </header>

    <nav className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-2 shadow-sm" aria-label="Étapes de l'unité">
      <button type="button" onClick={() => changePhase('lesson')} aria-current={phase === 'lesson' ? 'step' : undefined} className={`min-h-12 rounded-xl px-2 text-sm font-bold sm:text-base ${phase === 'lesson' ? 'bg-indigo-700 text-white' : 'text-slate-700'}`}>📘 Découverte</button>
      <button type="button" onClick={() => changePhase('quiz')} aria-current={phase === 'quiz' ? 'step' : undefined} className={`min-h-12 rounded-xl px-2 text-sm font-bold sm:text-base ${phase === 'quiz' ? 'bg-indigo-700 text-white' : 'text-slate-700'}`}>🎯 Exercices</button>
      <button type="button" onClick={() => changePhase('test')} aria-current={phase === 'test' ? 'step' : undefined} className={`min-h-12 rounded-xl px-2 text-sm font-bold sm:text-base ${phase === 'test' ? 'bg-indigo-700 text-white' : 'text-slate-700'}`}>✅ Test final</button>
    </nav>

    {phase === 'lesson' && <SentenceDiscovery key={unit.id} unit={unit} onFinish={() => changePhase('quiz')} />}
    {phase === 'quiz' && <CourseQuiz key={unit.id} unit={unit} onFinish={() => changePhase('test')} />}
    {phase === 'test' && <UnitTests key={unit.id} unit={unit} />}
  </div>
}
