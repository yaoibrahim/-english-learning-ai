import test from 'node:test'
import assert from 'node:assert/strict'
import {
  isProgressKey,
  validateProgressBackup,
  parseProgressBackup,
  compareProgressBackup,
  restoreProgressBackup,
} from '../src/lib/progressBackup.ts'

const valid = {
  app: 'english-learning-ai',
  version: 1,
  exportedAt: '2026-11-07T17:00:00.000Z',
  entries: {
    'english-learning-progress': JSON.stringify({ completedLessons: [1000], totalXP: 30 }),
    'english-learning-daily-goal': JSON.stringify({ goal: 3, history: {} }),
  },
}

function createStorage(initial = {}) {
  const data = new Map(Object.entries(initial))
  return {
    get length() { return data.size },
    key(i) { return [...data.keys()][i] ?? null },
    getItem(k) { return data.has(k) ? data.get(k) : null },
    setItem(k, v) { data.set(k, String(v)) },
    removeItem(k) { data.delete(k) },
  }
}

test('sélectionne uniquement les clés autorisées et rejette les secrets', () => {
  assert.equal(isProgressKey('english-learning-progress'), true)
  assert.equal(isProgressKey('english-learning-courses-v1'), true)
  assert.equal(isProgressKey('english-learning-auth-token'), false)
  assert.equal(isProgressKey('english-learning-api_key'), false)
  assert.equal(isProgressKey('unrelated-data'), false)
})

test('valide les sauvegardes correctes et refuse les formats étrangers', () => {
  const parsed = validateProgressBackup(valid)
  assert.equal(Object.keys(parsed.entries).length, 2)
  assert.equal(parseProgressBackup(JSON.stringify(valid)).app, valid.app)
  assert.throws(() => validateProgressBackup({ ...valid, version: 999 }), /Fichier invalide/)
  assert.throws(() => validateProgressBackup({ ...valid, entries: { 'other-app': 'xyz' } }), /non autorisée/)
  assert.throws(() => parseProgressBackup('pas du JSON'), /JSON valide/)
  assert.throws(() => parseProgressBackup('x'.repeat(6 * 1024 * 1024)), /trop volumineux/)
})

test('restaure uniquement les clés locales de l’application', () => {
  globalThis.window = {
    localStorage: createStorage({
      'english-learning-progress': '{}',
      'english-learning-old': 'ancien',
      'unrelated-data': 'à conserver',
    }),
  }
  const before = compareProgressBackup(valid)
  assert.equal(before.removed, 1)
  assert.equal(before.added, 1)
  assert.equal(restoreProgressBackup(valid), 2)
  assert.equal(window.localStorage.getItem('english-learning-old'), null)
  assert.equal(window.localStorage.getItem('english-learning-progress'), valid.entries['english-learning-progress'])
  assert.equal(window.localStorage.getItem('unrelated-data'), 'à conserver')
  delete globalThis.window
})

test('revient à l’ancien état si le stockage échoue pendant la restauration', () => {
  const storage = createStorage({ 'english-learning-progress': 'avant' })
  const realSet = storage.setItem.bind(storage)
  storage.setItem = (key, value) => {
    if (value === 'bloquer') throw new Error('QuotaExceededError')
    realSet(key, value)
  }
  globalThis.window = { localStorage: storage }
  const bad = { ...valid, entries: { 'english-learning-progress': 'bloquer' } }
  assert.throws(() => restoreProgressBackup(bad), /Restauration impossible/)
  assert.equal(storage.getItem('english-learning-progress'), 'avant')
  delete globalThis.window
})
