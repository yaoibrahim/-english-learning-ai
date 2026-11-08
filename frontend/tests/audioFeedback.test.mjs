import assert from 'node:assert/strict'
import test from 'node:test'
import { getAudioSettings, parseAudioSettings, playFeedback, setAudioSettings } from '../src/lib/audioFeedback.ts'

test('réglages sûrs, bornés et compatibles avec localStorage', () => {
  assert.deepEqual(parseAudioSettings(null), { enabled: true, volume: 0.35 })
  assert.deepEqual(parseAudioSettings('bad json'), { enabled: true, volume: 0.35 })
  assert.deepEqual(parseAudioSettings('{"enabled":false,"volume":2.4}'), { enabled: false, volume: 1 })
  assert.deepEqual(parseAudioSettings('{"enabled":true,"volume":-9}'), { enabled: true, volume: 0 })
  assert.deepEqual(parseAudioSettings('{"enabled":"no","volume":0.2}'), { enabled: true, volume: 0.35 })
})

test('bonne réponse, erreur, récompense : sons locaux et mode silencieux', () => {
  const previous = globalThis.window
  let oscillators = 0
  let announcements = 0
  const storage = new Map()
  const gainParam = { setValueAtTime() {}, exponentialRampToValueAtTime() {} }
  class FakeAudioContext {
    state = 'running'
    currentTime = 1
    destination = {}
    createGain() { return { gain: gainParam, connect() {}, disconnect() {} } }
    createOscillator() {
      oscillators++
      return { frequency: { setValueAtTime() {} }, connect() {}, start() {}, stop() {}, disconnect() {}, onended: null }
    }
  }
  globalThis.window = {
    AudioContext: FakeAudioContext,
    localStorage: { setItem(key, value) { storage.set(key, value) } },
    dispatchEvent() { announcements++ },
  }
  try {
    setAudioSettings({ enabled: true, volume: 0.35 })
    playFeedback('correct', { preview: true })
    assert.equal(oscillators, 2)
    playFeedback('incorrect', { preview: true })
    assert.equal(oscillators, 4)
    playFeedback('reward', { preview: true, announce: true })
    assert.equal(oscillators, 8)
    assert.equal(announcements, 1)
    setAudioSettings({ enabled: false })
    playFeedback('incorrect', { preview: true })
    assert.equal(oscillators, 8, 'aucun son quand le mode silencieux est actif')
    playFeedback('reward', { preview: true, announce: true })
    assert.equal(announcements, 2, 'la célébration visuelle reste active même en mode silencieux')
    assert.equal(getAudioSettings().enabled, false)
    assert.match(storage.get('english-learning-audio-settings-v1'), /"enabled":false/)
  } finally {
    globalThis.window = previous
  }
})
