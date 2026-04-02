import React from 'react'
import { AlertCircle } from 'lucide-react'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="glass rounded-2xl p-12 text-center neon-box border-red-500/30">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-300 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-8 py-3 gradient-btn rounded-lg text-white font-semibold shadow-lg shadow-purple-500/50"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
