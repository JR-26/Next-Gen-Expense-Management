# Expense Analytics UI - Beautiful Frontend

A stunning, modern web UI for the Expense Analytics backend application. Built with React, Three.js, and modern design principles.

## Features

🎨 **Modern Design**

- Glassmorphism aesthetic
- Gradient backgrounds and text
- Neon glowing effects
- Smooth animations

🌐 **3D Visualizations**

- Animated floating orbs using Three.js
- Interactive data orbit visualization
- Real-time rotating animations

📊 **Data Analytics**

- Beautiful charts using Recharts
- Pie charts for category breakdown
- Line charts for trend analysis
- Bar charts for comparisons

📱 **Responsive Design**

- Mobile-first approach
- Tablet optimized
- Desktop-enhanced experience

## Tech Stack

- **Frontend Framework**: React 18
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **HTTP Client**: Axios

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

The development server runs on `http://localhost:3000`

## Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── FloatingOrbs.jsx      # Animated 3D orbs
│   │   │   └── DataOrbit.jsx          # Interactive orbit visualization
│   │   └── Navigation.jsx             # Main navigation bar
│   ├── pages/
│   │   ├── Dashboard.jsx              # Home page with hero section
│   │   ├── Upload.jsx                 # File upload interface
│   │   └── Results.jsx                # Analytics results display
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Key Features

### Dashboard

- Eye-catching hero section with 3D background
- Feature cards highlighting key capabilities
- Statistics showcase
- Call-to-action for getting started

### Upload Page

- Drag-and-drop file upload
- Progress indicator
- File validation
- Success confirmation with confetti animation

### Results Page

- Multiple visualization tabs
- 3D data orbit visualization
- Pie chart - expense breakdown
- Line chart - spending trends
- AI-generated insights and recommendations
- Download report functionality

## Styling System

### Glass Cards

- `.glass` - Light glassmorphism effect
- `.glass-dark` - Dark glassmorphism effect

### Gradients

- `.gradient-text` - Purple to red text gradient
- `.gradient-btn` - Interactive button gradient

### Effects

- `.neon-box` - Glowing border effect
- `.animate-float` - Floating animation
- `.animate-pulse-glow` - Pulsing glow animation

## API Integration

The frontend expects a backend API at the same domain (configured in vite.config.js):

### Endpoints

**POST** `/api/upload`

- File upload and processing
- Returns analysis results

**GET** `/api/results`

- Fetch analysis results
- Returns categorized expenses and report

## Color Palette

- **Primary**: Purple (#a855f7)
- **Secondary**: Pink (#ec4899)
- **Accent**: Red (#f43f5e)
- **Background**: Dark slate (#0f0f1e)

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Optimized 3D rendering
- CSS animations instead of JS
- Image optimization

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Future Enhancements

- Data export to PDF/CSV
- Custom date range filtering
- Multi-user support
- Dark/Light theme toggle
- Advanced filtering options
- Real-time notifications
