import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimatedCard({ children, delay = 0, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <div className="glass rounded-xl overflow-hidden">
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl -z-10"
          animate={{
            opacity: isHovered ? 0.2 : 0.1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            filter: isHovered ? 'blur(20px)' : 'blur(10px)',
          }}
        />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
