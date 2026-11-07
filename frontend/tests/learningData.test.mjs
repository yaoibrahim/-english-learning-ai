import test from 'node:test'
import assert from 'node:assert/strict'
import { lessons } from '../src/data/lessons.ts'
import { extraActivities } from '../src/data/activities.ts'
import { independentVerbs } from '../src/data/independentVerbs.ts'
import { grammarTopics, confusionGroups, phrasalVerbs } from '../src/data/independentGrammar.ts'
import { courseUnits } from '../src/data/courses.ts'
import { cefrUnits } from '../src/data/cefr.ts'
import { readingPassages } from '../src/data/reading.ts'

function unique(values) { return new Set(values).size === values.length }

test('les identifiants des leçons et activités ne se chevauchent pas', () => {
  const ids = [...lessons.map(item => item.id), ...extraActivities.map(item => item.id)]
  assert.ok(unique(ids))
  assert.ok(extraActivities.every(item => item.path.startsWith('/') && item.xp >= 0))
})

test('les catalogues libres sont accessibles et ne contiennent pas de doublons d’identifiants', () => {
  assert.ok(independentVerbs.length >= 300)
  assert.ok(unique(independentVerbs.map(item => item.base)))
  assert.ok(grammarTopics.length >= 15)
  assert.ok(unique(grammarTopics.map(item => item.id)))
  assert.ok(confusionGroups.length >= 15)
  assert.ok(unique(confusionGroups.map(item => item.id)))
  assert.ok(phrasalVerbs.length >= 20)
  assert.ok(unique(phrasalVerbs.map(item => item.id)))
})

test('les parcours contiennent des unités progressives avec identifiants uniques', () => {
  assert.ok(courseUnits.length >= 35)
  assert.ok(unique(courseUnits.map(item => item.id)))
  assert.ok(cefrUnits.length >= 18)
  assert.ok(unique(cefrUnits.map(item => item.id)))
})

test('les textes Reading comportent des réponses valides', () => {
  assert.ok(readingPassages.length >= 6)
  for (const passage of readingPassages) {
    assert.ok(passage.text.trim())
    for (const question of passage.questions) {
      assert.equal(question.options.length, 4)
      assert.ok(question.correctIndex >= 0 && question.correctIndex < 4)
      assert.ok(question.explanation.trim())
    }
  }
})

test('le résumé léger reflète les parcours et ignore les sauvegardes invalides', async () => {
  const { readHomePathProgress } = await import('../src/lib/homeProgress.ts')
  const storage = { getItem(key) {
    if (key === 'english-learning-cefr-v1') return JSON.stringify({ completedIds: ['a1-1', 'a1-2', 'a1-2'] })
    if (key === 'english-learning-courses-v1') return '{invalide'
    return null
  } }
  assert.deepEqual(readHomePathProgress(storage), { cefrCount: 2, coursesCount: 0 })
})
