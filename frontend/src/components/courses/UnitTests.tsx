import { playFeedback } from '../../lib/audioFeedback'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { courseUnits, type CourseUnit } from '../../data/courses'
import { getUnitTests, shuffled, type OrderQuestion, type TestQuestion } from '../../lib/unitTests'
import { recordReviewMistake } from '../../hooks/useSmartReview'
import { recordCourseResult } from '../../hooks/useCourseProgress'

type Stage = 'qcm' | 'order' | 'read' | 'result'
type Scores = { qcm: number; order: number; read: number }

function speak(text: string, slow = false) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const voice = new SpeechSynthesisUtterance(text)
  voice.lang = 'en-US'
  voice.rate = slow ? 0.65 : 0.9
  const english = window.speechSynthesis.getVoices().find(item => item.lang.toLowerCase().startsWith('en'))
  if (english) voice.voice = english
  window.speechSynthesis.speak(voice)
}

function Progress({ index, total }: { index: number; total: number }) {
  return <div className="h-3 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index}>
    <div className="h-full bg-indigo-600 transition-[width]" style={{ width: `${(index * 100) / total}%` }} />
  </div>
}

/* ---------- QCM et compréhension : une question à choix multiple à la fois ---------- */
function ChoiceRound({ questions, text, onDone, label }: {
  questions: TestQuestion[]; text?: string; label: string; onDone: (correct: number) => void
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState('')
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(0)
  const orders = useMemo(() => questions.map(question => shuffled(question.options)), [questions])
  const question = questions[index]
  const isRight = checked && picked === question.answer

  function verify() {
    if (checked || !picked) return
    playFeedback(picked === question.answer ? 'correct' : 'incorrect')
    if (picked === question.answer) setCorrect(n => n + 1)
    else {
      recordReviewMistake({
        id: `course-test:${question.id}`, source: 'reading', format: 'choice',
        prompt: question.prompt, correctAnswer: question.answer, options: question.options,
        context: text, explanation: question.explanation,
      })
    }
    setChecked(true)
  }
  function next() {
    if (!checked) return
    if (index + 1 < questions.length) { setIndex(n => n + 1); setPicked(''); setChecked(false) }
    else onDone(correct)
  }

  return <section className="space-y-5 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
    <div className="flex items-center justify-between gap-2">
      <h2 className="text-xl font-bold">{label}</h2>
      <span className="font-semibold text-indigo-700">{index + 1}/{questions.length}</span>
    </div>
    <Progress index={index + 1} total={questions.length} />
    {question.recycled && <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">🔁 Mot déjà vu dans une unité précédente</p>}
    {text && <div className="space-y-3 rounded-xl bg-indigo-50 p-4">
      <p className="text-xs font-bold uppercase">Lis le texte</p>
      <p className="text-lg leading-8">{text}</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => speak(text)} className="min-h-11 rounded-xl bg-sky-700 px-4 font-semibold text-white">🔊 Écouter</button>
        <button type="button" onClick={() => speak(text, true)} className="min-h-11 rounded-xl bg-purple-700 px-4 font-semibold text-white">🐢 Lentement</button>
      </div>
    </div>}
    <h3 className="text-lg font-bold leading-8">{question.prompt}</h3>
    <div className="space-y-2" role="group" aria-label="Réponses possibles">
      {orders[index].map((option, i) => {
        const right = checked && option === question.answer
        const wrong = checked && picked === option && option !== question.answer
        return <button key={`${question.id}-${i}`} type="button" disabled={checked} onClick={() => setPicked(option)}
          className={`block min-h-12 w-full rounded-xl border-2 px-4 py-3 text-left font-semibold ${right ? 'border-green-500 bg-green-50 text-green-900' : wrong ? 'border-red-400 bg-red-50' : picked === option ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}>{option}</button>
      })}
    </div>
    {!checked
      ? <button type="button" disabled={!picked} onClick={verify} className="min-h-12 w-full rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white disabled:opacity-40">Vérifier</button>
      : <div className={`space-y-3 rounded-xl p-4 ${isRight ? 'bg-green-50' : 'bg-amber-50'}`} aria-live="polite">
        <h4 className="font-bold">{isRight ? '✅ Bonne réponse !' : '📚 Correction'}</h4>
        {!isRight && <p><strong>Réponse attendue :</strong> {question.answer}</p>}
        <p className="text-sm leading-6">{question.explanation}</p>
        {!isRight && <p className="text-xs">Cette erreur rejoint aussi ton module « Révisions intelligentes ».</p>}
        <button type="button" onClick={next} className="min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white">{index + 1 === questions.length ? 'Terminer cette partie →' : 'Question suivante →'}</button>
      </div>}
  </section>
}

/* ---------- Mettre les mots en place ---------- */
type Token = { id: number; text: string }
function makeTokens(question: OrderQuestion): Token[] {
  const tokens = question.words.map((word, id) => ({ id, text: id === 0 && word !== 'I' && !word.startsWith("I'") ? word.toLowerCase() : word }))
  if (tokens.length < 2) return tokens
  const target = tokens.map(token => token.text).join(' ')
  let mixed = shuffled(tokens)
  for (let i = 0; i < 8 && mixed.map(token => token.text).join(' ') === target; i++) mixed = shuffled(tokens)
  return mixed
}

function OrderRound({ questions, onDone }: { questions: OrderQuestion[]; onDone: (correct: number) => void }) {
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const decks = useMemo(() => questions.map(makeTokens), [questions])
  const question = questions[index]
  const deck = decks[index]
  const built = selected.map(id => deck.find(token => token.id === id)?.text ?? '')
  const isRight = built.join(' ').toLocaleLowerCase('en-US') === question.words.join(' ').toLocaleLowerCase('en-US')

  function verify() {
    if (checked || selected.length !== deck.length) return
    playFeedback(isRight ? 'correct' : 'incorrect')
    if (isRight) setCorrect(n => n + 1)
    else {
      recordReviewMistake({
        id: `course-test:${question.id}`, source: 'writing', format: 'text',
        prompt: `Traduis en anglais : ${question.french}`, correctAnswer: question.sentence,
        explanation: `Phrase modèle : ${question.sentence}`,
      })
    }
    setChecked(true)
  }
  function next() {
    if (!checked) return
    if (index + 1 < questions.length) { setIndex(n => n + 1); setSelected([]); setChecked(false) }
    else onDone(correct)
  }

  return <section className="space-y-5 rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
    <div className="flex items-center justify-between gap-2">
      <h2 className="text-xl font-bold">🧩 Mets les mots en place</h2>
      <span className="font-semibold text-indigo-700">{index + 1}/{questions.length}</span>
    </div>
    <Progress index={index + 1} total={questions.length} />
    {question.recycled && <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">🔁 Mot déjà vu dans une unité précédente</p>}
    <div className="space-y-1 rounded-xl bg-indigo-50 p-4">
      <p className="text-xs font-bold uppercase">Remets la phrase dans l’ordre</p>
      <p className="text-lg font-bold leading-8">{question.french}</p>
    </div>
    <div className={`flex min-h-16 flex-wrap items-center gap-2 rounded-xl border-2 border-dashed p-3 ${checked ? (isRight ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : 'border-slate-300 bg-slate-50'}`} aria-label="Ta phrase" aria-live="polite">
      {selected.length === 0 && <span className="text-sm text-slate-500">Touche les mots dans le bon ordre…</span>}
      {selected.map(id => {
        const token = deck.find(item => item.id === id)!
        return <button key={id} type="button" disabled={checked} onClick={() => setSelected(list => list.filter(value => value !== id))} className="min-h-11 rounded-lg bg-indigo-700 px-3 font-semibold text-white" aria-label={`Retirer ${token.text}`}>{token.text}</button>
      })}
    </div>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Mots disponibles">
      {deck.filter(token => !selected.includes(token.id)).map(token => <button key={token.id} type="button" disabled={checked} onClick={() => setSelected(list => [...list, token.id])} className="min-h-11 rounded-lg border-2 border-slate-200 bg-white px-3 font-semibold hover:border-indigo-300">{token.text}</button>)}
    </div>
    {!checked
      ? <div className="flex flex-wrap gap-2">
        <button type="button" disabled={selected.length === 0} onClick={() => setSelected([])} className="min-h-12 rounded-xl bg-slate-200 px-5 py-3 font-bold disabled:opacity-40">Effacer</button>
        <button type="button" disabled={selected.length !== deck.length} onClick={verify} className="min-h-12 flex-1 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white disabled:opacity-40">Vérifier</button>
      </div>
      : <div className={`space-y-3 rounded-xl p-4 ${isRight ? 'bg-green-50' : 'bg-amber-50'}`} aria-live="polite">
        <h4 className="font-bold">{isRight ? '✅ Phrase correcte !' : '📚 Correction'}</h4>
        {!isRight && <p><strong>Bonne phrase :</strong> {question.sentence}</p>}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => speak(question.sentence)} className="min-h-11 rounded-xl bg-sky-700 px-4 font-semibold text-white">🔊 Écouter la phrase</button>
          <button type="button" onClick={next} className="min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white">{index + 1 === questions.length ? 'Terminer cette partie →' : 'Phrase suivante →'}</button>
        </div>
        {!isRight && <p className="text-xs">Cette erreur rejoint aussi ton module « Révisions intelligentes ».</p>}
      </div>}
  </section>
}

/* ---------- Conteneur : QCM → Mots en place → Compréhension → Résultat ---------- */
const steps: { id: Exclude<Stage, 'result'>; label: string }[] = [
  { id: 'qcm', label: '1 · QCM' },
  { id: 'order', label: '2 · Mots en place' },
  { id: 'read', label: '3 · Compréhension' },
]

export default function UnitTests({ unit }: { unit: CourseUnit }) {
  const tests = useMemo(() => getUnitTests(unit.id), [unit.id])
  const [stage, setStage] = useState<Stage>('qcm')
  const [scores, setScores] = useState<Scores>({ qcm: 0, order: 0, read: 0 })
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<ReturnType<typeof recordCourseResult> | null>(null)
  const settled = useRef(false)

  if (!tests) return <p>Aucun test disponible pour cette unité.</p>
  const unitIndex = courseUnits.findIndex(item => item.id === unit.id)
  const nextUnit = courseUnits[unitIndex + 1]

  function restart() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    settled.current = false
    setScores({ qcm: 0, order: 0, read: 0 })
    setResult(null); setStage('qcm'); setAttempt(n => n + 1)
    window.scrollTo(0, 0)
  }

  if (stage === 'result' && result && tests) {
    const correct = scores.qcm + scores.order + scores.read
    const rows = [
      { label: '🧠 QCM', value: scores.qcm, max: tests.qcm.length },
      { label: '🧩 Mots en place', value: scores.order, max: tests.order.length },
      { label: '📖 Compréhension', value: scores.read, max: tests.comprehension.questions.length },
    ]
    return <section className="space-y-5 rounded-2xl border bg-white p-6 text-center shadow-sm" aria-live="polite">
      <div className="text-6xl">{result.passed ? '🏆' : '📚'}</div>
      <h2 className="text-2xl font-bold">{result.passed ? 'Unité réussie !' : 'Encore un peu d’entraînement !'}</h2>
      <p className="text-4xl font-extrabold text-indigo-700">{correct}/{tests.total} — {result.percentage} %</p>
      <p>{result.passed ? result.firstTime ? `+${unit.xp} XP, unité suivante débloquée !` : 'Unité révisée. XP de base déjà attribués.' : 'Il faut atteindre 80 % pour débloquer la suite. Les erreurs sont ajoutées à tes révisions.'}</p>
      <div className="mx-auto grid max-w-md gap-2 text-left">
        {rows.map(row => <div key={row.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 font-semibold"><span>{row.label}</span><span>{row.value}/{row.max}</span></div>)}
      </div>
      {tests.recycledWords.length > 0 && <div className="rounded-xl bg-amber-50 p-4 text-left">
        <h3 className="font-bold">🔁 Mots des unités précédentes revus ici</h3>
        <p className="mt-2 text-sm leading-6">{tests.recycledWords.map(word => `${word.english} (${word.french})`).join(' · ')}</p>
      </div>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={restart} className="min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">🔄 Refaire le test</button>
        {result.passed && nextUnit && <Link to={`/courses/${nextUnit.id}`} className="inline-flex min-h-12 items-center rounded-xl bg-green-600 px-5 py-3 font-bold text-white">Unité suivante →</Link>}
        <Link to="/" className="inline-flex min-h-12 items-center rounded-xl bg-slate-200 px-5 py-3 font-bold">Mes niveaux</Link>
      </div>
    </section>
  }

  function finish(read: number) {
    if (settled.current) return
    settled.current = true
    const final = { ...scores, read }
    setScores(final)
    setResult(recordCourseResult(unit.id, final.qcm + final.order + final.read, tests!.total))
    setStage('result')
    window.scrollTo(0, 0)
  }

  const current = steps.findIndex(step => step.id === stage)
  return <div className="space-y-4">
    <ol className="grid grid-cols-3 gap-2 text-center text-xs font-bold sm:text-sm" aria-label="Étapes du test de fin d’unité">
      {steps.map((step, i) => <li key={step.id} aria-current={i === current ? 'step' : undefined} className={`rounded-xl px-2 py-3 ${i === current ? 'bg-indigo-700 text-white' : i < current ? 'bg-green-100 text-green-900' : 'bg-slate-100 text-slate-600'}`}>{i < current ? '✅ ' : ''}{step.label}</li>)}
    </ol>
    {stage === 'qcm' && <>
      <p className="rounded-xl bg-indigo-50 p-4 text-sm leading-6">Test de fin d’unité : <strong>{tests.total} questions</strong> au total, 80 % pour réussir. Tu retrouveras les mots de cette unité et <strong>{tests.recycledWords.length} mot(s) des unités précédentes</strong>.</p>
      <ChoiceRound key={`qcm-${attempt}`} label="🧠 QCM : vocabulaire et grammaire" questions={tests.qcm} onDone={value => { setScores(s => ({ ...s, qcm: value })); setStage('order'); window.scrollTo(0, 0) }} />
    </>}
    {stage === 'order' && <OrderRound key={`order-${attempt}`} questions={tests.order} onDone={value => { setScores(s => ({ ...s, order: value })); setStage('read'); window.scrollTo(0, 0) }} />}
    {stage === 'read' && <ChoiceRound key={`read-${attempt}`} label="📖 Test de compréhension" text={tests.comprehension.text} questions={tests.comprehension.questions} onDone={finish} />}
  </div>
}
