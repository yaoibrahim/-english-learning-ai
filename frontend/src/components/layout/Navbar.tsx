import AudioSettingsButton from '../audio/AudioSettingsButton'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { path: '/', label: 'Parcours', icon: '🎓' },
  { path: '/reviews', label: 'Révisions', icon: '🔁' },
  { path: '/library', label: 'Bibliothèque', icon: '📚' },
  { path: '/progress', label: 'Progression', icon: '📊' },
]

export default function Navbar() {
  return <nav className="border-b border-slate-200 bg-white" aria-label="Navigation principale">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
      <Link to="/" className="text-sm font-extrabold tracking-tight text-indigo-700">English Learning AI</Link>
      <div className="flex flex-wrap items-center gap-1">
        {links.map(link => <NavLink key={link.path} to={link.path} end={link.path === '/'} className={({ isActive }) => `rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{link.icon} {link.label}</NavLink>)}
        <AudioSettingsButton />
        <Link to="/backup" aria-label="Sauvegarder ma progression" title="Sauvegarde" className="rounded-lg p-2 text-sm hover:bg-slate-100">💾</Link>
      </div>
    </div>
  </nav>
}
