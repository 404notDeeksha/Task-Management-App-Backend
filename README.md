# Task-Management-App-Backend

[![MIT License](https://img.shields.io/github/license/404notDeeksha/Task-Management-App-Backend?style=flat-square)](https://github.com/404notDeeksha/Task-Management-App-Backend/blob/main/LICENSE)

**Backend server** for a full-stack Task Management Application with JWT authentication and RESTful API.

<br />

## 🌐 Live Links

| App | URL |
|-----|-----|
| Frontend | [https://plan-live-techwithdeekksha.vercel.app](https://plan-live-techwithdeekksha.vercel.app) |
| Backend API | [https://plan-dep-techwithdeekksha.vercel.app](https://plan-dep-techwithdeekksha.vercel.app) |

## 📂 Related Repository

[Frontend Application](https://github.com/404notDeeksha/Task-Management-App)

<br />

## ⚙️ Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.9-880000?style=for-the-badge)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-9.0-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![bcryptjs](https://img.shields.io/badge/bcryptjs-2.4-000000?style=for-the-badge)](https://www.npmjs.com/package/bcryptjs)
[![Zod](https://img.shields.io/badge/Zod-3.24-000000?style=for-the-badge)](https://zod.dev/)
[![uuid](https://img.shields.io/badge/uuid-11.0-000000?style=for-the-badge)](https://www.npmjs.com/package/uuid)
[![cors](https://img.shields.io/badge/cors-2.8-000000?style=for-the-badge)](https://www.npmjs.com/package/cors)
[![dotenv](https://img.shields.io/badge/dotenv-16.4-000000?style=for-the-badge)](https://www.npmjs.com/package/dotenv)
[![http-errors](https://img.shields.io/badge/http--errors-2.0-000000?style=for-the-badge)](https://www.npmjs.com/package/http-errors)
[![Jest](https://img.shields.io/badge/Jest-29.7-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br />

## ✨ Features

### Authentication & Security
- **JWT-based authentication** with Bearer token in Authorization header
- **Password hashing** using bcryptjs with salt rounds
- **Protected routes** via auth middleware
- **Token validation** with expiry (7 days)
- **Environment validation** - fails fast if required env vars missing

### User Management
- User registration with unique email
- User login with credential verification
- Auto-generated UUID for each user
- Pre-save hook for userId generation

### Task Management (CRUD)
- **Create** tasks with title, description, status, priority, due date
- **Read** all tasks for authenticated user
- **Update** task details (partial updates supported)
- **Delete** tasks by ID
- Task status: `To Do` | `In Progress` | `Completed`
- Task priority: `Low` | `Medium` | `High`
- Automatic timestamps (`createdAt`, `updatedAt`)

### API Design
- **RESTful API** endpoints
- **Input validation** with Zod schemas for all endpoints
- **Centralized error handling** using http-errors library
- **Consistent JSON response** format
- **CORS support** for development, production, and Vercel preview deployments

### Testing
- **Unit tests** for middleware, validators, DB connection
- **Integration tests** for API endpoints
- **In-memory MongoDB** using mongodb-memory-server
- **Mocked auth** for protected route testing

### Project Structure
```
├── config/          # Environment configuration
├── controllers/    # Request handlers
├── middleware/      # Auth & validation middleware
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── tests/           # Test suites
│   ├── unit/        # Unit tests
│   ├── integration/ # Integration tests
│   └── utils/       # Test helpers
├── app.js           # Express app setup
└── index.js         # Server entry point
```

<br />

## 📁 API Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | Register new user |
| `POST` | `/auth/login` | Login, receive JWT |
| `POST` | `/auth/logout` | Logout (client-side token removal) |

### Tasks (Protected - Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks for user |
| `POST` | `/tasks` | Create new task |
| `PUT` | `/tasks/:id` | Update task |
| `DELETE` | `/tasks/:id` | Delete task |

<br />

## 📝 Request/Response Examples

### POST /auth/signup
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "userId": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/login
**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "userId": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /tasks (Protected)
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "title": "Complete project",
  "description": "Finish backend API",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2025-12-31"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "mongoose-object-id",
    "userId": "uuid-string",
    "title": "Complete project",
    "description": "Finish backend API",
    "status": "In Progress",
    "priority": "High",
    "dueDate": "2025-12-31T00:00:00.000Z",
    "createdAt": "2025-04-06T...",
    "updatedAt": "2025-04-06T..."
  }
}
```

### Validation Error Response (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": "Title is required"
}
```

### Not Found Response (404)
```json
{
  "success": false,
  "message": "Cannot find /tasks/abc123 on this server"
}
```

<br />

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

<br />

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/404notDeeksha/Task-Management-App-Backend
cd Task-Management-App-Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your configuration (see Environment Variables below)

# Start production server
npm start

# Start development server (with nodemon)
npm run dev
```

<br />

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URL` | MongoDB connection string | Yes |
| `JWT_SECRET_KEY` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 5002) | No |
| `DEV_FRONTEND_URL` | Development frontend URL | Yes |
| `DEP_FRONTEND_URL` | Production frontend URL | Yes |

<br />

## 🚀 Deployment

The backend is deployed on **Vercel** and configured to:
- Support production frontend URL
- Support development frontend URL
- Support Vercel preview deployments (auto-detected)

<br />

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto-reload |
| `npm test` | Run test suite |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |

<br />

## 🔄 Upcoming Features

- Role-based access control (Admin/User)
- Pagination for task listing
- Task filtering and sorting
- Rate limiting for auth endpoints
- CI/CD pipeline with automated testing

<br />

## 📄 License

MIT License - See [LICENSE](https://github.com/404notDeeksha/Task-Management-App-Backend/blob/main/LICENSE) for details.
