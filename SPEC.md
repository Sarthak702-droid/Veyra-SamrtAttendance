# AI Smart Attendance & Gesture Interaction System - Specification

## Project Overview

- **Project Name**: Verya - AI Smart Attendance System
- **Type**: Full-stack Web Application with ML/Computer Vision
- **Core Functionality**: AI-powered classroom management with face recognition attendance, gesture-based interaction, and real-time engagement analytics
- **Target Users**: Educational institutions (students, teachers, administrators)

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: GSAP + Framer Motion
- **State Management**: Zustand

### Backend
- **Framework**: Python FastAPI
- **Database ORM**: Prisma
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: JWT with mobile + OTP system

### ML/Computer Vision
- **Face Detection**: MediaPipe + OpenCV
- **Gesture Recognition**: MediaPipe Hand Tracking
- **Emotion Analysis**: DeepFace/Facial landmarks

---

## Architecture

```
Verya/
├── frontend/           # Next.js application
├── backend/            # Python FastAPI
│   ├── services/       # Business logic
│   ├── models/         # Database models
│   ├── routes/         # API endpoints
│   └── ml/             # ML models
└── prisma/             # Database schema
```

---

## UI/UX Specification

### Landing Page Design

#### Color Palette
- **Primary**: `#6366F1` (Indigo 500)
- **Secondary**: `#8B5CF6` (Violet 500)
- **Accent**: `#06B6D4` (Cyan 500)
- **Background**: `#F8FAFC` (Light gray)
- **Glassmorphism**: `rgba(255, 255, 255, 0.15)` with blur

#### Typography
- **Headings**: "Outfit" (Google Fonts)
- **Body**: "DM Sans" (Google Fonts)
- **Sizes**: H1: 64px, H2: 48px, H3: 32px, Body: 16px

#### Layout Sections
1. **Navbar** - Glassmorphic fixed header
2. **Hero** - 3D floating elements, animated gradient
3. **Features** - Card grid with hover effects
4. **How It Works** - Step-by-step with icons
5. **Stats** - Animated counters
6. **Testimonials** - Carousel
7. **Pricing** - Glassmorphic cards
8. **CTA** - Gradient background
9. **Footer** - Links and social

#### Animations
- GSAP scroll-trigger for sections
- Framer Motion for micro-interactions
- 3D floating shapes (CSS transforms)
- Smooth parallax effects

---

## Authentication System (Dummy)

### Mobile + OTP Flow
1. User enters mobile number
2. OTP sent to terminal (not real SMS)
3. User enters OTP
4. JWT token generated
5. Redirect to dashboard

### Mobile + Password Flow
1. User enters mobile + password
2. Password verified (hashed)
3. JWT token generated
4. Redirect to dashboard

### Roles
- `student`: View attendance, participate
- `teacher`: Manage class, view analytics
- `admin`: Full access, user management

---

## Backend Services Structure

### Core Services
```
backend/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Configuration
│   ├── database.py          # Database connection
│   ├── exceptions.py        # Custom exceptions
│   ├── middleware.py        # Middleware
│   ├── dependencies.py      # Dependency injection
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py           # API dependencies
│   │   └── router.py         # Main router
│   ├── services/
│   │   ├── auth_service.py  # Authentication logic
│   │   ├── user_service.py  # User management
│   │   ├── attendance_service.py
│   │   ├── gesture_service.py
│   │   ├── emotion_service.py
│   │   └── analytics_service.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── auth.py
│   │   ├── attendance.py
│   │   ├── gesture.py
│   │   └── analytics.py
│   ├── models/
│   │   ├── user.py
│   │   ├── attendance.py
│   │   ├── gesture.py
│   │   └── emotion.py
│   └── core/
│       ├── security.py      # JWT, password hashing
│       ├── token.py         # Token generation
│       └── config.py        # Settings
│   └── ml/
│       ├── face_detector.py
│       ├── gesture_recognizer.py
│       └── emotion_analyzer.py
```

---

## Database Schema (Prisma)

### Models
- **User**: id, name, email, phone, password, role, createdAt
- **Student**: id, userId, enrollmentNo, department, year
- **Teacher**: id, userId, department, designation
- **Attendance**: id, studentId, date, status, confidence, imagePath
- **Gesture**: id, studentId, gesture, timestamp, confidence
- **Emotion**: id, studentId, emotion, timestamp, confidence
- **Class**: id, name, teacherId, subject, schedule

---

## Functionality Specification

### Frontend Pages
1. `/` - Landing page
2. `/login` - Authentication page
3. `/register` - Registration page
4. `/dashboard` - Role-based dashboard
5. `/attendance` - Attendance management
6. `/gestures` - Gesture logs
7. `/analytics` - Charts and reports

### API Endpoints
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP + login
- `POST /api/auth/login` - Password login
- `POST /api/auth/register` - User registration
- `GET /api/attendance` - Get attendance
- `POST /api/attendance/mark` - Mark attendance
- `GET /api/gestures` - Get gesture logs
- `GET /api/emotions` - Get emotion logs
- `GET /api/analytics` - Get analytics

---

## Acceptance Criteria

### Landing Page
- [ ] Glassmorphic navbar with blur effect
- [ ] Animated hero with 3D elements
- [ ] Smooth scroll animations with GSAP
- [ ] All sections visible and styled
- [ ] Responsive on mobile/tablet/desktop

### Authentication
- [ ] Mobile number input validation
- [ ] OTP displays in terminal
- [ ] Password login works
- [ ] JWT token stored in localStorage
- [ ] Role-based redirect

### Backend
- [ ] FastAPI server runs
- [ ] Prisma connects to database
- [ ] All services properly separated
- [ ] ML models loadable
- [ ] Authentication works

### ML Integration
- [ ] Face detection functional
- [ ] Hand gesture detection functional
- [ ] Emotion analysis functional