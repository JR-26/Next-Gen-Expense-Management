# Expense Analytics - Complete Setup Guide

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn
- CUDA (optional, for GPU acceleration)

## 🚀 Quick Start

### Backend Setup

1. **Install Python dependencies:**

```bash
cd server
pip install -r ../requirements.txt
pip install -r api-requirements.txt
```

2. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Create data directories:**

```bash
mkdir -p data/uploads
mkdir -p outputs
```

4. **Start the API server:**

```bash
python api.py
```

The server will start on `http://localhost:8000`

### Frontend Setup

1. **Install dependencies:**

```bash
cd frontend
npm install
```

2. **Create environment file:**

```bash
cp .env.example .env.local
```

3. **Start development server:**

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
final-year-project/
├── server/
│   ├── api.py                          # FastAPI application
│   ├── main.py                         # Original pipeline
│   ├── PEFT_pipeline.py                # Model processing
│   ├── crew_pipeline.py                # AI agents
│   ├── model_loader.py                 # Model loading
│   ├── cuda_verification.py            # CUDA check
│   ├── agents/                         # AI agents
│   ├── data/                           # Data directory
│   └── outputs/                        # Results
├── frontend/
│   ├── src/
│   │   ├── components/                 # React components
│   │   ├── pages/                      # Page components
│   │   ├── api/                        # API client
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🎨 Features

### Frontend

- **Beautiful UI** with glassmorphism design
- **3D Visualizations** using Three.js
- **Interactive Charts** with Recharts
- **Real-time Upload** with progress tracking
- **Dark Theme** with purple/pink gradients
- **Responsive Design** for all devices

### Backend API

- **File Processing** - Handle Excel uploads
- **AI Analysis** - Categorize expenses with ML
- **Report Generation** - Create intelligent summaries
- **RESTful Endpoints** - JSON API for easy integration

## 🔌 API Endpoints

### Health Check

```
GET /api/health
```

### Upload & Process

```
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: Excel (.xlsx) file
```

### Get Results

```
GET /api/results
```

### Get Summary

```
GET /api/summary
```

### Get Categories

```
GET /api/categories
```

## 🛠 Development

### Frontend Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development

```bash
# Run API with auto-reload
uvicorn server.api:app --reload --port 8000

# Run original pipeline
python server/main.py
```

## 📊 Data Flow

```
Excel File
    ↓
Frontend Upload
    ↓
Backend API
    ↓
PEFT Pipeline (Categorization)
    ↓
CrewAI Pipeline (Analysis)
    ↓
JSON + Report
    ↓
Frontend Visualization
    ↓
Beautiful Dashboard
```

## 🎯 Customization

### Change Color Scheme

Edit `frontend/src/index.css` and `tailwind.config.js`

### Modify 3D Graphics

Update `frontend/src/components/3D/` components

### Adjust AI Analysis

Modify `server/crew_pipeline.py` and agents

### Add New Pages

Create new files in `frontend/src/pages/`

## 🔒 Security

- API uses CORS middleware (configure for production)
- File validation on upload
- Temporary files are cleaned up
- Environment variables for sensitive data

## 📈 Performance

- Frontend: ~300KB gzipped
- 3D rendering optimized with Framer Motion
- Lazy loading of components
- API response caching ready

## 🐛 Troubleshooting

### CUDA Errors

Run `cuda_verification.py` to check GPU availability

### API Connection Issues

- Check backend is running on port 8000
- Verify CORS settings in `api.py`
- Check frontend `.env.local` has correct API URL

### Missing Dependencies

```bash
# Backend
pip install --upgrade -r requirements.txt

# Frontend
npm install --legacy-peer-deps
```

## 📝 Environment Variables

### Backend (.env)

```
GROQ_API_KEY=your_key
CUDA_VISIBLE_DEVICES=0
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:8000
```

## 🚢 Production Deployment

### Backend

```bash
# Using Gunicorn
gunicorn server.api:app --workers 4 --worker-class uvicorn.workers.UvicornWorker

# Or Docker
docker build -t expense-api .
docker run -p 8000:8000 expense-api
```

### Frontend

```bash
# Build
npm run build

# Deploy dist/ folder to CDN or web server
```

## 📚 Documentation

- Frontend: See `frontend/README.md`
- Backend: See `server/` directory files
- API: Available at `http://localhost:8000/docs` (Swagger UI)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License - See LICENSE file

## 💬 Support

For issues or questions:

1. Check existing issues
2. Review documentation
3. Create detailed bug report

## 🎉 Ready to Go!

Your AI-powered expense analytics platform is ready. Start by:

1. Running the backend
2. Running the frontend
3. Uploading your expense data
4. Exploring beautiful analytics!

Happy analyzing! 🚀
