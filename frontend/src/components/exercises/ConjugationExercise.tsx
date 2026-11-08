import { playFeedback } from '../../lib/audioFeedback'

import { useState } from 'react'
import type { ConjugationQuestion } from '../../data/conjugation'

type Props = {
  questions: ConjugationQuestion[]
  onSuccess: () => void
}

export default function ConjugationExercise({
  questions,
  onSuccess,
}: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [validated, setValidated] = useState(false)

  function normalize(value: string) {
    return value.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  function updateAnswer(id: number, value: string) {
    setAnswers(previous => ({
      ...previous,
      [id]: value,
    }))
    setValidated(false)
  }

  const score = questions.filter(
    question =>
      normalize(answers[question.id] ?? '') ===
      normalize(question.answer)
  ).length

  const requiredScore = Math.ceil(questions.length * 0.8)

  function validateAnswers() {
    if (validated || questions.length === 0) return

    const hasEmptyAnswer = questions.some(
      question => !answers[question.id]?.trim()
    )

    if (hasEmptyAnswer) return

    playFeedback(score >= requiredScore ? 'complete' : 'incorrect', { announce: score >= requiredScore })
    setValidated(true)

    if (score >= requiredScore) {
      onSuccess()
    }
  }

  function restart() {
    setAnswers({})
    setValidated(false)
  }

  if (questions.length === 0) {
    return null
  }

  return (
    <section className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold">
          ✍️ Exercice de conjugaison
        </h2>

        <p className="mt-2 text-slate-600">
          Complète chaque phrase avec la bonne forme du verbe.
        </p>

        <p className="mt-2 text-sm font-medium text-blue-600">
          Objectif : au moins {requiredScore}/{questions.length}
          {' '}bonnes réponses.
        </p>
      </div>

      {questions.map((question, index) => {
        const answer = answers[question.id] ?? ''

        const isCorrect =
          normalize(answer) === normalize(question.answer)

        return (
          <div
            key={question.id}
            className="space-y-3 rounded-xl bg-slate-50 p-5"
          >
            <p className="text-sm font-semibold text-blue-600">
              Question {index + 1}/{questions.length}
            </p>

            <p className="text-lg font-semibold">
              {question.sentence}
            </p>

            <p className="text-sm text-slate-500">
              Verbe à conjuguer : {question.verb}
            </p>

            <input
              type="text"
              value={answer}
              onChange={event =>
                updateAnswer(question.id, event.target.value)
              }
              disabled={validated}
              placeholder="Écris ta réponse en anglais"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />

            {validated && (
              <div
                className={`rounded-lg p-4 ${
                  isCorrect
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
                role="status"
              >
                <p className="font-bold">
                  {isCorrect
                    ? '✓ Bonne réponse !'
                    : '✗ Réponse incorrecte'}
                </p>

                <p className="mt-2">
                  Bonne réponse : <strong>{question.answer}</strong>
                </p>

                <p className="mt-2">
                  {question.translation}
                </p>

                <p className="mt-2 text-sm">
                  💡 {question.explanation}
                </p>
              </div>
            )}
          </div>
        )
      })}

      {validated && (
        <div className="rounded-xl bg-blue-50 p-5 text-center">
          <p className="text-2xl font-bold text-blue-700">
            Score : {score}/{questions.length}
          </p>

          {score >= requiredScore ? (
            <p className="mt-3 font-semibold text-green-700">
              🎉 Félicitations ! Exercice de conjugaison réussi.
            </p>
          ) : (
            <p className="mt-3 font-semibold text-red-700">
              Tu dois obtenir au moins {requiredScore} bonnes
              réponses. Réessaie !
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {!validated ? (
          <button
            type="button"
            onClick={validateAnswers}
            disabled={questions.some(
              question => !answers[question.id]?.trim()
            )}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Corriger mes réponses
          </button>
        ) : (
          <button
            type="button"
            onClick={restart}
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Recommencer
          </button>
        )}
      </div>
    </section>
  )
}
