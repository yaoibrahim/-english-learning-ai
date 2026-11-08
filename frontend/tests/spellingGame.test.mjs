import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { independentVerbs } from '../src/data/independentVerbs.ts'
import { grammarTopics, confusionGroups, phrasalVerbs } from '../src/data/independentGrammar.ts'
import {
  buildWordGameCatalog, selectWordGame, appendWordGameHistory,
  beginWordGame, advanceWordGame,
} from '../src/lib/wordGameEngine.ts'
import {
  checkSpelling, normalizeSpelling, spellingHint,
  SPELLING_GAME_HISTORY_KEY, SPELLING_GAME_STATS_KEY,
} from '../src/lib/spellingGame.ts'

const catalog = buildWordGameCatalog({
  verbs: independentVerbs, grammarTopics, confusionGroups, phrasalVerbs,
})
const verb = catalog.find(item => item.term === 'go' && item.category === 'verb')
const pronoun = catalog.find(item => item.term === 'I' && item.category === 'grammar')

function item(term, definition, category = 'verb') {
  return { id: `test:${term}`, term, definition, category, theme: 'test' }
}

test('orthographe : casse, espaces et apostrophes typographiques tolérés, apostrophes significatives conservées', () => {
  assert.equal(normalizeSpelling('  THEY’RE   '), "they're")
  assert.equal(normalizeSpelling("they're"), "they're")
  assert.equal(normalizeSpelling('look-after'), 'look-after')
  assert.equal(normalizeSpelling('look after'), 'look after')
  assert.notEqual(normalizeSpelling("it's"), normalizeSpelling('its'))
})

test('orthographe : les fautes de lettres ne sont pas acceptées', () => {
  assert.equal(checkSpelling(item('their', 'leur'), 'there', []).correct, false)
  assert.equal(checkSpelling(item('beautiful', 'beau'), 'beautifull', []).correct, false)
  assert.equal(checkSpelling(item('beautiful', 'beau'), '', []).correct, false)
  assert.equal(checkSpelling(item("it's", 'c’est', 'confusion'), 'its', []).correct, false)
  assert.equal(checkSpelling(item("they're", 'ils sont', 'confusion'), 'theyre', []).correct, false)
})

test('orthographe : mots exacts, casse différente et auxiliaire to pour les verbes', () => {
  assert.ok(verb)
  assert.ok(pronoun)
  assert.equal(checkSpelling(verb, 'GO', catalog).correct, true)
  assert.equal(checkSpelling(verb, 'To go', catalog).correct, true)
  assert.equal(checkSpelling(pronoun, 'i', catalog).correct, true)
  assert.equal(checkSpelling(pronoun, 'to I', catalog).correct, false)
})

test('orthographe : traductions équivalentes présentes dans le même catalogue et la même catégorie', () => {
  const first = item('speak', 'parler')
  const second = item('talk', 'parler')
  const otherCategory = item('talking', 'parler', 'grammar')
  assert.equal(checkSpelling(first, 'talk', [first, second]).correct, true)
  assert.equal(checkSpelling(first, 'talking', [first, otherCategory]).correct, false)
})

test('orthographe : indice limité à la première lettre et à la longueur', () => {
  const hint = spellingHint('look after')
  assert.match(hint, /L/)
  assert.match(hint, /2 mots/)
  assert.doesNotMatch(hint, /look after/i)
})

test('orthographe : tirage de 20 termes, tirage suivant différent', () => {
  const first = selectWordGame(catalog, { sessions: [] })
  assert.equal(first.length, 20)
  assert.equal(new Set(first.map(entry => entry.term.toLowerCase())).size, 20)
  const history = appendWordGameHistory({ sessions: [] }, { id: 'spelling-1', words: first.map(entry => entry.id) })
  const next = selectWordGame(catalog, history)
  assert.equal(next.length, 20)
  assert.equal(next.filter(entry => first.some(previous => previous.term === entry.term)).length, 0)
})

test('orthographe : une mauvaise réponse revient en fin de file jusqu’à validation', () => {
  let state = beginWordGame(['a', 'b', 'c'])
  state = advanceWordGame(state, false)
  assert.deepEqual(state.pending, ['b', 'c', 'a'])
  assert.equal(state.errors, 1)
  assert.equal(state.validated.length, 0)
  state = advanceWordGame(state, true)
  state = advanceWordGame(state, true)
  assert.deepEqual(state.pending, ['a'])
  state = advanceWordGame(state, true)
  assert.equal(state.pending.length, 0)
  assert.equal(state.validated.length, 3)
})

test('orthographe : les données locales ne sont pas confondues avec le QCM', () => {
  assert.match(SPELLING_GAME_HISTORY_KEY, /spelling-game/)
  assert.match(SPELLING_GAME_STATS_KEY, /spelling-game/)
})

test('orthographe : route React, carte Bibliothèque, menu mobile et renvoi du QCM', async () => {
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
  const library = await readFile(new URL('../src/pages/LibraryHome.tsx', import.meta.url), 'utf8')
  const mobile = await readFile(new URL('../src/components/layout/MobileNavigation.tsx', import.meta.url), 'utf8')
  const qcm = await readFile(new URL('../src/pages/LibraryWordGame.tsx', import.meta.url), 'utf8')
  assert.match(app, /path="\/library\/spelling-game"/)
  assert.match(library, /\/library\/spelling-game/)
  assert.match(mobile, /\/library\/spelling-game/)
  assert.match(qcm, /\/library\/spelling-game/)
})
