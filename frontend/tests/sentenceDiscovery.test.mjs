import test from 'node:test'
import assert from 'node:assert/strict'
import { courseUnits } from '../src/data/courses.ts'
import { buildSentenceSteps, buildSentenceTasks, isTermInPhrase, normalizeSentence } from '../src/lib/sentenceDiscovery.ts'

test('la découverte progresse phrase par phrase dans les 35 unités', () => {
  assert.equal(courseUnits.length, 35)
  for (const unit of courseUnits) {
    const steps = buildSentenceSteps(unit)
    assert.equal(steps.length, unit.lessons.length + unit.vocabulary.length)
    assert.equal(steps.filter(step => step.kind === 'notion').length, unit.lessons.length)
    assert.equal(steps.filter(step => step.kind === 'vocabulary').length, unit.vocabulary.length)
    assert.ok(steps.every(step => step.english.trim() && step.french.trim() && step.explanation.trim()))
    const introduced = steps.filter(step => step.target)
    assert.ok(introduced.every(step => isTermInPhrase(step.english, step.target.english)))
  }
})

test('chaque unité propose des exercices de vocabulaire et de construction de phrases', () => {
  for (const unit of courseUnits) {
    const tasks = buildSentenceTasks(unit)
    assert.ok(tasks.filter(task => task.kind === 'recognition').length >= 3, unit.id)
    assert.ok(tasks.some(task => task.kind === 'construction'), unit.id)
    for (const task of tasks) {
      if (task.kind === 'recognition') {
        assert.ok(task.options.includes(task.word.french), task.id)
        assert.equal(new Set(task.options).size, task.options.length, task.id)
        assert.ok(task.options.length >= 3, task.id)
      } else {
        assert.ok(task.french && task.english, task.id)
        assert.equal(new Set(task.shuffledTokens.map(token => token.id)).size, task.shuffledTokens.length)
        assert.equal(normalizeSentence([...task.shuffledTokens].sort((a,b) => a.id - b.id).map(token => token.text).join(' ')), normalizeSentence(task.english))
      }
    }
  }
})

test('les mots sont réutilisés dans les unités suivantes', () => {
  const first = buildSentenceSteps(courseUnits[1])
  const next = courseUnits.slice(2).flatMap(unit => buildSentenceSteps(unit))
  assert.ok(first.some(step => step.target?.english === 'book'))
  assert.ok(next.some(step => step.recycled.some(word => word.english === 'book')))
  assert.equal(isTermInPhrase('The cat is small.', 'at'), false)
  assert.equal(isTermInPhrase('The cat is small.', 'cat'), true)
})
