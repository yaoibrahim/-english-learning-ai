
export type ConjugationQuestion = {
  id: number
  lessonId: number
  sentence: string
  verb: string
  answer: string
  translation: string
  explanation: string
}

export const conjugationQuestions: ConjugationQuestion[] = [
  {
    id: 1,
    lessonId: 5,
    sentence: 'She ___ English every day.',
    verb: 'speak',
    answer: 'speaks',
    translation: 'Elle parle anglais tous les jours.',
    explanation:
      'Avec SHE, on ajoute généralement -S au verbe au présent simple.',
  },
  {
    id: 2,
    lessonId: 5,
    sentence: 'They ___ to school.',
    verb: 'go',
    answer: 'go',
    translation: "Ils vont à l'école.",
    explanation:
      'Avec THEY, le verbe reste à sa forme de base.',
  },
  {
    id: 3,
    lessonId: 5,
    sentence: "He doesn't ___ on Sunday.",
    verb: 'work',
    answer: 'work',
    translation: 'Il ne travaille pas le dimanche.',
    explanation:
      "Après DOESN'T, on utilise le verbe à sa forme de base, sans -S.",
  },
  {
    id: 4,
    lessonId: 5,
    sentence: 'I ___ breakfast at seven.',
    verb: 'eat',
    answer: 'eat',
    translation: 'Je prends le petit-déjeuner à sept heures.',
    explanation:
      'Avec I, le verbe reste à sa forme de base.',
  },
  {
    id: 5,
    lessonId: 5,
    sentence: 'Does she ___ here?',
    verb: 'work',
    answer: 'work',
    translation: 'Travaille-t-elle ici ?',
    explanation:
      'Après DOES, on utilise le verbe à sa forme de base.',
  },
]
