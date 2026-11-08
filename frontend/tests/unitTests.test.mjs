import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { courseUnits } from '../src/data/courses.ts'
import { wordExamples, unitComprehension } from '../src/data/unitContent.ts'
import { getUnitTests, getUnitTestTotal, frenchConflict } from '../src/lib/unitTests.ts'

const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

test('chaque mot de vocabulaire a une phrase d’exemple qui le contient', () => {
  const keys = new Set()
  for (const unit of courseUnits) for (const word of unit.vocabulary) {
    const key = word.english.toLowerCase()
    keys.add(key)
    const example = wordExamples[key]
    assert.ok(example, `Pas de phrase pour « ${word.english} »`)
    assert.match(example[0].toLowerCase(), new RegExp(`(^|[^a-z-])${escape(key)}([^a-z-]|$)`), `« ${word.english} » absent de : ${example[0]}`)
    assert.ok(example[1].trim().length > 3)
  }
  for (const key of Object.keys(wordExamples)) assert.ok(keys.has(key), `Phrase orpheline : ${key}`)
})

test('chaque unité a 3 questions de compréhension à 4 réponses distinctes', () => {
  for (const unit of courseUnits) {
    const rows = unitComprehension[unit.id]
    assert.equal(rows?.length, 3, `Compréhension manquante : ${unit.id}`)
    for (const row of rows) {
      assert.equal(row.length, 5)
      assert.equal(new Set(row.slice(1)).size, 4, `Réponses en double : ${unit.id} / ${row[0]}`)
    }
  }
})

test('les trois tests de fin d’unité sont complets et cohérents', () => {
  for (const unit of courseUnits) {
    const tests = getUnitTests(unit.id)
    assert.ok(tests, unit.id)
    assert.ok(tests.qcm.length >= 5, `${unit.id} : QCM trop court`)
    assert.ok(tests.order.length >= 4, `${unit.id} : pas assez de phrases à remettre en ordre`)
    assert.equal(tests.comprehension.questions.length, 3)
    assert.equal(tests.total, tests.qcm.length + tests.order.length + 3)
    assert.equal(getUnitTestTotal(unit.id), tests.total)
    for (const q of [...tests.qcm, ...tests.comprehension.questions]) {
      assert.equal(q.options.length, 4, `${q.id} : 4 réponses attendues`)
      assert.equal(new Set(q.options).size, 4, `${q.id} : réponses en double`)
      assert.ok(q.options.includes(q.answer), `${q.id} : bonne réponse absente`)
    }
    const ids = [...tests.qcm, ...tests.comprehension.questions, ...tests.order].map(q => q.id)
    assert.equal(new Set(ids).size, ids.length, `${unit.id} : identifiants en double`)
    for (const order of tests.order) {
      assert.ok(order.words.length >= 3, `${order.id} : phrase trop courte`)
      assert.ok(order.words.every(word => !/[.,!?;:]/.test(word)))
    }
  }
  assert.equal(getUnitTests('inconnue'), null)
})

test('les traductions qui se recoupent ne sont jamais proposées ensemble', () => {
  assert.ok(frenchConflict('qui/que (chose)', 'que'))
  assert.ok(frenchConflict('a dit', 'a dit à'))
  assert.ok(!frenchConflict('cuisine', 'si'))
  for (const unit of courseUnits) {
    for (const q of getUnitTests(unit.id).qcm.filter(item => item.prompt.startsWith('Que signifie'))) {
      for (let i = 0; i < q.options.length; i++) for (let j = i + 1; j < q.options.length; j++) {
        assert.ok(!frenchConflict(q.options[i], q.options[j]), `${q.id} : « ${q.options[i]} » ~ « ${q.options[j]} »`)
      }
    }
  }
})

test('les mots des premières unités reviennent dans les unités suivantes', () => {
  const seenAgain = new Map()
  courseUnits.forEach(unit => {
    for (const word of getUnitTests(unit.id).recycledWords) {
      assert.notEqual(word.fromUnit, unit.id)
      assert.ok(courseUnits.findIndex(u => u.id === word.fromUnit) < courseUnits.findIndex(u => u.id === unit.id), 'un mot ne peut venir que d’une unité précédente')
      seenAgain.set(word.english, (seenAgain.get(word.english) || 0) + 1)
    }
  })
  // tout mot introduit avant la dernière unité « tardive » est revu au moins une fois
  courseUnits.slice(0, 30).forEach(unit => {
    for (const word of unit.vocabulary) assert.ok(seenAgain.get(word.english), `« ${word.english} » (${unit.id}) n’est jamais revu`)
  })
  // le niveau débutant revient dans les niveaux suivants
  const a0Words = new Set(courseUnits.filter(u => u.level === 'A0').flatMap(u => u.vocabulary.map(w => w.english)))
  const afterA0 = courseUnits.filter(u => u.level !== 'A0').flatMap(u => getUnitTests(u.id).recycledWords.map(w => w.english))
  for (const word of a0Words) assert.ok(afterA0.includes(word), `Mot A0 « ${word} » absent des unités suivantes`)
})

test('la page d’unité enchaîne leçon, exercices et test final ; l’accueil affiche le parcours', () => {
  const page = readFileSync(new URL('../src/pages/CourseUnit.tsx', import.meta.url), 'utf8')
  const home = readFileSync(new URL('../src/pages/Home.tsx', import.meta.url), 'utf8')
  const unitTests = readFileSync(new URL('../src/components/courses/UnitTests.tsx', import.meta.url), 'utf8')
  assert.ok(page.includes('<UnitTests'))
  assert.ok(page.includes('<CourseQuiz'))
  assert.ok(home.includes('<LevelPath />'))
  for (const label of ['QCM', 'Mets les mots en place', 'Test de compréhension']) assert.ok(unitTests.includes(label), label)
})
