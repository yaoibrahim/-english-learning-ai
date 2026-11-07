
export type FamilyWord = {
  id: number
  english: string
  french: string
  example: string
  exampleTranslation: string
}

export const familyWords: FamilyWord[] = [
  { id: 1, english: 'Mother', french: 'Mère', example: 'This is my mother.', exampleTranslation: "C'est ma mère." },
  { id: 2, english: 'Father', french: 'Père', example: 'This is my father.', exampleTranslation: "C'est mon père." },
  { id: 3, english: 'Sister', french: 'Sœur', example: 'She is my sister.', exampleTranslation: "Elle est ma sœur." },
  { id: 4, english: 'Brother', french: 'Frère', example: 'He is my brother.', exampleTranslation: "Il est mon frère." },
  { id: 5, english: 'Grandmother', french: 'Grand-mère', example: 'My grandmother is kind.', exampleTranslation: 'Ma grand-mère est gentille.' },
  { id: 6, english: 'Grandfather', french: 'Grand-père', example: 'My grandfather is happy.', exampleTranslation: 'Mon grand-père est heureux.' },
  { id: 7, english: 'Daughter', french: 'Fille (enfant)', example: 'She is my daughter.', exampleTranslation: "C'est ma fille." },
  { id: 8, english: 'Son', french: 'Fils', example: 'He is my son.', exampleTranslation: "C'est mon fils." },
  { id: 9, english: 'Aunt', french: 'Tante', example: 'My aunt lives in Paris.', exampleTranslation: 'Ma tante habite à Paris.' },
  { id: 10, english: 'Uncle', french: 'Oncle', example: 'My uncle is a teacher.', exampleTranslation: 'Mon oncle est professeur.' },
  { id: 11, english: 'Cousin', french: 'Cousin / Cousine', example: 'My cousin is a student.', exampleTranslation: 'Mon cousin ou ma cousine est étudiant(e).' },
  { id: 12, english: 'Parents', french: 'Parents', example: 'My parents are here.', exampleTranslation: 'Mes parents sont ici.' },
  { id: 13, english: 'Husband', french: 'Mari', example: 'He is her husband.', exampleTranslation: "C'est son mari." },
  { id: 14, english: 'Wife', french: 'Épouse', example: 'She is his wife.', exampleTranslation: "C'est son épouse." },
  { id: 15, english: 'Family', french: 'Famille', example: 'I love my family.', exampleTranslation: "J'aime ma famille." },
]

export type FamilySentence = {
  id: number
  french: string
  english: string
}

export const familySentences: FamilySentence[] = [
  { id: 1, french: "C'est ma mère.", english: 'This is my mother' },
  { id: 2, french: 'Il est mon frère.', english: 'He is my brother' },
  { id: 3, french: 'Elle est ma sœur.', english: 'She is my sister' },
  { id: 4, french: "J'aime ma famille.", english: 'I love my family' },
  { id: 5, french: 'Mes parents sont ici.', english: 'My parents are here' },
]
