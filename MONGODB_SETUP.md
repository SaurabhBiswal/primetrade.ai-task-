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
   - Username: `<your-username>`
   - Password: `<your-password>` (or your choice)
...
   - It looks like: `mongodb+srv://<your-username>:<password>@cluster0.xxxxx.mongodb.net/`
...
   mongodb+srv://<your-username>:<your-password>@cluster0.xxxxx.mongodb.net/primetrade-auth?retryWrites=true&w=majority
...
mongodb+srv://<your-username>:<your-password>@cluster0.xxxxx.mongodb.net/primetrade-auth?retryWrites=true&w=majority
```

---

## 🤔 Why MongoDB and not PostgreSQL?

This TaskFlow application was built with:
- **MongoDB** (NoSQL) - for flexible document storage
- **Mongoose** - ODM for MongoDB

The PostgreSQL credentials you shared are from a different project. For this assignment, we're using MongoDB as specified in the requirements.

---

**Need help?** I can guide you through each step if you get stuck!
