
import {
  setDailyGoal,
  useDailyGoal,
  type DailyGoalValue,
} from '../hooks/useDailyGoal'

const goals: {
  value: DailyGoalValue
  title: string
  icon: string
  description: string
}[] = [
  {
    value: 1,
    title: 'Débutant',
    icon: '🌱',
    description: '1 exercice par jour',
  },
  {
    value: 3,
    title: 'Régulier',
    icon: '🔥',
    description: '3 exercices par jour',
  },
  {
    value: 5,
    title: 'Intensif',
    icon: '🚀',
    description: '5 exercices par jour',
  },
  {
    value: 10,
    title: 'Expert',
    icon: '🏆',
    description: '10 exercices par jour',
  },
]

export default function DailyGoalCard() {
  const {
    goal,
    completedToday,
    percentage,
    goalReached,
    remaining,
  } = useDailyGoal()

  return (
    <section className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">
          Mon objectif quotidien
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
          🎯 Mon défi du jour
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Choisis combien d'exercices tu veux réussir chaque jour.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {goals.map(item => {
          const selected = goal === item.value

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setDailyGoal(item.value)}
              aria-pressed={selected}
              className={`rounded-xl border-2 p-4 text-left transition ${
                selected
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-slate-200 bg-slate-50 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">
                  {item.icon}
                </span>

                {selected && (
                  <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                    Sélectionné
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                {item.description}
              </p>
            </button>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl bg-indigo-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold text-indigo-900">
            Progression aujourd'hui
          </h3>

          <span className="text-xl font-extrabold text-indigo-700">
            {completedToday}/{goal}
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Objectif quotidien"
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-valuenow={Math.min(completedToday, goal)}
          className="mt-4 h-4 overflow-hidden rounded-full bg-indigo-200"
        >
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-3 text-sm font-semibold text-indigo-800">
          {goalReached
            ? '🎉 Félicitations ! Ton objectif quotidien est atteint.'
            : `Encore ${remaining} exercice(s) pour atteindre ton objectif.`}
        </p>

        {completedToday > goal && (
          <p className="mt-2 text-sm text-green-700">
            Tu as dépassé ton objectif de {completedToday - goal}
            {' '}exercice(s) !
          </p>
        )}
      </div>
    </section>
  )
}
