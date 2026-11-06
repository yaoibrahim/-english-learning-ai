
import { NavLink } from 'react-router-dom'

const links = [
  { path: '/', label: 'Accueil', icon: '🏠' },
  { path: '/lessons', label: 'Leçons', icon: '📚' },
  { path: '/levels', label: 'Niveaux', icon: '🎯' },
  { path: '/progress', label: 'Progression', icon: '📊' },
]

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <span className="text-lg font-bold text-blue-600">
          English Learning AI
        </span>

        <div className="flex flex-wrap gap-2">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
