/**
 * Tests de fin d'unité (une seule base : les 35 unités de courses.ts).
 *
 * Chaque unité se termine par trois activités :
 *   1. QCM de vocabulaire et de grammaire
 *   2. « Mettre les mots en place » (remettre une phrase dans l'ordre)
 *   3. Compréhension (texte + questions)
 *
 * Les mots des unités précédentes reviennent automatiquement (révision espacée) :
 * un mot introduit dans l'unité J est revu aux unités J+d, avec d dans les tableaux
 * QCM_SLOTS et ORDER_SLOTS ci-dessous. Chaque mot est donc revu deux fois.
 * Tout est déterministe : mêmes unités, mêmes questions (seul l'ordre d'affichage change).
 */
import { courseUnits } from '../data/courses.ts'
import type { CourseUnit, WordPair } from '../data/courses.ts'
import { wordExamples, unitComprehension } from '../data/unitContent.ts'

export type TestQuestion = {
  id: string
  prompt: string
  options: string[]
  answer: string
  explanation: string
  /** true si la question reprend un mot ou une notion d'une unité précédente */
  recycled: boolean
  /** mot anglais travaillé (pour le suivi des révisions) */
  word?: string
}
export type OrderQuestion = {
  id: string
  french: string
  sentence: string
  /** mots dans le bon ordre, sans ponctuation */
  words: string[]
  recycled: boolean
  word: string
}
export type UnitTests = {
  qcm: TestQuestion[]
  order: OrderQuestion[]
  comprehension: { text: string; questions: TestQuestion[] }
  total: number
  /** mots anglais des unités précédentes revus dans ce test, avec leur unité d'origine */
  recycledWords: { english: string; french: string; fromUnit: string }[]
}

/** d = nombre d'unités en arrière, p = position du mot dans l'unité d'origine (0 à 3). */
const QCM_SLOTS = [{ d: 1, p: 0 }, { d: 2, p: 1 }, { d: 3, p: 2 }, { d: 4, p: 3 }, { d: 6, p: 0 }]
const ORDER_SLOTS = [{ d: 9, p: 1 }, { d: 14, p: 2 }, { d: 20, p: 3 }]

const key = (english: string) => english.trim().toLocaleLowerCase('en-US')

/** Première unité qui introduit chaque mot (certains mots, comme « tomorrow », reviennent). */
const introducedBy = new Map<string, number>()
courseUnits.forEach((unit, index) => {
  for (const word of unit.vocabulary) if (!introducedBy.has(key(word.english))) introducedBy.set(key(word.english), index)
})
const newWordsOfUnit: WordPair[][] = courseUnits.map((unit, index) =>
  unit.vocabulary.filter(word => introducedBy.get(key(word.english)) === index))

/* ---------- utilitaires déterministes ---------- */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const random = mulberry32(seed)
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/* ---------- ambiguïtés de traduction ---------- */
/** « qui/que (chose) » -> ['qui', 'que'] */
function frenchParts(french: string) {
  return french.replace(/\([^)]*\)/g, '').split('/').map(part => part.trim().toLocaleLowerCase('fr-FR')).filter(Boolean)
}
/** Mots d'une traduction, sans apostrophes ni « s » final (pomme / pommes). */
function frenchWords(part: string) {
  return part.replace(/[’']/g, ' ').split(/\s+/).filter(Boolean).map(word => (word.length > 3 ? word.replace(/s$/, '') : word))
}
function containsRun(haystack: string[], needle: string[]) {
  if (!needle.length || needle.length > haystack.length) return false
  for (let start = 0; start + needle.length <= haystack.length; start++) {
    if (needle.every((word, offset) => haystack[start + offset] === word)) return true
  }
  return false
}
/**
 * Deux traductions sont en conflit si elles se recoupent mot pour mot
 * (ex. « que » et « pendant que », « a dit » et « a dit à », « pourrait » et « pourrait »).
 */
export function frenchConflict(a: string, b: string) {
  const left = frenchParts(a).map(frenchWords)
  const right = frenchParts(b).map(frenchWords)
  return left.some(x => right.some(y => containsRun(x, y) || containsRun(y, x)))
}

const allWords = newWordsOfUnit.flatMap((words, index) => words.map(word => ({ ...word, unitIndex: index })))

function isAmbiguous(word: WordPair) {
  return allWords.some(other => key(other.english) !== key(word.english) && frenchConflict(other.french, word.french))
}

function knownWords(unitIndex: number) {
  return allWords.filter(word => word.unitIndex <= unitIndex)
}

function exampleOf(word: WordPair) {
  return wordExamples[key(word.english)]
}

/* ---------- construction des questions ---------- */
function meaningQuestion(unitId: string, n: number, word: WordPair, unitIndex: number, recycled: boolean): TestQuestion {
  const pool = knownWords(unitIndex).filter(other => key(other.english) !== key(word.english) && !frenchConflict(other.french, word.french))
  const distractors: string[] = []
  for (const candidate of seededShuffle(pool, unitIndex * 997 + n * 31 + 7)) {
    if (distractors.length === 3) break
    if (distractors.some(existing => frenchConflict(existing, candidate.french))) continue
    distractors.push(candidate.french)
  }
  const example = exampleOf(word)
  return {
    id: `${unitId}-qcm-${n}`,
    prompt: `Que signifie « ${word.english} » ?`,
    options: seededShuffle([word.french, ...distractors], unitIndex * 53 + n),
    answer: word.french,
    explanation: example ? `« ${word.english} » = ${word.french}. Exemple : ${example[0]} (${example[1]})` : `« ${word.english} » = ${word.french}.`,
    recycled, word: word.english,
  }
}

function translationQuestion(unitId: string, n: number, word: WordPair, unitIndex: number, recycled: boolean): TestQuestion {
  if (isAmbiguous(word)) return meaningQuestion(unitId, n, word, unitIndex, recycled)
  const pool = knownWords(unitIndex).filter(other => key(other.english) !== key(word.english) && !frenchConflict(other.french, word.french))
  const distractors: string[] = []
  for (const candidate of seededShuffle(pool, unitIndex * 991 + n * 37 + 11)) {
    if (distractors.length === 3) break
    if (distractors.some(existing => frenchConflict(existing, candidate.english) || existing === candidate.english)) continue
    distractors.push(candidate.english)
  }
  const example = exampleOf(word)
  return {
    id: `${unitId}-qcm-${n}`,
    prompt: `Comment dit-on « ${word.french} » en anglais ?`,
    options: seededShuffle([word.english, ...distractors], unitIndex * 59 + n),
    answer: word.english,
    explanation: example ? `« ${word.french} » = ${word.english}. Exemple : ${example[0]} (${example[1]})` : `« ${word.french} » = ${word.english}.`,
    recycled, word: word.english,
  }
}

/** Mot d'une unité située `d` unités avant, à la position `p` (avec repli si l'unité a moins de mots). */
function recycledPick(unitIndex: number, slot: { d: number; p: number }): { word: WordPair; fromUnit: string } | null {
  const source = unitIndex - slot.d
  if (source < 0) return null
  const words = newWordsOfUnit[source]
  if (!words.length) return null
  return { word: words[slot.p % words.length], fromUnit: courseUnits[source].id }
}

function buildUnitTests(unit: CourseUnit): UnitTests {
  const unitIndex = courseUnits.findIndex(item => item.id === unit.id)
  const featured = new Set(unit.vocabulary.map(word => key(word.english)))
  const used = new Set<string>()
  const recycledWords: UnitTests['recycledWords'] = []

  function pick(slots: { d: number; p: number }[]) {
    const result: { word: WordPair; fromUnit: string }[] = []
    for (const slot of slots) {
      const item = recycledPick(unitIndex, slot)
      if (!item) continue
      const k = key(item.word.english)
      if (featured.has(k) || used.has(k) || !exampleOf(item.word)) continue
      used.add(k)
      result.push(item)
      recycledWords.push({ english: item.word.english, french: item.word.french, fromUnit: item.fromUnit })
    }
    return result
  }

  /* 1) QCM : mots de l'unité, mots révisés, puis une question de grammaire */
  const qcm: TestQuestion[] = []
  unit.vocabulary.forEach(word => qcm.push(meaningQuestion(unit.id, qcm.length + 1, word, unitIndex, false)))
  pick(QCM_SLOTS).forEach(item => qcm.push(translationQuestion(unit.id, qcm.length + 1, item.word, unitIndex, true)))
  const grammar = unit.exercises.find(exercise => exercise.kind === 'choice' && exercise.options && exercise.options.length >= 2)
  if (grammar && grammar.options) {
    qcm.push({
      id: `${unit.id}-qcm-${qcm.length + 1}`,
      prompt: grammar.prompt,
      options: seededShuffle(grammar.options, unitIndex * 71 + 5),
      answer: grammar.answer,
      explanation: grammar.explanation,
      recycled: false,
    })
  }

  /* 2) Mettre les mots en place : phrases des mots de l'unité + mots lointains */
  const toOrder = (word: WordPair, recycled: boolean, n: number): OrderQuestion | null => {
    const example = exampleOf(word)
    if (!example) return null
    const words = example[0].replace(/[.,!?;:]/g, ' ').split(/\s+/).filter(Boolean)
    if (words.length < 3) return null
    return { id: `${unit.id}-order-${n}`, french: example[1], sentence: example[0], words, recycled, word: word.english }
  }
  const order: OrderQuestion[] = []
  for (const word of unit.vocabulary) {
    const question = toOrder(word, false, order.length + 1)
    if (question && !order.some(existing => existing.sentence === question.sentence)) order.push(question)
  }
  for (const item of pick(ORDER_SLOTS)) {
    const question = toOrder(item.word, true, order.length + 1)
    if (question && !order.some(existing => existing.sentence === question.sentence)) order.push(question)
  }

  /* 3) Compréhension : texte de l'unité + 3 questions */
  const rows = unitComprehension[unit.id] || []
  const questions: TestQuestion[] = rows.map((row, i) => ({
    id: `${unit.id}-read-${i + 1}`,
    prompt: row[0],
    options: seededShuffle([row[1], row[2], row[3], row[4]], unitIndex * 83 + i),
    answer: row[1],
    explanation: `Réponse : ${row[1]}. Relis le texte : ${unit.readingText}`,
    recycled: false,
  }))

  return {
    qcm, order,
    comprehension: { text: unit.readingText, questions },
    total: qcm.length + order.length + questions.length,
    recycledWords,
  }
}

const cache = new Map<string, UnitTests>()
export function getUnitTests(unitId: string): UnitTests | null {
  const cached = cache.get(unitId)
  if (cached) return cached
  const unit = courseUnits.find(item => item.id === unitId)
  if (!unit) return null
  const built = buildUnitTests(unit)
  cache.set(unitId, built)
  return built
}

export function getUnitTestTotal(unitId: string) {
  return getUnitTests(unitId)?.total ?? 0
}

/** Mots introduits par chaque unité (sans les doublons d'unités plus anciennes). */
export function getNewWordsOfUnit(unitId: string): WordPair[] {
  const index = courseUnits.findIndex(unit => unit.id === unitId)
  return index < 0 ? [] : newWordsOfUnit[index]
}

/** Mélange non déterministe pour l'affichage (nouvel ordre à chaque tentative). */
export function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
