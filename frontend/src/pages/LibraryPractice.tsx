import { playFeedback } from '../lib/audioFeedback'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { grammarTopics,phrasalVerbs,confusionGroups } from '../data/independentGrammar'
import { drills } from '../data/independentPractice'
import { entryQuestions, normalizeAnswer, question } from '../lib/independentLearning'
import MiniQuiz from '../components/library/MiniQuiz'
import MatchThree from '../components/library/MatchThree'

type PracticeMode='qcm'|'fill'|'translate'|'order'|'flashcards'|'daily'|'match'
const modes:[PracticeMode,string][]=[['qcm','QCM · Grammaire & vocabulaire'],['fill','Compléter les phrases'],['translate','Traduction'],['order','Construire une phrase'],['flashcards','Flashcards'],['daily','Défi du jour'],['match','Association de 3 paires']]
const levels=['Tous','A0','A1','A2','B1','B2','C1','C2']
const wordPool=[...grammarTopics.flatMap(t=>t.entries),...phrasalVerbs]

function TypedDrill({kind,level}:{kind:'fill'|'translate'|'order';level:string}) {
  const items=drills.filter(d=>d.kind===kind&&(level==='Tous'||d.level===level))
  const [index,setIndex]=useState(0)
  const [typed,setTyped]=useState('')
  const [used,setUsed]=useState<number[]>([])
  const [checked,setChecked]=useState(false)
  const [score,setScore]=useState(0)
  const [finished,setFinished]=useState(false)
  const current=items[index]
  if(!current)return <p className="rounded-xl bg-amber-50 p-4">Aucun exercice de ce type pour ce niveau ; sélectionne « Tous » pour pratiquer librement.</p>
  function reset(){setIndex(0);setTyped('');setUsed([]);setChecked(false);setScore(0);setFinished(false)}
  const tokens=current.answer.replace(/[.,!?]/g,'').split(' ')
  const scramble=tokens.map((_,i)=>i).sort((a,b)=>((a*7+3)%Math.max(tokens.length,1))-((b*7+3)%Math.max(tokens.length,1)))
  const assembled=kind==='order'?used.map(i=>tokens[i]).join(' '):typed
  const correct=[current.answer,...(current.variants??[])].some(s=>normalizeAnswer(s)===normalizeAnswer(assembled))
  function next(){
    const newScore=score+(correct?1:0);setScore(newScore)
    if(index===items.length-1){setFinished(true);playFeedback('complete',{announce:true})}
    else{setIndex(v=>v+1);setTyped('');setUsed([]);setChecked(false)}
  }
  if(finished)return <section className="space-y-4 rounded-2xl border bg-white p-5"><h3 className="text-2xl font-bold">Résultat : {score}/{items.length}</h3><p>Tous les exercices peuvent être recommencés sans restriction.</p><button className="rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white" onClick={reset}>Recommencer</button></section>
  return <section className="space-y-4 rounded-2xl border bg-white p-5">
    <p className="text-sm font-semibold text-indigo-700">{kind==='fill'?'Complète le mot manquant':kind==='translate'?'Traduis en anglais':'Remets les mots dans le bon ordre'} · {index+1}/{items.length} · {current.level}</p>
    <h3 className="text-xl font-bold">{current.prompt}</h3>
    {kind==='order'?<>
      <div className="min-h-14 rounded-xl border bg-indigo-50 p-3">{used.length?used.map((i,k)=><button key={`${i}-${k}`} type="button" disabled={checked} onClick={()=>setUsed(old=>old.filter((_,n)=>n!==k))} className="m-1 rounded-lg bg-white px-3 py-2 font-semibold shadow-sm">{tokens[i]} ×</button>):<span className="text-slate-500">Clique sur les mots dans le bon ordre…</span>}</div>
      <div className="flex flex-wrap gap-2">{scramble.filter(i=>!used.includes(i)).map(i=><button key={i} type="button" disabled={checked} onClick={()=>setUsed(old=>[...old,i])} className="rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 font-semibold">{tokens[i]}</button>)}</div>
      {!checked&&<button type="button" onClick={()=>setUsed([])} className="rounded-lg px-3 py-2 text-sm text-slate-600 underline">Effacer la phrase</button>}
    </>:<textarea rows={2} className="min-h-24 w-full rounded-xl border-2 border-slate-200 p-3" placeholder={kind==='fill'?'Écris le mot manquant…':'Écris la traduction anglaise…'} value={typed} onChange={(e: {target:{value:string}})=>setTyped(e.target.value)} disabled={checked}/>}
    {!checked?<div className="flex flex-wrap gap-3"><button type="button" disabled={!assembled.trim()} onClick={()=>{playFeedback(correct ? 'correct' : 'incorrect');setChecked(true)}} className="rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white disabled:opacity-50">Corriger</button><details className="self-center text-sm text-amber-800"><summary className="cursor-pointer font-semibold">💡 Indice</summary><p>{current.hint}</p></details></div>:<div className={`space-y-2 rounded-xl p-4 ${correct?'bg-emerald-50':'bg-amber-50'}`}>
      <p className="font-bold">{correct?'✅ Bonne réponse !':'📘 Correction : '+current.answer}</p><p className="text-sm">{current.hint}</p>
      <button type="button" onClick={next} className="rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">{index===items.length-1?'Résultat':'Suivant →'}</button>
    </div>}
    <button type="button" onClick={reset} className="text-sm text-slate-500 underline">Réinitialiser l'exercice</button>
  </section>
}
function Flashcards(){
  const [index,setIndex]=useState(0)
  const [flipped,setFlipped]=useState(false)
  const cards=[...phrasalVerbs.slice(0,12),...grammarTopics[1].entries.slice(0,12)]
  const current=cards[index]
  return <section className="space-y-4 rounded-2xl border bg-white p-5"><h3 className="text-xl font-bold">🃏 Flashcards — {index+1}/{cards.length}</h3>
    <button type="button" onClick={()=>setFlipped(x=>!x)} className="flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-2xl bg-indigo-50 p-5 text-center">
      <span className="text-xs font-bold text-indigo-600">{flipped?'TRADUCTION':'ANGLAIS'} · Cliquez pour retourner</span>
      <span className="text-2xl font-extrabold">{flipped?current.fr:current.en}</span>
      {flipped&&<span className="text-sm">{current.example}</span>}
    </button>
    <div className="flex flex-wrap justify-between gap-2"><button type="button" onClick={()=>{setIndex(x=>(x-1+cards.length)%cards.length);setFlipped(false)}} className="rounded-xl bg-slate-100 px-4 py-3">← Précédente</button><button type="button" onClick={()=>{setIndex(x=>(x+1)%cards.length);setFlipped(false)}} className="rounded-xl bg-indigo-700 px-4 py-3 font-bold text-white">Suivante →</button></div>
  </section>
}
export default function LibraryPractice(){
  const [mode,setMode]=useState<PracticeMode>('qcm')
  const [level,setLevel]=useState('Tous')
  const [quizType,setQuizType]=useState<'grammar'|'vocab'>('grammar')
  const general=useMemo(()=>{
    if(level==='Tous')return entryQuestions(grammarTopics.flatMap(g=>g.entries),undefined,8)
    const relevant=drills.filter(d=>d.level===level&&d.kind!=='order')
    const allAnswers=drills.filter(d=>d.kind!=='order').map(d=>d.answer)
    return relevant.map(d=>question(`practice-${d.id}`,`Réponds : ${d.prompt}`,d.answer,
      allAnswers.filter(a=>a!==d.answer).slice(0,3),d.hint,d.level))
  },[level])
  const vocab=useMemo(()=>{
    const pool=level==='Tous'?phrasalVerbs:phrasalVerbs.filter(p=>p.level===level)
    return entryQuestions(pool,undefined,Math.min(8,pool.length))
  },[level])
  const dateKey=new Date().toLocaleDateString('en-CA')
  const dayOfYear=Math.floor((new Date().getTime()-new Date(new Date().getFullYear(),0,0).getTime())/86400000)
  const daily=useMemo(()=>{
    const bank=[...grammarTopics.flatMap(t=>t.entries),...phrasalVerbs,...confusionGroups.flatMap(g=>g.entries)]
    return entryQuestions(Array.from({length:6},(_,i)=>bank[(dayOfYear*7+i*19)%bank.length]),undefined,6)
  },[dayOfYear])
  return <div className="space-y-7">
    <Link to="/library" className="text-sm font-semibold text-indigo-700">← Bibliothèque</Link>
    <header><h1 className="text-3xl font-extrabold">🎯 Exercices libres</h1><p className="mt-2 text-slate-600">Choisis le type d'exercice et le niveau. Tu peux faire directement du C2, du A0 ou revenir sur une notion quand tu veux.</p></header>
    <section className="space-y-4 rounded-2xl border bg-white p-4 sm:p-6">
      <label className="block space-y-2"><span className="font-bold">Difficulté (aucune restriction)</span><select className="min-h-12 w-full rounded-xl border p-3" value={level} onChange={(e: {target:{value:string}})=>setLevel(e.target.value)}>{levels.map(l=><option key={l} value={l}>{l}</option>)}</select></label>
      <div className="grid gap-2 sm:grid-cols-2">{modes.map(([id,label])=><button type="button" key={id} onClick={()=>setMode(id)} className={`min-h-12 rounded-xl border px-4 py-3 text-left font-semibold ${mode===id?'border-indigo-700 bg-indigo-700 text-white':'border-slate-200 bg-slate-50'}`}>{label}</button>)}</div>
    </section>
    {mode==='qcm'&&<div className="space-y-4"><div className="flex flex-wrap gap-2"><button type="button" onClick={()=>setQuizType('grammar')} className={`rounded-xl px-4 py-3 font-bold ${quizType==='grammar'?'bg-indigo-700 text-white':'bg-slate-100'}`}>Grammaire</button><button type="button" onClick={()=>setQuizType('vocab')} className={`rounded-xl px-4 py-3 font-bold ${quizType==='vocab'?'bg-indigo-700 text-white':'bg-slate-100'}`}>Vocabulaire</button></div><MiniQuiz key={`${quizType}-${level}`} title={quizType==='grammar'?'QCM de grammaire':'QCM de vocabulaire'} questions={quizType==='grammar'?general:vocab}/></div>}
    {(mode==='fill'||mode==='translate'||mode==='order')&&<TypedDrill key={`${mode}-${level}`} kind={mode} level={level}/>}
    {mode==='flashcards'&&<Flashcards/>}
    {mode==='daily'&&<MiniQuiz key={dateKey} title={`Défi du jour · ${dateKey}`} subtitle="12 questions sélectionnées pour aujourd’hui · sans compte" questions={daily}/>}
    {mode==='match'&&<MatchThree pool={wordPool} title="Association — 3 paires par manche"/>}
    <section className="rounded-2xl border bg-white p-5"><h2 className="text-xl font-bold">🎧 Écoute et prononciation</h2><p className="mt-2 text-slate-600">Ces modes sont déjà disponibles dans ton application ; ils restent indépendants des parcours.</p><div className="mt-4 flex flex-wrap gap-3"><Link to="/listening" className="rounded-xl bg-sky-100 px-4 py-3 font-bold text-sky-900">Listening quiz →</Link><Link to="/speaking" className="rounded-xl bg-purple-100 px-4 py-3 font-bold text-purple-900">Pronunciation practice →</Link><Link to="/writing" className="rounded-xl bg-amber-100 px-4 py-3 font-bold text-amber-900">Writing →</Link></div></section>
    <MiniQuiz key="practice-final" title="🏁 Quiz général de fin de module Practice" subtitle="Questions de grammaire et vocabulaire, rejouables sans limite" questions={[...general.slice(0,8),...vocab.slice(0,4)]}/>
    <MatchThree title="Associe trois termes — exercice final" pool={[...phrasalVerbs,...grammarTopics[1].entries]}/>
  </div>
}
