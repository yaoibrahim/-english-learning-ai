import { Link } from 'react-router-dom'
export default function LibraryHomeCard(){
  return <Link to="/library" className="block rounded-2xl border-2 border-fuchsia-300 bg-fuchsia-50 p-6 shadow-sm transition hover:shadow-md">
    <div className="text-4xl">📚</div><h3 className="mt-3 text-xl font-extrabold">Bibliothèque libre d'anglais</h3>
    <p className="mt-2 text-sm text-slate-700">Verbes et conjugaisons, pronoms, grammaire, adverbes, mots confondus, phrasal verbs et jeux. Aucun cadenas.</p>
    <p className="mt-4 font-bold text-fuchsia-700">Explorer tous les cours →</p>
  </Link>
}
