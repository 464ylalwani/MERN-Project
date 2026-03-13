# E-Commerce MERN App (Full Stack)

Production-ready **full-stack e-commerce project** built with **Node.js, Express, MongoDB, React (Vite)**.
Includes authentication system, admin dashboard, product management, API docs, testing, and Docker deployment.

---

## 🚀 Live Demo

[Live Link](https://mern-project-a3ev.onrender.com)

---

## 📸 Screenshots

![Homepage](screenshots/home.png)
![Product Page](screenshots/product.png)

---

## 🛠 Tech Stack

**Frontend**

- React
- Vite
- Context API
- Axios

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Other Tools**

- JWT Authentication
- Swagger API Docs
- Jest + Supertest
- Docker
- Redis (Caching)
- Stripe/Razorpay (Payments)
- AWS S3 / File Uploads

---

## 🚀 Features

- JWT Authentication (Access + Refresh Tokens)
- Role-Based Access Control (RBAC)
- Modular **Users & Products modules**
- QueryHelper for **search, filter, sort, pagination**
- Admin dashboard (React)
- API documentation using **Swagger**
- Backend API testing using **Jest + Supertest**
- Docker container deployment
- Redis caching for performance
- Secure environment variable configuration

---

## 📂 Project Structure

```
project-root/
│
├── backend/        # Node.js + Express API
├── frontend/       # React + Vite client
│
├── .gitignore
├── README.md
```

---

## ⚙️ Backend Setup

1. Go inside backend folder

```
cd backend
```

2. Install dependencies

```
npm install
```

3. Create `.env` file

```
MONGO_URI=mongodb://localhost:27017/your_db
JWT_ACCESS_SECRET=replace_with_strong_random
JWT_REFRESH_SECRET=replace_with_strong_random
NODE_ENV=development
```

4. Run backend

```
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 💻 Frontend Setup

1. Go inside frontend folder

```
cd frontend
```

2. Install dependencies

```
npm install
```

3. Create `.env` file

```
VITE_API_URL=http://localhost:5000/api
```

4. Run frontend

```
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🧪 Testing

Run backend tests:

```
cd backend
npm test
```

Testing uses **Jest + Supertest**.

---

## 📜 API Documentation

Swagger API documentation available at:

```
https://mern-project-a3ev.onrender.com/api-docs/
```

---

## 🐳 Docker Deployment

Build and start containers:

```
docker-compose up --build
```

---

## 🔑 Environment Variables

### Backend

- MONGO_URI
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- NODE_ENV

### Frontend

- VITE_API_URL

Example values can be stored in `.env.example`.

---

## 📹 Video Demo

Loom Demo Link:

```
https://loom.com/your-video-link
```

---

## 👨‍💻 Author

Developed by **Yogesh Lalwani**

LinkedIn:
https://www.linkedin.com/in/yogesh-lalwani-065312374/
