# 🚀 Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### Step 1: Backend (Terminal 1)

**Windows:**

```powershell
cd server
python api.py
```

**macOS/Linux:**

```bash
cd server
python3 api.py
```

Wait for: `Uvicorn running on http://0.0.0.0:8000`

### Step 2: Frontend (Terminal 2)

**Windows:**

```powershell
cd frontend
npm run dev
```

**macOS/Linux:**

```bash
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:3000`

### Step 3: Open Browser

```
http://localhost:3000
```

### Step 4: Upload & Analyze

1. Click "Upload" in navigation
2. Drag & drop your Excel file (.xlsx)
3. Click "Start Analysis"
4. View results on Analytics page

---

## 🐳 Docker Quick Start

```bash
# Build and run everything
docker-compose up --build

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

---

## 📁 Important Directories

```
server/
├── api.py              ← Main API file
├── data/uploads/       ← Uploaded files
└── outputs/
    ├── categorized.json    ← Results
    └── final_report.txt    ← AI Report

frontend/
├── src/
│   ├── pages/          ← Main pages
│   ├── components/     ← React components
│   └── api/            ← API client
└── package.json
```

---

## 🔑 Environment Variables

### Backend (.env in server/)

```
GROQ_API_KEY=your_key_here
CUDA_VISIBLE_DEVICES=0
```

### Frontend (.env.local in frontend/)

```
VITE_API_URL=http://localhost:8000
```

---

## 📊 Core Features

✨ **Beautiful UI**

- Glassmorphism design
- 3D animated visualizations
- Smooth animations
- Dark theme

🤖 **AI Analysis**

- Automatic categorization
- Pattern recognition
- Intelligent insights
- Generated reports

📈 **Analytics**

- Category breakdown
- Spending trends
- Pie charts
- Line graphs

---

## 🔗 API Endpoints

| Method | Endpoint          | Purpose                |
| ------ | ----------------- | ---------------------- |
| GET    | `/api/health`     | Check API status       |
| POST   | `/api/upload`     | Upload & analyze file  |
| GET    | `/api/results`    | Get analysis results   |
| GET    | `/api/summary`    | Get expense summary    |
| GET    | `/api/categories` | Get category breakdown |

---

## 📚 Documentation

- [Full Setup Guide](SETUP.md)
- [Performance Guide](OPTIMIZATION.md)
- [Frontend README](frontend/README.md)
- [Backend API Docs](http://localhost:8000/docs) (when running)

---

## ✅ Checklist

- [ ] Python 3.10+ installed
- [ ] Node.js 18+ installed
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Browser opens to localhost:3000
- [ ] Can upload Excel file
- [ ] Results display correctly
- [ ] Charts render properly

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port
# Windows: netstat -ano | findstr :8000
# macOS/Linux: lsof -i :8000

# Kill process (if needed)
# Windows: taskkill /PID <process_id> /F
# macOS/Linux: kill -9 <process_id>
```

### Module Not Found

```bash
# Backend
pip install -r requirements.txt -r server/api-requirements.txt

# Frontend
npm install --legacy-peer-deps
```

### CORS Issues

- Backend should be running
- Check frontend .env.local has correct API_URL
- Verify backend port 8000 is accessible

---

## 🎯 Next Steps

1. ✅ Get it running
2. 📤 Upload expense data
3. 📊 Explore analytics
4. 💾 Download reports
5. 🚀 Deploy to production

---

## 📞 Support

**Having issues?**

1. Check [SETUP.md](SETUP.md) for detailed setup
2. Check [OPTIMIZATION.md](OPTIMIZATION.md) for performance tips
3. Review terminal output for error messages
4. Check firewall/antivirus settings

---

## 🎉 You're Ready!

Your beautiful expense analytics platform is configured and running.

**Happy analyzing!** 🚀

---

**Remember:** Always keep your dependencies updated!

```bash
# Frontend
npm update

# Backend
pip install --upgrade -r requirements.txt
```
