
import { lazy, Suspense, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import MobileNavigation from './components/layout/MobileNavigation'
import ScrollToTop from './components/layout/ScrollToTop'
import './styles/mobile.css'
import SentenceBuilder from './components/exercises/SentenceBuilder'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Lesson = lazy(() => import('./pages/Lesson'))
const Levels = lazy(() => import('./pages/Levels'))
const Progress = lazy(() => import('./pages/Progress'))
const Alphabet = lazy(() => import('./pages/Alphabet'))
const Numbers = lazy(() => import('./pages/Numbers'))
const Colors = lazy(() => import('./pages/Colors'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Family = lazy(() => import('./pages/Family'))
const A0Path = lazy(() => import('./pages/A0Path'))
const A0Level = lazy(() => import('./pages/A0Level'))
const Achievements = lazy(() => import('./pages/Achievements'))
import StreakCard from './components/StreakCard'
import DailyGoalCard from './components/DailyGoalCard'
import DailyMissionsCard from './components/DailyMissionsCard'
const PracticeHistory = lazy(() => import('./pages/PracticeHistory'))
const Listening = lazy(() => import('./pages/Listening'))
const Speaking = lazy(() => import('./pages/Speaking'))
const Writing = lazy(() => import('./pages/Writing'))
const Reading = lazy(() => import('./pages/Reading'))
const SmartReview = lazy(() => import('./pages/SmartReview'))
import ReviewHomeCard from './components/review/ReviewHomeCard'
import CEFRHomeCard from './components/cefr/CEFRHomeCard'
const CEFRPath = lazy(() => import('./pages/CEFRPath'))
const CEFRUnit = lazy(() => import('./pages/CEFRUnit'))
const BackupRestore = lazy(() => import('./pages/BackupRestore'))
import BackupHomeCard from './components/backup/BackupHomeCard'


const vocabulary = [
  { english: 'Learn', french: 'Apprendre', type: 'Verbe' },
  { english: 'Speak', french: 'Parler', type: 'Verbe' },
  { english: 'Beautiful', french: 'Beau / Belle', type: 'Adjectif' },
  { english: 'House', french: 'Maison', type: 'Nom' },
  { english: 'Every day', french: 'Tous les jours', type: 'Expression' },
]

function Home() {
  const [selected, setSelected] = useState<number | null>(null)

  function pronounce(word: string) {
    if (!('speechSynthesis' in window)) {
      alert('La synthèse vocale n’est pas disponible.')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.85

    window.speechSynthesis.speak(utterance)
  }

  return (
    <>
      <header className="mb-8 sm:mb-10">
        <p className="font-semibold text-blue-600">
          English Learning AI
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          Apprends l'anglais à ton rythme
        </h1>

        <p className="mt-3 text-slate-600">
          Découvre les mots, écoute leur prononciation
          et apprends à construire des phrases.
        </p>
      </header>

      <Dashboard />

      {/* OBJECTIF QUOTIDIEN */}
      <div className="mt-6">
        <DailyGoalCard />
      </div>

      {/* MISSIONS QUOTIDIENNES */}
      <div className="mt-6">
        <DailyMissionsCard />
      </div>

      {/* SÉRIE QUOTIDIENNE */}
      <div className="mt-6">
        <StreakCard />
      </div>

      {/* CALENDRIER DE PRATIQUE */}
      <div className="mt-4">
        <Link
          to="/practice-history"
          className="inline-flex rounded-xl bg-orange-100 px-5 py-3 font-bold text-orange-800 hover:bg-orange-200"
        >
          📅 Voir mon calendrier de pratique →
        </Link>
      </div>

      {/* ACTIVITÉS */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">
          📚 Mes activités
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* PARCOURS A0 */}
          <article className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
            <div className="text-4xl">🌱</div>

            <h3 className="mt-4 text-xl font-bold">
              Mon parcours A0
            </h3>

            <p className="mt-3 text-slate-600">
              Avance à travers 20 mini-niveaux,
              réussis des exercices et gagne des XP.
            </p>

            <Link
              to="/path"
              className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Continuer mon parcours →
            </Link>
          </article>

          {/* RÉCOMPENSES */}
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="text-4xl">🏆</div>

            <h3 className="mt-4 text-xl font-bold">
              Mes récompenses
            </h3>

            <p className="mt-3 text-slate-600">
              Découvre les badges obtenus
              et les prochains défis à relever.
            </p>

            <Link
              to="/achievements"
              className="mt-5 inline-block rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
            >
              Voir mes récompenses →
            </Link>
          </article>

          {/* ALPHABET */}
          <article className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
            <div className="text-4xl">🔤</div>

            <h3 className="mt-4 text-xl font-bold">
              Alphabet anglais
            </h3>

            <p className="mt-3 text-slate-600">
              Découvre les 26 lettres et leur prononciation.
            </p>

            <Link
              to="/alphabet"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Apprendre l'alphabet →
            </Link>
          </article>
          <Link
            to="/listening"
            className="block rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="text-4xl">🎧</div>

            <h3 className="mt-3 text-lg font-bold">
              Listening — Compréhension orale
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Écoute des phrases anglaises, améliore ta compréhension
              et gagne des XP.
            </p>

            <p className="mt-3 font-semibold text-blue-600">
              Commencer →
            </p>
        </Link>

          {/* SPEAKING — EXPRESSION ORALE */}
          <Link
            to="/speaking"
            className="block rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="text-4xl">🎤</div>
            <h3 className="mt-3 text-lg font-bold">
              Speaking — Expression orale
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Parle anglais avec ton microphone, entraîne ta prononciation
              et gagne des XP.
            </p>
            <p className="mt-3 font-semibold text-purple-600">
              Commencer →
            </p>
          </Link>

          {/* WRITING — EXPRESSION ÉCRITE */}
          <Link
            to="/writing"
            className="block rounded-2xl border border-cyan-200 bg-cyan-50 p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="text-4xl">✍️</div>
            <h3 className="mt-3 text-lg font-bold">
              Writing — Expression écrite
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Traduis des phrases en anglais, améliore ton orthographe
              et ta grammaire, et gagne des XP.
            </p>
            <p className="mt-3 font-semibold text-cyan-700">
              Commencer →
            </p>
          </Link>

          {/* READING — COMPRÉHENSION ÉCRITE */}
          <Link
            to="/reading"
            className="block rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="text-4xl">📖</div>
            <h3 className="mt-3 text-lg font-bold">
              Reading — Compréhension écrite
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Lis des textes anglais, réponds à des questions et améliore
              ta compréhension pour gagner des XP.
            </p>
            <p className="mt-3 font-semibold text-emerald-700">
              Commencer →
            </p>
          </Link>

          {/* TP 27.16 — RÉVISIONS INTELLIGENTES */}
          <ReviewHomeCard />

          {/* TP 27.17 — PARCOURS A1 À C2 */}
          <CEFRHomeCard />

          {/* TP 27.18 — SAUVEGARDE LOCALE */}
          <BackupHomeCard />

          {/* NOMBRES */}
          <article className="rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
            <div className="text-4xl">🔢</div>

            <h3 className="mt-4 text-xl font-bold">
              Nombres anglais
            </h3>

            <p className="mt-3 text-slate-600">
              Apprends à compter de 0 à 100 et écoute
              la prononciation des nombres.
            </p>

            <Link
              to="/numbers"
              className="mt-5 inline-block rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Apprendre les nombres →
            </Link>
          </article>

          {/* COULEURS */}
          <article className="rounded-2xl border border-pink-200 bg-pink-50 p-6 shadow-sm">
            <div className="text-4xl">🎨</div>

            <h3 className="mt-4 text-xl font-bold">
              Couleurs anglaises
            </h3>

            <p className="mt-3 text-slate-600">
              Apprends les couleurs avec des exemples,
              leur prononciation et un quiz interactif.
            </p>

            <Link
              to="/colors"
              className="mt-5 inline-block rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
            >
              Apprendre les couleurs →
            </Link>
          </article>

          {/* CALENDRIER */}
          <article className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6 shadow-sm">
            <div className="text-4xl">📅</div>

            <h3 className="mt-4 text-xl font-bold">
              Jours et mois en anglais
            </h3>

            <p className="mt-3 text-slate-600">
              Apprends les sept jours de la semaine et les douze
              mois de l'année avec des exemples et un quiz.
            </p>

            <Link
              to="/calendar"
              className="mt-5 inline-block rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"
            >
              Apprendre les jours et les mois →
            </Link>
          </article>

          {/* FAMILLE */}
          <article className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <div className="text-4xl">👨‍👩‍👧‍👦</div>

            <h3 className="mt-4 text-xl font-bold">
              La famille en anglais
            </h3>

            <p className="mt-3 text-slate-600">
              Apprends les membres de la famille,
              écoute leur prononciation et construis
              tes premières phrases.
            </p>

            <Link
              to="/family"
              className="mt-5 inline-block rounded-lg bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700"
            >
              Apprendre la famille →
            </Link>
          </article>

          {/* LEÇONS */}
          <article className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
            <div className="text-4xl">📖</div>

            <h3 className="mt-4 text-xl font-bold">
              Mes leçons
            </h3>

            <p className="mt-3 text-slate-600">
              Apprends le vocabulaire, la grammaire
              et la conjugaison avec des exercices.
            </p>

            <Link
              to="/lessons"
              className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              Continuer mes leçons →
            </Link>
          </article>

          {/* NIVEAUX */}
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="text-4xl">🌍</div>

            <h3 className="mt-4 text-xl font-bold">
              Mes niveaux
            </h3>

            <p className="mt-3 text-slate-600">
              Découvre les niveaux A0 à C2 et suis
              ton parcours d'apprentissage.
            </p>

            <Link
              to="/levels"
              className="mt-5 inline-block rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
            >
              Voir mes niveaux →
            </Link>
          </article>

        </div>
      </section>

      {/* VOCABULAIRE */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">
          Leçon 1 — Premiers mots
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {vocabulary.map((word, index) => (
            <div
              key={word.english}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-blue-600">
                {word.type}
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {word.english}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => pronounce(word.english)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  🔊 Écouter
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelected(selected === index ? null : index)
                  }
                  className="rounded-lg bg-slate-100 px-4 py-2 text-slate-800 hover:bg-slate-200"
                >
                  Traduction
                </button>
              </div>

              {selected === index && (
                <p className="mt-4 rounded-lg bg-green-50 p-3 font-medium text-green-800">
                  {word.french}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <SentenceBuilder />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="tp27-shell min-h-screen bg-slate-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded-lg focus:bg-white focus:p-3 focus:text-indigo-700"
        >
          Aller au contenu
        </a>
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <MobileNavigation />
        <ScrollToTop />

        <main
          id="main-content"
          className="tp27-content mx-auto max-w-4xl px-4 pb-32 pt-6 sm:px-5 lg:py-10"
        >
          <Suspense
            fallback={
              <div role="status" aria-live="polite" className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
                Chargement de la page…
              </div>
            }
          >
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lesson />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/alphabet" element={<Alphabet />} />
            <Route path="/numbers" element={<Numbers />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/family" element={<Family />} />
            <Route path="/path" element={<A0Path />} />
            <Route
              path="/a0/level/:levelId"
              element={<A0Level />}
            />
            <Route
              path="/achievements"
              element={<Achievements />}
            />
            <Route path="/practice-history" element={<PracticeHistory />} />
            <Route path="/listening" element={<Listening />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/reviews" element={<SmartReview />} />
            <Route path="/cefr" element={<CEFRPath />} />
            <Route path="/cefr/:unitId" element={<CEFRUnit />} />
            <Route path="/backup" element={<BackupRestore />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
