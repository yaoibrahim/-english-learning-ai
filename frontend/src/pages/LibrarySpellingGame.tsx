import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { wordGameCatalog } from '../data/wordGameCatalog'
import { playFeedback } from '../lib/audioFeedback'
import { speakEnglish } from '../lib/independentLearning'
import {
  WORD_GAME_SIZE,
  advanceWordGame,
  appendWordGameHistory,
  beginWordGame,
  parseWordGameHistory,
  selectWordGame,
  type WordGameEntry,
  type WordGameProgress,
} from '../lib/wordGameEngine'
import {
  SPELLING_GAME_HISTORY_KEY,
  SPELLING_GAME_STATS_KEY,
  checkSpelling,
  spellingHint,
} from '../lib/spellingGame'

type Session = {
  id: string
  entries: WordGameEntry[]
  progress: WordGameProgress
}

type SubmittedAnswer = {
  value: string
  correct: boolean
  acceptedTerm: string | null
}

function readHistory() {
  try {
    return parseWordGameHistory(window.localStorage.getItem(SPELLING_GAME_HISTORY_KEY))
  } catch {
    return { sessions: [] }
  }
}

function newSession(): Session {
  const entries = selectWordGame(wordGameCatalog, readHistory())
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    entries,
    progress: beginWordGame(entries.map(entry => entry.id)),
  }
}

function rememberDraw(session: Session) {
  try {
    const history = appendWordGameHistory(readHistory(), {
      id: session.id,
      words: session.entries.map(entry => entry.id),
    })
    window.localStorage.setItem(SPELLING_GAME_HISTORY_KEY, JSON.stringify(history))
  } catch {
    // Le jeu reste disponible si l'enregistrement est bloqué.
  }
}

function recordCompletion(session: Session) {
  try {
    const raw = window.localStorage.getItem(SPELLING_GAME_STATS_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    const previous = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown> : {}
    const count = typeof previous.completedGames === 'number' &&
      Number.isSafeInteger(previous.completedGames) && previous.completedGames >= 0
      ? previous.completedGames : 0
    window.localStorage.setItem(SPELLING_GAME_STATS_KEY, JSON.stringify({
      completedGames: count + 1,
      lastCompletedAt: new Date().toISOString(),
      lastMistakes: session.progress.errors,
    }))
  } catch {
    // Les statistiques locales sont facultatives.
  }
}

const categoryNames: Record<WordGameEntry['category'], string> = {
  verb: 'Verbes',
  grammar: 'Grammaire',
  confusion: 'Mots confondus',
  phrasal: 'Phrasal verbs',
}

export default function LibrarySpellingGame() {
  const [session, setSession] = useState<Session>(newSession)
  const [typed, setTyped] = useState('')
  const [submitted, setSubmitted] = useState<SubmittedAnswer | null>(null)
  const [hintVisible, setHintVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const total = session.entries.length
  const validated = session.progress.validated.length
  const completed = total > 0 && session.progress.pending.length === 0
  const currentId = session.progress.pending[0]
  const current = session.entries.find(entry => entry.id === currentId)
  const previouslyMissed = current ? (session.progress.missed[current.id] ?? 0) : 0

  useEffect(() => {
    // L'historique évite de reproduire les vingt mêmes mots à chaque ouverture.
    // Avec React StrictMode, une même session conserve le même identifiant.
    rememberDraw(session)
  }, [session.id])

  function checkAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!current || !typed.trim() || submitted) return
    const result = checkSpelling(current, typed, wordGameCatalog)
    setSubmitted({ value: typed.trim(), ...result })
    playFeedback(result.correct ? 'correct' : 'incorrect')
  }

  function nextQuestion() {
    if (!submitted || !current) return
    const progress = advanceWordGame(session.progress, submitted.correct)
    const updated = { ...session, progress }
    setSession(updated)
    setTyped('')
    setSubmitted(null)
    setHintVisible(false)
    if (progress.pending.length === 0) {
      recordCompletion(updated)
      playFeedback('reward', { announce: true })
    } else {
      // Le focus sera utile pour écrire le terme suivant au clavier.
      window.requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  function reshuffle() {
    setSession(newSession())
    setTyped('')
    setSubmitted(null)
    setHintVisible(false)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
        <Link to="/library">← Bibliothèque</Link>
        <Link to="/library/word-game">Jeu QCM de 20 mots →</Link>
      </nav>

      <header className="rounded-3xl bg-gradient-to-r from-fuchsia-700 to-indigo-700 p-5 text-white sm:p-7">
        <p className="text-sm font-bold text-fuchsia-100">✍️ Jeu d'orthographe · Accès libre</p>
        <h1 className="mt-2 text-3xl font-extrabold">Écrire 20 mots en anglais</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fuchsia-100">
          Lis la définition en français puis écris le mot anglais correspondant.
          Les verbes, notions de grammaire, mots confondus et phrasal verbs sont tirés au hasard.
          Une mauvaise réponse affiche la correction et revient plus tard, jusqu'à ce que le mot soit réussi.
        </p>
      </header>

      <section className="rounded-2xl border border-fuchsia-100 bg-white p-4 shadow-sm sm:p-6" aria-label="Jeu d'écriture de mots anglais">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-fuchsia-800">Mots validés</p>
            <p className="text-3xl font-extrabold tabular-nums">{validated}<span className="text-xl text-slate-400">/{total || WORD_GAME_SIZE}</span></p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <p>{session.progress.errors} erreur{session.progress.errors > 1 ? 's' : ''}</p>
            <p>{session.progress.attempts} tentative{session.progress.attempts > 1 ? 's' : ''}</p>
          </div>
        </div>
        <div
          role="progressbar"
          aria-label="Mots écrits et validés"
          aria-valuemin={0}
          aria-valuemax={total || WORD_GAME_SIZE}
          aria-valuenow={validated}
          className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"
        >
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${total ? validated / total * 100 : 0}%` }} />
        </div>

        {completed ? (
          <div role="status" aria-live="polite" className="mt-7 space-y-4 rounded-2xl bg-emerald-50 p-6 text-center">
            <div className="text-5xl" aria-hidden="true">🏆</div>
            <h2 className="text-2xl font-extrabold text-emerald-900">Bravo ! Tes 20 mots sont bien écrits !</h2>
            <p className="text-emerald-900">Chaque terme a été reconnu, y compris ceux que tu avais ratés.</p>
            <p className="text-sm text-emerald-800">{session.progress.errors} erreur(s) corrigée(s) · {session.progress.attempts} réponse(s) au total</p>
            <button type="button" onClick={reshuffle} className="min-h-12 rounded-xl bg-fuchsia-700 px-6 py-3 font-bold text-white hover:bg-fuchsia-800">
              🎲 Écrire 20 nouveaux mots
            </button>
          </div>
        ) : current ? (
          <div className="mt-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="rounded-full bg-fuchsia-50 px-3 py-1 font-bold text-fuchsia-800">{categoryNames[current.category]}</span>
              <span className="text-slate-500">{current.theme}</span>
            </div>

            <div className="space-y-2 rounded-2xl bg-indigo-50 p-5 text-center sm:p-7">
              <p className="text-sm font-semibold text-indigo-700">Écris le mot anglais correspondant à cette définition :</p>
              <h2 className="break-words text-2xl font-extrabold text-slate-950 sm:text-3xl" lang="fr">{current.definition}</h2>
              {previouslyMissed > 0 && <p className="text-xs font-semibold text-amber-800">🔁 Ce mot revient après une erreur précédente</p>}
            </div>

            <form onSubmit={checkAnswer} className="space-y-3">
              <label htmlFor="spelling-answer" className="block font-bold text-slate-800">Ta réponse en anglais</label>
              <input
                id="spelling-answer"
                ref={inputRef}
                type="text"
                lang="en"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="Écris ici le mot ou l'expression…"
                value={typed}
                onChange={event => setTyped(event.target.value)}
                disabled={submitted !== null}
                maxLength={180}
                className="min-h-14 w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-lg font-medium outline-none focus:border-fuchsia-600 focus-visible:ring-2 focus-visible:ring-fuchsia-200 disabled:bg-slate-100"
              />
              {!submitted && (
                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" disabled={!typed.trim()} className="min-h-12 rounded-xl bg-fuchsia-700 px-6 py-3 font-bold text-white hover:bg-fuchsia-800 disabled:cursor-not-allowed disabled:opacity-40">
                    Vérifier mon écriture
                  </button>
                  <button type="button" onClick={() => setHintVisible(value => !value)} className="min-h-11 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 font-semibold text-amber-900">
                    💡 {hintVisible ? "Masquer l'indice" : 'Voir un indice'}
                  </button>
                </div>
              )}
              {hintVisible && !submitted && <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{spellingHint(current.term)}</p>}
            </form>

            {submitted && (
              <div role="status" aria-live="polite" className={`space-y-3 rounded-2xl p-4 ${submitted.correct ? 'border border-emerald-200 bg-emerald-50 text-emerald-950' : 'border border-rose-200 bg-rose-50 text-rose-950'}`}>
                <p className="text-lg font-extrabold">{submitted.correct ? '✅ Bonne réponse !' : '❌ Erreur, vous vous êtes trompé.'}</p>
                <p><strong>Tu as écrit :</strong> <span lang="en">{submitted.value}</span></p>
                <p><strong>Bonne écriture :</strong> <span lang="en">{current.term}</span> — {current.definition}</p>
                {submitted.correct && submitted.acceptedTerm && submitted.acceptedTerm !== current.term && (
                  <p className="text-sm">Ta variante « {submitted.acceptedTerm} » est également acceptée.</p>
                )}
                {current.example && <p className="text-sm"><strong>Exemple :</strong> <span lang="en">{current.example}</span></p>}
                <button
                  type="button"
                  onClick={() => speakEnglish(current.term)}
                  className="min-h-11 rounded-xl border border-current bg-white px-4 py-2 text-sm font-bold"
                >🔊 Écouter la bonne réponse</button>
                {!submitted.correct && <p className="text-sm font-semibold">Le mot reviendra plus tard dans la partie. Il ne sera validé qu'après une réponse correcte.</p>}
                <div>
                  <button type="button" onClick={nextQuestion} className="mt-1 min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white hover:bg-indigo-800">
                    {session.progress.pending.length === 1 && submitted.correct ? 'Terminer la partie →' : 'Mot suivant →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-5 text-slate-600">Aucun terme disponible pour ce jeu.</p>
        )}
      </section>

      {!completed && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-xs leading-relaxed text-slate-600">
            Aucune restriction ni limite de tentatives. La liste varie à chaque nouvelle ouverture,
            avec une préférence pour les mots absents des huit tirages précédents.
          </p>
          <button type="button" onClick={reshuffle} className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            🎲 Autre tirage
          </button>
        </div>
      )}
    </div>
  )
}
