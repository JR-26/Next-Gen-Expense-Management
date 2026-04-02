#!/bin/bash
# Complete Setup Script for Expense Analytics

set -e

echo "🚀 Expense Analytics - Complete Setup Script"
echo "============================================="
echo ""

# Check Python
echo "📦 Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.10+"
    exit 1
fi
echo "✅ Python version: $(python3 --version)"

# Check Node.js
echo ""
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi
echo "✅ Node version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# Backend Setup
echo ""
echo "🔧 Setting up Backend..."
cd server
echo "📥 Installing Python dependencies..."
pip install -r ../requirements.txt -q
pip install -r api-requirements.txt -q
echo "✅ Backend dependencies installed"

# Check for .env
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from example..."
    cp ../.env.example .env 2>/dev/null || echo "⚠️  No .env.example found"
fi

# Create directories
mkdir -p data/uploads
mkdir -p outputs
echo "✅ Backend directories created"

cd ..

# Frontend Setup
echo ""
echo "🎨 Setting up Frontend..."
cd frontend
echo "📥 Installing npm dependencies..."
npm install -q
echo "✅ Frontend dependencies installed"

# Check for .env
if [ ! -f .env.local ]; then
    echo "⚠️  No .env.local file found. Creating from example..."
    cp .env.example .env.local 2>/dev/null || echo "⚠️  No .env.example found"
fi

cd ..

echo ""
echo "============================================="
echo "✨ Setup Complete!"
echo "============================================="
echo ""
echo "🚀 Next steps:"
echo ""
echo "1️⃣  Terminal 1 - Start Backend:"
echo "   cd server"
echo "   python api.py"
echo ""
echo "2️⃣  Terminal 2 - Start Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3️⃣  Open Browser:"
echo "   http://localhost:3000"
echo ""
echo "📊 API Documentation:"
echo "   http://localhost:8000/docs"
echo ""
echo "Happy analyzing! 🎉"
