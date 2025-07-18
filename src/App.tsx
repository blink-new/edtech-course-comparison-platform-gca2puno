import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { CourseDetailPage } from './pages/CourseDetailPage'
import { ComparisonPage } from './pages/ComparisonPage'
import { AICourseFinder } from './pages/AICourseFinder'
import { UserDashboard } from './pages/UserDashboard'
import { DiagnosticAssessment } from './pages/DiagnosticAssessment'
import { ExamInfoHub } from './pages/ExamInfoHub'
import { CommunityForums } from './pages/CommunityForums'
import { StudySchedulePlanner } from './pages/StudySchedulePlanner'
import { blink } from './blink/client'
import { Toaster } from './components/ui/toaster'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EduCompare...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/ai-finder" element={<AICourseFinder />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/diagnostic-assessment" element={<DiagnosticAssessment />} />
            <Route path="/exam-info" element={<ExamInfoHub />} />
            <Route path="/community" element={<CommunityForums />} />
            <Route path="/study-planner" element={<StudySchedulePlanner />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App