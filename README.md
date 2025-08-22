# Task-Management-App-Backend

This is the **backend server** for the full-stack Task Management App. It handles user registration, login, and secure task management via **JWT-based authentication** using **Node.js, Express, and MongoDB**.

Fully integrated with the deployed frontend and built with scalability and clean code practices in mind.

<br />

## 🌐 Links
Frontend: [https://plan-live-techwithdeekksha.vercel.app](https://plan-live-techwithdeekksha.vercel.app)
<br/>
Backend: [https://plan-dep-techwithdeekksha.vercel.app](https://plan-dep-techwithdeekksha.vercel.app)

## 📂 Related Repositories
Frontend Code: [Task-Management-App](https://github.com/404notDeeksha/Task-Management-App)

<br />

## ⚙️ Tech Stack
- 🚀 Node.js
- 🔧 Express.js
- 🔐 JWT Authentication
- 📦 MongoDB Atlas (Cloud Database)
- 🌿 dotenv for environment configs
- 🧩 CORS for frontend integration
- ☁️ Deployed on Vercel
[![Vercel](https://img.shields.io/badge/Vercel-based)]

<br />

## ✨ Features
- 🔐 Secure JWT-based Authentication
- 🧑‍💼 User Registration & Login
- ✅ Full CRUD for Tasks
- 📅 Sort Tasks by Date, Priority, and Progress
- ⚙️ RESTful API with clean, modular structure
- 🧼 Follows best backend practices

<br />

## 📁 API Endpoints

### Auth Routes

- `POST /auth/signup` – Register a new user  
- `POST /auth/login` – Login and receive token  

### Task Routes

- `GET /tasks` – Get all tasks for the logged-in user  
- `POST /tasks` – Create a new task  
- `PUT /tasks/:id` – Update a specific task  
- `DELETE /tasks/:id` – Delete a specific task  

<br />

## 🛠️ Installation & Setup

```bash
# 1. Clone the repository:
git clone https://github.com/404notDeeksha/Task-Management-App-Backend
cd Task-Management-App-Backend

# 2. Install dependencies:
npm install

# 3. Create .env file with:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001

# 4. Start the server (production mode):
npm start

# 5. Start the server in development mode (with auto-reload):
npm run dev
```

<br/>

## 🚀 Upcoming Features

- Role-based access control (Admin/User permissions)
- Continuous Integration & Deployment (CI/CD) with automated testing  
  → Work in progress to ensure reliable builds and deployments
 
