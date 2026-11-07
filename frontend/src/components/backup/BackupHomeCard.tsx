import { Link } from 'react-router-dom'

export default function BackupHomeCard() {
  return (
    <Link
      to="/backup"
      className="block rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="text-4xl">💾</div>
      <h3 className="mt-3 text-lg font-bold">Sauvegarder ma progression</h3>
      <p className="mt-2 text-sm text-slate-600">
        Exporte tes XP, niveaux et révisions en JSON, puis restaure-les quand tu veux.
        Aucun compte nécessaire.
      </p>
      <p className="mt-3 font-semibold text-sky-700">Gérer mes sauvegardes →</p>
    </Link>
  )
}
