# Mini Learning App
- An interactive web-based learning platform inspired by Duolingo-style lessons.
- Users learn through structured lessons, take quizzes, earn XP, track progress, and compete on a leaderboard.
- Admins can create and manage lessons via a built-in CMS panel.

## 🚀 Features

## 🎓 User Features
- User authentication (register, login)

- Browse lessons with categorized levels

- Take quizzes with instant scoring

- Earn XP per correct answer

- Track lesson progress

- View global leaderboard

## 🛠 Admin Features
- Create lessons

- Add multiple-choice questions

- Edit or delete lessons

- Full access to course content management

## 📊 System Features

- JWT-based authentication

- Embedded questions inside lesson documents

- XP scoring logic inside backend

- Progress tracking per user per lesson

- CORS-enabled API for frontend communication

# Tech Stack
## Frontend
- React (TypeScript)

## Backend

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

# ⚙️ Installation (Local Development)
 1. Clone the repository
    * git clone <repo-url>
    * cd <repo-folder>
 2. Install backend dependencies
    * cd learning-app-backend
    * npm install
 3. Install frontend dependencies
    * cd learning-app-frontend
    * npm install
 4. Environment Variables
 Create learning-app-backend/.env
    ```bash
MONGO_URL=mongodb://mongo-learning:27017/learningApp
JWT_SECRET=****
CLIENT_URL=http://localhost:5173
PORT=your_port
    ```
 4. Start backend server
    * npm run dev

## Running with Docker (Dev Mode)
    1. Build and Start Container
        From the root folder
        ```bash
        - docker compose up --build
        ```


