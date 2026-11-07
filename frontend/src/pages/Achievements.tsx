
import { Link } from 'react-router-dom'
import { useAchievements } from '../hooks/useAchievements'

export default function Achievements() {
  const {
    achievementStatus,
    nextAchievement,
    unlockedCount,
    totalAchievements,
    completedCount,
    percentage,
    totalXP,
  } = useAchievements()

  return (
    <section className="mx-auto max-w-5xl space-y-8 pb-12">

      {/* EN-TÊTE */}
      <header className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-8 text-white shadow-lg">
        <p className="font-semibold text-amber-100">
          English Learning AI
        </p>

        <h1 className="mt-3 text-3xl font-extrabold">
          🏆 Mes récompenses
        </h1>

        <p className="mt-3 text-amber-50">
          Débloque des badges en terminant les
          mini-niveaux de ton parcours A0.
        </p>
      </header>

      {/* STATISTIQUES */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Badges obtenus
          </p>

          <p className="mt-2 text-3xl font-extrabold text-amber-600">
            {unlockedCount}/{totalAchievements}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Niveaux A0 terminés
          </p>

          <p className="mt-2 text-3xl font-extrabold text-blue-600">
            {completedCount}/20
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            XP total
          </p>

          <p className="mt-2 text-3xl font-extrabold text-purple-600">
            ⭐ {totalXP}
          </p>
        </div>
      </div>

      {/* PROGRESSION GLOBALE */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex justify-between gap-3">
          <h2 className="font-bold">
            Progression A0
          </h2>

          <span className="font-bold text-blue-600">
            {percentage} %
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* PROCHAINE RÉCOMPENSE */}
      {nextAchievement ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm font-bold uppercase text-blue-700">
            Prochaine récompense
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="text-5xl">
              {nextAchievement.icon}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {nextAchievement.title}
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Encore{' '}
                {nextAchievement.requiredLevels - completedCount}{' '}
                niveau(x) à terminer.
              </p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${nextAchievement.progress}%`,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-green-50 p-6 text-center">
          <div className="text-5xl">👑</div>

          <h2 className="mt-3 text-2xl font-bold text-green-800">
            Félicitations !
          </h2>

          <p className="mt-2 text-green-700">
            Tu as obtenu tous les badges du parcours A0.
          </p>
        </div>
      )}

      {/* LISTE DES BADGES */}
      <section>
        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          🎖️ Collection de badges
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {achievementStatus.map(achievement => (
            <article
              key={achievement.id}
              className={`rounded-2xl border-2 p-6 shadow-sm ${
                achievement.unlocked
                  ? 'border-green-300 bg-green-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`text-5xl ${
                    achievement.unlocked
                      ? ''
                      : 'grayscale opacity-40'
                  }`}
                >
                  {achievement.icon}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    achievement.unlocked
                      ? 'bg-green-200 text-green-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {achievement.unlocked
                    ? '✓ Débloqué'
                    : '🔒 Verrouillé'}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {achievement.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {achievement.description}
              </p>

              <div className="mt-5 flex justify-between text-sm font-semibold text-slate-600">
                <span>Progression</span>

                <span>
                  {Math.min(
                    completedCount,
                    achievement.requiredLevels
                  )}
                  /{achievement.requiredLevels}
                </span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    achievement.unlocked
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                  style={{
                    width: `${achievement.progress}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NAVIGATION */}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/path"
          className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
        >
          🌱 Continuer le parcours A0
        </Link>

        <Link
          to="/"
          className="rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-800 hover:bg-slate-300"
        >
          ← Retour à l'accueil
        </Link>
      </div>

    </section>
  )
}
