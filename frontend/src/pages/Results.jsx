import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, RefreshCw, Home, Loader } from 'lucide-react'
import DataOrbit from '../components/3D/DataOrbit'
import toast from 'react-hot-toast'

export default function Results() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const response = await axios.get('/api/results')
      setData(response.data)
      setLoading(false)
    } catch (error) {
      toast.error('Failed to load results')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading your analysis...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'categories', label: 'Categories' },
    { id: 'trends', label: 'Trends' },
    { id: 'report', label: 'Report' },
  ]

  // Mock data for demonstration
  const categoriesData = [
    { name: 'Travel', value: 2500, fill: '#a855f7' },
    { name: 'Food', value: 1800, fill: '#ec4899' },
    { name: 'Entertainment', value: 980, fill: '#f43f5e' },
    { name: 'Utilities', value: 1200, fill: '#06b6d4' },
    { name: 'Other', value: 720, fill: '#8b5cf6' },
  ]

  const trendData = [
    { month: 'Jan', expenses: 4000 },
    { month: 'Feb', expenses: 3800 },
    { month: 'Mar', expenses: 4200 },
    { month: 'Apr', expenses: 3600 },
    { month: 'May', expenses: 4800 },
    { month: 'Jun', expenses: 4300 },
  ]

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Analysis Results</h1>
            <p className="text-gray-300">Your expense insights powered by AI</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchResults}
              className="flex items-center gap-2 px-6 py-3 rounded-lg glass hover:bg-white/20 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 gradient-btn rounded-lg text-white shadow-lg shadow-purple-500/50"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </button>
          </div>
        </div>

        {/* 3D Data Visualization */}
        <div className="glass rounded-2xl p-6 mb-8 h-96 neon-box">
          <h2 className="text-2xl font-bold mb-4">3D Data Visualization</h2>
          <DataOrbit />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 glass rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-500/30 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Expenses', value: '$7,200', change: '+12%', color: 'from-red-500 to-orange-500' },
                { label: 'Average Monthly', value: '$1,200', change: '-8%', color: 'from-blue-500 to-cyan-500' },
                { label: 'Top Category', value: 'Travel', change: 'High' },
                { label: 'Efficiency', value: '87%', change: '↑ Good' },
              ].map((item, idx) => (
                <div key={idx} className="glass rounded-xl p-6 neon-box">
                  <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                  <p className="text-3xl font-bold mb-2">{item.value}</p>
                  <p className={`text-sm ${item.change?.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                    {item.change}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 neon-box">
                <h3 className="text-2xl font-bold mb-6">Expenses by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: $${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-xl p-6 neon-box">
                <h3 className="text-2xl font-bold mb-6">Category Breakdown</h3>
                <div className="space-y-3">
                  {categoriesData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <span className="font-semibold">${item.value}</span>
                      <span className="text-gray-400 text-sm ml-4">
                        {((item.value / 7200) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="glass rounded-xl p-6 neon-box">
              <h3 className="text-2xl font-bold mb-6">Spending Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                    formatter={(value) => `$${value}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="glass rounded-xl p-8 neon-box">
              <h3 className="text-2xl font-bold mb-6">AI-Generated Report</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Based on your expense data analysis, we've identified the following key insights:
                </p>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">📊 Summary</h4>
                  <p>Your total expenses for this period are $7,200 across five main categories. Travel expenses represent your largest spending category at 34.7% of total expenses.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">💡 Recommendations</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Consider consolidating travel bookings to save 15-20%</li>
                    <li>Set a monthly dining budget to control food expenses</li>
                    <li>Review entertainment subscriptions - potential savings of $150/month</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">📈 Forecast</h4>
                  <p>If current spending trends continue, annual expenses will reach approximately $86,400. With recommended optimizations, you could reduce this by up to 18%.</p>
                </div>
              </div>
              <button className="mt-8 flex items-center gap-2 px-8 py-3 gradient-btn rounded-lg text-white font-semibold shadow-lg shadow-purple-500/50">
                <Download className="w-5 h-5" />
                Download Full Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
