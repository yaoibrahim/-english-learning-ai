import type { VerbEntry } from '../data/independentVerbs'
import type { LibraryEntry } from '../data/independentGrammar'

export type LearnerLevel = 'A0'|'A1'|'A2'|'B1'|'B2'|'C1'|'C2'
export type Tense = {
  id: string
  label: string
  level: LearnerLevel
  rule: string
  use: string
  sample: string
}

export const tenses: Tense[] = [
  { id:'present-simple', label:'Present Simple — Présent simple', level:'A0', rule:'Sujet + verbe (he/she/it : -s). Négation et question : do/does + base.', use:'Habitudes et vérités générales.', sample:'I work every day. / She works every day.' },
  { id:'past-simple', label:'Past Simple — Prétérit', level:'A1', rule:'Verbe régulier en -ed ou forme irrégulière. Négation : did not + base.', use:'Événements achevés dans le passé.', sample:'I worked yesterday. / She went home.' },
  { id:'future-simple', label:'Future Simple — Will', level:'A1', rule:'Will + base verbale. Même forme pour toutes les personnes.', use:'Prévisions, décisions spontanées, promesses.', sample:'I will work tomorrow.' },
  { id:'going-to', label:'Be going to — Futur proche', level:'A1', rule:'Am/is/are + going to + base verbale.', use:'Projets et intentions déjà formées.', sample:'I am going to work tomorrow.' },
  { id:'present-continuous', label:'Present Continuous — Présent progressif', level:'A1', rule:'Am/is/are + verbe en -ing.', use:'Action en cours ou arrangement futur.', sample:'I am working now.' },
  { id:'past-continuous', label:'Past Continuous — Passé progressif', level:'A2', rule:'Was/were + -ing.', use:'Action en cours à un moment du passé.', sample:'I was working when you called.' },
  { id:'present-perfect', label:'Present Perfect', level:'A2', rule:'Have/has + participe passé.', use:'Expérience ou bilan avec un lien au présent.', sample:'I have worked here for two years.' },
  { id:'past-perfect', label:'Past Perfect — Plus-que-parfait', level:'B1', rule:'Had + participe passé.', use:'Action antérieure à un autre moment du passé.', sample:'I had finished before she arrived.' },
  { id:'future-continuous', label:'Future Continuous', level:'B1', rule:'Will be + -ing.', use:'Action en cours à un moment futur.', sample:'I will be working at eight.' },
  { id:'present-perfect-continuous', label:'Present Perfect Continuous', level:'B1', rule:'Have/has been + -ing.', use:'Durée d’une action commencée dans le passé.', sample:'I have been studying for an hour.' },
  { id:'future-perfect', label:'Future Perfect', level:'B2', rule:'Will have + participe passé.', use:'Action achevée avant une date future.', sample:'By Friday, I will have finished.' },
  { id:'past-perfect-continuous', label:'Past Perfect Continuous', level:'C1', rule:'Had been + -ing.', use:'Durée d’une action avant un point passé.', sample:'I had been waiting for an hour.' },
  { id:'future-perfect-continuous', label:'Future Perfect Continuous', level:'C2', rule:'Will have been + -ing.', use:'Durée d’une action jusqu’à un moment futur.', sample:'By June, I will have been working here for five years.' },
]

export type Subject = { id: string; word: string; label: string }
export const subjects: Subject[] = [
  {id:'i',word:'I',label:'I — je'},
  {id:'you-s',word:'you',label:'You — tu'},
  {id:'he',word:'he',label:'He — il'},
  {id:'she',word:'she',label:'She — elle'},
  {id:'it',word:'it',label:'It — cela / il / elle'},
  {id:'we',word:'we',label:'We — nous'},
  {id:'you-p',word:'you',label:'You — vous'},
  {id:'they',word:'they',label:'They — ils / elles'},
]
const third = (s: Subject) => ['he','she','it'].includes(s.id)
const bePresent = (s: Subject) => s.id==='i' ? 'am' : third(s) ? 'is' : 'are'
const bePast = (s: Subject) => ['i','he','she','it'].includes(s.id) ? 'was' : 'were'
const havePresent = (s: Subject) => third(s) ? 'has' : 'have'
const isVowel = (c:string) => 'aeiou'.includes(c)
const doubleEnd = new Set(['stop','plan','drop','shop','chat','prefer','admit','occur','control','submit','commit','permit','refer','regret','log','tag','jog','rub','rob','grab','slip','tap','hop','jog','nod','hug','rub','beg','swim','run','sit','get','put','cut','hit'])

export function pastForm(verb: VerbEntry) {
  if (verb.past) return verb.past
  const v=verb.base
  if (doubleEnd.has(v)) return v+v[v.length-1]+'ed'
  if (v.endsWith('e')) return v+'d'
  if (v.endsWith('y') && !isVowel(v[v.length-2] ?? '')) return v.slice(0,-1)+'ied'
  if (v.endsWith('c')) return v+'ked'
  return v+'ed'
}
export function pastParticiple(verb: VerbEntry) { return verb.participle ?? pastForm(verb) }
export function ingForm(v:string) {
  if (v==='lie' || v==='die' || v==='tie') return v.slice(0,-2)+'ying'
  if (v==='be') return 'being'
  if (v.endsWith('ie')) return v.slice(0,-2)+'ying'
  if (v.endsWith('c')) return v+'king'
  if (doubleEnd.has(v) && !['cut','put','hit','get','sit','run','swim'].includes(v)) return v+v[v.length-1]+'ing'
  if (['cut','put','hit','get','sit','run','swim'].includes(v)) return v+v[v.length-1]+'ing'
  if (v.endsWith('e') && !v.endsWith('ee') && !v.endsWith('ye')) return v.slice(0,-1)+'ing'
  return v+'ing'
}
export function thirdForm(v:string) {
  if (v==='be') return 'is'
  if (v==='have') return 'has'
  if (v==='do') return 'does'
  if (v.endsWith('y') && !isVowel(v[v.length-2] ?? '')) return v.slice(0,-1)+'ies'
  if (/(s|sh|ch|x|z|o)$/.test(v)) return v+'es'
  return v+'s'
}
export type VerbForms = { affirmative:string; negative:string; question:string }
export function conjugate(verb: VerbEntry, tenseId:string, subject:Subject):VerbForms {
  const s=subject.word
  const base=verb.base
  const b=bePresent(subject), bw=bePast(subject), hp=havePresent(subject)
  const ing=ingForm(base)
  const pp=pastParticiple(verb)
  const simplePast = base==='be'?bw:pastForm(verb)
  const pack=(positive:string,negative:string,aux:string,tail:string):VerbForms=>({
    affirmative:`${s} ${positive}`,
    negative:`${s} ${negative}`,
    question:tail?`${aux} ${s} ${tail}?`:`${aux} ${s}?`,
  })
  switch(tenseId){
    case 'present-simple':
      if(base==='be')return pack(b,`${b} not`,b.charAt(0).toUpperCase()+b.slice(1),'')
      return pack(third(subject)?thirdForm(base):base,`${third(subject)?'does':'do'} not ${base}`,third(subject)?'Does':'Do',base)
    case 'past-simple':
      if(base==='be')return pack(bw,`${bw} not`,bw==='was'?'Was':'Were','')
      return pack(simplePast,`did not ${base}`,'Did',base)
    case 'future-simple':return pack(`will ${base}`,`will not ${base}`,'Will',base)
    case 'going-to':return pack(`${b} going to ${base}`,`${b} not going to ${base}`,b[0].toUpperCase()+b.slice(1),`going to ${base}`)
    case 'present-continuous':return pack(`${b} ${ing}`,`${b} not ${ing}`,b[0].toUpperCase()+b.slice(1),ing)
    case 'past-continuous':return pack(`${bw} ${ing}`,`${bw} not ${ing}`,bw==='was'?'Was':'Were',ing)
    case 'present-perfect':return pack(`${hp} ${pp}`,`${hp} not ${pp}`,hp==='has'?'Has':'Have',pp)
    case 'past-perfect':return pack(`had ${pp}`,`had not ${pp}`,'Had',pp)
    case 'future-continuous':return pack(`will be ${ing}`,`will not be ${ing}`,'Will',`be ${ing}`)
    case 'present-perfect-continuous':return pack(`${hp} been ${ing}`,`${hp} not been ${ing}`,hp==='has'?'Has':'Have',`been ${ing}`)
    case 'future-perfect':return pack(`will have ${pp}`,`will not have ${pp}`,'Will',`have ${pp}`)
    case 'past-perfect-continuous':return pack(`had been ${ing}`,`had not been ${ing}`,'Had',`been ${ing}`)
    case 'future-perfect-continuous':return pack(`will have been ${ing}`,`will not have been ${ing}`,'Will',`have been ${ing}`)
    default:return conjugate(verb,'present-simple',subject)
  }
}

export type QuizQuestion = {id:string;prompt:string;options:string[];answer:string;explanation:string;level?:LearnerLevel}
const unique=(values:string[])=>Array.from(new Set(values.filter(Boolean)))
function rotate<T>(items:T[],key:string):T[]{
  const value=[...items]
  const shift=[...key].reduce((acc,char)=>acc+char.charCodeAt(0),0)%Math.max(value.length,1)
  return [...value.slice(shift),...value.slice(0,shift)]
}
export function question(id:string,prompt:string,answer:string,incorrect:string[],explanation:string,level?:LearnerLevel):QuizQuestion {
  const raw=unique([answer,...incorrect.filter(x=>x!==answer)])
  // Ensure every question is valid even for short topic lists.
  const options=rotate(raw.slice(0,4),id)
  return {id,prompt,answer,options,explanation,level}
}
export function entryQuestions(entries:LibraryEntry[],focused?:LibraryEntry,limit=10):QuizQuestion[]{
  const selected=focused?[focused]:entries.length<=limit?entries:Array.from({length:limit},(_,i)=>entries[Math.min(entries.length-1,Math.floor(i*(entries.length-1)/Math.max(1,limit-1)))])
  const questions:QuizQuestion[]=[]
  selected.forEach((entry,i)=>{
    const otherFrench=unique(entries.filter(e=>e.en!==entry.en).map(e=>e.fr)).filter(x=>x!==entry.fr)
    const otherEnglish=unique(entries.filter(e=>e.en!==entry.en).map(e=>e.en)).filter(x=>x!==entry.en)
    const correctFr=entry.fr
    const frenchFallback=['écrire','marcher','lire','maison','à demain','parce que'].filter(x=>x!==correctFr)
    const englishFallback=['apple','blue','quickly','before','under','always'].filter(x=>x!==entry.en)
    questions.push(question(`g-${i}-fr-${entry.en}`,`Que signifie « ${entry.en} » ?`,correctFr,[...otherFrench,...frenchFallback].slice(0,3),`« ${entry.en} » signifie « ${entry.fr} ». Exemple : ${entry.example}`))
    questions.push(question(`g-${i}-en-${entry.en}`,`Choisis le terme anglais correspondant à « ${entry.fr} ».`,entry.en,[...otherEnglish,...englishFallback].slice(0,3),`Réponse : ${entry.en}. Exemple : ${entry.example}`))
  })
  return questions
}

export function verbQuestions(verb: VerbEntry,tenseId:string,max=6):QuizQuestion[]{
  const tense=tenses.find(t=>t.id===tenseId)??tenses[0]
  const picks=[subjects[0],subjects[2],subjects[5],subjects[3],subjects[1],subjects[7],subjects[4],subjects[6]]
  return picks.slice(0,max).map((subject,i)=>{
    const forms=conjugate(verb,tenseId,subject)
    const mode=(['affirmative','negative','question'] as const)[i%3]
    const correct=forms[mode]
    const alternate=conjugate(verb,tenseId==='past-simple'?'present-simple':'past-simple',subject)
    const others=unique([...Object.values(forms).filter(x=>x!==correct),...Object.values(alternate).filter(x=>x!==correct)])
    const modeLabel={affirmative:'affirmative',negative:'négative',question:'interrogative'}[mode]
    return question(`verb-${verb.base}-${tenseId}-${i}`,`To ${verb.base} (${verb.fr}) au ${tense.label.split(' — ')[0]}, sujet « ${subject.label} » : forme ${modeLabel} ?`,correct,others.slice(0,3),`Règle : ${tense.rule} | Bonne réponse : ${correct}`,tense.level)
  })
}
export function tenseQuestions(verbs:VerbEntry[],tenseId:string,max=10):QuizQuestion[] {
  const chosen=['be','have','go','do','eat','work','study','write','read','speak','buy','sleep','learn','make','take','play','come','drive','see','build']
  const list=chosen.map(v=>verbs.find(x=>x.base===v)).filter((x):x is VerbEntry=>!!x)
  return Array.from({length:Math.min(max,list.length)},(_,i)=>verbQuestions(list[i],tenseId,8)[i%8])
}
export function speakEnglish(text:string){
  if(typeof window==='undefined'||!('speechSynthesis' in window))return false
  window.speechSynthesis.cancel()
  const speech=new SpeechSynthesisUtterance(text)
  speech.lang='en-US';speech.rate=0.85
  const enVoice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('en'))
  if(enVoice)speech.voice=enVoice
  window.speechSynthesis.speak(speech)
  return true
}
export function normalizeAnswer(text:string){return text.toLocaleLowerCase('en').replace(/[’‘]/g,"'").replace(/[^a-z0-9'\s]/g,' ').replace(/\s+/g,' ').trim()}
