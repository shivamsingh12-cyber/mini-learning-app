# Mini Learning App
# An interactive web-based learning platform inspired by Duolingo-style lessons.
# Users learn through structured lessons, take quizzes, earn XP, track progress, and compete on a leaderboard.
# Admins can create and manage lessons via a built-in CMS panel.

## 🚀 Features

## 🎓 User Features
### User authentication (register, login)

### Browse lessons with categorized levels

### Take quizzes with instant scoring

### Earn XP per correct answer

### Track lesson progress

### View global leaderboard

## 🛠 Admin Features
# Create lessons

- Add multiple-choice questions

- Edit or delete lessons

- Full access to course content management

## 📊 System Features

### JWT-based authentication

### Embedded questions inside lesson documents

### XP scoring logic inside backend

### Progress tracking per user per lesson

### CORS-enabled API for frontend communication

## Tech Stack
# Frontend
- React (TypeScript)

# Backend

- Node.js + Express

- MongoDB + Mongoose

## DevOps

- Docker Compose (backend, frontend, MongoDB)

```css
root/
│
├── learning-app-backend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── Dockerfile
│
├── learning-app-frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
└── docker-compose.learning.yml
```