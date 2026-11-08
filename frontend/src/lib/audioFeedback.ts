import { useSyncExternalStore } from 'react'

/** Effets courts générés localement (Web Audio API). Aucun son ni requête externe. */
export type FeedbackKind = 'correct' | 'incorrect' | 'reward' | 'complete' | 'match'
export type AudioSettings = { enabled: boolean; volume: number }
export const AUDIO_SETTINGS_KEY = 'english-learning-audio-settings-v1'
const DEFAULT_SETTINGS: AudioSettings = { enabled: true, volume: 0.35 }
const listeners = new Set<() => void>()

export function parseAudioSettings(raw: string | null): AudioSettings {
  if (!raw) return DEFAULT_SETTINGS
  try {
    const value: unknown = JSON.parse(raw)
    if (typeof value !== 'object' || !value || Array.isArray(value)) return DEFAULT_SETTINGS
    const record = value as Record<string, unknown>
    if (typeof record.enabled !== 'boolean' || typeof record.volume !== 'number' || !Number.isFinite(record.volume)) return DEFAULT_SETTINGS
    return { enabled: record.enabled, volume: Math.max(0, Math.min(1, record.volume)) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function readSettings(): AudioSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  try { return parseAudioSettings(window.localStorage.getItem(AUDIO_SETTINGS_KEY)) }
  catch { return DEFAULT_SETTINGS }
}

let settings: AudioSettings = readSettings()
let audioContext: AudioContext | null = null
let lastPlayed = { kind: '' as string, at: 0 }

function notify() { listeners.forEach(listener => listener()) }
export function getAudioSettings(): AudioSettings { return settings }
export function setAudioSettings(partial: Partial<AudioSettings>) {
  const enabled = typeof partial.enabled === 'boolean' ? partial.enabled : settings.enabled
  const volume = typeof partial.volume === 'number' && Number.isFinite(partial.volume)
    ? Math.max(0, Math.min(1, partial.volume)) : settings.volume
  settings = { enabled, volume }
  try { window.localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings)) }
  catch { /* Les réglages restent utilisables dans cette session. */ }
  notify()
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', event => {
    if (event.key === AUDIO_SETTINGS_KEY || event.key === null) {
      settings = readSettings()
      notify()
    }
  })
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => { listeners.delete(callback) }
}
export function useAudioSettings() {
  return useSyncExternalStore(subscribe, getAudioSettings, () => DEFAULT_SETTINGS)
}

type Tone = { frequency: number; offset: number; duration: number; wave?: OscillatorType }
const SOUND_PATTERNS: Record<FeedbackKind, Tone[]> = {
  correct: [
    { frequency: 587.33, offset: 0, duration: 0.10 },
    { frequency: 783.99, offset: 0.09, duration: 0.18 },
  ],
  incorrect: [
    { frequency: 329.63, offset: 0, duration: 0.11, wave: 'triangle' },
    { frequency: 261.63, offset: 0.11, duration: 0.16, wave: 'triangle' },
  ],
  match: [
    { frequency: 659.26, offset: 0, duration: 0.095 },
    { frequency: 880, offset: 0.085, duration: 0.13 },
  ],
  complete: [
    { frequency: 523.25, offset: 0, duration: 0.12 },
    { frequency: 659.26, offset: 0.115, duration: 0.12 },
    { frequency: 783.99, offset: 0.23, duration: 0.24 },
  ],
  reward: [
    { frequency: 523.25, offset: 0, duration: 0.13 },
    { frequency: 659.26, offset: 0.12, duration: 0.13 },
    { frequency: 783.99, offset: 0.24, duration: 0.13 },
    { frequency: 1046.5, offset: 0.36, duration: 0.3 },
  ],
}

/** Doit être appelé en réaction à une action de l'utilisateur. Silencieux si le navigateur bloque l'audio. */
export function playFeedback(kind: FeedbackKind, options: { preview?: boolean; announce?: boolean } = {}): void {
  if (typeof window === 'undefined') return
  if (options.announce && (kind === 'reward' || kind === 'complete')) {
    window.dispatchEvent(new CustomEvent('english-learning-feedback', { detail: { kind } }))
  }
  if (!settings.enabled || settings.volume <= 0) return
  const now = Date.now()
  if (!options.preview && kind === lastPlayed.kind && now - lastPlayed.at < 130) return
  lastPlayed = { kind, at: now }
  try {
    const Context = window.AudioContext
    if (!Context) return
    const context = audioContext && audioContext.state !== 'closed'
      ? audioContext : new Context()
    audioContext = context
    if (context.state === 'suspended') void context.resume().catch(() => undefined)
    const start = context.currentTime + 0.012
    for (const tone of SOUND_PATTERNS[kind]) {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = tone.wave ?? 'sine'
      oscillator.frequency.setValueAtTime(tone.frequency, start + tone.offset)
      const from = start + tone.offset
      const until = from + tone.duration
      const peak = Math.min(0.12, settings.volume * 0.12)
      gain.gain.setValueAtTime(0.0001, from)
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), from + 0.018)
      gain.gain.exponentialRampToValueAtTime(0.0001, until)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(from)
      oscillator.stop(until + 0.02)
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
    }
  } catch { /* Une restriction audio ne doit jamais empêcher un exercice. */ }
}
