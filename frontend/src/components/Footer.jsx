import React from 'react'
import { Mail, MessageSquare, Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 glass-dark mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              AI-powered expense analytics for smarter financial decisions.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">AI Categorization</a></li>
              <li><a href="#" className="hover:text-white transition">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition">Reports</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Follow</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><Mail className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Zap className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 ExpenseAI. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
