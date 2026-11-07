
import { useState } from 'react'
import { lessons } from '../data/lessons'
import { questions } from '../data/questions'
import { conjugationQuestions } from '../data/conjugation'
import LessonContent from '../components/lessons/LessonContent'
import LessonQuiz from '../components/quiz/LessonQuiz'
import ConjugationExercise from '../components/exercises/ConjugationExercise'
import { completeLesson, useProgress } from '../hooks/useProgress'

type LessonStep = 'course' | 'quiz'

export default function Lesson() {
  const { completedLessons } = useProgress()

  const [activeLessonId, setActiveLessonId] = useState<number | null>(null)
  const [lessonStep, setLessonStep] = useState<LessonStep>('course')

  // Résultats des deux épreuves
  const [quizPassed, setQuizPassed] = useState(false)
  const [conjugationPassed, setConjugationPassed] = useState(false)

  // Leçon actuellement sélectionnée
  const activeLesson = lessons.find(
    lesson => lesson.id === activeLessonId
  )

  // Questions du QCM
  const lessonQuestions = questions.filter(
    question => question.lessonId === activeLessonId
  )

  // Questions de conjugaison
  const lessonConjugationQuestions = conjugationQuestions.filter(
    question => question.lessonId === activeLessonId
  )

  const hasConjugation = lessonConjugationQuestions.length > 0

  // Nombre de leçons terminées
  const completedCount = lessons.filter(
    lesson => completedLessons.includes(lesson.id)
  ).length

  // Pourcentage de progression
  const progressPercentage =
    lessons.length > 0
      ? (completedCount / lessons.length) * 100
      : 0

  // Vérifie si une leçon est débloquée
  function isLessonUnlocked(lessonId: number) {
    const index = lessons.findIndex(
      lesson => lesson.id === lessonId
    )

    if (index === -1) return false

    // Première leçon toujours disponible
    if (index === 0) return true

    // Une leçon déjà terminée reste accessible
    if (completedLessons.includes(lessonId)) {
      return true
    }

    const previousLesson = lessons[index - 1]

    return completedLessons.includes(previousLesson.id)
  }

  // Validation du quiz
  function handleQuizSuccess() {
    if (!activeLesson) return

    setQuizPassed(true)

    if (!hasConjugation || conjugationPassed) {
      completeLesson(activeLesson.id, activeLesson.xp)
    }
  }

  // Validation de la conjugaison
  function handleConjugationSuccess() {
    if (!activeLesson) return

    setConjugationPassed(true)

    if (quizPassed) {
      completeLesson(activeLesson.id, activeLesson.xp)
    }
  }

  // Ouvrir une leçon
  function openLesson(lessonId: number) {
    const hasQuestions = questions.some(
      question => question.lessonId === lessonId
    )

    if (!hasQuestions || !isLessonUnlocked(lessonId)) {
      return
    }

    setActiveLessonId(lessonId)
    setLessonStep('course')
    setQuizPassed(false)
    setConjugationPassed(false)
  }

  // Retour à la liste
  function returnToLessons() {
    setActiveLessonId(null)
    setLessonStep('course')
    setQuizPassed(false)
    setConjugationPassed(false)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  // ==============================
  // AFFICHAGE D'UNE LEÇON
  // ==============================

  if (activeLesson) {
    const isAlreadyCompleted = completedLessons.includes(
      activeLesson.id
    )

    const allExercisesPassed =
      quizPassed && (!hasConjugation || conjugationPassed)

    return (
      <section className="space-y-6">
        <button
          type="button"
          onClick={returnToLessons}
          className="rounded-lg bg-slate-200 px-4 py-2 text-slate-800 hover:bg-slate-300"
        >
          ← Retour aux leçons
        </button>

        <div>
          <p className="font-semibold text-blue-600">
            Niveau {activeLesson.level}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {activeLesson.title}
          </h1>

          <p className="mt-2 text-slate-600">
            {activeLesson.description}
          </p>

          {isAlreadyCompleted && (
            <p className="mt-3 font-semibold text-green-600">
              ✓ Leçon déjà terminée
            </p>
          )}
        </div>

        {/* Étapes de la leçon */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              lessonStep === 'course'
                ? 'bg-blue-600 text-white'
                : 'bg-green-100 text-green-700'
            }`}
          >
            1. Apprendre
          </span>

          <span className="text-slate-400">→</span>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              lessonStep === 'quiz'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            2. Quiz
          </span>

          {hasConjugation && (
            <>
              <span className="text-slate-400">→</span>

              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                3. Conjugaison
              </span>
            </>
          )}
        </div>

        {lessonStep === 'course' ? (
          <LessonContent
            title={activeLesson.title}
            questions={lessonQuestions}
            onStartQuiz={() => {
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel()
              }

              setLessonStep('quiz')
            }}
          />
        ) : (
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => setLessonStep('course')}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              ← Revoir le cours
            </button>

            {/* Progression des épreuves */}
            <div className="rounded-xl bg-blue-50 p-5">
              <h3 className="font-bold text-blue-900">
                Progression de la leçon
              </h3>

              <p className="mt-3">
                {quizPassed ? '✅' : '⬜'} Quiz de vocabulaire
              </p>

              {hasConjugation && (
                <p className="mt-2">
                  {conjugationPassed ? '✅' : '⬜'} Exercice de conjugaison
                </p>
              )}

              {allExercisesPassed && (
                <p className="mt-4 font-bold text-green-700">
                  🎉 Leçon validée !
                  {isAlreadyCompleted
                    ? ' Aucun XP supplémentaire.'
                    : ' XP attribués.'}
                </p>
              )}

              {!allExercisesPassed && (
                <p className="mt-3 text-sm text-blue-800">
                  Réussis toutes les épreuves pour valider la leçon.
                </p>
              )}
            </div>

            {/* QCM */}
            <LessonQuiz
              key={`${activeLesson.id}-${lessonStep}`}
              questions={lessonQuestions}
              onSuccess={handleQuizSuccess}
            />

            {/* Conjugaison */}
            {hasConjugation && (
              <ConjugationExercise
                key={`conjugation-${activeLesson.id}`}
                questions={lessonConjugationQuestions}
                onSuccess={handleConjugationSuccess}
              />
            )}
          </div>
        )}
      </section>
    )
  }

  // ==============================
  // LISTE DES LEÇONS
  // ==============================

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Mes leçons
        </h1>

        <p className="mt-2 text-slate-600">
          Progresse étape par étape pour apprendre l'anglais.
        </p>
      </div>

      {/* Barre de progression générale */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900">
            🎯 Progression du parcours
          </h2>

          <span className="font-semibold text-blue-600">
            {completedCount}/{lessons.length}
          </span>
        </div>

        <div
          className="mt-4 h-4 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-label="Progression des leçons"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPercentage)}
        >
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-600">
          {completedCount === lessons.length
            ? '🎉 Félicitations ! Tu as terminé toutes les leçons disponibles.'
            : `Tu as terminé ${completedCount} leçon(s) sur ${lessons.length}. Continue pour débloquer la suite !`}
        </p>
      </div>

      {/* Cartes des leçons */}
      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(
            lesson.id
          )

          const hasQuestions = questions.some(
            question => question.lessonId === lesson.id
          )

          const isUnlocked = isLessonUnlocked(lesson.id)

          const canStart = hasQuestions && isUnlocked

          const previousLesson =
            index > 0 ? lessons[index - 1] : null

          return (
            <article
              key={lesson.id}
              className={`rounded-2xl border p-6 shadow-sm transition ${
                canStart
                  ? 'border-slate-200 bg-white'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-blue-600">
                  Niveau {lesson.level} · {lesson.category}
                </p>

                {isCompleted ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    ✓ Terminée
                  </span>
                ) : !isUnlocked ? (
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    🔒 Verrouillée
                  </span>
                ) : (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Disponible
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-xl font-bold">
                {lesson.title}
              </h2>

              <p className="mt-2 text-slate-600">
                {lesson.description}
              </p>

              <p className="mt-4 font-semibold text-amber-600">
                ⭐ {lesson.xp} XP
              </p>

              {!isUnlocked && previousLesson && (
                <p className="mt-3 text-sm text-slate-500">
                  🔒 Termine d'abord la leçon précédente :
                  {' '}{previousLesson.title}.
                </p>
              )}

              <button
                type="button"
                onClick={() => openLesson(lesson.id)}
                disabled={!canStart}
                className={`mt-5 w-full rounded-lg px-5 py-3 font-medium text-white transition ${
                  canStart
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'cursor-not-allowed bg-slate-400'
                }`}
              >
                {!hasQuestions
                  ? 'Bientôt disponible'
                  : !isUnlocked
                    ? '🔒 Leçon verrouillée'
                    : isCompleted
                      ? '🔄 Rejouer la leçon'
                      : '▶ Commencer la leçon'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
