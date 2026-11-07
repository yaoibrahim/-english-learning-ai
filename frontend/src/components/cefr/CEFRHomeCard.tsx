import { Link } from 'react-router-dom'
import { useCEFRProgress } from '../../hooks/useCEFRProgress'

export default function CEFRHomeCard() {
  const { completedCount, totalUnits, percentage } = useCEFRProgress()
  return (
    <Link to="/cefr" className="block rounded-2xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm transition hover:shadow-md">
      <div className="text-4xl">🌍</div>
      <h3 className="mt-3 text-lg font-bold text-slate-900">Parcours A1 à C2</h3>
      <p className="mt-2 text-sm text-slate-600">Progresse à travers six niveaux, avec des unités à débloquer et des quiz corrigés.</p>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-indigo-100">
        <div className="h-full rounded-full bg-indigo-600" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-2 text-sm font-semibold text-indigo-800">{completedCount}/{totalUnits} unités terminées</p>
      <p className="mt-3 font-semibold text-indigo-700">Voir mon parcours →</p>
    </Link>
  )
}
