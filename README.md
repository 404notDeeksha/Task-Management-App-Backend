# 🛠️ todo-app-backend

This is the **backend server** for the full-stack Task Management App. It handles user registration, login, and secure task management via **JWT-based authentication** using **Node.js, Express, and MongoDB**.

Fully integrated with the deployed frontend and built with scalability and clean code practices in mind.

<br />

## 🌐 Frontend URL

**Frontend Live:** [https://todo-app-frontend.vercel.app](https://todo-app-frontend.vercel.app)

<br />

## ⚙️ Tech Stack

- 🚀 Node.js
- 🔧 Express.js
- 🔐 JWT Authentication
- 📦 MongoDB + Mongoose
- 🌿 dotenv for environment configs
- 🧩 CORS for frontend integration
- ☁️ Deployed on Vercel

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

- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Login and receive token  

### Task Routes

- `GET /tasks` – Get all tasks for the logged-in user  
- `POST /tasks` – Create a new task  
- `PUT /tasks/:id` – Update a specific task  
- `DELETE /tasks/:id` – Delete a specific task  
- `GET /tasks?sort=priority|date|progress` – Get sorted tasks

<br />

## 🧪 Getting Started Locally

### Clone the repo:

```bash
git clone https://github.com/Deek1995/todo-app-backend.git
cd todo-app-backend
