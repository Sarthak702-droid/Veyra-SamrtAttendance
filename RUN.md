# Verya - Running the Application

## Prerequisites
- Node.js 18+ 
- Python 3.10+
- PostgreSQL (optional - runs in memory for demo)

---

## Quick Start Commands

### Frontend (Next.js)
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```
- Open: http://localhost:3000

### Backend (FastAPI)
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
python -m app.main
```
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

---

## Docker Setup

### Option 1: Run Everything with Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  # Frontend
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev

  # Backend
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
      - /app/venv
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/verya
    depends_on:
      - db

  # PostgreSQL Database
  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=verya
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Option 2: Separate Dockerfiles

#### Frontend Dockerfile
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

#### Backend Dockerfile
```dockerfile
# backend/Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "-m", "app.main"]
```

---

## Docker Commands

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild specific service
docker-compose build frontend
docker-compose up frontend
```

---

## Development Commands

### Backend Tests
```bash
cd backend
python -m pytest
```

### Frontend Build
```bash
cd frontend
npm run build
npm run start  # Production
```

### Linting
```bash
cd frontend
npm run lint
```

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/verya
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Production Deployment

### Using Docker (Production)
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up --build

# Scale services
docker-compose up -d --scale backend=3
```

### Cloud Deployment
- Frontend: Vercel, Netlify
- Backend: Render, Railway, AWS ECS
- Database: Supabase, Neon (PostgreSQL)

---

## Project Structure Summary

```
Verya/
├── frontend/           # Next.js 14 (App Router)
│   ├── src/app/        # Pages (page.tsx, login, dashboard)
│   ├── public/         # Static assets
│   └── package.json    # Dependencies
│
├── backend/            # Python FastAPI
│   ├── app/
│   │   ├── main.py    # Entry point
│   │   ├── config.py  # Settings
│   │   ├── api/       # Routes & endpoints
│   │   ├── services/  # Business logic
│   │   ├── schemas/   # Pydantic models
│   │   ├── core/      # Security & tokens
│   │   └── ml/        # ML models (MediaPipe)
│   ├── requirements.txt
│   └── Dockerfile
│
├── prisma/            # Database schema
├── docker-compose.yml # Docker orchestration
└── README.md
```

---

## Common Issues

### Frontend
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install

# Fix TypeScript errors
npm run build
```

### Backend
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check Python version
python --version
```

### Database
```bash
# Reset database (if using Prisma)
cd prisma
npx prisma migrate reset
npx prisma db push
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/send-otp | Send OTP to phone |
| POST | /api/auth/verify-otp | Verify OTP & login |
| POST | /api/auth/login | Login with password |
| POST | /api/auth/register | Register new user |
| GET | /api/attendance | Get attendance records |
| POST | /api/attendance/mark | Mark attendance |
| GET | /api/gestures | Get gesture logs |
| POST | /api/gestures/log | Log gesture |
| GET | /api/emotions | Get emotion records |
| POST | /api/emotions/log | Log emotion |
| GET | /api/analytics/summary | Dashboard summary |

---

## Demo Credentials

- **OTP**: `123456` (check terminal)
- **Password Login**: Phone: `9876543210`, Password: `admin123`