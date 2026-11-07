
export const levelOrder = [
  'A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2',
] as const

export type EnglishLevel = (typeof levelOrder)[number]

export type LevelInfo = {
  id: EnglishLevel
  title: string
  description: string
  objective: string
}

export const englishLevels: LevelInfo[] = [
  {
    id: 'A0',
    title: 'Débutant absolu',
    description: "Découvrir les bases de l'anglais.",
    objective: 'Salutations, pronoms et phrases simples.',
  },
  {
    id: 'A1',
    title: 'Débutant',
    description: 'Communiquer dans des situations simples.',
    objective: 'Se présenter, parler de sa routine et poser des questions.',
  },
  {
    id: 'A2',
    title: 'Élémentaire',
    description: 'Échanger sur des sujets familiers.',
    objective: 'Décrire son quotidien, son passé et ses projets.',
  },
  {
    id: 'B1',
    title: 'Intermédiaire',
    description: 'Devenir autonome dans les conversations courantes.',
    objective: 'Raconter, expliquer et exprimer son opinion.',
  },
  {
    id: 'B2',
    title: 'Intermédiaire avancé',
    description: 'Communiquer avec davantage de fluidité.',
    objective: 'Argumenter et comprendre des sujets complexes.',
  },
  {
    id: 'C1',
    title: 'Avancé',
    description: "Utiliser l'anglais dans des contextes exigeants.",
    objective: 'Comprendre les nuances et produire des discours structurés.',
  },
  {
    id: 'C2',
    title: 'Maîtrise',
    description: "Développer une maîtrise très avancée de l'anglais.",
    objective: 'Communiquer avec précision dans presque toutes les situations.',
  },
]
