
const levels = [
  { code: 'A0', name: 'Débutant absolu', description: 'Découvrir les premiers mots.' },
  { code: 'A1', name: 'Débutant', description: 'Comprendre les phrases simples.' },
  { code: 'A2', name: 'Élémentaire', description: 'Communiquer dans des situations courantes.' },
  { code: 'B1', name: 'Intermédiaire', description: 'Exprimer ses idées et raconter des expériences.' },
  { code: 'B2', name: 'Intermédiaire avancé', description: 'Communiquer avec plus d’aisance.' },
  { code: 'C1', name: 'Avancé', description: 'Comprendre et utiliser un anglais complexe.' },
  { code: 'C2', name: 'Maîtrise', description: 'Atteindre une excellente maîtrise de la langue.' },
]

export default function Levels() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Niveaux d'anglais</h1>

      <p className="mt-3 text-slate-600">
        Progresse étape par étape, du niveau A0 au niveau C2.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {levels.map(level => (
          <article
            key={level.code}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <span className="text-3xl font-bold text-blue-600">
              {level.code}
            </span>

            <h2 className="mt-2 text-xl font-bold">
              {level.name}
            </h2>

            <p className="mt-2 text-slate-600">
              {level.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
