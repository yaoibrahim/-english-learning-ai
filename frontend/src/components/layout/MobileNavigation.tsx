import AudioSettingsButton from '../audio/AudioSettingsButton'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

type NavigationItem = {
  to: string
  icon: string
  label: string
}

const bottomLinks: NavigationItem[] = [
  { to: '/', icon: '🎓', label: 'Parcours' },
  { to: '/reviews', icon: '🔁', label: 'Révisions' },
  { to: '/library', icon: '📚', label: 'Biblio' },
  { to: '/progress', icon: '📊', label: 'Progrès' },
]

const menuLinks: NavigationItem[] = [
  { to: '/', icon: '🎓', label: 'Mon parcours A0 → C2' },
  { to: '/reviews', icon: '🧠', label: 'Révisions intelligentes' },
  { to: '/listening', icon: '🎧', label: 'Listening' },
  { to: '/speaking', icon: '🎤', label: 'Speaking' },
  { to: '/writing', icon: '✍️', label: 'Writing' },
  { to: '/reading', icon: '📖', label: 'Reading' },
  { to: '/library', icon: '📚', label: 'Bibliothèque libre (sans cadenas)' },
  { to: '/library/word-game', icon: '🎲', label: 'Jeu de mots · 20 questions' },
  { to: '/library/spelling-game', icon: '✍️', label: 'Écrire 20 mots · Jeu libre' },
  { to: '/library/verbs', icon: '⏱️', label: 'Tous les verbes & temps' },
  { to: '/library/grammar', icon: '🧩', label: 'Grammaire & pronoms' },
  { to: '/library/confusions', icon: '🔠', label: 'Mots confondus' },
  { to: '/library/phrasal', icon: '🗣️', label: 'Phrasal verbs' },
  { to: '/library/practice', icon: '🎯', label: 'Exercices libres' },
  { to: '/courses/references', icon: '📑', label: 'Fiches de cours' },
  { to: '/courses', icon: '🗂️', label: 'Toutes les unités (filtres)' },
  { to: '/progress', icon: '📈', label: 'Ma progression' },
  { to: '/achievements', icon: '🏆', label: 'Récompenses' },
  { to: '/practice-history', icon: '🗓️', label: 'Calendrier de pratique' },
  { to: '/backup', icon: '💾', label: 'Sauvegarde locale' },
  { to: '/path', icon: '🌱', label: 'Ancien parcours A0' },
  { to: '/cefr', icon: '🌍', label: 'Ancien parcours A1–C2' },
  { to: '/lessons', icon: '📚', label: 'Mes leçons (anciennes)' },
  { to: '/levels', icon: '📊', label: 'Mes niveaux (anciens)' },
  { to: '/alphabet', icon: '🔤', label: 'Alphabet' },
  { to: '/numbers', icon: '🔢', label: 'Nombres' },
  { to: '/colors', icon: '🎨', label: 'Couleurs' },
  { to: '/calendar', icon: '📅', label: 'Jours et mois' },
  { to: '/family', icon: '👨‍👩‍👧‍👦', label: 'La famille' },
]

export default function MobileNavigation() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const moreRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    closeRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        moreRef.current?.focus()
      }

      // Garder le focus dans le menu quand il est ouvert.
      if (event.key === 'Tab' && menuRef.current) {
        const controls = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          )
        )
        if (controls.length === 0) return

        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function isCurrentTab(to: string) {
    if (to === '/') return pathname === '/'
    if (to === '/path') {
      return pathname === '/path' || pathname.startsWith('/a0/level/')
    }
    return pathname === to || pathname.startsWith(`${to}/`)
  }

  return (
    <>
      {/* En-tête mobile (l'ancienne Navbar reste visible sur ordinateur). */}
      <header className="tp27-mobile-header sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="min-w-0 font-extrabold tracking-tight text-indigo-700">
            English Learning AI
          </Link>
          <div className="flex items-center gap-2">
            <AudioSettingsButton />
            <Link
              to="/backup"
            aria-label="Sauvegarder ma progression"
            title="Sauvegarde"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
              💾
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation inférieure, boutons adaptés au toucher. */}
      <nav className="tp27-mobile-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-lg backdrop-blur lg:hidden" aria-label="Navigation mobile">
        <div className="mx-auto grid max-w-5xl grid-cols-5 gap-1 px-2 pt-2">
          {bottomLinks.map(item => {
            const active = isCurrentTab(item.to)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  active ? 'bg-indigo-50 font-bold text-indigo-700' : 'text-slate-600'
                }`}
              >
                <span aria-hidden="true" className="text-xl leading-none">{item.icon}</span>
                <span className="text-[10px] leading-tight sm:text-xs">{item.label}</span>
              </NavLink>
            )
          })}
          <button
            ref={moreRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              menuOpen ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'
            }`}
          >
            <span aria-hidden="true" className="text-xl leading-none">☰</span>
            <span className="text-[10px] leading-tight sm:text-xs">Plus</span>
          </button>
        </div>
      </nav>

      {/* Menu déroulant accessible pour les autres activités. */}
      {menuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu des activités"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 h-full w-full bg-slate-950/60"
          />
          <section
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tp27-more-title"
            className="tp27-mobile-sheet absolute inset-x-0 bottom-0 mx-auto max-h-[85dvh] max-w-xl overflow-y-auto rounded-t-3xl bg-white px-4 pt-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 id="tp27-more-title" className="text-xl font-bold text-slate-900">
                Toutes les activités
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-2xl"
              >
                ×
              </button>
            </div>
            <nav aria-label="Toutes les activités" className="grid grid-cols-2 gap-2 pb-4">
              {menuLinks.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-12 min-w-0 items-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                      isActive
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-800'
                        : 'border-slate-200 bg-slate-50 text-slate-800'
                    }`
                  }
                >
                  <span aria-hidden="true" className="text-xl">{item.icon}</span>
                  <span className="min-w-0 break-words">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </section>
        </div>
      )}
    </>
  )
}
