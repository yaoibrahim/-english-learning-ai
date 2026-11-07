import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { independentVerbs } from '../data/independentVerbs'
import { conjugate, pastForm, pastParticiple, ingForm, thirdForm, subjects, tenses, verbQuestions, tenseQuestions, speakEnglish } from '../lib/independentLearning'
import MiniQuiz from '../components/library/MiniQuiz'
import MatchThree from '../components/library/MatchThree'

export default function LibraryVerbs(){
  const [tenseId,setTenseId]=useState('present-simple')
  const [verbId,setVerbId]=useState('be')
  const [search,setSearch]=useState('')
  const [irregularOnly,setIrregularOnly]=useState(false)
  const tense=tenses.find(t=>t.id===tenseId)??tenses[0]
  const verb=independentVerbs.find(v=>v.base===verbId)??independentVerbs[0]
  const filtered=independentVerbs.filter(v=>(v.base.includes(search.toLowerCase().trim())||v.fr.toLowerCase().includes(search.toLowerCase().trim()))&&(!irregularOnly||!!v.past))
  const available=filtered.some(v=>v.base===verb.base)?filtered:[verb,...filtered]
  const mini=useMemo(()=>verbQuestions(verb,tenseId,6),[verb,tenseId])
  const moduleQuiz=useMemo(()=>tenseQuestions(independentVerbs,tenseId,10),[tenseId])
  const matching=useMemo(()=>[verb,...independentVerbs.filter(v=>v.base!==verb.base).slice(0,70)].map(v=>({en:`to ${v.base}`,fr:v.fr,example:''})),[verb])
  return <div className="space-y-7">
    <nav className="flex flex-wrap gap-3 text-sm font-semibold text-indigo-700"><Link to="/library">← Bibliothèque</Link><Link to="/library/practice">Exercices libres →</Link></nav>
    <header className="space-y-2"><p className="font-semibold text-indigo-600">Sans cadenas · Débutant à avancé</p><h1 className="text-3xl font-extrabold">⏱️ Verbes et conjugaisons</h1><p className="text-slate-600">Choisis d'abord le temps, puis le verbe. Tu peux consulter tous les tableaux et refaire les exercices autant de fois que tu veux.</p></header>
    <section className="space-y-5 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2"><span className="font-bold">1. Choisis un temps</span><select value={tenseId} onChange={(e: {target:{value:string}})=>setTenseId(e.target.value)} className="min-h-12 w-full rounded-xl border p-3">{tenses.map(t=><option key={t.id} value={t.id}>{t.level} — {t.label}</option>)}</select></label>
        <div className="space-y-2"><label htmlFor="verb-filter" className="block font-bold">2. Recherche un verbe</label><input id="verb-filter" type="search" value={search} onChange={(e: {target:{value:string}})=>setSearch(e.target.value)} placeholder="Ex. go, être, développer…" className="min-h-12 w-full rounded-xl border p-3" /></div>
        <label className="space-y-2"><span className="font-bold">3. Sélectionne le verbe</span><select value={verb.base} onChange={(e: {target:{value:string}})=>setVerbId(e.target.value)} className="min-h-12 w-full rounded-xl border p-3">{available.map(v=><option key={v.base} value={v.base}>to {v.base} — {v.fr}</option>)}</select><span className="block text-xs text-slate-500">{filtered.length} résultat(s) · {independentVerbs.length} verbes au total</span></label>
        <label className="flex items-center gap-3 self-center rounded-xl bg-slate-50 p-4"><input type="checkbox" checked={irregularOnly} onChange={(e: {target:{checked:boolean}})=>setIrregularOnly(e.target.checked)} className="h-5 w-5"/><span>Afficher les verbes irréguliers seulement</span></label>
      </div>
      <div className="rounded-xl bg-indigo-50 p-4"><p className="text-sm font-bold text-indigo-700">{tense.label} · Niveau indicatif {tense.level}</p><p className="mt-2"><strong>Utilisation :</strong> {tense.use}</p><p className="mt-1"><strong>Règle :</strong> {tense.rule}</p><p className="mt-1"><strong>Exemple :</strong> {tense.sample}</p></div>
      <div className="space-y-2"><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-extrabold">to {verb.base} — {verb.fr}</h2><button type="button" onClick={()=>speakEnglish(verb.base)} className="rounded-xl bg-sky-100 px-4 py-2 font-semibold text-sky-800">🔊 Écouter</button></div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">{[["Base",verb.base],["Prétérit",pastForm(verb)],["Participe passé",pastParticiple(verb)],["3e personne",thirdForm(verb.base)],["-ing",ingForm(verb.base)]].map(([key,value])=><span key={key} className="rounded-full bg-slate-100 px-3 py-2">{key} : {value}</span>)}</div>
        <p className="text-sm text-slate-500">{verb.past?'Verbe irrégulier ou forme particulière.':'Verbe régulier (formes dérivées automatiquement).'} Les phrases sont générées à partir de règles grammaticales générales.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border"><table className="min-w-[720px] w-full border-collapse text-left text-sm"><thead className="bg-slate-100"><tr>{['Pronom','Affirmatif','Négatif','Question','Écouter'].map(h=><th key={h} scope="col" className="border-b px-3 py-3 font-bold">{h}</th>)}</tr></thead><tbody>{subjects.map(subject=>{const f=conjugate(verb,tenseId,subject);return <tr key={subject.id} className="border-b last:border-0"><th scope="row" className="px-3 py-3 font-bold">{subject.label}</th><td className="px-3 py-3">{f.affirmative}</td><td className="px-3 py-3">{f.negative}</td><td className="px-3 py-3">{f.question}</td><td className="px-3 py-3"><button type="button" onClick={()=>speakEnglish(f.affirmative)} aria-label={`Écouter ${f.affirmative}`} className="rounded-xl bg-sky-50 px-3 py-2 text-sky-800">🔊</button></td></tr>})}</tbody></table></div>
      {verb.base==='be'&&tense.id.includes('continuous')&&<p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Les formes continues de « be » (being) sont rares et dépendent du sens (« se comporter »). Évite de les employer pour décrire un état habituel.</p>}
      {verb.base==='have'&&tense.id.includes('continuous')&&<p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">« Have » au continu s'emploie pour des activités (having lunch), mais généralement pas pour la possession.</p>}
      {verb.base==='read'&&<p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">« read » s'écrit pareil au présent et au passé, mais sa prononciation change.</p>}
    </section>
    <MiniQuiz key={`verb-${verb.base}-${tenseId}`} title={`✍️ Exercice du verbe « ${verb.base} » au ${tense.label}`} subtitle="6 questions : affirmatif, négatif, interrogatif et pronoms" questions={mini}/>
    <MiniQuiz key={`tense-${tenseId}`} title={`🏁 Quiz de fin de module : ${tense.label}`} subtitle="10 questions sur des verbes différents, sans seuil obligatoire" questions={moduleQuiz}/>
    <MatchThree key={`match-${verb.base}`} title="Associe 3 verbes à leur traduction" pool={matching}/>
  </div>
}
