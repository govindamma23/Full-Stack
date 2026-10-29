# Task Manager (MERN)

Stack: MongoDB + Express + React (Vite) + Node.js

## Run
1. Start MongoDB locally (or put a MongoDB Atlas URL in server/.env).
2. Backend:   cd server && npm install && npm run dev      (http://localhost:5000)
3. Frontend:  cd client && npm install && npm run dev      (http://localhost:5173)

## API
GET    /api/tasks        list tasks
POST   /api/tasks        create  { title }
PUT    /api/tasks/:id    update  { title?, completed? }
DELETE /api/tasks/:id    delete
