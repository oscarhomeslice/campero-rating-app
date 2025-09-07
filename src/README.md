# 🌮 Campero Rating Competition

A vibrant, gamified food rating platform built for a week-long campero competition. This app features a colorful, animated UI inspired by mobile games like Clash of Clans, with smooth transitions and engaging micro-interactions.

## ✨ Features

### 🎮 Public User App
- **Gamified Home Screen** with progress tracking and daily stats
- **Interactive Rating System** with multi-dimensional sliders (Taste, Texture, Ingredients, Presentation, Bonus)
- **Real-time Emoji Feedback** that changes based on rating values
- **Dynamic Progress Bar** showing daily completion status
- **Confetti Animations** on rating submission
- **Mobile-First Responsive Design** with tab-based navigation
- **Restaurant Location Info** with meeting times and addresses

### 🛠️ Admin Panel
- **Dashboard Overview** with key statistics
- **Restaurant Management** with CRUD operations
- **User Activity Monitoring** with real-time updates
- **Leaderboard Management** with ranking display
- **Clean, Professional UI** using neutral color palette

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Orange to red (campero-inspired)
- **Secondary Gradient**: Teal to blue (fresh, appetizing)
- **Success Gradient**: Green variations
- **Typography**: Baloo 2 + Poppins fonts for playful yet readable text

### UI Components
- **Card-based Layout** with glassmorphism effects
- **Custom Sliders** with gradient tracks and animated thumbs
- **Interactive Buttons** with hover/press animations
- **Emoji Reactions** for enhanced user engagement
- **Smooth Transitions** powered by CSS animations

## 🏗️ Technical Architecture

### Frontend
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for styling with custom design system
- **Framer Motion** for smooth animations (planned)
- **Responsive Design** supporting mobile, tablet, and desktop

### Backend (Planned Integration)
- **InsForge.dev** for agent-native backend
- **Postgres Database** with the following models:
  - `users` - User profiles and authentication
  - `eventState` - Competition day and status tracking
  - `restaurants` - Daily restaurant information
  - `camperos` - Campero details and metadata
  - `camperoRatings` - Multi-dimensional user ratings
  - `restaurantRatings` - Simple 1-5 star ratings

### API Design
```
GET  /api/user/session          # Current user session
GET  /api/event/current         # Current day & event state
GET  /api/restaurants/today     # Today's restaurant
GET  /api/camperos/today        # Today's camperos
POST /api/ratings/campero       # Submit campero rating
POST /api/ratings/restaurant    # Submit restaurant rating
GET  /api/leaderboard          # Aggregated rankings
```

## 📱 Responsive Breakpoints

- **Mobile**: 375px (tab-based navigation)
- **Tablet**: 768px (transition layout)
- **Desktop**: 1280px+ (sidebar navigation)

## 🚀 Getting Started

### Demo Files
- `index.html` - Main user interface demo
- `admin.html` - Admin panel demo

### View the Demo
1. Open `index.html` in your browser to see the main app
2. Open `admin.html` to view the admin panel
3. Test the interactive rating sliders and UI components

### Next.js Development (Future)
```bash
npm install
npm run dev
```

## 🎯 Key Features Demonstrated

### ✅ Completed
- [x] Responsive mobile-first design
- [x] Interactive rating sliders with emoji feedback
- [x] Real-time score calculation
- [x] Gamified progress tracking
- [x] Admin dashboard with statistics
- [x] Restaurant and user management interfaces
- [x] Leaderboard display
- [x] Smooth animations and transitions

### 🔄 Planned Enhancements
- [ ] InsForge backend integration
- [ ] User authentication system
- [ ] Real-time data synchronization
- [ ] Push notifications
- [ ] Map integration for restaurant locations
- [ ] Advanced analytics and reporting

## 🎨 Design Philosophy

The app embraces a **playful, game-like aesthetic** while maintaining usability and accessibility. Every interaction is designed to feel rewarding and engaging, from the satisfying slider movements to the celebratory confetti effects.

## 📊 Rating System

### Campero Ratings (Multi-dimensional)
- **Taste** (1-10): Flavor profile and overall taste
- **Texture** (1-10): Mouthfeel and consistency  
- **Ingredients** (1-10): Quality and freshness of components
- **Presentation** (1-10): Visual appeal and plating
- **Bonus Points** (1-10): Special factors and creativity

### Restaurant Ratings
- Simple 1-5 star system with optional comments
- Overall experience and service quality

## 🏆 Competition Flow

1. **Daily Check-in**: Users see today's restaurant and available camperos
2. **Rating Phase**: Interactive rating of each campero with detailed feedback
3. **Progress Tracking**: Visual progress bar and completion status
4. **Leaderboard**: Real-time ranking updates throughout the competition
5. **Admin Oversight**: Backend management and moderation tools

---

Built with ❤️ for food lovers and competition enthusiasts!
