import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { wordGameCatalog } from '../data/wordGameCatalog'
import { playFeedback } from '../lib/audioFeedback'
import { speakEnglish } from '../lib/independentLearning'
import {
  WORD_GAME_HISTORY_KEY,
  WORD_GAME_STATS_KEY,
  advanceWordGame,
  appendWordGameHistory,
  beginWordGame,
  makeDefinitionOptions,
  parseWordGameHistory,
  selectWordGame,
  type WordGameEntry,
  type WordGameProgress,
} from '../lib/wordGameEngine'

type Session = { id: string; entries: WordGameEntry[]; progress: WordGameProgress }

function readHistory() {
  try { return parseWordGameHistory(window.localStorage.getItem(WORD_GAME_HISTORY_KEY)) }
  catch { return { sessions: [] } }
}

function startSession(): Session {
  const entries = selectWordGame(wordGameCatalog, readHistory())
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    entries,
    progress: beginWordGame(entries.map(item => item.id)),
  }
}

function rememberSession(session: Session) {
  try {
    const updated = appendWordGameHistory(readHistory(), {
      id: session.id,
      words: session.entries.map(item => item.id),
    })
    window.localStorage.setItem(WORD_GAME_HISTORY_KEY, JSON.stringify(updated))
  } catch { /* Le tirage reste jouable si le stockage est bloqué. */ }
}

function saveCompletedSession(session: Session) {
  try {
    const raw = window.localStorage.getItem(WORD_GAME_STATS_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    const previous = parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {}
    const count = typeof previous.completedGames === 'number' && Number.isSafeInteger(previous.completedGames)
      && previous.completedGames >= 0 ? previous.completedGames : 0
    window.localStorage.setItem(WORD_GAME_STATS_KEY, JSON.stringify({
      completedGames: count + 1,
      lastCompletedAt: new Date().toISOString(),
      lastMistakes: session.progress.errors,
    }))
  } catch { /* Les statistiques sont facultatives. */ }
}

const categoryLabels: Record<WordGameEntry['category'], string> = {
  verb: 'Verbes',
  grammar: 'Grammaire',
  confusion: 'Mots confondus',
  phrasal: 'Phrasal verbs',
}

export default function LibraryWordGame() {
  const [session, setSession] = useState<Session>(startSession)
  const [selected, setSelected] = useState<string | null>(null)
  const completed = session.progress.pending.length === 0
  const currentId = session.progress.pending[0]
  const current = session.entries.find(item => item.id === currentId)
  const options = useMemo(() => current
    ? makeDefinitionOptions(current, wordGameCatalog)
    : [], [current, session.id, session.progress.attempts])
  const validated = session.progress.validated.length
  const total = session.entries.length
  const isCorrect = !!current && selected === current.definition

  // Mémorise les huit derniers tirages pour varier les parties suivantes.
  // En mode Strict React, le même id est remplacé : pas de double historique.
  useEffect(() => { rememberSession(session) }, [session.id])

  function choose(definition: string) {
    if (selected !== null || !current) return
    setSelected(definition)
    playFeedback(definition === current.definition ? 'correct' : 'incorrect')
  }

  function continueGame() {
    if (selected === null) return
    const progress = advanceWordGame(session.progress, isCorrect)
    const updated = { ...session, progress }
    setSession(updated)
    setSelected(null)
    if (progress.pending.length === 0) {
      saveCompletedSession(updated)
      playFeedback('reward', { announce: true })
    }
  }

  function newDrawing() {
    setSession(startSession())
    setSelected(null)
  }

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
        <Link to="/library">← Bibliothèque</Link>
        <Link to="/library/spelling-game">✍️ Écrire les mots →</Link>
        <Link to="/library/practice">Autres exercices →</Link>
      </nav>

      <header className="rounded-3xl bg-gradient-to-r from-indigo-700 to-sky-700 p-5 text-white sm:p-7">
        <p className="text-sm font-semibold text-indigo-100">🎲 Jeu de mots · Accès libre</p>
        <h1 className="mt-2 text-3xl font-extrabold">20 mots surprise</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-indigo-100">
          Trouve la définition française des mots anglais. Les 20 mots sont tirés dans les verbes,
          la grammaire, les mots confondus et les phrasal verbs de ta bibliothèque.
          Si tu te trompes, tu vois la bonne définition et le mot revient plus tard jusqu'à ta réussite.
        </p>
        <p className="mt-3 text-xs text-indigo-100">Chaque nouvelle ouverture propose un autre tirage, avec moins de répétitions des parties récentes.</p>
      </header>

      <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm sm:p-6" aria-label="Jeu de vocabulaire">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-indigo-700">Mots validés</p>
            <p className="text-3xl font-extrabold tabular-nums">{validated}<span className="text-xl text-slate-400">/{total}</span></p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <p>{session.progress.errors} erreur{session.progress.errors > 1 ? 's' : ''}</p>
            <p>{session.progress.attempts} réponse{session.progress.attempts > 1 ? 's' : ''} donnée{session.progress.attempts > 1 ? 's' : ''}</p>
          </div>
        </div>
        <div
          role="progressbar"
          aria-label="Mots définitivement validés"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={validated}
          className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"
        >
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${total ? validated / total * 100 : 0}%` }} />
        </div>

        {completed ? (
          <div className="mt-8 space-y-4 rounded-2xl bg-emerald-50 p-6 text-center" aria-live="polite">
            <div className="text-5xl" aria-hidden="true">🏆</div>
            <h2 className="text-2xl font-extrabold text-emerald-900">Bravo ! 20 mots validés !</h2>
            <p className="text-emerald-900">Tu as trouvé la bonne définition de chaque mot, y compris ceux que tu avais ratés.</p>
            <p className="text-sm text-emerald-800">{session.progress.errors} erreur(s) corrigée(s) · {session.progress.attempts} réponse(s) au total</p>
            <button type="button" onClick={newDrawing} className="min-h-12 rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white hover:bg-indigo-800">
              🎲 Jouer avec 20 nouveaux mots
            </button>
          </div>
        ) : current ? (
          <div className="mt-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-700">{categoryLabels[current.category]}</span>
              <span className="text-slate-500">{current.theme}</span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 text-center sm:p-7">
              <p className="text-sm font-medium text-slate-500">Quelle est la définition de ce terme ?</p>
              <h2 className="mt-3 break-words text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl" lang="en">{current.term}</h2>
              <button
                type="button"
                onClick={() => speakEnglish(current.term)}
                className="mt-4 min-h-11 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
              >🔊 Écouter le mot</button>
              {(session.progress.missed[current.id] ?? 0) > 0 && <p className="mt-3 text-xs font-semibold text-amber-800">🔁 Ce mot revient après une erreur précédente</p>}
            </div>

            <fieldset className="space-y-3">
              <legend className="mb-3 text-sm font-bold text-slate-800">Choisis la bonne traduction française :</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {options.map(option => {
                  const chosen = selected === option
                  const good = option === current.definition
                  const revealed = selected !== null
                  const colors = revealed && good
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : revealed && chosen
                      ? 'border-rose-500 bg-rose-50 text-rose-900'
                      : 'border-slate-200 bg-white text-slate-900 hover:border-indigo-400 hover:bg-indigo-50'
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => choose(option)}
                      disabled={revealed}
                      aria-pressed={chosen}
                      className={`min-h-14 rounded-xl border-2 p-4 text-left font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${colors} disabled:cursor-default`}
                    >
                      {option}{revealed && good ? ' ✓' : ''}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            {selected !== null && (
              <div role="status" aria-live="polite" className={`space-y-2 rounded-2xl p-4 ${isCorrect ? 'border border-emerald-200 bg-emerald-50 text-emerald-900' : 'border border-rose-200 bg-rose-50 text-rose-950'}`}>
                <p className="font-extrabold">{isCorrect ? '✅ Bonne réponse !' : '❌ Erreur, vous vous êtes trompé.'}</p>
                <p><strong>Bonne définition :</strong> {current.definition}</p>
                {current.example && <p className="text-sm"><strong>Exemple :</strong> <span lang="en">{current.example}</span></p>}
                {!isCorrect && <p className="text-sm">Ce mot reviendra plus tard dans cette partie. Il ne sera validé que lorsque tu répondras correctement.</p>}
                <button type="button" onClick={continueGame} className="mt-2 min-h-12 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white hover:bg-indigo-800">
                  {session.progress.pending.length === 1 && isCorrect ? 'Terminer la partie →' : 'Question suivante →'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-5 text-slate-600">Aucun mot disponible dans la bibliothèque.</p>
        )}
      </section>

      {!completed && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-xs leading-relaxed text-slate-600">
            Aucun cadenas, aucune limite de tentatives. Le tirage varie à chaque nouvelle partie ;
            certains mots peuvent réapparaître pour renforcer la mémoire.
          </p>
          <button type="button" onClick={newDrawing} className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            🎲 Autre tirage
          </button>
        </div>
      )}
    </div>
  )
}
