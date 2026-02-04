# Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Option 1: Using MongoDB Atlas (Cloud - Recommended)

1. **Create Free MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier
   - Create a new cluster (M0 Free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

3. **Update Backend .env**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetrade-auth
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d
   PORT=5000
   ```

### Option 2: Using Local MongoDB

1. **Install MongoDB**
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: `sudo apt-get install mongodb`

2. **Start MongoDB**
   ```bash
   # Windows
   mongod

   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. **Update Backend .env**
   ```env
   MONGODB_URI=mongodb://localhost:27017/primetrade-auth
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d
   PORT=5000
   ```

---

## 📦 Installation Steps

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Install frontend dependencies
cd ../frontend
npm install

# 3. Seed database with demo data (optional)
cd ../backend
npm run seed

# 4. Start backend (Terminal 1)
npm run dev

# 5. Start frontend (Terminal 2 - new terminal)
cd ../frontend
npm run dev
```

---

## 🎯 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/v1
- **Health Check:** http://localhost:5000/health

---

## 🔐 Demo Login

After running the seed script:

**Email:** demo@example.com  
**Password:** demo123

Or create your own account using the signup page!

---

## 🐛 Troubleshooting

### Backend won't start
- **Error:** "MongooseServerSelectionError"
- **Solution:** Make sure MongoDB is running (see Option 1 or 2 above)

### Frontend can't connect to backend
- **Error:** "Network Error" or "CORS error"
- **Solution:** 
  1. Check backend is running on port 5000
  2. Verify `.env.local` has correct API URL
  3. Restart frontend server

### Port already in use
- **Error:** "EADDRINUSE"
- **Solution:**
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F

  # Mac/Linux
  lsof -ti:5000 | xargs kill -9
  ```

---

## 📝 Next Steps

1. ✅ Test all features (signup, login, tasks CRUD)
2. ✅ Import Postman collection for API testing
3. ✅ Read README.md for detailed documentation
4. ✅ Push to GitHub
5. ✅ Submit assignment

---

**Need Help?** Check the comprehensive [README.md](file:///d:/New%20folder%20(2)%20%20WEB%20DEV%20PROJECTS/Primetrade.ai/README.md) for detailed documentation.
