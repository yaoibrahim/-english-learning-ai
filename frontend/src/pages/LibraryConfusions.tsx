import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { confusionGroups } from '../data/independentGrammar'
import { entryQuestions, speakEnglish } from '../lib/independentLearning'
import MiniQuiz from '../components/library/MiniQuiz'
import MatchThree from '../components/library/MatchThree'
export default function LibraryConfusions(){
  const [id,setId]=useState(confusionGroups[0].id)
  const group=confusionGroups.find(x=>x.id===id)??confusionGroups[0]
  const all=useMemo(()=>confusionGroups.flatMap(g=>g.entries),[])
  const quiz=useMemo(()=>entryQuestions(all,undefined,8),[all])
  // distractors in a group are supplemented by the wider vocabulary catalogue
  const mini=useMemo(()=>entryQuestions(group.entries,undefined,group.entries.length),[group])
  return <div className="space-y-7">
    <Link to="/library" className="text-sm font-semibold text-indigo-700">← Bibliothèque</Link>
    <header><h1 className="text-3xl font-extrabold">🔠 Common Confusions</h1><p className="mt-2 text-slate-600">Mots qui se ressemblent mais ne veulent pas dire la même chose. Sélection libre et quiz après chaque groupe.</p></header>
    <section className="space-y-4 rounded-2xl border bg-white p-4 sm:p-6">
      <label className="block space-y-2"><span className="font-bold">Choisis un groupe</span><select className="min-h-12 w-full rounded-xl border p-3" value={id} onChange={(e: {target:{value:string}})=>setId(e.target.value)}>{confusionGroups.map(g=><option key={g.id} value={g.id}>{g.title}</option>)}</select></label>
      <h2 className="text-2xl font-extrabold text-indigo-800">{group.title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">{group.entries.map(entry=><div key={entry.en} className="rounded-xl bg-indigo-50 p-4"><div className="flex flex-wrap justify-between gap-2"><h3 className="text-xl font-bold">{entry.en}</h3><button type="button" onClick={()=>speakEnglish(entry.example)} className="rounded-lg bg-white px-3 py-2">🔊</button></div><p className="mt-2 font-semibold text-indigo-800">{entry.fr}</p><p className="mt-2 text-sm">{entry.example}</p></div>)}</div>
    </section>
    <MiniQuiz key={id} title={`🎯 Exercices : ${group.title}`} subtitle="Un exercice pour chaque terme du groupe" questions={mini}/>
    <MiniQuiz key="confusion-module" title="🏁 Quiz général — Mots confondus" subtitle="16 questions issues de différents groupes" questions={quiz}/>
    <MatchThree pool={all} title="Associe 3 mots confondus à leur sens"/>
  </div>
}
