# 🎨 UI/UX Design Specification

## Visual Design System

### Color Palette

#### Primary Colors

- **Purple**: `#a855f7` - Main brand color
- **Pink**: `#ec4899` - Accent color
- **Red**: `#f43f5e` - Call-to-action
- **Cyan**: `#06b6d4` - Data visualization

#### Background Colors

- **Dark Base**: `#0f0f1e` - Main background
- **Dark Secondary**: `#1a0a2e` - Cards/containers
- **Slate**: `#1e293b` - Alternative

#### Semantic Colors

- **Success**: `#10b981` - Green for positive
- **Warning**: `#f59e0b` - Orange for warnings
- **Error**: `#ef4444` - Red for errors
- **Info**: `#3b82f6` - Blue for information

### Typography

#### Font Family

- **System Stack**: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen
- **Fallback**: Arial, sans-serif
- **Monospace**: 'Courier New', monospace (for code)

#### Font Sizes

- **Display**: 40-56px (Hero titles)
- **H1**: 32-40px (Page titles)
- **H2**: 24-28px (Section titles)
- **H3**: 18-22px (Subsection titles)
- **Body**: 16px (Default)
- **Small**: 14px (Secondary)
- **Tiny**: 12px (Meta info)

#### Font Weights

- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Spacing System

```
Base unit: 4px

Margin/Padding scale:
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)
- 3xl: 64px (4rem)
```

### Border Radius

- **Small**: 4px (buttons, small elements)
- **Medium**: 8px (cards, containers)
- **Large**: 12px (modals)
- **XL**: 16px (major containers)
- **Full**: 9999px (pills, avatars)

### Shadows

#### Light Shadow

```css
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
```

#### Medium Shadow

```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

#### Large Shadow (Glassmorphism)

```css
box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
```

#### Glow Shadow

```css
box-shadow: 0 0 40px rgba(168, 85, 247, 0.7);
```

---

## Component Design

### Glass Card

```
Background: rgba(255, 255, 255, 0.05) with backdrop blur
Border: 1px solid rgba(255, 255, 255, 0.2)
Effect: glassmorphism
Padding: 24px
Border Radius: 16px
```

### Button Styles

#### Primary Button (CTA)

- **Background**: Gradient purple → pink → red
- **Padding**: 16px 32px
- **Border Radius**: 8px
- **Text Color**: White
- **Hover Effect**: Box shadow glow
- **Font Weight**: 600

#### Secondary Button

- **Background**: Transparent with glass effect
- **Border**: 1px solid rgba(255, 255, 255, 0.2)
- **Padding**: 12px 24px
- **Hover Effect**: Increase opacity

#### Icon Button

- **Size**: 40x40px
- **Border Radius**: 8px
- **Icon Color**: Inherits from text
- **Hover**: Change to accent color

---

## Page Layouts

### Dashboard (Home Page)

```
┌────────────────────────────────────────────┐
│          Navigation Bar                    │
├────────────────────────────────────────────┤
│                                            │
│            3D FLOATING ORBS                │
│            (Background Animation)          │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│     Hero Section                           │
│     - Title: "Expense Intelligence"        │
│     - Subtitle: Description                │
│     - CTA Button: "Get Started"            │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│     Features Grid (4 columns)              │
│     ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐│
│     │Feature│  │Feature│  │Feature│  │Future││
│     │  1   │  │  2   │  │  3   │  │  4   ││
│     └──────┘  └──────┘  └──────┘  └──────┘│
│                                            │
├────────────────────────────────────────────┤
│                                            │
│     Stats Section (3 columns)              │
│     ┌─────────────┐  Stat 1                │
│     │   Stats     │  ┌─────────────┐       │
│     │   Display   │  │   Stats     │       │
│     │  Glowing    │  │   Display   │       │
│     │   Border    │  │  Glowing    │       │
│     └─────────────┘  │   Border    │       │
│                      └─────────────┘       │
│                                            │
├────────────────────────────────────────────┤
│            Footer                          │
└────────────────────────────────────────────┘
```

### Upload Page

```
┌────────────────────────────────────────────┐
│          Navigation Bar                    │
├────────────────────────────────────────────┤
│                                            │
│         Upload Title & Description         │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│              Upload Box                    │
│        ┌──────────────────────────┐        │
│        │   UPLOAD ICON (bounce)   │        │
│        │  ↕  Drag & Drop Here     │        │
│        │   or Click to Browse     │        │
│        │                          │        │
│        │   [Browse Files Button]  │        │
│        │   [Start Analysis]       │        │
│        └──────────────────────────┘        │
│                                            │
│       (With file: shows filename)          │
│       (While uploading: progress bar)      │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│      Info Cards (3 columns)                │
│      ┌─────────┐  ┌─────────┐  ┌─────────┐│
│      │Format   │  │Max Size │  │Time     ││
│      │.xlsx    │  │50 MB    │  │<2 min   ││
│      └─────────┘  └─────────┘  └─────────┘│
│                                            │
├────────────────────────────────────────────┤
│            Footer                          │
└────────────────────────────────────────────┘
```

### Results Page

```
┌────────────────────────────────────────────┐
│    Navigation + Refresh/Dashboard Buttons  │
├────────────────────────────────────────────┤
│                                            │
│            3D Data Visualization           │
│       (Animated Orbit with Data)           │
│      ┌──────────────────────────────┐      │
│      │   ROTATING ORBS & SPHERES    │      │
│      │   3D VISUALIZATION CANVAS    │      │
│      │   (Three.js Rendering)       │      │
│      └──────────────────────────────┘      │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│   Tabs: Overview | Categories | Trends    │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│   TAB CONTENT (Dynamic)                    │
│                                            │
│   Overview Tab:                            │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │
│   │Total │  │Avg Mo│  │Top C │  │Eff   │  │
│   │Exp   │  │nthly │  │at    │  │iciency  │
│   └──────┘  └──────┘  └──────┘  └──────┘  │
│                                            │
│   Categories Tab:                          │
│   ┌─────────────────┐  ┌─────────────────┐│
│   │   Pie Chart     │  │ Category List   ││
│   │                 │  │ with %          ││
│   │ (Visual breakdown)  │ breakdown    ││
│   └─────────────────┘  └─────────────────┘│
│                                            │
│   Trends Tab:                              │
│   ┌─────────────────────────────────────┐ │
│   │   Line Chart - Spending Over Time   │ │
│   │   X-axis: Months                    │ │
│   │   Y-axis: Amount                    │ │
│   └─────────────────────────────────────┘ │
│                                            │
│   Report Tab:                              │
│   ┌─────────────────────────────────────┐ │
│   │  📊 Summary                         │ │
│   │  💡 Recommendations                │ │
│   │  📈 Forecast                        │ │
│   │  [Download Report Button]           │ │
│   └─────────────────────────────────────┘ │
│                                            │
├────────────────────────────────────────────┤
│            Footer                          │
└────────────────────────────────────────────┘
```

---

## Animation Specifications

### Page Transitions

- **Duration**: 300ms
- **Easing**: ease-in-out
- **Effect**: Fade-in + Slide-up

### Hover Effects

- **Duration**: 200ms
- **Scale**: 1.02x (slight grow)
- **Shadow**: Enhance glow effect
- **Color**: Brighten accent colors

### Loading State

- **Spinner**: Rotating circles
- **Duration**: 1.5s per rotation
- **Color**: Purple → Pink gradient

### Success Animation

- **Confetti**: Canvas Confetti
- **Duration**: 2s
- **Particles**: 100
- **Spread**: 70 degrees

### Floating Animation

- **Duration**: 6s
- **Easing**: ease-in-out
- **Distance**: ±20px vertically

### Pulse Glow

- **Duration**: 2s
- **Effect**: Shadow pulsing in/out
- **Range**: 20px to 40px blur

---

## Responsive Design Breakpoints

```
Mobile:    0px - 640px   (sm)
Tablet:    640px - 1024px (md)
Desktop:   1024px - 1536px (lg)
Wide:      1536px+      (2xl)
```

### Layout Adaptations

**Mobile (0px - 640px)**

- Single column layouts
- Full-width buttons
- 16px padding
- Touch-friendly (44px+ tap targets)

**Tablet (640px - 1024px)**

- 2 column grids
- Adjusted font sizes
- 20px padding

**Desktop (1024px+)**

- 3-4 column grids
- Full features
- 24px padding

---

## Accessibility

### Color Contrast

- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Icons: Same as text

### Focus States

- **Outline**: 2px solid purple
- **Offset**: 2px
- **Visible** on all interactive elements

### Touch Targets

- **Minimum size**: 44x44px
- **Spacing**: 8px between targets
- **Mobile optimized**: Larger buttons

### Text

- **Line height**: 1.5 for body text
- **Letter spacing**: Comfortable
- **Font size**: No smaller than 12px
- **Color**: High contrast

---

## Dark Mode Features

- ✅ Purple-based theme
- ✅ Glassmorphism effects
- ✅ Reduced eye strain
- ✅ High contrast text
- ✅ Glowing accents

---

## Loading States

### Skeleton Screens

- Placeholder shimmer effect
- Matches final layout
- Smooth transition to content

### Progress Indicators

- Linear progress bars
- Circular spinners
- Percentage display
- Time estimates

### Empty States

- Illustrative imagery
- Helpful messaging
- Call-to-action suggestion
- No discouraging language

---

## Error States

### Error Display

- Red/orange accent color
- Clear error message
- Suggested fix
- Retry/back button

### Toast Notifications

- Bottom-right corner
- Auto-dismiss (5s)
- Different variants:
  - **Success**: Green
  - **Error**: Red
  - **Warning**: Orange
  - **Info**: Blue

---

## Form Design

### Input Fields

- **Padding**: 12px 16px
- **Border**: 2px solid transparent
- **Focus border**: Purple
- **Background**: Slightly lighter

### Labels

- **Position**: Above input
- **Weight**: 600
- **Color**: Gray-300
- **Margin**: 8px bottom

### Validation

- **Valid**: Green checkmark
- **Invalid**: Red cross + message
- **In progress**: Spinner

---

## Icons & Visual Elements

### Icon Usage

- **Size**: 16px (small), 24px (medium), 32px (large)
- **Color**: Inherit from text
- **Hover**: Change to accent color
- **Library**: Lucide React

### Illustrations

- **Style**: Clean, modern, minimal
- **Colors**: Brand palette
- **Size**: 64-128px
- **Position**: Center or side

---

## Performance Considerations

### Image Optimization

- WebP format
- Responsive sizes
- Lazy loading
- SVG for icons

### Animation Performance

- GPU-accelerated transforms
- Reduced motion support
- Frame rate: 60 FPS
- Memory efficient

### Rendering

- Virtual scrolling for lists
- Debounced search
- Memoized components
- Efficient re-renders

---

## Print Styles

### Print Layout

- Hide navigation/footer
- Black text on white
- Full width content
- Page breaks for charts

### Print Colors

- Maintain readability
- Black text default
- Charts print-friendly
- Remove backgrounds

---

## Accessibility Checklist

- ✅ Color contrast tested
- ✅ Keyboard navigation works
- ✅ Screen reader compatible
- ✅ Focus states visible
- ✅ Touch targets sufficient
- ✅ Error messages clear
- ✅ Loading states indicated
- ✅ Motion reduced option

---

## Design System Summary

This elegant design system creates:

- **Visual Cohesion** through consistent colors and spacing
- **User Delight** with smooth animations and transitions
- **Accessibility** with high contrast and clear interactions
- **Responsiveness** across all device sizes
- **Performance** with optimized rendering

**Result**: A stunning, modern, accessible UI that users love! ✨
