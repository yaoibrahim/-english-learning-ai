import { playFeedback } from '../../lib/audioFeedback'
import { useState } from 'react'
import type { QuizQuestion } from '../../lib/independentLearning'

type Props = { title: string; questions: QuizQuestion[]; subtitle?: string }

export default function MiniQuiz({title,questions,subtitle}:Props) {
  const [index,setIndex]=useState(0)
  const [chosen,setChosen]=useState<string|null>(null)
  const [correct,setCorrect]=useState(0)
  const [done,setDone]=useState(false)
  const current=questions[index]
  function restart(){setIndex(0);setChosen(null);setCorrect(0);setDone(false)}
  if(questions.length===0)return null
  if(done)return <section className="space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-6" aria-live="polite">
    <p className="text-sm font-semibold text-indigo-600">{title}</p>
    <h3 className="text-2xl font-extrabold">Résultat : {correct}/{questions.length}</h3>
    <p>Score : {Math.round(100*correct/questions.length)} %. Les exercices restent toujours accessibles, même si tu te trompes.</p>
    <button type="button" onClick={restart} className="rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white">🔄 Refaire ce quiz</button>
  </section>
  const answered=chosen!==null
  const good=chosen===current.answer
  function next(){
    if(chosen===null)return
    const newScore=correct+(good?1:0)
    setCorrect(newScore)
    if(index===questions.length-1){setDone(true);playFeedback('complete',{announce:true})}
    else{setIndex(index+1);setChosen(null)}
  }
  return <section className="space-y-4 rounded-2xl border border-indigo-200 bg-white p-4 shadow-sm sm:p-6" aria-label={title}>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div><h3 className="text-lg font-bold text-slate-900">{title}</h3>{subtitle&&<p className="text-sm text-slate-500">{subtitle}</p>}</div>
      <p className="text-sm font-semibold text-indigo-700">Question {index+1}/{questions.length}</p>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-indigo-600 transition-all" style={{width:`${(index+1)*100/questions.length}%`}} /></div>
    <p className="text-base font-semibold sm:text-lg">{current.prompt}</p>
    <div className="grid gap-2 sm:grid-cols-2">
      {current.options.map(option=><button key={option} type="button" disabled={answered}
        onClick={()=>{ setChosen(option); playFeedback(option === current.answer ? 'correct' : 'incorrect') }}
        className={`min-h-12 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition sm:text-base ${answered&&option===current.answer?'border-emerald-500 bg-emerald-50 text-emerald-900':answered&&option===chosen?'border-rose-500 bg-rose-50 text-rose-900':'border-slate-200 bg-slate-50 hover:border-indigo-300'} disabled:cursor-default`}>
        {option}{answered&&option===current.answer?' ✓':''}
      </button>)}
    </div>
    {answered&&<div role="status" aria-live="polite" className={`rounded-xl p-4 ${good?'bg-emerald-50 text-emerald-900':'bg-amber-50 text-amber-950'}`}>
      <p className="font-bold">{good?'✅ Bonne réponse !':'📘 Correction : '+current.answer}</p>
      <p className="mt-1 text-sm">{current.explanation}</p>
    </div>}
    <div className="flex flex-wrap gap-3">
      {answered&&<button type="button" onClick={next} className="rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white">{index===questions.length-1?'Voir le résultat':'Question suivante →'}</button>}
      <button type="button" onClick={restart} className="rounded-xl bg-slate-100 px-4 py-3 text-slate-700">Recommencer</button>
    </div>
  </section>
}
