import { Link, useParams } from 'react-router-dom'
import CEFRQuiz from '../components/cefr/CEFRQuiz'
import { getCEFRUnit } from '../data/cefr'
import { recordCEFRResult, useCEFRProgress } from '../hooks/useCEFRProgress'

export default function CEFRUnit() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = getCEFRUnit(unitId ?? '')
  const { isUnlocked, isCompleted, bestScores } = useCEFRProgress()

  if (!unit) {
    return <div className="space-y-4"><h1 className="text-2xl font-bold">Unité introuvable</h1><Link className="text-indigo-700 underline" to="/cefr">Retour au parcours</Link></div>
  }
  if (!isUnlocked(unit.id)) {
    return <div className="space-y-4"><h1 className="text-2xl font-bold">🔒 Cette unité est verrouillée</h1><p>Valide les unités précédentes à au moins 80 % pour continuer.</p><Link className="text-indigo-700 underline" to="/cefr">Retour au parcours</Link></div>
  }
  return (
    <div className="space-y-6">
      <Link to="/cefr" className="inline-block rounded-xl bg-slate-200 px-4 py-2 font-medium">← Parcours A1 à C2</Link>
      <header className="rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 p-7 text-white">
        <p className="font-bold text-indigo-100">{unit.level} · {unit.skill}</p>
        <h1 className="mt-2 text-3xl font-bold">{unit.title}</h1>
        <p className="mt-2 text-indigo-100">{unit.description}</p>
        <p className="mt-4 font-semibold">{unit.questions.length} questions · 80 % pour réussir · +{unit.xp} XP la première fois</p>
      </header>
      {isCompleted(unit.id) && <p className="rounded-xl bg-green-50 p-4 text-green-800">✅ Unité validée. Meilleur score : {bestScores[unit.id] ?? 0} %. Tu peux la refaire sans regagner ses XP de base.</p>}
      <CEFRQuiz key={unit.id} unit={unit} onFinish={(correct, total) => recordCEFRResult(unit.id, correct, total)} />
    </div>
  )
}
