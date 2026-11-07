import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseUnit } from '../data/courses'
import { useCourseProgress } from '../hooks/useCourseProgress'
import CourseQuiz from '../components/courses/CourseQuiz'
function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const phrase = new SpeechSynthesisUtterance(text)
  phrase.lang = 'en-US'; phrase.rate = 0.85
  window.speechSynthesis.speak(phrase)
}
export default function CourseUnitPage() {
  const { unitId } = useParams<{unitId:string}>()
  const unit = getCourseUnit(unitId || '')
  const progress = useCourseProgress()
  const [phase, setPhase] = useState<'lesson'|'quiz'>('lesson')
  if (!unit) return <div className="rounded-xl bg-white p-6"><h1 className="text-2xl font-bold">Unité introuvable</h1><Link to="/courses" className="text-indigo-700 underline">Retour aux cours</Link></div>
  if (!progress.isUnlocked(unit.id)) return <div className="rounded-xl bg-white p-6"><h1 className="text-2xl font-bold">🔒 Unité verrouillée</h1><p>Réussis l'unité précédente pour la débloquer.</p><Link to="/courses" className="text-indigo-700 underline">Retour</Link></div>
  return <div className="space-y-6">
    <Link to="/courses" className="inline-flex min-h-11 items-center rounded-xl bg-slate-200 px-4 font-semibold">← Mes cours</Link>
    <header className="rounded-3xl bg-indigo-700 p-6 text-white sm:p-8">
      <p className="font-semibold text-indigo-100">{unit.level} · Unité {unit.index+1}/35</p>
      <h1 className="mt-2 text-3xl font-extrabold">{unit.title}</h1>
      <p className="mt-3 text-indigo-50">Grammaire, orthographe, vocabulaire, prononciation, écoute, lecture et écriture.</p>
      <p className="mt-3 font-bold">⭐ {unit.xp} XP à la première réussite · 80 % requis</p>
      {progress.isCompleted(unit.id) && <p className="mt-2 font-bold text-green-200">✅ Déjà réussi · Meilleur score : {progress.bestScores[unit.id]||0} %</p>}
    </header>
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-2 shadow-sm">
      <button type="button" onClick={()=>setPhase('lesson')} className={`min-h-12 rounded-xl px-3 font-bold ${phase==='lesson'?'bg-indigo-700 text-white':'text-slate-700'}`}>📘 Leçons</button>
      <button type="button" onClick={()=>setPhase('quiz')} className={`min-h-12 rounded-xl px-3 font-bold ${phase==='quiz'?'bg-indigo-700 text-white':'text-slate-700'}`}>🎯 Exercices</button>
    </div>
    {phase==='lesson' ? <div className="space-y-5">
      {unit.lessons.map((lesson,i)=><article key={i} className="space-y-3 rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase text-indigo-700">{lesson.category} · Notion {i+1}/3</p>
        <h2 className="text-xl font-bold">{lesson.title}</h2><p className="leading-8 text-slate-700">{lesson.explanation}</p>
        <div className="space-y-2 rounded-xl bg-indigo-50 p-4"><p className="text-lg font-bold text-indigo-950">{lesson.english}</p><p>{lesson.french}</p>
          <button type="button" onClick={()=>speak(lesson.english)} className="min-h-11 rounded-xl bg-indigo-700 px-4 py-2 font-semibold text-white">🔊 Écouter</button></div>
      </article>)}
      <section className="space-y-3 rounded-2xl border bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">🧠 Vocabulaire et répétition</h2>
        <div className="grid gap-2 sm:grid-cols-2">{unit.vocabulary.map(w=><p key={w.english} className="rounded-lg bg-slate-50 p-3"><strong>{w.english}</strong> — {w.french}</p>)}</div>
        {unit.revisitedVocabulary.length>0 && <div className="rounded-xl bg-amber-50 p-4"><h3 className="font-bold">🔁 Mots des anciennes unités</h3><p className="mt-2 text-sm">{unit.revisitedVocabulary.map(w=>`${w.english} (${w.french})`).join(' · ')}</p></div>}
      </section>
      <section className="space-y-3 rounded-2xl border bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">📖 Lecture</h2>
        <p className="rounded-xl bg-sky-50 p-4 text-lg leading-8">{unit.readingText}</p>
        <h3 className="font-bold">🗣️ Pratique orale</h3><p>Répète cette phrase à voix haute, puis essaie sans regarder :</p>
        <p className="rounded-xl bg-green-50 p-4 font-semibold">{unit.speakingPrompt}</p>
        <div className="flex flex-wrap gap-2"><button type="button" onClick={()=>speak(unit.speakingPrompt)} className="min-h-11 rounded-xl bg-sky-700 px-4 font-semibold text-white">🔊 Écouter</button>
        <Link to="/speaking" className="inline-flex min-h-11 items-center rounded-xl bg-purple-100 px-4 font-semibold text-purple-900">🎤 Aller au Speaking</Link></div>
        <p className="text-xs text-slate-500">Le module Speaking existant permet la reconnaissance vocale. Cette unité évalue l'écoute et l'écrit dans son quiz, pas la prononciation acoustique.</p>
      </section>
      <button type="button" onClick={()=>{setPhase('quiz');window.scrollTo(0,0)}} className="min-h-12 w-full rounded-xl bg-indigo-700 p-4 font-bold text-white">Passer aux exercices →</button>
    </div> : <CourseQuiz key={unit.id} unit={unit} />}
  </div>
}
