# Task-Management-App-Backend

**Backend server** for full-stack Task Management App.

<br />

## 🌐 Links
Frontend: [https://plan-live-techwithdeekksha.vercel.app](https://plan-live-techwithdeekksha.vercel.app)
<br/>
Backend: [https://plan-dep-techwithdeekksha.vercel.app](https://plan-dep-techwithdeekksha.vercel.app)

## 📂 Frontend Repository
[![Task-Management-App](https://img.shields.io/badge/Task--Management--App-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/404notDeeksha/Task-Management-App)


<br />

## ⚙️ Tech Stack
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)


<br />

## ✨ Features
- 🔐 Secure JWT-based Authentication
- 🧑‍💼 User Registration & Login
- ✅ Full CRUD for Tasks
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
  ***(Work in progress to ensure reliable builds and deployments)***
 
