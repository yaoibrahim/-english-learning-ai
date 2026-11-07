import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const home = readFileSync(new URL('../src/pages/Home.tsx', import.meta.url), 'utf8')
const rewrites = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8')
const headers = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8')

test('les pages essentielles et la bibliothèque libre ont des routes', () => {
  const paths = [
    '/', '/path', '/cefr', '/courses', '/library', '/library/verbs',
    '/library/grammar', '/library/confusions', '/library/phrasal',
    '/library/practice', '/reviews', '/listening', '/speaking',
    '/writing', '/reading', '/backup',
  ]
  for (const path of paths) {
    assert.ok(app.includes(`path="${path}"`), `Route absente : ${path}`)
  }
  assert.ok(home.includes("useLearningStats()"))
  assert.ok(home.includes("useDailyGoal()"))
  assert.ok(home.includes("readHomePathProgress(window.localStorage)"))
})

test('le déploiement SPA permet d’ouvrir les routes directement et ajoute les en-têtes de sécurité', () => {
  assert.match(rewrites, /\/\*\s+\/index\.html\s+200/)
  assert.match(headers, /X-Content-Type-Options: nosniff/)
  assert.match(headers, /Content-Security-Policy:/)
  assert.match(headers, /X-Robots-Tag: noindex/)
})
