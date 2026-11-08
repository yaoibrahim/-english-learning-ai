import test from 'node:test'
import assert from 'node:assert/strict'
import { independentVerbs } from '../src/data/independentVerbs.ts'
import { grammarTopics, confusionGroups, phrasalVerbs } from '../src/data/independentGrammar.ts'
import {
  WORD_GAME_SIZE, buildWordGameCatalog, selectWordGame, makeDefinitionOptions,
  advanceWordGame, beginWordGame, appendWordGameHistory, parseWordGameHistory,
} from '../src/lib/wordGameEngine.ts'

const catalog = buildWordGameCatalog({ verbs: independentVerbs, grammarTopics, confusionGroups, phrasalVerbs })
const keys = new Set(catalog.map(x => x.id))

test('catalogue du jeu : tous les verbes et toutes les notions libres sont inclus', () => {
  const expected = independentVerbs.length + grammarTopics.reduce((n,t)=>n+t.entries.length,0)
    + confusionGroups.reduce((n,t)=>n+t.entries.length,0) + phrasalVerbs.length
  assert.equal(catalog.length, expected)
  assert.equal(keys.size, catalog.length)
  assert.ok(catalog.every(item => item.term && item.definition))
})

test('chaque tirage comporte 20 termes distincts, issus des quatre catégories', () => {
  const game = selectWordGame(catalog, {sessions: []})
  assert.equal(game.length, WORD_GAME_SIZE)
  assert.equal(new Set(game.map(x=>x.id)).size, WORD_GAME_SIZE)
  assert.equal(new Set(game.map(x=>x.term.toLowerCase())).size, WORD_GAME_SIZE)
  assert.deepEqual(new Set(game.map(x=>x.category)), new Set(['verb','grammar','confusion','phrasal']))
})

test('le deuxième tirage évite les vingt mots de la partie précédente', () => {
  const first = selectWordGame(catalog, {sessions: []})
  const history = appendWordGameHistory({sessions: []}, {id: 'first', words: first.map(x=>x.id)})
  const second = selectWordGame(catalog, history)
  assert.equal(second.length, WORD_GAME_SIZE)
  assert.equal(second.filter(item => first.some(previous=>previous.term.toLowerCase()===item.term.toLowerCase())).length, 0)
})

test('les choix contiennent toujours la bonne définition et trois distracteurs distincts', () => {
  for (const item of selectWordGame(catalog, {sessions: []})) {
    const options = makeDefinitionOptions(item, catalog)
    assert.equal(options.length, 4)
    assert.equal(new Set(options).size, 4)
    assert.equal(options.filter(value=>value===item.definition).length,1)
  }
})

test('une erreur reste dans le jeu, après les autres questions et sans valider le mot', () => {
  const state = beginWordGame(['a','b','c'])
  const afterWrong = advanceWordGame(state, false)
  assert.deepEqual(afterWrong.pending, ['b','c','a'])
  assert.deepEqual(afterWrong.validated, [])
  assert.equal(afterWrong.missed.a,1)
  const afterCorrectB = advanceWordGame(afterWrong, true)
  const afterCorrectC = advanceWordGame(afterCorrectB, true)
  assert.deepEqual(afterCorrectC.pending, ['a'])
  const afterRetry = advanceWordGame(afterCorrectC, true)
  assert.deepEqual(afterRetry.pending, [])
  assert.equal(afterRetry.validated.length, 3)
  assert.equal(afterRetry.errors, 1)
  assert.equal(afterRetry.attempts, 4)
})

test('un mot raté deux fois n’est validé qu’après une réponse correcte', () => {
  let state = beginWordGame(['a'])
  state = advanceWordGame(state, false)
  state = advanceWordGame(state, false)
  assert.deepEqual(state.validated, [])
  assert.equal(state.missed.a,2)
  state = advanceWordGame(state, true)
  assert.deepEqual(state.validated, ['a'])
  assert.equal(state.errors,2)
})

test('historique corrompu ignoré, limite à huit parties, pas de doublons d’identifiants de partie', () => {
  assert.deepEqual(parseWordGameHistory('{not-valid'), {sessions: []})
  assert.deepEqual(parseWordGameHistory('{"sessions":42}'), {sessions: []})
  let history = {sessions: []}
  for(let i=0;i<14;i++) history=appendWordGameHistory(history,{id:`s${i}`,words:['a','b']})
  assert.equal(history.sessions.length,8)
  history=appendWordGameHistory(history,{id:'s13',words:['c']})
  assert.equal(history.sessions.length,8)
  assert.deepEqual(history.sessions.at(-1).words,['c'])
})

test('une partie de vingt mots ne se termine que lorsque les vingt ont été correctement trouvés', () => {
  const ids = Array.from({length: 20}, (_,i) => `word-${i}`)
  let state = beginWordGame(ids)
  state = advanceWordGame(state, false)
  assert.equal(state.validated.length, 0)
  for(let i=0;i<20;i++) state = advanceWordGame(state, true)
  assert.equal(state.pending.length, 0)
  assert.equal(state.validated.length, 20)
  assert.equal(new Set(state.validated).size, 20)
  assert.equal(state.errors, 1)
  assert.equal(state.attempts, 21)
})

test('la nouvelle page est accessible depuis la Bibliothèque et la navigation', async () => {
  const {readFile} = await import('node:fs/promises')
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
  const library = await readFile(new URL('../src/pages/LibraryHome.tsx', import.meta.url), 'utf8')
  const mobile = await readFile(new URL('../src/components/layout/MobileNavigation.tsx', import.meta.url), 'utf8')
  assert.match(app, /path="\/library\/word-game"/)
  assert.match(library, /\/library\/word-game/)
  assert.match(mobile, /\/library\/word-game/)
})
