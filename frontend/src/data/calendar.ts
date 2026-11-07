
export type CalendarWord = {
  id: number
  english: string
  french: string
  category: 'day' | 'month'
  example: string
  exampleTranslation: string
}

export const calendarWords: CalendarWord[] = [
  {
    id: 1,
    english: 'Monday',
    french: 'Lundi',
    category: 'day',
    example: 'Today is Monday.',
    exampleTranslation: "Aujourd'hui, c'est lundi.",
  },
  {
    id: 2,
    english: 'Tuesday',
    french: 'Mardi',
    category: 'day',
    example: 'I work on Tuesday.',
    exampleTranslation: 'Je travaille mardi.',
  },
  {
    id: 3,
    english: 'Wednesday',
    french: 'Mercredi',
    category: 'day',
    example: 'Wednesday is my study day.',
    exampleTranslation: "Mercredi est mon jour d'étude.",
  },
  {
    id: 4,
    english: 'Thursday',
    french: 'Jeudi',
    category: 'day',
    example: 'I have English class on Thursday.',
    exampleTranslation: "J'ai cours d'anglais jeudi.",
  },
  {
    id: 5,
    english: 'Friday',
    french: 'Vendredi',
    category: 'day',
    example: 'Tomorrow is Friday.',
    exampleTranslation: 'Demain, c’est vendredi.',
  },
  {
    id: 6,
    english: 'Saturday',
    french: 'Samedi',
    category: 'day',
    example: 'I play football on Saturday.',
    exampleTranslation: 'Je joue au football samedi.',
  },
  {
    id: 7,
    english: 'Sunday',
    french: 'Dimanche',
    category: 'day',
    example: 'Sunday is a rest day.',
    exampleTranslation: 'Dimanche est un jour de repos.',
  },
  {
    id: 8,
    english: 'January',
    french: 'Janvier',
    category: 'month',
    example: 'January is the first month.',
    exampleTranslation: 'Janvier est le premier mois.',
  },
  {
    id: 9,
    english: 'February',
    french: 'Février',
    category: 'month',
    example: 'February is a short month.',
    exampleTranslation: 'Février est un mois court.',
  },
  {
    id: 10,
    english: 'March',
    french: 'Mars',
    category: 'month',
    example: 'Spring begins in March.',
    exampleTranslation: 'Le printemps commence en mars.',
  },
  {
    id: 11,
    english: 'April',
    french: 'Avril',
    category: 'month',
    example: 'My birthday is in April.',
    exampleTranslation: 'Mon anniversaire est en avril.',
  },
  {
    id: 12,
    english: 'May',
    french: 'Mai',
    category: 'month',
    example: 'The weather is nice in May.',
    exampleTranslation: 'Il fait beau en mai.',
  },
  {
    id: 13,
    english: 'June',
    french: 'Juin',
    category: 'month',
    example: 'Summer begins in June.',
    exampleTranslation: "L'été commence en juin.",
  },
  {
    id: 14,
    english: 'July',
    french: 'Juillet',
    category: 'month',
    example: 'I travel in July.',
    exampleTranslation: 'Je voyage en juillet.',
  },
  {
    id: 15,
    english: 'August',
    french: 'Août',
    category: 'month',
    example: 'August is a summer month.',
    exampleTranslation: "Août est un mois d'été.",
  },
  {
    id: 16,
    english: 'September',
    french: 'Septembre',
    category: 'month',
    example: 'School starts in September.',
    exampleTranslation: "L'école commence en septembre.",
  },
  {
    id: 17,
    english: 'October',
    french: 'Octobre',
    category: 'month',
    example: 'Halloween is in October.',
    exampleTranslation: 'Halloween est en octobre.',
  },
  {
    id: 18,
    english: 'November',
    french: 'Novembre',
    category: 'month',
    example: 'November comes after October.',
    exampleTranslation: 'Novembre vient après octobre.',
  },
  {
    id: 19,
    english: 'December',
    french: 'Décembre',
    category: 'month',
    example: 'December is the last month.',
    exampleTranslation: 'Décembre est le dernier mois.',
  },
]

export const days = calendarWords.filter(
  word => word.category === 'day'
)

export const months = calendarWords.filter(
  word => word.category === 'month'
)
