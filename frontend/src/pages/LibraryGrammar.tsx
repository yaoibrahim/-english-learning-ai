import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { grammarTopics } from '../data/independentGrammar'
import { entryQuestions, speakEnglish } from '../lib/independentLearning'
import MiniQuiz from '../components/library/MiniQuiz'
import MatchThree from '../components/library/MatchThree'

export default function LibraryGrammar(){
  const [topicId,setTopicId]=useState('pronouns')
  const [term,setTerm]=useState('I')
  const [filter,setFilter]=useState('')
  const topic=grammarTopics.find(t=>t.id===topicId)??grammarTopics[0]
  const entry=topic.entries.find(e=>e.en===term)??topic.entries[0]
  const selectedQuiz=useMemo(()=>entryQuestions(topic.entries,entry),[topic,entry])
  const moduleQuiz=useMemo(()=>entryQuestions(topic.entries,undefined,6),[topic])
  const filteredTopics=grammarTopics.filter(t=>t.title.toLowerCase().includes(filter.toLowerCase())||t.intro.toLowerCase().includes(filter.toLowerCase()))
  return <div className="space-y-7">
    <Link to="/library" className="text-sm font-semibold text-indigo-700">← Bibliothèque</Link>
    <header><h1 className="text-3xl font-extrabold">🧩 Grammaire et orthographe</h1><p className="mt-2 text-slate-600">18 thèmes séparés. Sélectionne les pronoms, articles, adjectifs, adverbes ou n'importe quelle notion. Tout est accessible immédiatement.</p></header>
    <section className="space-y-4 rounded-2xl border bg-white p-4 sm:p-6">
      <input type="search" aria-label="Rechercher un thème de grammaire" value={filter} onChange={(e: {target:{value:string}})=>setFilter(e.target.value)} placeholder="Chercher : pronoms, modal, adjectifs…" className="min-h-12 w-full rounded-xl border p-3"/>
      <div className="flex flex-wrap gap-2">{filteredTopics.map(t=><button key={t.id} type="button" onClick={()=>{setTopicId(t.id);setTerm(t.entries[0].en)}} className={`rounded-xl border px-3 py-2 text-sm font-semibold ${topic.id===t.id?'border-indigo-700 bg-indigo-700 text-white':'border-slate-200 bg-slate-50 text-slate-700'}`}>{t.title}</button>)}</div>
      <div className="rounded-xl bg-indigo-50 p-4"><p className="text-sm font-bold text-indigo-700">Module libre · {topic.level} et plus</p><h2 className="mt-1 text-2xl font-extrabold">{topic.title}</h2><p className="mt-2 text-slate-700">{topic.intro}</p><p className="mt-2"><strong>Règle :</strong> {topic.rule}</p><p className="mt-2 text-sm text-slate-600">{topic.entries.length} termes et exemples · aucun verrou</p></div>
      <label className="block space-y-2"><span className="font-bold">Choisis un terme ou une notion à étudier</span><select value={entry.en} onChange={(e: {target:{value:string}})=>setTerm(e.target.value)} className="min-h-12 w-full rounded-xl border p-3">{topic.entries.map(t=><option key={t.en} value={t.en}>{t.en} — {t.fr}</option>)}</select></label>
      <article className="rounded-xl border border-slate-200 bg-slate-50 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-2xl font-extrabold">{entry.en}</h3><button type="button" onClick={()=>speakEnglish(entry.example||entry.en)} className="rounded-xl bg-sky-100 px-4 py-3 font-semibold text-sky-800">🔊 Écouter l’exemple</button></div><p className="mt-2 text-lg text-indigo-700">{entry.fr}</p><p className="mt-3 rounded-lg bg-white p-3"><strong>Exemple :</strong> {entry.example||entry.en}</p><p className="mt-2 text-sm text-slate-600">Conseil : observe l'emploi du terme dans l'exemple, puis fais les deux questions ci-dessous.</p></article>
      <details className="rounded-xl border bg-slate-50 p-4"><summary className="cursor-pointer font-bold">Voir tous les termes du module ({topic.entries.length})</summary><div className="mt-3 grid gap-2 sm:grid-cols-2">{topic.entries.map(x=><button type="button" key={x.en} onClick={()=>setTerm(x.en)} className="rounded-lg border bg-white p-3 text-left text-sm"><strong>{x.en}</strong><br/>{x.fr}</button>)}</div></details>
    </section>
    <MiniQuiz key={`${topic.id}-${entry.en}`} title={`🎯 Exercice individuel : ${entry.en}`} questions={selectedQuiz} subtitle="2 questions sur cette notion"/>
    <MiniQuiz key={`module-${topic.id}`} title={`🏁 Quiz de fin de module — ${topic.title}`} questions={moduleQuiz} subtitle="12 questions : découverte, application et révision, sans conditions de déblocage" />
    <MatchThree key={topic.id} title={`Associe 3 notions de ${topic.title}`} pool={topic.entries}/>
  </div>
}
