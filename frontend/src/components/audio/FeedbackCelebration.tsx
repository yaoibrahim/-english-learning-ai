import { useEffect, useState, type CSSProperties } from 'react'
import type { FeedbackKind } from '../../lib/audioFeedback'

const particles = Array.from({ length: 12 }, (_, index) => index)

/** Une célébration visuelle courte, sans intercepter les clics et respectant reduced-motion. */
export default function FeedbackCelebration() {
  const [event, setEvent] = useState<{ kind: FeedbackKind; key: number } | null>(null)
  useEffect(() => {
    const handler = (incoming: Event) => {
      const detail = (incoming as CustomEvent<{ kind: FeedbackKind }>).detail
      if (detail?.kind === 'reward' || detail?.kind === 'complete') {
        setEvent({ kind: detail.kind, key: Date.now() })
      }
    }
    window.addEventListener('english-learning-feedback', handler)
    return () => window.removeEventListener('english-learning-feedback', handler)
  }, [])
  useEffect(() => {
    if (!event) return
    const timeout = window.setTimeout(() => setEvent(null), 2250)
    return () => window.clearTimeout(timeout)
  }, [event])
  if (!event) return null
  return <div key={event.key} className="audio-celebration pointer-events-none fixed inset-0 z-[80] flex items-start justify-center" aria-live="polite" aria-atomic="true">
    <p className="audio-celebration-toast mt-20 rounded-2xl border border-amber-200 bg-white/95 px-6 py-4 text-center text-base font-extrabold text-slate-900 shadow-xl sm:text-xl">
      {event.kind === 'reward' ? '🏆 Bravo ! Récompense obtenue !' : '🎉 Leçon terminée !'}
    </p>
    <div className="audio-confetti" aria-hidden="true">
      {particles.map(index => <span key={index} style={{ left: `${14 + index * 6}%`, animationDelay: `${index * .03}s`, '--piece': index } as CSSProperties} />)}
    </div>
  </div>
}
