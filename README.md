# Full Stack Project (Backend + Frontend)

This is a production-ready full-stack project built with **Node.js, Express, MongoDB** (backend) and **React + Vite** (frontend).  
It includes authentication, user/product modules, admin dashboard, and deployment setup.

---

## 🚀 Features

- JWT authentication (Access + Refresh)
- Role Based Access Control (RBAC)
- Modular Users & Products modules
- QueryHelper for search, filter, sort, pagination
- Admin dashboard (React)
- Swagger API docs + Jest tests
- Docker deployment ready

---

## 📂 Project Structure

project-root/
│── backend/ # Node.js + Express server
│── frontend/ # React + Vite app
│── .gitignore
│── README.md

---

## ⚙️ Backend Setup

1. Go inside backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Create `.env` file:
   MONGO_URI=mongodb://localhost:27017/your_db
   JWT_ACCESS_SECRET=replace_with_strong_random
   JWT_REFRESH_SECRET=replace_with_strong_random
   NODE_ENV=development

4. Run backend in dev mode:
   npm run dev

Backend will start on **http://localhost:5000**

---

## 💻 Frontend Setup

1. Go inside frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Create `.env` file:
   VITE_API_URL=http://localhost:3000/api

4. Run frontend in dev mode:
   npm run dev

Frontend will start on **http://localhost:3000**

---

## 🧪 Testing

In backend folder, run:
npm test
This runs Jest + Supertest test cases.

---

## 🐳 Docker Deployment

1. Make sure Docker is installed.
2. From root folder, build and run:
   docker-compose up --build

---

## 🔑 Environment Variables

### Backend

- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `NODE_ENV`

### Frontend

- `VITE_API_URL`

👉 Example values can be kept in `.env.example`.

---

## 👤 Author

Developed by **Yogesh Lalwani**
