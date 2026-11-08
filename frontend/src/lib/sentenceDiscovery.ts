/**
 * Séquence de phrases du parcours A0 → C2.
 * La source est toujours le catalogue pédagogique existant : pas de doublon à maintenir.
 */
import { courseUnits, type CourseUnit, type WordPair } from '../data/courses.ts'
import { wordExamples } from '../data/unitContent.ts'

export type SentenceStep = {
  id: string
  kind: 'notion' | 'vocabulary'
  title: string
  category: string
  explanation: string
  english: string
  french: string
  target?: WordPair
  recycled: WordPair[]
}

export function isTermInPhrase(phrase: string, term: string): boolean {
  if (!term.trim()) return false
  const escaped = term.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^a-zA-Z])${escaped}(?=$|[^a-zA-Z])`, 'i').test(phrase)
}

export function previousVocabulary(unit: CourseUnit): WordPair[] {
  const position = courseUnits.findIndex(item => item.id === unit.id)
  if (position <= 0) return []
  const seen = new Set<string>()
  return courseUnits.slice(0, position).flatMap(item => item.vocabulary).filter(word => {
    const key = word.english.toLocaleLowerCase('en-US')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function buildSentenceSteps(unit: CourseUnit): SentenceStep[] {
  const prior = previousVocabulary(unit)
  const steps: SentenceStep[] = []
  const total = Math.max(unit.lessons.length, unit.vocabulary.length)

  for (let i = 0; i < total; i++) {
    const notion = unit.lessons[i]
    if (notion) {
      steps.push({
        id: `${unit.id}:notion:${i}`,
        kind: 'notion', title: notion.title, category: notion.category,
        explanation: notion.explanation, english: notion.english, french: notion.french,
        recycled: prior.filter(word => isTermInPhrase(notion.english, word.english)),
      })
    }
    const word = unit.vocabulary[i]
    if (word) {
      const example = wordExamples[word.english.toLocaleLowerCase('en-US')]
      const english = example?.[0] ?? word.english
      const french = example?.[1] ?? word.french
      steps.push({
        id: `${unit.id}:word:${i}`,
        kind: 'vocabulary', title: word.english, category: 'Nouveau vocabulaire',
        explanation: `« ${word.english} » signifie « ${word.french} ». Observe son emploi dans la phrase, puis essaie de la répéter.`,
        english, french, target: word,
        recycled: prior.filter(old => isTermInPhrase(english, old.english)),
      })
    }
  }
  return steps
}

export type RecognitionTask = {
  id: string; kind: 'recognition'; word: WordPair; options: string[]
}
export type ConstructionTask = {
  id: string; kind: 'construction'; english: string; french: string
  shuffledTokens: { id: number; text: string }[]
}
export type SentenceTask = RecognitionTask | ConstructionTask

function shuffled<T>(items: T[], seed: number): T[] {
  const result = [...items]
  let random = seed >>> 0
  for (let i = result.length - 1; i > 0; i--) {
    random = (1664525 * random + 1013904223) >>> 0
    const j = random % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function buildSentenceTasks(unit: CourseUnit): SentenceTask[] {
  const prior = previousVocabulary(unit)
  const pool = [...unit.vocabulary, ...prior]
  const tasks: SentenceTask[] = []
  const current = unit.vocabulary.slice(0, 4)

  current.forEach((word, index) => {
    const wrong = pool.map(item => item.french).filter(value => value !== word.french)
    const alternatives = [...new Set(wrong)].slice(index, index + 3)
    if (alternatives.length < 3) {
      alternatives.push(...[...new Set(wrong)].filter(item => !alternatives.includes(item)).slice(0, 3 - alternatives.length))
    }
    tasks.push({
      id: `${unit.id}:recognition:${index}`, kind: 'recognition', word,
      options: shuffled([word.french, ...alternatives], index + 41),
    })
  })

  const candidates = unit.vocabulary.map(word => {
    const example = wordExamples[word.english.toLocaleLowerCase('en-US')]
    return example ? { english: example[0], french: example[1] } : null
  }).filter((item): item is { english: string; french: string } => item !== null)
  const used = new Set<string>()
  for (const example of candidates) {
    if (tasks.filter(item => item.kind === 'construction').length >= 3) break
    const words = example.english.trim().split(/\s+/).filter(Boolean)
    if (words.length < 3 || words.length > 16 || used.has(example.english)) continue
    used.add(example.english)
    const tokens = words.map((text, id) => ({ id, text }))
    tasks.push({
      id: `${unit.id}:construction:${tasks.length}`, kind: 'construction',
      english: example.english, french: example.french,
      shuffledTokens: shuffled(tokens, example.english.length + tasks.length * 31),
    })
  }
  return tasks
}

export function normalizeSentence(value: string): string {
  return value.toLocaleLowerCase('en-US').replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ').replace(/\s+/g, ' ').trim()
}
