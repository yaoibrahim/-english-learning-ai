import { useEffect, useRef, useState } from 'react'
import { playFeedback, setAudioSettings, useAudioSettings } from '../../lib/audioFeedback'

/** Accessible depuis l'en-tête sur PC comme sur téléphone. */
export default function AudioSettingsButton() {
  const settings = useAudioSettings()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const onClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onClick)
    return () => { window.removeEventListener('keydown', onKeyDown); window.removeEventListener('pointerdown', onClick) }
  }, [open])
  return <div ref={rootRef} className="relative shrink-0">
    <button type="button" onClick={() => setOpen(value => !value)}
      aria-label={settings.enabled ? 'Paramètres audio, son activé' : 'Paramètres audio, son désactivé'}
      aria-expanded={open} title="Régler les sons"
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
      {settings.enabled && settings.volume > 0 ? '🔊' : '🔇'}
    </button>
    {open && <section role="group" aria-label="Réglages des effets sonores"
      className="absolute right-0 top-full z-[70] mt-2 w-[min(19rem,calc(100vw-2rem))] space-y-4 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-extrabold">🎵 Sons du jeu</h2>
        <button type="button" onClick={() => setOpen(false)} aria-label="Fermer les réglages audio" className="rounded-lg px-2 py-1 font-bold hover:bg-slate-100">✕</button>
      </div>
      <label className="flex items-center justify-between gap-3 text-sm font-semibold">
        Activer les effets sonores
        <input type="checkbox" checked={settings.enabled}
          onChange={event => setAudioSettings({ enabled: event.target.checked })}
          className="h-5 w-5 accent-indigo-700" />
      </label>
      <label htmlFor="feedback-volume" className="block text-sm font-semibold">Volume : {Math.round(settings.volume * 100)} %</label>
      <input id="feedback-volume" type="range" min="0" max="100" step="5" disabled={!settings.enabled}
        value={Math.round(settings.volume * 100)}
        onChange={event => setAudioSettings({ volume: Number(event.target.value) / 100 })}
        className="w-full accent-indigo-700" />
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => playFeedback('correct', { preview: true })} disabled={!settings.enabled || settings.volume === 0}
          className="min-h-11 rounded-xl bg-emerald-100 px-3 text-sm font-bold text-emerald-900 disabled:opacity-50">✓ Tester succès</button>
        <button type="button" onClick={() => playFeedback('reward', { preview: true })} disabled={!settings.enabled || settings.volume === 0}
          className="min-h-11 rounded-xl bg-amber-100 px-3 text-sm font-bold text-amber-900 disabled:opacity-50">🏆 Tester récompense</button>
      </div>
      <p className="text-xs leading-relaxed text-slate-600">Les sons ne se déclenchent qu'après une interaction. Le réglage ne coupe pas la voix de lecture des phrases anglaises.</p>
    </section>}
  </div>
}
