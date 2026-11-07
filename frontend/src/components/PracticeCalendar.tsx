
import { useState } from 'react'
import { useStreak } from '../hooks/useStreak'

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const monthFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'long',
  year: 'numeric',
})

function dateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function PracticeCalendar() {
  const {
    practiceDates,
    currentStreak,
    bestStreak,
    totalPracticeDays,
    practicedToday,
  } = useStreak()

  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const today = new Date()
  const todayKey = dateKey(today)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const numberOfDays = new Date(year, month + 1, 0).getDate()

  // Le calendrier commence le lundi.
  const firstDayOffset = (firstDay.getDay() + 6) % 7

  const cells: Array<number | null> = [
    ...Array<number | null>(firstDayOffset).fill(null),
    ...Array.from({ length: numberOfDays }, (_, index) => index + 1),
  ]

  // Compléter la dernière semaine.
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  const practicedDates = new Set(practiceDates)

  const monthPracticeCount = practiceDates.filter(date =>
    date.startsWith(
      `${year}-${String(month + 1).padStart(2, '0')}-`
    )
  ).length

  const daysInMonthUntilToday =
    year === today.getFullYear() && month === today.getMonth()
      ? today.getDate()
      : currentMonth > new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        )
        ? 0
        : numberOfDays

  const monthPercentage =
    daysInMonthUntilToday > 0
      ? Math.round(
          (monthPracticeCount / daysInMonthUntilToday) * 100
        )
      : 0

  function previousMonth() {
    setCurrentMonth(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  function nextMonth() {
    const next = new Date(year, month + 1, 1)

    if (
      next >
      new Date(today.getFullYear(), today.getMonth(), 1)
    ) {
      return
    }

    setCurrentMonth(next)
    setSelectedDate(null)
  }

  function returnToToday() {
    setCurrentMonth(
      new Date(today.getFullYear(), today.getMonth(), 1)
    )
    setSelectedDate(todayKey)
  }

  const canGoNext =
    year < today.getFullYear() ||
    (year === today.getFullYear() && month < today.getMonth())

  let selectedDateLabel = ''
  let selectedDatePracticed = false

  if (selectedDate) {
    const [selectedYear, selectedMonth, selectedDay] =
      selectedDate.split('-').map(Number)

    selectedDateLabel = formatDate(
      new Date(selectedYear, selectedMonth - 1, selectedDay)
    )

    selectedDatePracticed = practicedDates.has(selectedDate)
  }

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

      {/* EN-TÊTE */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          📅 Mon calendrier de pratique
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Retrouve les jours où tu as réussi des exercices
          et suis ta régularité.
        </p>
      </div>

      {/* STATISTIQUES */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-orange-50 p-4 text-center">
          <p className="text-sm font-semibold text-orange-700">
            Série actuelle
          </p>

          <p className="mt-2 text-2xl font-extrabold text-orange-600">
            🔥 {currentStreak}
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 p-4 text-center">
          <p className="text-sm font-semibold text-amber-700">
            Record
          </p>

          <p className="mt-2 text-2xl font-extrabold text-amber-600">
            🏆 {bestStreak}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-4 text-center">
          <p className="text-sm font-semibold text-green-700">
            Jours pratiqués
          </p>

          <p className="mt-2 text-2xl font-extrabold text-green-600">
            ✓ {totalPracticeDays}
          </p>
        </div>
      </div>

      {/* NAVIGATION ENTRE LES MOIS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={previousMonth}
          aria-label="Mois précédent"
          className="rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-800 hover:bg-slate-200"
        >
          ←
        </button>

        <h3 className="text-center text-lg font-extrabold capitalize text-slate-900">
          {monthFormatter.format(currentMonth)}
        </h3>

        <button
          type="button"
          onClick={nextMonth}
          disabled={!canGoNext}
          aria-label="Mois suivant"
          className="rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-800 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>
      </div>

      {/* CALENDRIER */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {weekDays.map(day => (
          <div
            key={day}
            className="py-2 text-center text-xs font-bold text-slate-500 sm:text-sm"
          >
            {day}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                aria-hidden="true"
                className="aspect-square"
              />
            )
          }

          const date = new Date(year, month, day)
          const key = dateKey(date)

          const practiced = practicedDates.has(key)
          const isToday = key === todayKey
          const isFuture = key > todayKey
          const isSelected = selectedDate === key

          return (
            <button
              key={key}
              type="button"
              disabled={isFuture}
              onClick={() => setSelectedDate(key)}
              aria-label={`${formatDate(date)} : ${
                practiced ? 'pratique enregistrée' : 'aucune pratique'
              }`}
              aria-pressed={isSelected}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 text-sm font-bold transition sm:text-base ${
                practiced
                  ? 'border-green-500 bg-green-100 text-green-800'
                  : isToday
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-transparent bg-slate-100 text-slate-600'
              } ${
                isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
              } ${
                isFuture
                  ? 'cursor-not-allowed opacity-30'
                  : 'hover:scale-105'
              }`}
            >
              <span>{day}</span>

              {practiced && (
                <span className="text-xs">✓</span>
              )}

              {isToday && (
                <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-blue-600 sm:bottom-1" />
              )}
            </button>
          )
        })}
      </div>

      {/* LÉGENDE */}
      <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-green-100 ring-1 ring-green-500" />
          Jour pratiqué
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-slate-100" />
          Sans pratique
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-blue-50 ring-1 ring-blue-500" />
          Aujourd'hui
        </div>
      </div>

      {/* JOUR SÉLECTIONNÉ */}
      {selectedDate && (
        <div
          className={`rounded-xl p-4 ${
            selectedDatePracticed
              ? 'bg-green-50 text-green-800'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          <p className="font-bold capitalize">
            {selectedDateLabel}
          </p>

          <p className="mt-1 text-sm">
            {selectedDatePracticed
              ? '✓ Tu as réussi au moins un exercice ce jour-là.'
              : 'Aucune réussite enregistrée pour cette date.'}
          </p>
        </div>
      )}

      {/* BILAN DU MOIS */}
      <div className="rounded-xl bg-indigo-50 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold text-indigo-900">
            Bilan du mois
          </h3>

          <span className="font-extrabold text-indigo-700">
            {monthPercentage} %
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-indigo-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${monthPercentage}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-indigo-800">
          {monthPracticeCount} jour(s) de pratique sur{' '}
          {daysInMonthUntilToday} jour(s) écoulé(s) ce mois.
        </p>
      </div>

      {/* OBJECTIF QUOTIDIEN */}
      <div
        className={`rounded-xl p-4 text-sm font-semibold ${
          practicedToday
            ? 'bg-green-50 text-green-800'
            : 'bg-orange-50 text-orange-800'
        }`}
      >
        {practicedToday
          ? '🎉 Bravo ! Tu as déjà pratiqué aujourd’hui.'
          : '🔥 Réussis un exercice aujourd’hui pour faire progresser ta série.'}
      </div>

      <button
        type="button"
        onClick={returnToToday}
        className="w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
      >
        📍 Revenir à aujourd'hui
      </button>
    </section>
  )
}
