import { Link } from 'react-router-dom'
import { useCourseProgress } from '../../hooks/useCourseProgress'
export default function CourseHomeCard() {
  const { completedCount, totalCount, percentage } = useCourseProgress()
  return <article className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-sky-50 p-6 shadow-sm">
    <div className="text-4xl">📚</div><h3 className="mt-3 text-xl font-bold">Cours progressifs — A0 à C2</h3>
    <p className="mt-3 text-slate-700">Grammaire, orthographe, temps, tous les pronoms, vocabulaire, prononciation, lecture, écriture, écoute et exercices mélangés.</p>
    <p className="mt-3 font-semibold text-indigo-800">{completedCount}/{totalCount} unités · {percentage} %</p>
    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-indigo-100"><div className="h-full rounded-full bg-indigo-600" style={{width:`${percentage}%`}} /></div>
    <Link to="/courses" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">Ouvrir les cours →</Link>
  </article>
}
