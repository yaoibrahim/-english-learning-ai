
export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  requiredLevels: number
}

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'Premier pas',
    description: 'Terminer ton premier mini-niveau A0.',
    icon: '🌱',
    requiredLevels: 1,
  },
  {
    id: 'beginner',
    title: 'Apprenti',
    description: 'Terminer 5 mini-niveaux A0.',
    icon: '🔥',
    requiredLevels: 5,
  },
  {
    id: 'persistent',
    title: 'Persévérant',
    description: 'Terminer 10 mini-niveaux A0.',
    icon: '🏆',
    requiredLevels: 10,
  },
  {
    id: 'expert',
    title: 'Expert débutant',
    description: 'Terminer 15 mini-niveaux A0.',
    icon: '💎',
    requiredLevels: 15,
  },
  {
    id: 'a0-master',
    title: 'Maître A0',
    description: 'Terminer les 20 mini-niveaux A0.',
    icon: '👑',
    requiredLevels: 20,
  },
]
