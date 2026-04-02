import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Results from './pages/Results'
import Navigation from './components/Navigation'
import { expenseAPI } from "./api/client";
export default function App() {
  const [analysisData, setAnalysisData] = useState(null)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload setAnalysisData={setAnalysisData} />} />
          <Route path="/results" element={<Results data={analysisData} />} />
        </Routes>
      </div>
    </Router>
  )
}
