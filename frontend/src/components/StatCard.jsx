import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ label, value, change, color = 'purple' }) {
  const isPositive = !change?.includes('-') && !change?.includes('↓')
  const colorMap = {
    purple: 'from-purple-500/20 to-purple-400/10',
    blue: 'from-blue-500/20 to-blue-400/10',
    pink: 'from-pink-500/20 to-pink-400/10',
    green: 'from-green-500/20 to-green-400/10',
  }

  return (
    <motion.div
      className={`glass rounded-xl p-6 bg-gradient-to-br ${colorMap[color]} border-l-4 ${
        isPositive ? 'border-green-500' : 'border-red-500'
      }`}
      whileHover={{ translateY: -5 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-white">{value}</p>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
    </motion.div>
  )
}
