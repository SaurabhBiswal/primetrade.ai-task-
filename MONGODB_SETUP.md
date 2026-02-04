# ⚡ Quick MongoDB Atlas Setup (2 Minutes)

## Option 1: Create New MongoDB Atlas Account (Recommended - FREE)

### Step-by-Step:

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register

2. **Sign Up** (choose one):
   - Sign up with Google (fastest)
   - Or use email: punpunsaurabh2002@gmail.com

3. **Create Free Cluster**:
   - Choose **M0 FREE** tier
   - Select any cloud provider (AWS/Google/Azure)
   - Choose region closest to you
   - Click "Create Deployment"

4. **Create Database User**:
   - Username: `taskflow`
   - Password: `taskflow123` (or your choice)
   - Click "Create Database User"

5. **Setup Network Access**:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**:
   - Click "Connect" button
   - Choose "Drivers"
   - Copy the connection string
   - It looks like: `mongodb+srv://taskflow:<password>@cluster0.xxxxx.mongodb.net/`

7. **Format Connection String**:
   ```
   mongodb+srv://taskflow:taskflow123@cluster0.xxxxx.mongodb.net/primetrade-auth?retryWrites=true&w=majority
   ```
   (Replace `<password>` with your actual password and add `/primetrade-auth` before the `?`)

---

## Option 2: Install MongoDB Locally (If you prefer)

### Windows Installation:

```powershell
# Download MongoDB Community Server
# Go to: https://www.mongodb.com/try/download/community
# Download Windows MSI installer
# Run installer with default settings
# MongoDB will start automatically as a service
```

Then use this connection string:
```
mongodb://localhost:27017/primetrade-auth
```

---

## What to Do Next:

**Once you have the connection string**, just paste it here and I'll:
1. ✅ Update your `backend/.env` file
2. ✅ Seed the database with demo data
3. ✅ Start the backend server
4. ✅ Start the frontend server
5. ✅ Open the application in your browser

**Just reply with your MongoDB connection string!**

Example format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/primetrade-auth?retryWrites=true&w=majority
```

---

## 🤔 Why MongoDB and not PostgreSQL?

This TaskFlow application was built with:
- **MongoDB** (NoSQL) - for flexible document storage
- **Mongoose** - ODM for MongoDB

The PostgreSQL credentials you shared are from a different project. For this assignment, we're using MongoDB as specified in the requirements.

---

**Need help?** I can guide you through each step if you get stuck!
