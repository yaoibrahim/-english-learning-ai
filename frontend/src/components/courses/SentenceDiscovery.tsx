import { playFeedback } from '../../lib/audioFeedback'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CourseUnit } from '../../data/courses'
import {
  buildSentenceSteps, buildSentenceTasks, normalizeSentence,
  type SentenceStep,
} from '../../lib/sentenceDiscovery'
import { recordReviewMistake } from '../../hooks/useSmartReview'

const STORAGE_KEY = 'english-learning-sentence-steps-v1'

function loadPosition(id: string, total: number): number {
  try {
    const data: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (!data || typeof data !== 'object' || Array.isArray(data)) return 0
    const value = (data as Record<string, unknown>)[id]
    return typeof value === 'number' && Number.isInteger(value) && value >= 0
      ? Math.min(value, Math.max(0, total - 1)) : 0
  } catch { return 0 }
}
function savePosition(id: string, position: number) {
  try {
    const data: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    const record = data && typeof data === 'object' && !Array.isArray(data)
      ? { ...data as Record<string, unknown> } : {}
    record[id] = position
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch { /* Les leçons restent utilisables sans stockage. */ }
}

function speak(text: string, slow = false): boolean {
  if (!('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = slow ? 0.65 : 0.9
  const voice = window.speechSynthesis.getVoices()
    .find(item => item.lang.toLowerCase().startsWith('en'))
  if (voice) utterance.voice = voice
  window.speechSynthesis.speak(utterance)
  return true
}

function escapeExpression(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Mise en évidence des nouveaux mots et des mots réemployés. */
function SentenceText({ step }: { step: SentenceStep }) {
  const newTerm = step.target?.english.toLowerCase()
  const reusedTerms = step.recycled.map(item => item.english.toLowerCase())
  const terms = [...new Set([...(newTerm ? [newTerm] : []), ...reusedTerms])]
    .sort((a, b) => b.length - a.length)
  if (!terms.length) return <>{step.english}</>
  const regex = new RegExp(`\\b(${terms.map(escapeExpression).join('|')})\\b`, 'gi')
  return <>{step.english.split(regex).map((part, index) => {
    const lowered = part.toLowerCase()
    const isNew = lowered === newTerm
    const isOld = reusedTerms.includes(lowered)
    return isNew || isOld
      ? <mark key={`${index}-${part}`} className={`rounded px-1 py-0.5 font-extrabold ${isNew ? 'bg-yellow-200 text-amber-950' : 'bg-emerald-200 text-emerald-950'}`}>{part}</mark>
      : <span key={`${index}-${part}`}>{part}</span>
  })}</>
}

type View = 'discover' | 'recap' | 'practice' | 'result'

export default function SentenceDiscovery({ unit, onFinish }: {
  unit: CourseUnit; onFinish: () => void
}) {
  const steps = useMemo(() => buildSentenceSteps(unit), [unit])
  const tasks = useMemo(() => buildSentenceTasks(unit), [unit])
  const [view, setView] = useState<View>('discover')
  const [stepIndex, setStepIndex] = useState(() => loadPosition(unit.id, steps.length))
  const [translationVisible, setTranslationVisible] = useState(true)
  const [wordVisible, setWordVisible] = useState(false)
  const [voiceWarning, setVoiceWarning] = useState(false)

  // État des exercices de reconnaissance / construction.
  const [taskIndex, setTaskIndex] = useState(0)
  const [picked, setPicked] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const verifyGuard = useRef(false)
  const step = steps[stepIndex]
  const task = tasks[taskIndex]

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  function nextStep() {
    window.speechSynthesis?.cancel()
    if (stepIndex + 1 < steps.length) {
      const next = stepIndex + 1
      setStepIndex(next)
      savePosition(unit.id, next)
      setWordVisible(false)
      setTranslationVisible(true)
      setVoiceWarning(false)
    } else { setView('recap'); playFeedback('complete', { announce: true }) }
  }

  function restartDiscovery() {
    savePosition(unit.id, 0)
    setStepIndex(0)
    setTranslationVisible(true)
    setWordVisible(false)
    setView('discover')
  }

  function startPractice() {
    setTaskIndex(0)
    setPicked('')
    setSelectedIds([])
    setChecked(false)
    setCorrectCount(0)
    verifyGuard.current = false
    setView(tasks.length ? 'practice' : 'result')
  }

  function verify() {
    if (!task || checked || verifyGuard.current) return
    const valid = task.kind === 'recognition'
      ? picked === task.word.french
      : selectedIds.length === task.shuffledTokens.length &&
        normalizeSentence(selectedIds.map(id => task.shuffledTokens.find(token => token.id === id)?.text ?? '').join(' ')) === normalizeSentence(task.english)
    if (task.kind === 'recognition' && !picked) return
    if (task.kind === 'construction' && selectedIds.length !== task.shuffledTokens.length) return
    verifyGuard.current = true
    playFeedback(valid ? 'correct' : 'incorrect')
    if (valid) setCorrectCount(count => count + 1)
    else recordReviewMistake(task.kind === 'recognition' ? {
      id: `phrase:${task.id}`, source: 'reading', format: 'choice',
      prompt: `Que signifie « ${task.word.english} » ?`,
      correctAnswer: task.word.french, options: task.options,
      explanation: `${task.word.english} = ${task.word.french}.`,
    } : {
      id: `phrase:${task.id}`, source: 'writing', format: 'text',
      prompt: `Construis en anglais : ${task.french}`,
      correctAnswer: task.english,
      explanation: `La phrase modèle est : ${task.english}`,
    })
    setChecked(true)
  }

  function nextTask() {
    if (!checked) return
    if (taskIndex + 1 === tasks.length) setView('result')
    else {
      setTaskIndex(value => value + 1)
      setPicked('')
      setSelectedIds([])
      setChecked(false)
      verifyGuard.current = false
    }
  }

  if (view === 'discover' && step) {
    const isWord = step.kind === 'vocabulary'
    return <section className="space-y-5" aria-label="Découvrir les phrases une par une">
      <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-bold text-indigo-700">🌱 Découverte · Phrase {stepIndex + 1}/{steps.length}</p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isWord ? 'bg-amber-100 text-amber-950' : 'bg-indigo-100 text-indigo-900'}`}>
            {isWord ? 'Nouveau mot' : 'Nouvelle notion'}
          </span>
        </div>
        <div role="progressbar" aria-label="Avancement des phrases" aria-valuenow={stepIndex + 1} aria-valuemin={0} aria-valuemax={steps.length} className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-indigo-600 transition-[width]" style={{ width: `${(stepIndex + 1) * 100 / steps.length}%` }} />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-wide text-indigo-700">{step.category}</p>
        <h2 className="mt-1 text-xl font-extrabold text-slate-950">{step.title}</h2>
        <div className="mt-4 space-y-3 rounded-2xl bg-indigo-50 p-5">
          <p lang="en" className="text-xl font-bold leading-9 text-indigo-950 sm:text-2xl"><SentenceText step={step} /></p>
          {translationVisible && <p className="text-base text-slate-700">🇫🇷 {step.french}</p>}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setVoiceWarning(!speak(step.english))} className="min-h-11 rounded-xl bg-indigo-700 px-4 py-2 font-bold text-white">🔊 Écouter</button>
            <button type="button" onClick={() => setVoiceWarning(!speak(step.english, true))} className="min-h-11 rounded-xl bg-sky-700 px-4 py-2 font-bold text-white">🐢 Lentement</button>
            <button type="button" onClick={() => setTranslationVisible(value => !value)} className="min-h-11 rounded-xl border border-indigo-300 bg-white px-4 py-2 font-semibold text-indigo-900">{translationVisible ? 'Masquer' : 'Voir'} la traduction</button>
          </div>
          {voiceWarning && <p role="status" className="text-sm text-rose-700">Voix indisponible : lis la phrase ci-dessus.</p>}
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <h3 className="font-bold text-slate-900">💡 Comprendre la règle ou le mot</h3>
          <p className="mt-2 leading-7 text-slate-700">{step.explanation}</p>
          {step.target && <div className="mt-3">
            <button type="button" onClick={() => setWordVisible(value => !value)} aria-expanded={wordVisible} className="min-h-11 rounded-xl bg-amber-100 px-4 py-2 font-semibold text-amber-950">{wordVisible ? 'Masquer le sens' : 'Voir le sens de'} « {step.target.english} »</button>
            {wordVisible && <p className="mt-2 rounded-lg bg-amber-50 p-3 font-semibold">{step.target.english} = {step.target.french}</p>}
          </div>}
        </div>
        {step.recycled.length > 0 && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <h3 className="font-bold text-emerald-900">🔁 Des mots que tu as déjà rencontrés</h3>
          <p className="mt-1 text-sm leading-7 text-emerald-950">{step.recycled.map(item => `${item.english} (${item.french})`).join(' · ')}</p>
        </div>}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button type="button" disabled={stepIndex === 0} onClick={() => { const previous = Math.max(0, stepIndex - 1); setStepIndex(previous); savePosition(unit.id, previous); setWordVisible(false); setVoiceWarning(false) }} className="min-h-12 rounded-xl border px-5 py-3 font-semibold text-slate-700 disabled:opacity-40">← Précédente</button>
          <button type="button" onClick={nextStep} className="min-h-12 rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white">{stepIndex + 1 === steps.length ? 'Faire le bilan →' : 'Phrase suivante →'}</button>
        </div>
      </div>
      <p className="text-sm text-slate-600">🟨 Jaune = mot introduit ici. 🟩 Vert = mot d’une ancienne unité. Tu peux écouter et relire chaque phrase autant que tu veux.</p>
    </section>
  }

  if (view === 'recap') return <section className="space-y-5 rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
    <h2 className="text-2xl font-extrabold">🎉 Tu as découvert toutes les phrases !</h2>
    <p className="text-slate-700">Retrouve les mots de l’unité avant de passer aux exercices de reconnaissance et de construction de phrases.</p>
    <div className="grid gap-2 sm:grid-cols-2">{unit.vocabulary.map(word => <div key={word.english} className="rounded-xl bg-amber-50 p-3"><strong>{word.english}</strong> — {word.french}</div>)}</div>
    <div className="space-y-3 rounded-xl bg-sky-50 p-4">
      <h3 className="font-bold">📖 Petite lecture</h3>
      <p lang="en" className="text-lg leading-8">{unit.readingText}</p>
      <button type="button" onClick={() => speak(unit.readingText)} className="min-h-11 rounded-xl bg-sky-700 px-4 py-2 font-semibold text-white">🔊 Écouter la lecture</button>
    </div>
    <div className="space-y-2 rounded-xl bg-emerald-50 p-4">
      <h3 className="font-bold">🗣️ À dire à voix haute</h3>
      <p lang="en" className="font-semibold">{unit.speakingPrompt}</p>
      <button type="button" onClick={() => speak(unit.speakingPrompt)} className="min-h-11 rounded-xl bg-emerald-700 px-4 py-2 font-semibold text-white">🔊 Écouter la phrase</button>
    </div>
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={startPractice} className="min-h-12 rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white">🎯 Exercices sur les mots et les phrases →</button>
      <button type="button" onClick={restartDiscovery} className="min-h-12 rounded-xl border px-4 py-2 font-semibold">Revoir depuis le début</button>
    </div>
  </section>

  if (view === 'practice' && task) {
    const recognition = task.kind === 'recognition'
    const chosen = !recognition ? selectedIds.map(id => task.shuffledTokens.find(token => token.id === id)?.text ?? '') : []
    const correct = recognition ? picked === task.word.french
      : normalizeSentence(chosen.join(' ')) === normalizeSentence(task.english)
    return <section className="space-y-5 rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-2"><h2 className="text-xl font-extrabold">🎯 Reconnaître et construire</h2><span className="font-semibold text-indigo-700">{taskIndex + 1}/{tasks.length}</span></div>
      <div role="progressbar" aria-label="Exercices sur les phrases" aria-valuenow={taskIndex + 1} aria-valuemin={0} aria-valuemax={tasks.length} className="h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-indigo-600" style={{width:`${(taskIndex + 1) * 100 / tasks.length}%`}} /></div>
      {recognition ? <>
        <p className="text-xl font-bold">Que signifie le mot anglais « <span lang="en" className="text-indigo-700">{task.word.english}</span> » ?</p>
        <div className="grid gap-2 sm:grid-cols-2">{task.options.map(option => <button key={option} type="button" disabled={checked} onClick={() => setPicked(option)} className={`min-h-12 rounded-xl border-2 p-3 text-left font-semibold ${checked && option === task.word.french ? 'border-emerald-500 bg-emerald-50' : checked && option === picked ? 'border-red-400 bg-red-50' : picked === option ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}>{option}</button>)}</div>
      </> : <>
        <p className="text-sm font-semibold text-indigo-700">Remets les mots dans l’ordre pour traduire :</p>
        <p className="text-xl font-bold">{task.french}</p>
        <div className="min-h-16 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-3" aria-label="Phrase construite">
          {selectedIds.length === 0 && <p className="text-sm text-slate-500">Sélectionne les mots ci-dessous.</p>}
          <div className="flex flex-wrap gap-2">{selectedIds.map(id => {
            const token = task.shuffledTokens.find(item => item.id === id)
            return <button type="button" key={id} disabled={checked} onClick={() => setSelectedIds(old => old.filter(value => value !== id))} className="min-h-10 rounded-lg bg-white px-3 py-2 font-semibold shadow-sm" aria-label={`Retirer ${token?.text}`}>{token?.text}</button>
          })}</div>
        </div>
        <div className="flex flex-wrap gap-2">{task.shuffledTokens.filter(token => !selectedIds.includes(token.id)).map(token => <button type="button" key={token.id} disabled={checked} onClick={() => setSelectedIds(old => [...old, token.id])} className="min-h-11 rounded-lg border border-indigo-200 bg-white px-3 py-2 font-semibold text-indigo-900">{token.text}</button>)}</div>
        {!checked && <button type="button" onClick={() => setSelectedIds([])} className="min-h-11 rounded-xl border px-4 font-semibold">Effacer ma phrase</button>}
      </>}
      {!checked ? <button type="button" onClick={verify} disabled={recognition ? !picked : selectedIds.length !== task.shuffledTokens.length} className="min-h-12 w-full rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white disabled:opacity-40">Vérifier</button>
        : <div className={`space-y-3 rounded-xl p-4 ${correct ? 'bg-emerald-50' : 'bg-amber-50'}`} aria-live="polite">
          <p className="font-bold">{correct ? '✅ Bonne réponse !' : '📚 Correction'}</p>
          <p>{recognition ? `${task.word.english} = ${task.word.french}` : `Phrase attendue : ${task.english}`}</p>
          {!correct && <p className="text-sm">Cette erreur a été ajoutée aux révisions intelligentes.</p>}
          <button type="button" onClick={nextTask} className="min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">{taskIndex + 1 === tasks.length ? 'Voir mon bilan →' : 'Exercice suivant →'}</button>
        </div>}
    </section>
  }

  return <section className="space-y-5 rounded-2xl border bg-white p-6 text-center shadow-sm" aria-live="polite">
    <div className="text-5xl">🏆</div>
    <h2 className="text-2xl font-extrabold">Entraînement terminé !</h2>
    <p className="text-4xl font-extrabold text-indigo-700">{correctCount}/{tasks.length}</p>
    <p className="text-slate-700">Tu sais désormais reconnaître les nouveaux mots et reconstruire des phrases. Tu peux recommencer librement : ce petit entraînement ne te bloque pas.</p>
    <div className="flex flex-wrap justify-center gap-3">
      <button type="button" onClick={startPractice} className="min-h-12 rounded-xl border border-indigo-600 px-5 py-3 font-bold text-indigo-800">🔄 Refaire cet entraînement</button>
      <button type="button" onClick={onFinish} className="min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">Continuer les exercices de l’unité →</button>
    </div>
  </section>
}
