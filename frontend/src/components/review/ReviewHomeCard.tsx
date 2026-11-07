import { Link } from 'react-router-dom'
import { useSmartReview } from '../../hooks/useSmartReview'

export default function ReviewHomeCard() {
  const { dueCount, total, mastered } = useSmartReview()
  return (
    <Link
      to="/reviews"
      className="block rounded-2xl border border-violet-200 bg-violet-50 p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="text-4xl">🧠</div>
      <h3 className="mt-3 text-lg font-bold">Révisions intelligentes</h3>
      <p className="mt-2 text-sm text-slate-600">
        Retrouve les erreurs de tes quiz et révise-les au bon moment.
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-violet-800">
        <span>{dueCount} à revoir</span>
        <span>· {total} enregistrée(s)</span>
        <span>· {mastered} maîtrisée(s)</span>
      </div>
      <p className="mt-3 font-semibold text-violet-700">Ouvrir mes révisions →</p>
    </Link>
  )
}
