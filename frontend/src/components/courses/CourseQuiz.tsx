import { playFeedback } from '../../lib/audioFeedback'
import { useMemo, useRef, useState } from 'react'
import { getCourseExercises, type CourseExercise, type CourseUnit } from '../../data/courses'
import { recordReviewMistake, type ReviewSource } from '../../hooks/useSmartReview'

function normalize(value: string) {
  const replacements: Record<string, string> = {
    "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are',
    "don't": 'do not', "doesn't": 'does not', "won't": 'will not', "can't": 'cannot',
  }
  return value.toLocaleLowerCase('en-US').replace(/[’‘]/g, "'")
    .replace(/\b(i'm|you're|we're|they're|don't|doesn't|won't|can't)\b/g, word => replacements[word] || word)
    .normalize('NFKD').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}
function equal(question: CourseExercise, answer: string) { return normalize(question.answer) === normalize(answer) }
function play(text: string, slow: boolean) {
  if (!('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const voice = new SpeechSynthesisUtterance(text)
  voice.lang = 'en-US'; voice.rate = slow ? 0.65 : 0.9
  const english = window.speechSynthesis.getVoices().find(x => x.lang.toLowerCase().startsWith('en'))
  if (english) voice.voice = english
  window.speechSynthesis.speak(voice)
  return true
}

/** Séance d'exercices de l'unité : de l'entraînement (sans note). Le résultat qui débloque la suite vient du test de fin d'unité. */
export default function CourseQuiz({ unit, onFinish }: { unit: CourseUnit; onFinish: () => void }) {
  const questions = useMemo(() => getCourseExercises(unit.id), [unit.id])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [transcript, setTranscript] = useState(false)
  const [noVoice, setNoVoice] = useState(false)
  const settledRef = useRef(false)
  const question = questions[index]
  const correct = question ? equal(question, answer) : false

  function verify() {
    if (!question || checked || !answer.trim()) return
    const valid = equal(question, answer)
    playFeedback(valid ? 'correct' : 'incorrect')
    if (valid) setCorrectCount(n => n+1)
    else {
      const source: ReviewSource = question.kind === 'listen' ? 'listening'
        : question.kind === 'reading' || question.kind === 'choice' ? 'reading' : 'writing'
      recordReviewMistake({
        id: `course:${question.id}`, source,
        format: question.options ? 'choice' : 'text',
        prompt: question.prompt, correctAnswer: question.answer,
        options: question.options,
        context: question.context || (question.audio ? `Phrase écoutée : ${question.audio}` : undefined),
        explanation: question.explanation,
      })
    }
    setChecked(true)
  }
  function next() {
    if (!checked || settledRef.current) return
    if (index + 1 < questions.length) {
      setIndex(n => n+1); setChecked(false); setAnswer(''); setTranscript(false); setNoVoice(false)
    } else {
      settledRef.current = true
      setFinished(true)
      playFeedback('complete', { announce: true })
    }
  }
  function restart() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    settledRef.current = false
    setIndex(0); setChecked(false); setAnswer(''); setCorrectCount(0)
    setFinished(false); setTranscript(false); setNoVoice(false)
  }

  if (finished) return <section className="space-y-4 rounded-2xl border bg-white p-6 text-center shadow-sm" aria-live="polite">
    <div className="text-6xl">{correctCount * 100 / questions.length >= 80 ? '🎉' : '💪'}</div>
    <h2 className="text-2xl font-bold">Exercices terminés</h2>
    <p className="text-4xl font-extrabold text-indigo-700">{correctCount}/{questions.length}</p>
    <p>C’était de l’entraînement : ce score ne bloque rien. Passe maintenant au <strong>test de fin d’unité</strong> (QCM, mots en place, compréhension) pour débloquer l’unité suivante.</p>
    <div className="flex flex-wrap justify-center gap-3">
      <button type="button" onClick={onFinish} className="min-h-12 rounded-xl bg-green-600 px-5 py-3 font-bold text-white">✅ Passer au test de fin d’unité →</button>
      <button type="button" onClick={restart} className="min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">🔄 Refaire les exercices</button>
    </div>
  </section>
  if (!question) return <p>Aucune question disponible.</p>
  const isRecycled = !question.id.startsWith(`${unit.id}-`)
  const kindLabel = question.kind === 'listen' ? '🎧 Listening' : question.kind === 'reading' ? '📖 Reading'
    : question.kind === 'translate' ? '✍️ Writing' : question.kind === 'fill' ? '🔤 Orthographe' : '🧠 Grammaire'
  return <section className="space-y-5 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
    <div className="flex items-center justify-between gap-2"><h2 className="text-xl font-bold">🎯 Exercices d’entraînement</h2><span className="font-semibold text-indigo-700">{index+1}/{questions.length}</span></div>
    <div className="h-3 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-indigo-600" style={{width:`${(index+1)*100/questions.length}%`}} /></div>
    <div className="flex flex-wrap gap-2 text-xs font-semibold">
      <span className="rounded-full bg-slate-100 px-3 py-1">{kindLabel}</span>
      {isRecycled && <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">🔁 Notion déjà étudiée</span>}
      <span className="rounded-full bg-green-100 px-3 py-1 text-green-900">{correctCount} correcte(s)</span>
    </div>
    {question.kind === 'reading' && question.context && <div className="rounded-xl bg-indigo-50 p-4 leading-8"><p className="mb-2 text-xs font-bold uppercase">Lis le texte</p>{question.context}</div>}
    {question.kind === 'listen' && <div className="space-y-3 rounded-xl bg-sky-50 p-4">
      <p className="font-semibold">Écoute avant de choisir la traduction.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={()=>setNoVoice(!play(question.audio || '',false))} className="min-h-12 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white">🔊 Écouter</button>
        <button type="button" onClick={()=>setNoVoice(!play(question.audio || '',true))} className="min-h-12 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white">🐢 Lentement</button>
      </div>
      {noVoice && <p role="alert" className="text-sm text-rose-700">La voix anglaise est indisponible. Utilise la transcription ci-dessous.</p>}
      <button type="button" onClick={()=>setTranscript(v=>!v)} className="text-sm font-semibold text-sky-800 underline">{transcript?'Masquer':'Afficher'} la transcription</button>
      {transcript && <p className="rounded-lg bg-white p-3">{question.audio}</p>}
    </div>}
    <h3 className="text-lg font-bold leading-8">{question.prompt}</h3>
    {question.options ? <div className="space-y-2" role="group" aria-label="Réponses possibles">
      {question.options.map((option,i)=><button key={`${question.id}-${i}`} type="button" disabled={checked} onClick={()=>setAnswer(option)} className={`block min-h-12 w-full rounded-xl border-2 px-4 py-3 text-left font-semibold ${checked && equal(question,option) ? 'border-green-500 bg-green-50 text-green-900' : checked && answer===option ? 'border-red-400 bg-red-50' : answer===option ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}>{option}</button>)}
    </div> : <label className="block space-y-2 text-sm font-semibold">Réponds en anglais
      <input type="text" value={answer} onChange={(e: {target: {value: string}})=>setAnswer(e.target.value)} disabled={checked} onKeyDown={(e: {key:string})=>{if(e.key==='Enter'&&!checked)verify()}}
        placeholder={question.kind==='fill'?'Mot manquant...':'Ta phrase en anglais...'} className="min-h-12 w-full rounded-xl border-2 border-slate-300 p-3 text-base font-normal outline-none focus:border-indigo-500 disabled:bg-slate-100" />
    </label>}
    {!checked ? <button type="button" disabled={!answer.trim()} onClick={verify} className="min-h-12 w-full rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white disabled:opacity-40">Vérifier</button>
      : <div className={`space-y-3 rounded-xl p-4 ${correct?'bg-green-50':'bg-amber-50'}`} aria-live="polite">
          <h4 className="font-bold">{correct?'✅ Bonne réponse !':'📚 Correction'}</h4>
          <p><strong>Réponse attendue :</strong> {question.answer}</p><p className="text-sm leading-6">{question.explanation}</p>
          {!correct && <p className="text-xs">Cette erreur rejoint aussi ton module « Révisions intelligentes ».</p>}
          <button type="button" onClick={next} className="min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white">{index+1===questions.length?'Terminer les exercices →':'Question suivante →'}</button>
        </div>}
  </section>
}
