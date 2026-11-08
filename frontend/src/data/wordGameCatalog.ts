import { independentVerbs } from './independentVerbs'
import { grammarTopics, confusionGroups, phrasalVerbs } from './independentGrammar'
import { buildWordGameCatalog } from '../lib/wordGameEngine'

/** Catalogue exhaustif des entrées de la bibliothèque indépendante. */
export const wordGameCatalog = buildWordGameCatalog({
  verbs: independentVerbs,
  grammarTopics,
  confusionGroups,
  phrasalVerbs,
})
