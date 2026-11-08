/** Jeu de vocabulaire libre : logique pure, réutilisable et testable sans navigateur. */
export type WordCategory = 'verb' | 'grammar' | 'confusion' | 'phrasal'
export type WordGameEntry = {
  id: string
  term: string
  definition: string
  category: WordCategory
  theme: string
  example?: string
}

type EntrySource = { en: string; fr: string; example?: string }
export type WordGameSources = {
  verbs: readonly { base: string; fr: string }[]
  grammarTopics: readonly { id: string; title: string; entries: readonly EntrySource[] }[]
  confusionGroups: readonly { id: string; title: string; entries: readonly EntrySource[] }[]
  phrasalVerbs: readonly { id: string; en: string; fr: string; example?: string }[]
}

export const WORD_GAME_SIZE = 20
export const WORD_GAME_HISTORY_KEY = 'english-learning-word-game-history-v1'
export const WORD_GAME_STATS_KEY = 'english-learning-word-game-stats-v1'
const HISTORY_LIMIT = 8

export type PlayedSession = { id: string; words: string[] }
export type WordGameHistory = { sessions: PlayedSession[] }
export type WordGameProgress = {
  pending: string[]
  validated: string[]
  attempts: number
  errors: number
  missed: Record<string, number>
}

/** Chaque entrée existante est incluse, sans traduction inventée. */
export function buildWordGameCatalog(sources: WordGameSources): WordGameEntry[] {
  const entries: WordGameEntry[] = []
  const push = (item: WordGameEntry) => {
    if (item.term.trim() && item.definition.trim()) entries.push(item)
  }
  for (const verb of sources.verbs) {
    push({ id: `verb:${verb.base}`, term: verb.base, definition: verb.fr, category: 'verb', theme: 'Verbes' })
  }
  for (const topic of sources.grammarTopics) {
    topic.entries.forEach((entry, index) => push({
      id: `grammar:${topic.id}:${index}`, term: entry.en, definition: entry.fr,
      category: 'grammar', theme: topic.title, example: entry.example,
    }))
  }
  for (const group of sources.confusionGroups) {
    group.entries.forEach((entry, index) => push({
      id: `confusion:${group.id}:${index}`, term: entry.en, definition: entry.fr,
      category: 'confusion', theme: group.title, example: entry.example,
    }))
  }
  for (const phrase of sources.phrasalVerbs) {
    push({ id: `phrasal:${phrase.id}`, term: phrase.en, definition: phrase.fr,
      category: 'phrasal', theme: 'Phrasal verbs', example: phrase.example })
  }
  return entries
}

export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.max(0, Math.min(0.999999999, rng())) * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Ne fait pas confiance au contenu de localStorage (sauvegarde importée, corruption, etc.). */
export function parseWordGameHistory(raw: string | null): WordGameHistory {
  if (!raw) return { sessions: [] }
  try {
    const data: unknown = JSON.parse(raw)
    if (!data || typeof data !== 'object' || !('sessions' in data)) return { sessions: [] }
    const sessions = (data as { sessions: unknown }).sessions
    if (!Array.isArray(sessions)) return { sessions: [] }
    return {
      sessions: sessions.slice(-HISTORY_LIMIT).filter((item): item is PlayedSession =>
        !!item && typeof item === 'object' && typeof item.id === 'string' &&
        item.id.length <= 100 && Array.isArray(item.words) &&
        item.words.length <= WORD_GAME_SIZE && item.words.every((id: unknown) => typeof id === 'string' && id.length <= 160)
      ).map(item => ({ id: item.id, words: [...item.words] })),
    }
  } catch { return { sessions: [] } }
}

export function appendWordGameHistory(history: WordGameHistory, session: PlayedSession): WordGameHistory {
  const previous = history.sessions.filter(item => item.id !== session.id)
  return { sessions: [...previous, session].slice(-HISTORY_LIMIT) }
}

/**
 * Construit 20 mots distincts et varie les catégories à chaque nouvelle partie.
 * Évite en priorité les termes des dernières parties (pas seulement les identifiants).
 */
export function selectWordGame(
  catalog: readonly WordGameEntry[],
  history: WordGameHistory,
  rng: () => number = Math.random,
  requestedSize = WORD_GAME_SIZE
): WordGameEntry[] {
  const quotas: Record<WordCategory, number> = { verb: 7, grammar: 7, confusion: 3, phrasal: 3 }
  const usage = new Map<string, number>()
  const termUsage = new Map<string, number>()
  const byId = new Map(catalog.map(item => [item.id, item]))
  for (const session of history.sessions) {
    for (const id of session.words) {
      usage.set(id, (usage.get(id) ?? 0) + 1)
      const term = byId.get(id)?.term.trim().toLowerCase()
      if (term) termUsage.set(term, (termUsage.get(term) ?? 0) + 1)
    }
  }
  const selected: WordGameEntry[] = []
  const chosenIds = new Set<string>()
  const chosenTerms = new Set<string>()
  const canAdd = (item: WordGameEntry) => !chosenIds.has(item.id) && !chosenTerms.has(item.term.trim().toLowerCase())
  const choose = (pool: readonly WordGameEntry[], n: number) => {
    // Le tri donne la priorité aux mots absents des 8 derniers tirages ;
    // le mélange préalable conserve un ordre aléatoire entre mots de même priorité.
    const recentScore = (item: WordGameEntry) => (usage.get(item.id) ?? 0) + (termUsage.get(item.term.trim().toLowerCase()) ?? 0)
    const ranked = shuffle(pool, rng).sort((a, b) => recentScore(a) - recentScore(b))
    for (const item of ranked) {
      if (selected.length >= requestedSize || n <= 0) break
      if (!canAdd(item)) continue
      selected.push(item)
      chosenIds.add(item.id)
      chosenTerms.add(item.term.trim().toLowerCase())
      n--
    }
  }
  for (const category of ['verb', 'grammar', 'confusion', 'phrasal'] as const) {
    choose(catalog.filter(item => item.category === category), quotas[category])
  }
  if (selected.length < requestedSize) choose(catalog, requestedSize - selected.length)
  return shuffle(selected, rng)
}

/** 4 propositions françaises distinctes, dont exactement une réponse attendue. */
export function makeDefinitionOptions(
  item: WordGameEntry,
  catalog: readonly WordGameEntry[],
  rng: () => number = Math.random
): string[] {
  const correct = item.definition.trim()
  const seen = new Set([correct.toLocaleLowerCase('fr')])
  const alternatives: string[] = []
  const pick = (pool: readonly WordGameEntry[]) => {
    for (const entry of shuffle(pool, rng)) {
      const candidate = entry.definition.trim()
      const key = candidate.toLocaleLowerCase('fr')
      if (!candidate || seen.has(key)) continue
      seen.add(key)
      alternatives.push(candidate)
      if (alternatives.length === 3) break
    }
  }
  pick(catalog.filter(candidate => candidate.category === item.category && candidate.id !== item.id))
  if (alternatives.length < 3) pick(catalog.filter(candidate => candidate.id !== item.id))
  return shuffle([correct, ...alternatives.slice(0, 3)], rng)
}

export function beginWordGame(ids: readonly string[]): WordGameProgress {
  return { pending: [...ids], validated: [], attempts: 0, errors: 0, missed: {} }
}

/** Une erreur revient à la fin de la file. Seule une bonne réponse valide le mot. */
export function advanceWordGame(progress: WordGameProgress, correct: boolean): WordGameProgress {
  const [current, ...rest] = progress.pending
  if (!current) return progress
  return {
    pending: correct ? rest : [...rest, current],
    validated: correct ? [...progress.validated, current] : [...progress.validated],
    attempts: progress.attempts + 1,
    errors: progress.errors + (correct ? 0 : 1),
    missed: correct ? { ...progress.missed } : { ...progress.missed, [current]: (progress.missed[current] ?? 0) + 1 },
  }
}
