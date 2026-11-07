import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CEFRUnit } from '../../data/cefr'
import type { CEFRResult } from '../../hooks/useCEFRProgress'

type Props = {
  unit: CEFRUnit
  onFinish: (correctCount: number, total: number) => CEFRResult
}

export default function CEFRQuiz({ unit, onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [result, setResult] = useState<CEFRResult | null>(null)
  const [attempt, setAttempt] = useState(0)
  const finishingRef = useRef(false)
  const question = unit.questions[index]

  function validate() {
    if (selected === null || checked || result) return
    setChecked(true)
    if (selected === question.correctIndex) setCorrectCount(count => count + 1)
  }

  function next() {
    if (!checked || finishingRef.current || result) return
    if (index + 1 === unit.questions.length) {
      finishingRef.current = true
      setResult(onFinish(correctCount, unit.questions.length))
      return
    }
    setIndex(index + 1)
    setSelected(null)
    setChecked(false)
  }

  function retry() {
    finishingRef.current = false
    setAttempt(count => count + 1)
    setIndex(0)
    setSelected(null)
    setChecked(false)
    setCorrectCount(0)
    setResult(null)
  }

  if (result) {
    return (
      <section className="space-y-5 rounded-2xl bg-white p-7 text-center shadow-sm" aria-live="polite">
        <div className="text-6xl">{result.passed ? '🏆' : '📚'}</div>
        <h2 className="text-2xl font-bold">{result.passed ? 'Unité réussie !' : 'Encore un effort !'}</h2>
        <p className="text-4xl font-bold text-indigo-600">{correctCount} / {unit.questions.length}</p>
        <p>{result.percentage} % — score minimum : 80 %</p>
        <p className={result.passed ? 'text-green-700' : 'text-amber-800'}>
          {result.firstTime ? `+${unit.xp} XP pour ta première réussite !` : result.passed
            ? 'Unité déjà validée : entraînement quotidien comptabilisé, sans XP de base supplémentaires.'
            : 'Il te faut au moins 4 bonnes réponses sur 5 pour débloquer la suite.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={retry} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white">🔄 Recommencer</button>
          <Link to="/cefr" className="rounded-xl bg-slate-200 px-6 py-3 font-semibold text-slate-900">Retour au parcours →</Link>
        </div>
      </section>
    )
  }

  return (
    <section key={attempt} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between gap-4 text-sm font-semibold">
        <span>Question {index + 1}/{unit.questions.length}</span>
        <span>{correctCount} bonne(s) réponse(s)</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-indigo-600" style={{ width: `${(index + 1) * 100 / unit.questions.length}%` }} />
      </div>
      <h2 className="rounded-xl bg-indigo-50 p-5 text-xl font-bold text-slate-900">{question.prompt}</h2>
      <div className="grid gap-3">
        {question.options.map((option, optionIndex) => {
          const isCorrect = checked && optionIndex === question.correctIndex
          const isWrong = checked && optionIndex === selected && optionIndex !== question.correctIndex
          return (
            <button key={optionIndex} type="button" disabled={checked} aria-pressed={selected === optionIndex}
              onClick={() => setSelected(optionIndex)}
              className={`rounded-xl border-2 p-4 text-left transition ${isCorrect ? 'border-green-600 bg-green-50' : isWrong ? 'border-red-600 bg-red-50' : selected === optionIndex ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'} ${checked ? 'cursor-default' : ''}`}>
              <span className="font-semibold">{String.fromCharCode(65 + optionIndex)}.</span> {option}
            </button>
          )
        })}
      </div>
      {checked && (
        <div className={`rounded-xl p-4 ${selected === question.correctIndex ? 'bg-green-50' : 'bg-amber-50'}`} role="status">
          <p className="font-bold">{selected === question.correctIndex ? '✅ Bonne réponse' : '📚 À retenir'}</p>
          <p className="mt-2 text-sm">{question.explanation}</p>
          {selected !== question.correctIndex && <p className="mt-2 font-medium">Réponse : {question.options[question.correctIndex]}</p>}
        </div>
      )}
      {checked ? (
        <button type="button" onClick={next} className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white">
          {index + 1 === unit.questions.length ? 'Voir mon score →' : 'Question suivante →'}
        </button>
      ) : (
        <button type="button" disabled={selected === null} onClick={validate} className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:opacity-50">
          Vérifier ma réponse
        </button>
      )}
    </section>
  )
}
