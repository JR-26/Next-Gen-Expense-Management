import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, TrendingUp, Shield, Sparkles } from 'lucide-react'
import FloatingOrbs from '../components/3D/FloatingOrbs'

export default function Dashboard() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'AI-powered expense categorization in seconds',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Deep insights into your spending patterns',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and protected',
      color: 'from-green-400 to-emerald-400',
    },
    {
      icon: Sparkles,
      title: 'Intelligent Reports',
      description: 'Auto-generated human-readable analysis',
      color: 'from-purple-400 to-pink-400',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-96 z-0">
        <FloatingOrbs />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Expense Intelligence</span>
              <br />
              <span className="text-white">Reimagined</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Transform your expense data into actionable insights with our AI-powered analytics platform. 
              Categorize, analyze, and optimize your spending patterns instantly.
            </p>

            <button
              onClick={() => navigate('/upload')}
              className="gradient-btn px-8 py-4 rounded-lg text-white font-semibold flex items-center gap-3 mx-auto shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="group glass rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`text-4xl mb-4 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Transactions Processed', value: '1M+', icon: '📊' },
              { label: 'Accuracy Rate', value: '99.8%', icon: '🎯' },
              { label: 'Active Users', value: '10K+', icon: '👥' },
            ].map((stat, idx) => (
              <div key={idx} className="glass-dark rounded-2xl p-8 text-center neon-box animate-pulse-glow">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
