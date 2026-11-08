import { Link } from 'react-router-dom'
import { independentVerbs } from '../data/independentVerbs'
import { grammarTopics, confusionGroups, phrasalVerbs } from '../data/independentGrammar'
import { tenses } from '../lib/independentLearning'

const categories=[
  {path:'/library/spelling-game',icon:'✍️',title:'Écrire les mots — 20 défis',description:'Lis la traduction française et écris le mot anglais. Les erreurs reviennent jusqu’à ce que tu trouves la bonne orthographe.'},
  {path:'/library/word-game',icon:'🎲',title:'Jeu de mots — 20 mots surprise',description:'20 définitions au hasard : verbes, grammaire, mots confondus et phrasal verbs. Les erreurs reviennent jusqu’à la bonne réponse !'},
  {path:'/library/verbs',icon:'⏱️',title:'Verbes & tous les temps',description:'Choisis un temps, puis n’importe quel verbe. Conjugaisons complètes, formes négatives, questions et quiz.'},
  {path:'/library/grammar',icon:'🧩',title:'Grammaire indépendante',description:'Pronoms, articles, noms, adjectifs, adverbes, prépositions, orthographe et bien plus.'},
  {path:'/library/confusions',icon:'🔠',title:'Mots faciles à confondre',description:'Their / there / they’re, your / you’re, then / than, etc.'},
  {path:'/library/phrasal',icon:'🗣️',title:'Phrasal verbs',description:'Get up, give up, look after, find out, turn off… et leurs usages.'},
  {path:'/library/practice',icon:'🎯',title:'Exercices libres & associations',description:'QCM, phrases à compléter, traduction, phrases à remettre en ordre, cartes et paires.'},
]
export default function LibraryHome(){
  return <div className="space-y-7">
    <Link to="/" className="text-sm font-semibold text-indigo-700">← Accueil</Link>
    <header className="rounded-3xl bg-gradient-to-r from-fuchsia-700 via-indigo-700 to-sky-700 p-6 text-white sm:p-8">
      <p className="text-sm font-bold text-indigo-100">English Learning AI · Accès libre</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">📚 Bibliothèque d'anglais</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-indigo-50">Apprends ce que tu veux, quand tu veux. Tous les verbes et les notions disponibles dans le catalogue sont consultables sans cadenas, sans progression imposée, sans compte et sans limite de quiz.</p>
    </header>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[[String(independentVerbs.length),'verbes'],[String(tenses.length),'temps'],[String(grammarTopics.length),'thèmes de grammaire'],[String(confusionGroups.length+phrasalVerbs.length),'groupes et expressions']].map(([count,label])=><div key={label} className="rounded-2xl border bg-white p-3 text-center shadow-sm"><p className="text-2xl font-extrabold text-indigo-700">{count}</p><p className="text-xs text-slate-600 sm:text-sm">{label}</p></div>)}
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map(item=><Link to={item.path} key={item.path} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md">
        <div className="text-4xl">{item.icon}</div><h2 className="mt-3 text-xl font-bold">{item.title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p><p className="mt-4 font-semibold text-indigo-700">Ouvrir librement →</p>
      </Link>)}
    </div>
    <aside className="rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"><strong>À savoir :</strong> aucun dictionnaire fini ne peut contenir littéralement tous les verbes anglais. Ce catalogue contient {independentVerbs.length} verbes courants et est extensible. Les règles de conjugaison couvrent les verbes listés ; certains usages et verbes rares nécessitent des précisions selon le contexte.</aside>
  </div>
}
