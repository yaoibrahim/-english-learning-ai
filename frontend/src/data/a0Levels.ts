
export type A0Topic =
  | 'alphabet'
  | 'numbers'
  | 'colors'
  | 'calendar'
  | 'family'

export type A0Level = {
  id: number
  unit: number
  title: string
  description: string
  topics: A0Topic[]
  questionCount: number
  xp: number
}

export const a0Levels: A0Level[] = [
  {
    id: 1,
    unit: 1,
    title: "Je découvre l'anglais",
    description: 'Alphabet et nombres de 0 à 10',
    topics: ['alphabet', 'numbers'],
    questionCount: 10,
    xp: 20,
  },
  {
    id: 2,
    unit: 1,
    title: 'Je reconnais les lettres',
    description: 'Alphabet et couleurs',
    topics: ['alphabet', 'colors'],
    questionCount: 10,
    xp: 20,
  },
  {
    id: 3,
    unit: 1,
    title: 'Je sais compter',
    description: 'Nombres de 0 à 20 et alphabet',
    topics: ['numbers', 'alphabet'],
    questionCount: 10,
    xp: 20,
  },
  {
    id: 4,
    unit: 1,
    title: 'Je reconnais les couleurs',
    description: 'Couleurs et nombres',
    topics: ['colors', 'numbers'],
    questionCount: 10,
    xp: 20,
  },
  {
    id: 5,
    unit: 1,
    title: 'Défi des premières bases',
    description: 'Révision alphabet, nombres et couleurs',
    topics: ['alphabet', 'numbers', 'colors'],
    questionCount: 10,
    xp: 30,
  },
  {
    id: 6,
    unit: 2,
    title: 'Les jours de la semaine',
    description: 'Jours et nombres',
    topics: ['calendar', 'numbers'],
    questionCount: 10,
    xp: 25,
  },
  {
    id: 7,
    unit: 2,
    title: "Les mois de l'année",
    description: 'Mois et couleurs',
    topics: ['calendar', 'colors'],
    questionCount: 10,
    xp: 25,
  },
  {
    id: 8,
    unit: 2,
    title: 'Je parle de ma famille',
    description: 'Famille et nombres',
    topics: ['family', 'numbers'],
    questionCount: 10,
    xp: 25,
  },
  {
    id: 9,
    unit: 2,
    title: 'Je décris ma famille',
    description: 'Famille, couleurs et phrases',
    topics: ['family', 'colors'],
    questionCount: 10,
    xp: 25,
  },
  {
    id: 10,
    unit: 2,
    title: 'Défi de vocabulaire',
    description: 'Révision des cinq thèmes',
    topics: [
      'alphabet',
      'numbers',
      'colors',
      'calendar',
      'family',
    ],
    questionCount: 10,
    xp: 35,
  },
  {
    id: 11,
    unit: 3,
    title: 'Je construis une phrase',
    description: 'Famille et jours',
    topics: ['family', 'calendar'],
    questionCount: 10,
    xp: 30,
  },
  {
    id: 12,
    unit: 3,
    title: 'Je traduis des phrases',
    description: 'Couleurs et famille',
    topics: ['colors', 'family'],
    questionCount: 10,
    xp: 30,
  },
  {
    id: 13,
    unit: 3,
    title: 'Je parle du calendrier',
    description: 'Jours, mois et nombres',
    topics: ['calendar', 'numbers'],
    questionCount: 10,
    xp: 30,
  },
  {
    id: 14,
    unit: 3,
    title: 'Je décris des objets',
    description: 'Couleurs, nombres et phrases',
    topics: ['colors', 'numbers'],
    questionCount: 10,
    xp: 30,
  },
  {
    id: 15,
    unit: 3,
    title: 'Défi des premières phrases',
    description: 'Révision générale des phrases',
    topics: ['family', 'colors', 'calendar'],
    questionCount: 10,
    xp: 40,
  },
  {
    id: 16,
    unit: 4,
    title: 'Je révise le vocabulaire',
    description: 'Alphabet, nombres et couleurs',
    topics: ['alphabet', 'numbers', 'colors'],
    questionCount: 10,
    xp: 35,
  },
  {
    id: 17,
    unit: 4,
    title: 'Je révise les phrases',
    description: 'Famille, dates et couleurs',
    topics: ['family', 'calendar', 'colors'],
    questionCount: 10,
    xp: 35,
  },
  {
    id: 18,
    unit: 4,
    title: 'Je comprends et je réponds',
    description: 'Questions mélangées',
    topics: [
      'alphabet',
      'numbers',
      'colors',
      'calendar',
      'family',
    ],
    questionCount: 10,
    xp: 35,
  },
  {
    id: 19,
    unit: 4,
    title: 'Préparation au défi final',
    description: 'Révision générale A0',
    topics: [
      'alphabet',
      'numbers',
      'colors',
      'calendar',
      'family',
    ],
    questionCount: 10,
    xp: 40,
  },
  {
    id: 20,
    unit: 4,
    title: 'Grand défi A0',
    description: 'Évaluation finale du niveau A0',
    topics: [
      'alphabet',
      'numbers',
      'colors',
      'calendar',
      'family',
    ],
    questionCount: 10,
    xp: 50,
  },
]

export const a0Units = [
  {
    id: 1,
    title: 'Les bases',
    description: 'Découvrir les premiers mots anglais',
    icon: '🌱',
  },
  {
    id: 2,
    title: 'Les premiers mots',
    description: 'Comprendre le vocabulaire quotidien',
    icon: '📚',
  },
  {
    id: 3,
    title: 'Mes premières phrases',
    description: 'Apprendre à construire des phrases',
    icon: '💬',
  },
  {
    id: 4,
    title: 'Consolidation A0',
    description: 'Réviser et valider ses connaissances',
    icon: '🏆',
  },
]

export const A0_PASS_PERCENTAGE = 80

export function getA0Level(id: number) {
  return a0Levels.find(level => level.id === id)
}
