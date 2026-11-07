import { useState } from 'react'
import { Link } from 'react-router-dom'
import SmartReviewQuiz from '../components/review/SmartReviewQuiz'
import { useSmartReview, type ReviewItem } from '../hooks/useSmartReview'
import { completeLesson, useProgress } from '../hooks/useProgress'
import { REVIEW_ACTIVITY_ID, REVIEW_ACTIVITY_XP } from '../data/activities'

export default function SmartReview() {
  const { dueItems, dueCount, total, mastered, nextDate } = useSmartReview()
  const [session, setSession] = useState<ReviewItem[] | null>(null)
  const { completedLessons } = useProgress()
  const earnedXP = completedLessons.includes(REVIEW_ACTIVITY_ID)

  function handleSuccess() {
    completeLesson(REVIEW_ACTIVITY_ID, REVIEW_ACTIVITY_XP)
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-block rounded-xl bg-slate-200 px-4 py-2 font-medium">← Accueil</Link>
      <header className="rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-600 p-7 text-white">
        <h1 className="text-3xl font-bold">🧠 Mes révisions intelligentes</h1>
        <p className="mt-3 text-violet-100">
          Tes erreurs de Reading et Writing deviennent des exercices de révision.
          Les questions réussies reviendront progressivement dans les prochains jours.
        </p>
        <p className="mt-3 font-bold">⭐ {REVIEW_ACTIVITY_XP} XP à la première séance réussie</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">À revoir maintenant</p><p className="text-3xl font-bold text-violet-700">{dueCount}</p></div>
        <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Erreurs enregistrées</p><p className="text-3xl font-bold">{total}</p></div>
        <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Notions maîtrisées</p><p className="text-3xl font-bold text-green-700">{mastered}</p></div>
      </div>

      {earnedXP && <p className="rounded-xl bg-green-50 p-4 text-green-700">✅ Les XP de base sont déjà gagnés. Les futures séances réussies comptent pour la pratique quotidienne.</p>}

      {session ? (
        <SmartReviewQuiz
          exercises={session}
          onSuccess={handleSuccess}
          onClose={() => setSession(null)}
        />
      ) : dueCount > 0 ? (
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Ta prochaine séance</h2>
          <p className="text-slate-600">Jusqu'à 10 questions prioritaires, choisies parmi tes erreurs à revoir.</p>
          <button
            type="button"
            onClick={() => setSession(dueItems.slice(0, 10))}
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Commencer une séance ({Math.min(dueCount, 10)} questions) →
          </button>
          <ul className="space-y-2 text-sm text-slate-600">
            {dueItems.slice(0, 5).map(item => (
              <li key={item.id} className="rounded-lg bg-slate-50 p-3">
                <strong>{item.source === 'reading' ? '📖 Reading' : item.source === 'writing' ? '✍️ Writing' : item.source}</strong> — {item.prompt}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">🎉 Aucune révision à faire maintenant</h2>
          <p className="text-slate-600">
            {total === 0
              ? 'Aucune erreur n’a encore été enregistrée. Fais un quiz Reading ou Writing : les réponses incorrectes apparaîtront ici.'
              : 'Bravo ! Toutes tes questions sont programmées pour une prochaine révision.'}
          </p>
          {nextDate && <p className="text-sm text-violet-700">Prochaine révision : {new Date(nextDate).toLocaleDateString('fr-FR')}</p>}
          <div className="flex flex-wrap gap-3">
            <Link to="/reading" className="rounded-lg bg-emerald-100 px-4 py-2 font-semibold text-emerald-900">📖 Reading</Link>
            <Link to="/writing" className="rounded-lg bg-cyan-100 px-4 py-2 font-semibold text-cyan-900">✍️ Writing</Link>
          </div>
        </section>
      )}

      <p className="text-xs text-slate-500">Les révisions sont sauvegardées localement dans ce navigateur. Elles ne sont pas encore synchronisées avec un compte.</p>
    </div>
  )
}
