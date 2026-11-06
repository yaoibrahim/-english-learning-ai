
export type Question = {
  id: number
  lessonId: number
  word: string
  translation: string
  options: string[]
}

export const questions: Question[] = [
  {
    id: 1,
    lessonId: 1,
    word: 'Hello',
    translation: 'Bonjour',
    options: ['Bonsoir', 'Bonjour', 'Merci', 'Au revoir'],
  },
  {
    id: 2,
    lessonId: 1,
    word: 'Thank you',
    translation: 'Merci',
    options: ['Merci', 'Bonjour', 'Maison', 'Pardon'],
  },
  {
    id: 3,
    lessonId: 1,
    word: 'Goodbye',
    translation: 'Au revoir',
    options: ['Bonjour', 'Merci', 'Au revoir', 'Oui'],
  },
  {
    id: 4,
    lessonId: 1,
    word: 'Please',
    translation: "S'il vous plaît",
    options: ['Non', 'Oui', "S'il vous plaît", 'Bonsoir'],
  },
  {
    id: 5,
    lessonId: 1,
    word: 'Yes',
    translation: 'Oui',
    options: ['Non', 'Oui', 'Merci', 'Bonjour'],
  },
]
