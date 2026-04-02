@echo off
REM Complete Setup Script for Expense Analytics (Windows)

echo.
echo 🚀 Expense Analytics - Windows Setup Script
echo =============================================
echo.

REM Check Python
echo 📦 Checking Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.10+
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do echo ✅ %%i

REM Check Node.js
echo.
echo 📦 Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    exit /b 1
)
echo ✅ Node version: 
node --version
echo ✅ NPM version:
npm --version

REM Backend Setup
echo.
echo 🔧 Setting up Backend...
cd server
echo 📥 Installing Python dependencies...
pip install -r ../requirements.txt
pip install -r api-requirements.txt
echo ✅ Backend dependencies installed

if not exist .env (
    echo ⚠️  No .env file found. Creating from example...
    if exist ..\.env.example (
        copy ..\.env.example .env
    )
)

if not exist data\uploads mkdir data\uploads
if not exist outputs mkdir outputs
echo ✅ Backend directories created

cd ..

REM Frontend Setup
echo.
echo 🎨 Setting up Frontend...
cd frontend
echo 📥 Installing npm dependencies...
call npm install
echo ✅ Frontend dependencies installed

if not exist .env.local (
    echo ⚠️  No .env.local file found. Creating from example...
    if exist .env.example (
        copy .env.example .env.local
    )
)

cd ..

echo.
echo =============================================
echo ✨ Setup Complete!
echo =============================================
echo.
echo 🚀 Next steps:
echo.
echo 1️⃣  Terminal 1 - Start Backend:
echo    cd server
echo    python api.py
echo.
echo 2️⃣  Terminal 2 - Start Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3️⃣  Open Browser:
echo    http://localhost:3000
echo.
echo 📊 API Documentation:
echo    http://localhost:8000/docs
echo.
echo Happy analyzing! 🎉
echo.
pause
