import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Home, Upload as UploadIcon, BarChart3 } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="glass-dark sticky top-0 z-50 backdrop-blur-xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-400 group-hover:text-pink-400 transition-colors" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg group-hover:bg-pink-400/30 transition-all" />
            </div>
            <span className="text-xl font-bold gradient-text">ExpenseAI</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/upload" className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/15 text-gray-300 hover:text-white transition-all">
              <UploadIcon className="w-5 h-5" />
              <span>Upload</span>
            </Link>
            <Link to="/results" className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-btn text-white shadow-lg shadow-purple-500/50">
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
