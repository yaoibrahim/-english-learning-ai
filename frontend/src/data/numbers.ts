
export type EnglishNumber = {
  value: number
  english: string
}

const units = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
]

const tens = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
]

export function numberToEnglish(number: number): string {
  if (
    !Number.isInteger(number) ||
    number < 0 ||
    number > 100
  ) {
    throw new Error('Le nombre doit être compris entre 0 et 100.')
  }

  if (number < 20) {
    return units[number]
  }

  if (number === 100) {
    return 'one hundred'
  }

  const ten = Math.floor(number / 10)
  const unit = number % 10

  if (unit === 0) {
    return tens[ten]
  }

  return `${tens[ten]}-${units[unit]}`
}

export const englishNumbers: EnglishNumber[] = Array.from(
  { length: 101 },
  (_, value) => ({
    value,
    english: numberToEnglish(value),
  })
)
