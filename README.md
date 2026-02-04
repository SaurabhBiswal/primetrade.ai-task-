# TaskFlow - Auth + Dashboard Application

> **Frontend Developer Intern Assignment** - A modern, full-stack task management application with authentication and CRUD operations.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?logo=mongodb)

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Setup Instructions](#-setup-instructions)
- [Running the Application](#-running-the-application)
- [Demo Credentials](#-demo-credentials)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Production Scaling Notes](#-production-scaling-notes)

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS with custom design system
- **State Management:** React Hooks
- **HTTP Client:** Axios with JWT interceptors
- **Form Validation:** Client-side validation
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js with Express.js
- **Language:** JavaScript (ESM)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcrypt for password hashing
- **Validation:** Express Validator
- **Security:** CORS, input sanitization, password hashing

---

## ✨ Features

### Authentication
- ✅ User signup with email and password
- ✅ Secure login with JWT token generation
- ✅ Password hashing using bcrypt (salt rounds: 10)
- ✅ Protected routes with JWT middleware
- ✅ Auto-redirect on token expiration

### Profile Management
- ✅ View user profile
- ✅ Update name and email
- ✅ Email uniqueness validation
- ✅ Success/error notifications

### Task Management (CRUD)
- ✅ Create tasks with title, description, status, priority, and due date
- ✅ View all tasks in a card-based layout
- ✅ Search tasks by title or description
- ✅ Filter tasks by status (To Do, In Progress, Completed)
- ✅ Filter tasks by priority (Low, Medium, High)
- ✅ Edit existing tasks
- ✅ Delete tasks with confirmation
- ✅ Responsive grid layout

### UI/UX
- ✅ Modern gradient design with purple/blue theme
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Loading states for all async operations
- ✅ Error handling with user-friendly messages
- ✅ Client-side and server-side validation
- ✅ Smooth transitions and hover effects

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Primetrade.ai
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/primetrade-auth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=5000
```

> **Note:** For MongoDB Atlas (cloud), use your connection string:
> ```
> MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetrade-auth
> ```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local
```

**Configure `.env.local` file:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## 🏃 Running the Application

### Start MongoDB (if running locally)
```bash
mongod
```

### Seed Database (Optional - Creates Demo Data)
```bash
cd backend
npm run seed
```

This creates two demo users and sample tasks.

### Start Backend Server
```bash
cd backend
npm run dev
```

Backend will run on: **http://localhost:5000**

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:3000**

### Access the Application
Open your browser and navigate to: **http://localhost:3000**

---

## 🔐 Demo Credentials

After running the seed script, you can use these credentials:

| Email | Password | Description |
|-------|----------|-------------|
| demo@example.com | demo123 | Demo user with sample tasks |
| test@example.com | test123 | Test user (empty task list) |

Or create your own account using the signup page!

---

## 📚 API Documentation

### 📥 Postman Collection
A complete Postman collection is included in the project root: `TaskFlow_API.postman_collection.json`.
You can import this into Postman to verify all endpoints quickly.


### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Profile Endpoints (Protected)

#### Get Profile
```http
GET /me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

### Task Endpoints (Protected)

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the assignment",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### Get All Tasks (with filters)
```http
GET /tasks?search=project&status=todo&priority=high
Authorization: Bearer <token>
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

### Error Responses

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📁 Project Structure

```
Primetrade.ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Auth logic
│   │   │   ├── profileController.ts # Profile logic
│   │   │   └── taskController.ts    # Task CRUD logic
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT verification
│   │   │   └── errorHandler.ts      # Global error handler
│   │   ├── models/
│   │   │   ├── User.ts              # User schema
│   │   │   └── Task.ts              # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── profileRoutes.ts
│   │   │   └── taskRoutes.ts
│   │   ├── scripts/
│   │   │   └── seed.ts              # Database seeding
│   │   └── server.ts                # Express app entry
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── app/
    │   ├── dashboard/
    │   │   ├── tasks/
    │   │   │   ├── [id]/
    │   │   │   │   └── edit/
    │   │   │   │       └── page.tsx  # Edit task
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx      # Create task
    │   │   │   └── page.tsx          # Task list
    │   │   ├── profile/
    │   │   │   └── page.tsx          # Profile page
    │   │   ├── layout.tsx            # Dashboard layout
    │   │   └── page.tsx              # Dashboard home
    │   ├── login/
    │   │   └── page.tsx              # Login page
    │   ├── signup/
    │   │   └── page.tsx              # Signup page
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── lib/
    │   ├── api.ts                    # Axios instance
    │   ├── auth.ts                   # Auth utilities
    │   └── utils.ts                  # Helper functions
    ├── .env.local
    ├── package.json
    ├── tailwind.config.ts
    └── tsconfig.json
```

---

## 🚀 Production Scaling Notes

### Deployment Strategy

#### Frontend (Next.js)
- **Platform:** Vercel (recommended) or Netlify
- **Build Command:** `npm run build`
- **Environment Variables:** Set `NEXT_PUBLIC_API_URL` to production API URL
- **Optimizations:**
  - Enable Image Optimization
  - Configure CDN for static assets
  - Enable automatic HTTPS

#### Backend (Node.js/Express)
- **Platform:** Railway, Render, AWS EC2, or DigitalOcean
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Environment Variables:** Set all `.env` variables
- **Optimizations:**
  - Use PM2 for process management
  - Enable clustering for multi-core CPUs
  - Configure reverse proxy (Nginx)

#### Database (MongoDB)
- **Recommended:** MongoDB Atlas (managed cloud)
- **Indexing:**
  ```javascript
  // Add indexes for performance
  db.tasks.createIndex({ user: 1, status: 1 })
  db.tasks.createIndex({ user: 1, priority: 1 })
  db.users.createIndex({ email: 1 }, { unique: true })
  ```
- **Connection Pooling:** Already configured in `database.ts`

### Security Enhancements

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, random JWT secrets (32+ characters)
   - Rotate secrets periodically

2. **CORS Configuration**
   ```typescript
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```

3. **Rate Limiting**
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

4. **Helmet.js** (Security headers)
   ```bash
   npm install helmet
   ```
   ```typescript
   import helmet from 'helmet';
   app.use(helmet());
   ```

### Performance Optimizations

1. **Caching**
   - Implement Redis for session storage
   - Cache frequently accessed data
   - Use HTTP caching headers

2. **Database Optimization**
   - Add compound indexes for common queries
   - Use pagination for large datasets
   - Implement database connection pooling

3. **API Optimization**
   - Implement response compression (gzip)
   - Use field projection in MongoDB queries
   - Add request/response size limits

4. **Monitoring & Logging**
   - Use Winston or Pino for structured logging
   - Implement error tracking (Sentry)
   - Set up performance monitoring (New Relic, DataDog)

### Scalability Considerations

1. **Horizontal Scaling**
   - Stateless API design (already implemented)
   - Load balancing across multiple instances
   - Session storage in Redis (not localStorage)

2. **Microservices (Future)**
   - Separate auth service
   - Separate task service
   - API Gateway pattern

3. **CI/CD Pipeline**
   ```yaml
   # Example GitHub Actions workflow
   name: Deploy
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - run: npm install
         - run: npm run build
         - run: npm test
         - run: deploy-script
   ```

---

## 📝 Additional Notes

### Code Quality
- ✅ Modular architecture (controllers, routes, models)
- ✅ Consistent error handling
- ✅ Input validation on both client and server
- ✅ Clean code with meaningful variable names

### Testing (Future Enhancements)
- Unit tests with Jest
- Integration tests for API endpoints
- E2E tests with Playwright
- Test coverage > 80%

### Features to Add
- Forgot password functionality
- Email verification
- Task categories/tags
- Task sharing between users
- Real-time updates with WebSockets
- File attachments for tasks
- Task comments and activity log

---

## 👨‍💻 Developer

**Assignment Submission for:** Frontend Developer Intern Position
**Developed by:** Saurabh Biswal

---

## 📄 License

This project is created as part of an internship assignment.

---

**Built with ❤️ using Next.js, Node.js, and MongoDB**
