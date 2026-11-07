import { useMemo, useState } from 'react'
import type { LibraryEntry } from '../../data/independentGrammar'

type Props = { pool: LibraryEntry[]; title?: string }
const rotate=<T,>(arr:T[],distance:number)=>[...arr.slice(distance),...arr.slice(0,distance)]
export default function MatchThree({pool,title='Associe les 3 paires'}:Props){
  const [round,setRound]=useState(0)
  const [selected,setSelected]=useState<string|null>(null)
  const [matched,setMatched]=useState<string[]>([])
  const [message,setMessage]=useState('')
  const unique=useMemo(()=>{
    const en=new Set<string>(),fr=new Set<string>()
    return pool.filter(x=>{
      if(!x.en.trim()||!x.fr.trim()||en.has(x.en)||fr.has(x.fr))return false
      en.add(x.en);fr.add(x.fr);return true
    })
  },[pool])
  const items=useMemo(()=>{
    if(unique.length<3)return []
    const offset=round*3%unique.length
    return Array.from({length:3},(_,i)=>unique[(offset+i)%unique.length])
  },[unique,round])
  const right=rotate(items,items.length?1+round%2:0)
  function chooseFrench(fr:string){
    if(!selected)return setMessage('Sélectionne d’abord un terme anglais à gauche.')
    const expected=items.find(x=>x.en===selected)
    if(expected?.fr===fr){
      setMatched(old=>[...old,selected])
      setSelected(null)
      setMessage('✅ Bonne association !')
    }else{setSelected(null);setMessage('❌ Pas encore. Réessaie : aucune pénalité.')}
  }
  function restart(){setRound(x=>x+1);setSelected(null);setMatched([]);setMessage('')}
  if(items.length<3)return <p className="text-sm text-slate-500">Il faut au moins trois paires différentes pour cet exercice.</p>
  return <section className="space-y-4 rounded-2xl border border-teal-200 bg-teal-50 p-4 sm:p-6">
    <div><h3 className="text-lg font-bold">🧩 {title}</h3><p className="text-sm text-slate-600">Choisis un mot anglais, puis sa traduction française. 3 paires par manche, sans restriction.</p></div>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2"><p className="text-sm font-bold text-teal-900">Anglais</p>{items.map(item=><button type="button" key={item.en} disabled={matched.includes(item.en)} onClick={()=>{setSelected(item.en);setMessage('')}}
        className={`w-full min-h-14 rounded-xl border-2 px-2 py-3 text-center text-sm font-semibold break-words ${matched.includes(item.en)?'border-emerald-300 bg-emerald-100 text-emerald-900':selected===item.en?'border-teal-700 bg-teal-100 text-teal-900':'border-slate-200 bg-white'}`}>{item.en}{matched.includes(item.en)?' ✓':''}</button>)}</div>
      <div className="space-y-2"><p className="text-sm font-bold text-teal-900">Français</p>{right.map(item=><button type="button" key={item.en} disabled={matched.includes(item.en)} onClick={()=>chooseFrench(item.fr)}
        className={`w-full min-h-14 rounded-xl border-2 px-2 py-3 text-center text-sm font-semibold break-words ${matched.includes(item.en)?'border-emerald-300 bg-emerald-100 text-emerald-900':'border-slate-200 bg-white'}`}>{item.fr}{matched.includes(item.en)?' ✓':''}</button>)}</div>
    </div>
    <p role="status" aria-live="polite" className="text-sm text-teal-900">{matched.length}/3 associations trouvées. {message}</p>
    {matched.length===3&&<p className="font-bold text-emerald-800">🎉 Les trois paires sont correctes !</p>}
    <button type="button" onClick={restart} className="rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white">↻ {matched.length===3?'Trois nouvelles paires':'Changer de série'}</button>
  </section>
}
