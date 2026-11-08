import type { WordGameEntry } from './wordGameEngine'

export const SPELLING_GAME_HISTORY_KEY = 'english-learning-spelling-game-history-v1'
export const SPELLING_GAME_STATS_KEY = 'english-learning-spelling-game-stats-v1'

/** Tolère la casse, les apostrophes typographiques et les espaces en trop.
 * Conserve l'apostrophe significative : « it's » n'est pas « its ». */
export function normalizeSpelling(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[’‘`]/g, "'")
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^a-z0-9'\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeFrenchDefinition(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('fr')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Une même définition peut avoir plusieurs traductions exactes présentes
 * dans la bibliothèque : elles sont toutes acceptées pour ne pas pénaliser
 * une réponse correcte et déjà référencée. */
export function acceptedSpellings(
  item: WordGameEntry,
  catalog: readonly WordGameEntry[]
): string[] {
  const definition = normalizeFrenchDefinition(item.definition)
  const variants = [item.term]
  for (const other of catalog) {
    if (other.category === item.category &&
        normalizeFrenchDefinition(other.definition) === definition &&
        normalizeSpelling(other.term) !== normalizeSpelling(item.term)) {
      variants.push(other.term)
    }
  }
  return variants
}

export function checkSpelling(
  item: WordGameEntry,
  value: string,
  catalog: readonly WordGameEntry[]
): { correct: boolean; acceptedTerm: string | null } {
  const answer = normalizeSpelling(value)
  if (!answer) return { correct: false, acceptedTerm: null }
  const candidates = acceptedSpellings(item, catalog)
  const matching = candidates.find(candidate => normalizeSpelling(candidate) === answer)
  // Pour les verbes seuls, « to run » et « run » sont tous les deux acceptés.
  if (matching) return { correct: true, acceptedTerm: matching }
  if (item.category === 'verb' && answer.startsWith('to ')) {
    const bare = answer.slice(3)
    const matchingBare = candidates.find(candidate => normalizeSpelling(candidate) === bare)
    if (matchingBare) return { correct: true, acceptedTerm: matchingBare }
  }
  return { correct: false, acceptedTerm: null }
}

/** Petit indice qui ne donne pas la réponse entière. */
export function spellingHint(term: string): string {
  const words = term.trim().split(/\s+/).filter(Boolean)
  return `Commence par « ${term.trim().charAt(0).toUpperCase()} » · ${words.length} mot${words.length > 1 ? 's' : ''} · ${term.trim().replace(/\s/g, '').length} caractères hors espaces`
}
