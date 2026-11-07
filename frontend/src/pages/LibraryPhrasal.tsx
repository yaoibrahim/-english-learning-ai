import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { phrasalVerbs } from '../data/independentGrammar'
import { entryQuestions, speakEnglish } from '../lib/independentLearning'
import MiniQuiz from '../components/library/MiniQuiz'
import MatchThree from '../components/library/MatchThree'
export default function LibraryPhrasal(){
  const [selected,setSelected]=useState(phrasalVerbs[0].id)
  const [filter,setFilter]=useState('')
  const item=phrasalVerbs.find(p=>p.id===selected)??phrasalVerbs[0]
  const filtered=phrasalVerbs.filter(p=>p.en.toLowerCase().includes(filter.toLowerCase())||p.fr.toLowerCase().includes(filter.toLowerCase()))
  const available=filtered.some(p=>p.id===item.id)?filtered:[item,...filtered]
  const individual=useMemo(()=>entryQuestions(phrasalVerbs,item),[item])
  const final=useMemo(()=>entryQuestions(phrasalVerbs,undefined,6),[])
  return <div className="space-y-7">
    <Link to="/library" className="text-sm font-semibold text-indigo-700">← Bibliothèque</Link>
    <header><h1 className="text-3xl font-extrabold">🗣️ Phrasal Verbs</h1><p className="mt-2 text-slate-600">{phrasalVerbs.length} verbes à particule, du débutant à l'avancé, disponibles sans cadenas.</p></header>
    <section className="space-y-4 rounded-2xl border bg-white p-4 sm:p-6">
      <label className="block space-y-2"><span className="font-bold">Rechercher une expression</span><input type="search" value={filter} onChange={(e: {target:{value:string}})=>setFilter(e.target.value)} className="min-h-12 w-full rounded-xl border p-3" placeholder="look, get, sortir…"/></label>
      <label className="block space-y-2"><span className="font-bold">Choisir le phrasal verb</span><select value={item.id} onChange={(e: {target:{value:string}})=>setSelected(e.target.value)} className="min-h-12 w-full rounded-xl border p-3">{available.map(p=><option key={p.id} value={p.id}>{p.level} · {p.en} — {p.fr}</option>)}</select></label>
      <div className="rounded-2xl bg-indigo-50 p-5"><p className="text-sm font-semibold text-indigo-700">Difficulté indicative : {item.level}</p><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-3xl font-extrabold">{item.en}</h2><button onClick={()=>speakEnglish(item.example)} className="rounded-xl bg-white px-4 py-3 text-indigo-700">🔊 Écouter</button></div><p className="mt-2 font-semibold">{item.fr}</p><p className="mt-3 text-lg">{item.example}</p><p className="mt-2 text-sm text-slate-600">Attention : les phrasal verbs peuvent changer de sens selon le contexte ; la traduction affichée correspond à l'exemple.</p></div>
      <details className="rounded-xl bg-slate-50 p-4"><summary className="cursor-pointer font-bold">Voir la liste des {phrasalVerbs.length} expressions</summary><div className="mt-3 grid gap-2 sm:grid-cols-2">{phrasalVerbs.map(p=><button type="button" key={p.id} onClick={()=>setSelected(p.id)} className="rounded-lg border bg-white p-3 text-left text-sm">{p.en} — {p.fr}</button>)}</div></details>
    </section>
    <MiniQuiz key={item.id} title={`🎯 Exercice : ${item.en}`} questions={individual}/>
    <MiniQuiz key="phrasal-final" title="🏁 Quiz de fin du module Phrasal Verbs" questions={final}/>
    <MatchThree title="Associe 3 phrasal verbs" pool={phrasalVerbs}/>
  </div>
}
