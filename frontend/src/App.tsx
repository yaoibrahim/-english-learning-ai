import FeedbackCelebration from './components/audio/FeedbackCelebration'
import './styles/audio-feedback.css'
import { lazy, Suspense } from 'react'
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
import './styles/home.css'
import Home from './pages/Home'

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
const PracticeHistory = lazy(() => import('./pages/PracticeHistory'))
const Listening = lazy(() => import('./pages/Listening'))
const Speaking = lazy(() => import('./pages/Speaking'))
const Writing = lazy(() => import('./pages/Writing'))
const Reading = lazy(() => import('./pages/Reading'))
const SmartReview = lazy(() => import('./pages/SmartReview'))
const CEFRPath = lazy(() => import('./pages/CEFRPath'))
const CEFRUnit = lazy(() => import('./pages/CEFRUnit'))
const BackupRestore = lazy(() => import('./pages/BackupRestore'))
const Courses = lazy(() => import('./pages/Courses'))
const CourseUnitPage = lazy(() => import('./pages/CourseUnit'))
const CourseReferences = lazy(() => import('./pages/CourseReferences'))
const LibraryHome = lazy(() => import('./pages/LibraryHome'))
const LibraryVerbs = lazy(() => import('./pages/LibraryVerbs'))
const LibraryGrammar = lazy(() => import('./pages/LibraryGrammar'))
const LibraryConfusions = lazy(() => import('./pages/LibraryConfusions'))
const LibraryPhrasal = lazy(() => import('./pages/LibraryPhrasal'))
const LibraryPractice = lazy(() => import('./pages/LibraryPractice'))
const LibraryWordGame = lazy(() => import('./pages/LibraryWordGame'))
const LibrarySpellingGame = lazy(() => import('./pages/LibrarySpellingGame'))


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
        <FeedbackCelebration />

        <main
          id="main-content"
          className="tp27-content mx-auto max-w-5xl px-4 pb-32 pt-5 sm:px-5 lg:py-8"
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
            <Route path="/library" element={<LibraryHome />} />
            <Route path="/library/verbs" element={<LibraryVerbs />} />
            <Route path="/library/grammar" element={<LibraryGrammar />} />
            <Route path="/library/confusions" element={<LibraryConfusions />} />
            <Route path="/library/phrasal" element={<LibraryPhrasal />} />
            <Route path="/library/practice" element={<LibraryPractice />} />
            <Route path="/library/word-game" element={<LibraryWordGame />} />
            <Route path="/library/spelling-game" element={<LibrarySpellingGame />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/references" element={<CourseReferences />} />
            <Route path="/courses/:unitId" element={<CourseUnitPage />} />
              <Route path="*" element={<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center"><h1 className="text-2xl font-bold">Page introuvable</h1><p className="mt-3 text-slate-600">Cette page n’existe pas dans English Learning AI.</p><Link to="/" className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white">Retour à l’accueil</Link></div>} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
