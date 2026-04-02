import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

export default function CategoryChart({ data }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const transformed = data.map(item => ({
        name: item.category || item.name,
        value: item.amount || item.value,
        fill: item.color || '#a855f7'
      }))
      setChartData(transformed)
    }
  }, [data])

  return (
    <motion.div
      className="glass rounded-xl p-6 neon-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Category Distribution</h3>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
              formatter={(value) => `$${value}`}
            />
            <Bar dataKey="value" fill="#a855f7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-400 text-center py-8">No data available</p>
      )}
    </motion.div>
  )
}
