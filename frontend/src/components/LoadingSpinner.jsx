import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-16 h-16">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <p className="text-gray-300 text-lg">{text}</p>
    </motion.div>
  )
}
