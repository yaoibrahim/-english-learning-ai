
import { Link } from 'react-router-dom'
import { a0Levels, a0Units } from '../data/a0Levels'
import { useA0Progress } from '../hooks/useA0Progress'

export default function A0Path() {
  const {
    completedIds,
    completedCount,
    percentage,
    totalXP,
    isUnlocked,
  } = useA0Progress()

  const totalLevels = a0Levels.length

  const nextLevel = a0Levels.find(
    level => !completedIds.has(level.id) && isUnlocked(level.id)
  )

  return (
    <section className="mx-auto max-w-5xl space-y-8 pb-12">

      {/* EN-TÊTE DU PARCOURS */}
      <header className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 p-6 text-white shadow-lg sm:p-8">
        <p className="font-semibold text-indigo-100">
          English Learning AI
        </p>

        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          🌱 Mon parcours A0
        </h1>

        <p className="mt-3 max-w-2xl text-indigo-100">
          Apprends l'anglais étape par étape avec 20 mini-niveaux,
          des exercices interactifs et des récompenses.
        </p>

        {nextLevel ? (
          <Link
            to={`/a0/level/${nextLevel.id}`}
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 shadow hover:bg-indigo-50"
          >
            ▶ Continuer — Niveau {nextLevel.id}
          </Link>
        ) : (
          <div className="mt-6 inline-flex rounded-xl bg-white/20 px-5 py-3 font-bold">
            🏆 Tous les niveaux A0 sont terminés !
          </div>
        )}
      </header>

      {/* STATISTIQUES */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Niveaux terminés
          </p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">
            {completedCount}
            <span className="text-lg font-semibold text-slate-400">
              /{totalLevels}
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Progression A0
          </p>
          <p className="mt-2 text-3xl font-extrabold text-blue-600">
            {percentage} %
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            XP total
          </p>
          <p className="mt-2 text-3xl font-extrabold text-amber-600">
            ⭐ {totalXP}
          </p>
        </div>
      </div>

      {/* BARRE DE PROGRESSION GLOBALE */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">
            Ma progression
          </h2>

          <span className="font-bold text-blue-600">
            {percentage} %
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Progression du parcours A0"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Termine chaque niveau avec au moins 80 % de bonnes
          réponses pour débloquer le suivant.
        </p>
      </div>

      {/* UNITÉS DU PARCOURS */}
      {a0Units.map(unit => {
        const unitLevels = a0Levels.filter(
          level => level.unit === unit.id
        )

        const unitCompleted = unitLevels.filter(
          level => completedIds.has(level.id)
        ).length

        const unitPercentage = unitLevels.length
          ? Math.round(
              (unitCompleted / unitLevels.length) * 100
            )
          : 0

        return (
          <section
            key={unit.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            {/* EN-TÊTE UNITÉ */}
            <div className="bg-slate-900 p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
                Unité {unit.id} sur {a0Units.length}
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                {unit.icon} {unit.title}
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                {unit.description}
              </p>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {unitCompleted}/{unitLevels.length} niveaux
                </span>

                <span className="font-bold">
                  {unitPercentage} %
                </span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-green-400 transition-all duration-500"
                  style={{ width: `${unitPercentage}%` }}
                />
              </div>
            </div>

            {/* CHEMIN VISUEL */}
            <div className="bg-gradient-to-b from-slate-50 to-white px-4 py-8 sm:px-8">
              <div className="mx-auto max-w-xl">

                {unitLevels.map((level, index) => {
                  const completed = completedIds.has(level.id)
                  const unlocked =
                    completed || isUnlocked(level.id)

                  const isLast =
                    index === unitLevels.length - 1

                  // Alternance horizontale des étapes.
                  const positions = [
                    'translate-x-0',
                    'translate-x-10 sm:translate-x-20',
                    'translate-x-0',
                    '-translate-x-10 sm:-translate-x-20',
                    'translate-x-0',
                  ]

                  const position =
                    positions[index % positions.length]

                  const circleStyles = completed
                    ? 'bg-green-500 border-green-700 text-white shadow-green-200'
                    : unlocked
                      ? 'bg-blue-500 border-blue-700 text-white shadow-blue-200'
                      : 'bg-slate-200 border-slate-300 text-slate-500 shadow-slate-100'

                  return (
                    <div
                      key={level.id}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`flex w-full max-w-xs flex-col items-center text-center ${position}`}
                      >
                        {/* NŒUD DU PARCOURS */}
                        {unlocked ? (
                          <Link
                            to={`/a0/level/${level.id}`}
                            aria-label={`Niveau ${level.id} : ${level.title}`}
                            className={`flex h-20 w-20 items-center justify-center rounded-full border-b-[6px] text-3xl shadow-lg transition-transform hover:scale-110 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-400 ${circleStyles}`}
                          >
                            {completed ? '✓' : '★'}
                          </Link>
                        ) : (
                          <div
                            aria-label={`Niveau ${level.id} verrouillé`}
                            className={`flex h-20 w-20 items-center justify-center rounded-full border-b-[6px] text-3xl shadow-lg ${circleStyles}`}
                          >
                            🔒
                          </div>
                        )}

                        {/* INFORMATIONS DU NIVEAU */}
                        <div className="mt-3 max-w-[250px]">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                            Niveau {level.id}
                          </p>

                          <h3 className="mt-1 text-base font-extrabold text-slate-900">
                            {level.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-600">
                            {level.description}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">
                              ⭐ +{level.xp} XP
                            </span>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                              🧠 {level.questionCount} questions
                            </span>
                          </div>

                          <p
                            className={`mt-2 text-sm font-bold ${
                              completed
                                ? 'text-green-700'
                                : unlocked
                                  ? 'text-blue-700'
                                  : 'text-slate-500'
                            }`}
                          >
                            {completed
                              ? '✓ Terminé — Réviser'
                              : unlocked
                                ? '▶ Disponible — Commencer'
                                : '🔒 Termine le niveau précédent'}
                          </p>
                        </div>
                      </div>

                      {/* CONNEXION ENTRE LES NIVEAUX */}
                      {!isLast && (
                        <div
                          aria-hidden="true"
                          className={`my-4 h-12 w-1 rounded-full ${
                            completed
                              ? 'bg-green-400'
                              : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}

              </div>
            </div>

            {/* RÉCOMPENSE DE FIN D'UNITÉ */}
            <div className="border-t border-slate-100 bg-amber-50 px-6 py-5 text-center">
              {unitCompleted === unitLevels.length &&
              unitLevels.length > 0 ? (
                <p className="font-bold text-green-700">
                  🏆 Unité {unit.id} terminée ! Bravo !
                </p>
              ) : (
                <p className="font-semibold text-amber-800">
                  🏆 Termine les {unitLevels.length} niveaux
                  pour compléter cette unité.
                </p>
              )}
            </div>
          </section>
        )
      })}

      {/* RETOUR */}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-800 hover:bg-slate-300"
        >
          ← Retour à l'accueil
        </Link>

        <Link
          to="/progress"
          className="inline-flex rounded-xl bg-indigo-100 px-5 py-3 font-bold text-indigo-800 hover:bg-indigo-200"
        >
          📊 Voir ma progression
        </Link>
      </div>

    </section>
  )
}
