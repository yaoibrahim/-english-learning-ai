
export type Level = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type Lesson = {
  id: number
  title: string
  description: string
  level: Level
  category: string
  xp: number
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Les premiers mots',
    description: 'Apprendre les mots essentiels en anglais.',
    level: 'A0',
    category: 'Vocabulaire',
    xp: 20,
  },
  {
    id: 2,
    title: 'Les verbes essentiels',
    description: 'Learn, speak, eat, drink, go, have...',
    level: 'A0',
    category: 'Verbes',
    xp: 30,
  },
  {
    id: 3,
    title: 'Construire une phrase',
    description: 'Apprendre à construire des phrases simples.',
    level: 'A0',
    category: 'Grammaire',
    xp: 40,
  },
  {
    id: 4,
    title: 'Se présenter',
    description: 'Dire son nom, son âge et sa profession.',
    level: 'A1',
    category: 'Expression',
    xp: 40,
  },
  {
    id: 5,
    title: 'Le présent simple',
    description: 'Comprendre les phrases au présent.',
    level: 'A1',
    category: 'Grammaire',
    xp: 50,
  },
  {
    id: 6,
    title: 'Parler du passé',
    description: 'Utiliser le prétérit et les verbes irréguliers.',
    level: 'A2',
    category: 'Conjugaison',
    xp: 60,
  },
]
