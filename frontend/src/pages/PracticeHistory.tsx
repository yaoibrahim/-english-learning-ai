
import { Link } from 'react-router-dom'
import PracticeCalendar from '../components/PracticeCalendar'

export default function PracticeHistory() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 pb-12">
      <header className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <p className="font-semibold text-blue-100">
          English Learning AI
        </p>

        <h1 className="mt-3 text-3xl font-extrabold">
          📅 Historique d'apprentissage
        </h1>

        <p className="mt-3 text-blue-100">
          Consulte tes journées de pratique,
          tes séries quotidiennes et ton record personnel.
        </p>
      </header>

      <PracticeCalendar />

      <div className="flex flex-wrap gap-3">
        <Link
          to="/path"
          className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
        >
          🌱 Continuer mon parcours A0
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
