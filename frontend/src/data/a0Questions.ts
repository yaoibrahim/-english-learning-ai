
import {
  a0Levels,
  type A0Topic,
} from './a0Levels'

export type A0QuestionType =
  | 'multiple-choice'
  | 'word-order'
  | 'writing'

type BaseQuestion = {
  id: string
  topic: A0Topic
  prompt: string
  explanation?: string
}

export type A0Question =
  | (BaseQuestion & {
      type: 'multiple-choice'
      options: string[]
      answer: string
    })
  | (BaseQuestion & {
      type: 'word-order'
      words: string[]
      answer: string
    })
  | (BaseQuestion & {
      type: 'writing'
      answer: string
      acceptedAnswers?: string[]
    })

export const a0Questions: A0Question[] = [
  // ALPHABET
  {
    id: 'a01',
    topic: 'alphabet',
    type: 'multiple-choice',
    prompt: 'Quelle est la première lettre de l’alphabet anglais ?',
    options: ['A', 'B', 'C', 'D'],
    answer: 'A',
  },
  {
    id: 'a02',
    topic: 'alphabet',
    type: 'multiple-choice',
    prompt: 'Quelle lettre vient après C ?',
    options: ['B', 'D', 'E', 'F'],
    answer: 'D',
  },
  {
    id: 'a03',
    topic: 'alphabet',
    type: 'writing',
    prompt: 'Écris la lettre qui vient après G.',
    answer: 'H',
  },
  {
    id: 'a04',
    topic: 'alphabet',
    type: 'multiple-choice',
    prompt: 'Quel mot anglais commence par B ?',
    options: ['Apple', 'Book', 'Cat', 'Dog'],
    answer: 'Book',
  },
  {
    id: 'a05',
    topic: 'alphabet',
    type: 'writing',
    prompt: 'Écris la dernière lettre de l’alphabet anglais.',
    answer: 'Z',
  },
  {
    id: 'a06',
    topic: 'alphabet',
    type: 'multiple-choice',
    prompt: 'Quelle lettre vient avant M ?',
    options: ['K', 'L', 'N', 'O'],
    answer: 'L',
  },
  {
    id: 'a07',
    topic: 'alphabet',
    type: 'writing',
    prompt: 'Écris la lettre qui vient après P.',
    answer: 'Q',
  },
  {
    id: 'a08',
    topic: 'alphabet',
    type: 'multiple-choice',
    prompt: 'Quelle lettre vient après X ?',
    options: ['W', 'Y', 'Z', 'V'],
    answer: 'Y',
  },

  // NOMBRES
  {
    id: 'n01',
    topic: 'numbers',
    type: 'multiple-choice',
    prompt: 'Comment dit-on 1 en anglais ?',
    options: ['One', 'Two', 'Three', 'Four'],
    answer: 'One',
  },
  {
    id: 'n02',
    topic: 'numbers',
    type: 'multiple-choice',
    prompt: 'Comment dit-on 5 en anglais ?',
    options: ['Four', 'Five', 'Six', 'Seven'],
    answer: 'Five',
  },
  {
    id: 'n03',
    topic: 'numbers',
    type: 'writing',
    prompt: 'Écris le nombre 10 en anglais.',
    answer: 'ten',
  },
  {
    id: 'n04',
    topic: 'numbers',
    type: 'multiple-choice',
    prompt: 'Que signifie « seven » ?',
    options: ['6', '7', '8', '9'],
    answer: '7',
  },
  {
    id: 'n05',
    topic: 'numbers',
    type: 'writing',
    prompt: 'Écris le nombre 12 en anglais.',
    answer: 'twelve',
  },
  {
    id: 'n06',
    topic: 'numbers',
    type: 'multiple-choice',
    prompt: 'Comment dit-on 20 en anglais ?',
    options: ['Twelve', 'Twenty', 'Thirty', 'Ten'],
    answer: 'Twenty',
  },
  {
    id: 'n07',
    topic: 'numbers',
    type: 'writing',
    prompt: 'Écris le nombre 15 en anglais.',
    answer: 'fifteen',
  },
  {
    id: 'n08',
    topic: 'numbers',
    type: 'multiple-choice',
    prompt: 'Que signifie « thirty » ?',
    options: ['13', '20', '30', '40'],
    answer: '30',
  },
  {
    id: 'n09',
    topic: 'numbers',
    type: 'writing',
    prompt: 'Écris le nombre 8 en anglais.',
    answer: 'eight',
  },
  {
    id: 'n10',
    topic: 'numbers',
    type: 'multiple-choice',
    prompt: 'Comment dit-on 100 en anglais ?',
    options: ['Ten', 'Hundred', 'One hundred', 'Thousand'],
    answer: 'One hundred',
  },

  // COULEURS
  {
    id: 'c01',
    topic: 'colors',
    type: 'multiple-choice',
    prompt: 'Comment dit-on « rouge » en anglais ?',
    options: ['Blue', 'Red', 'Green', 'Yellow'],
    answer: 'Red',
  },
  {
    id: 'c02',
    topic: 'colors',
    type: 'writing',
    prompt: 'Écris « bleu » en anglais.',
    answer: 'blue',
  },
  {
    id: 'c03',
    topic: 'colors',
    type: 'multiple-choice',
    prompt: 'Que signifie « green » ?',
    options: ['Vert', 'Rouge', 'Noir', 'Blanc'],
    answer: 'Vert',
  },
  {
    id: 'c04',
    topic: 'colors',
    type: 'writing',
    prompt: 'Écris « jaune » en anglais.',
    answer: 'yellow',
  },
  {
    id: 'c05',
    topic: 'colors',
    type: 'multiple-choice',
    prompt: 'Comment dit-on « noir » en anglais ?',
    options: ['White', 'Brown', 'Black', 'Pink'],
    answer: 'Black',
  },
  {
    id: 'c06',
    topic: 'colors',
    type: 'writing',
    prompt: 'Écris « blanc » en anglais.',
    answer: 'white',
  },
  {
    id: 'c07',
    topic: 'colors',
    type: 'multiple-choice',
    prompt: 'Que signifie « purple » ?',
    options: ['Rose', 'Violet', 'Orange', 'Gris'],
    answer: 'Violet',
  },
  {
    id: 'c08',
    topic: 'colors',
    type: 'writing',
    prompt: 'Écris « orange » en anglais.',
    answer: 'orange',
  },

  // CALENDRIER
  {
    id: 'd01',
    topic: 'calendar',
    type: 'multiple-choice',
    prompt: 'Comment dit-on « lundi » en anglais ?',
    options: ['Monday', 'Tuesday', 'Friday', 'Sunday'],
    answer: 'Monday',
  },
  {
    id: 'd02',
    topic: 'calendar',
    type: 'writing',
    prompt: 'Écris « mardi » en anglais.',
    answer: 'Tuesday',
  },
  {
    id: 'd03',
    topic: 'calendar',
    type: 'multiple-choice',
    prompt: 'Que signifie « Friday » ?',
    options: ['Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    answer: 'Vendredi',
  },
  {
    id: 'd04',
    topic: 'calendar',
    type: 'writing',
    prompt: 'Écris « dimanche » en anglais.',
    answer: 'Sunday',
  },
  {
    id: 'd05',
    topic: 'calendar',
    type: 'multiple-choice',
    prompt: 'Comment dit-on « janvier » en anglais ?',
    options: ['January', 'February', 'June', 'July'],
    answer: 'January',
  },
  {
    id: 'd06',
    topic: 'calendar',
    type: 'writing',
    prompt: 'Écris « décembre » en anglais.',
    answer: 'December',
  },
  {
    id: 'd07',
    topic: 'calendar',
    type: 'multiple-choice',
    prompt: 'Que signifie « August » ?',
    options: ['Avril', 'Août', 'Octobre', 'Mars'],
    answer: 'Août',
  },
  {
    id: 'd08',
    topic: 'calendar',
    type: 'writing',
    prompt: 'Écris « juin » en anglais.',
    answer: 'June',
  },

  // FAMILLE
  {
    id: 'f01',
    topic: 'family',
    type: 'multiple-choice',
    prompt: 'Comment dit-on « mère » en anglais ?',
    options: ['Father', 'Mother', 'Sister', 'Brother'],
    answer: 'Mother',
  },
  {
    id: 'f02',
    topic: 'family',
    type: 'writing',
    prompt: 'Écris « frère » en anglais.',
    answer: 'brother',
  },
  {
    id: 'f03',
    topic: 'family',
    type: 'multiple-choice',
    prompt: 'Que signifie « sister » ?',
    options: ['Sœur', 'Mère', 'Tante', 'Fille'],
    answer: 'Sœur',
  },
  {
    id: 'f04',
    topic: 'family',
    type: 'writing',
    prompt: 'Écris « père » en anglais.',
    answer: 'father',
  },
  {
    id: 'f05',
    topic: 'family',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « C’est ma mère. »',
    words: ['mother', 'This', 'my', 'is'],
    answer: 'This is my mother',
  },
  {
    id: 'f06',
    topic: 'family',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « Il est mon frère. »',
    words: ['brother', 'my', 'He', 'is'],
    answer: 'He is my brother',
  },
  {
    id: 'f07',
    topic: 'family',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « Elle est ma sœur. »',
    words: ['sister', 'is', 'She', 'my'],
    answer: 'She is my sister',
  },
  {
    id: 'f08',
    topic: 'family',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « J’aime ma famille. »',
    words: ['family', 'I', 'my', 'love'],
    answer: 'I love my family',
  },
  {
    id: 'f09',
    topic: 'family',
    type: 'multiple-choice',
    prompt: 'Comment dit-on « grand-mère » en anglais ?',
    options: [
      'Grandfather',
      'Grandmother',
      'Mother',
      'Aunt',
    ],
    answer: 'Grandmother',
  },
  {
    id: 'f10',
    topic: 'family',
    type: 'writing',
    prompt: 'Écris « famille » en anglais.',
    answer: 'family',
  },

  // PHRASES MÉLANGÉES
  {
    id: 'm01',
    topic: 'colors',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « La voiture est rouge. »',
    words: ['red', 'The', 'is', 'car'],
    answer: 'The car is red',
  },
  {
    id: 'm02',
    topic: 'numbers',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « J’ai deux livres. »',
    words: ['books', 'I', 'two', 'have'],
    answer: 'I have two books',
  },
  {
    id: 'm03',
    topic: 'calendar',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « Aujourd’hui, c’est lundi. »',
    words: ['Monday', 'Today', 'is'],
    answer: 'Today is Monday',
  },
  {
    id: 'm04',
    topic: 'family',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « Mes parents sont ici. »',
    words: ['here', 'parents', 'My', 'are'],
    answer: 'My parents are here',
  },
  {
    id: 'm05',
    topic: 'colors',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « Le ciel est bleu. »',
    words: ['blue', 'sky', 'The', 'is'],
    answer: 'The sky is blue',
  },
  {
    id: 'm06',
    topic: 'calendar',
    type: 'word-order',
    prompt: 'Remets les mots en ordre : « Nous sommes en janvier. »',
    words: ['January', 'is', 'It'],
    answer: 'It is January',
  },
  {
    id: 'm07',
    topic: 'colors',
    type: 'writing',
    prompt: 'Traduis en anglais : « Le soleil est jaune. »',
    answer: 'The sun is yellow',
  },
  {
    id: 'm08',
    topic: 'family',
    type: 'writing',
    prompt: 'Traduis en anglais : « Elle est ma sœur. »',
    answer: 'She is my sister',
  },
]

// Mélange réutilisable pour les tuiles de mots.
export function shuffleA0Questions<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function normalizeA0Answer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/g, '')
    .replace(/\s+/g, ' ')
}

export function isA0AnswerCorrect(
  question: A0Question,
  response: string
): boolean {
  const accepted = [
    question.answer,
    ...(question.type === 'writing'
      ? question.acceptedAnswers ?? []
      : []),
  ]

  return accepted.some(
    answer => normalizeA0Answer(answer) === normalizeA0Answer(response)
  )
}

// Classement stable : un même niveau conserve les mêmes questions
// même après un rechargement de la page.
function stableScore(questionId: string, levelId: number): number {
  const text = `${levelId}:${questionId}`
  let hash = 2166136261
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

// Progression : découverte -> écriture -> construction -> révision.
function typePriority(unit: number): A0QuestionType[] {
  switch (unit) {
    case 1:
      return ['multiple-choice', 'writing', 'word-order']
    case 2:
      return ['multiple-choice', 'writing', 'word-order']
    case 3:
      return ['writing', 'word-order', 'multiple-choice']
    default:
      return ['word-order', 'writing', 'multiple-choice']
  }
}

export function getA0QuestionsForLevel(levelId: number): A0Question[] {
  const level = a0Levels.find(item => item.id === levelId)
  if (!level) return []

  const candidates = a0Questions
    .filter(question => level.topics.includes(question.topic))
    .sort((a, b) => stableScore(a.id, levelId) - stableScore(b.id, levelId))

  const selected: A0Question[] = []
  const usedIds = new Set<string>()
  const topicCounts = new Map<A0Topic, number>()
  const typeCounts = new Map<A0QuestionType, number>()
  const priority = typePriority(level.unit)
  const target = Math.min(level.questionCount, candidates.length)

  // Chaque passage privilégie un type différent pour varier les exercices.
  // À l'intérieur d'un type, on privilégie le thème le moins représenté.
  while (selected.length < target) {
    const available = candidates.filter(question => !usedIds.has(question.id))
    if (available.length === 0) break

    const preferredType = [...priority]
      .filter(type => available.some(question => question.type === type))
      .sort((a, b) =>
        (typeCounts.get(a) ?? 0) - (typeCounts.get(b) ?? 0) ||
        priority.indexOf(a) - priority.indexOf(b)
      )[0]

    const matching = available
      .filter(question => question.type === preferredType)
      .sort((a, b) =>
        (topicCounts.get(a.topic) ?? 0) - (topicCounts.get(b.topic) ?? 0) ||
        stableScore(a.id, levelId) - stableScore(b.id, levelId)
      )

    const chosen = matching[0]
    if (!chosen) break

    selected.push(chosen)
    usedIds.add(chosen.id)
    topicCounts.set(chosen.topic, (topicCounts.get(chosen.topic) ?? 0) + 1)
    typeCounts.set(chosen.type, (typeCounts.get(chosen.type) ?? 0) + 1)
  }

  return selected
}
