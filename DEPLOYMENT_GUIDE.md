# 🚀 FREE DEPLOYMENT GUIDE

Deploy your Modern Notepad App for **FREE** using these platforms!

## 🎯 Best Free Deployment Options

| Platform | Frontend | Backend | Database | Best For |
|----------|----------|---------|----------|----------|
| **Vercel + Railway** | ✅ Free | ✅ Free | MongoDB Atlas | Easiest |
| **Render** | ✅ Free | ✅ Free | MongoDB Atlas | All-in-one |
| **Netlify + Render** | ✅ Free | ✅ Free | MongoDB Atlas | Alternative |

---

## 🏆 RECOMMENDED: Vercel + Railway + MongoDB Atlas

**Why this combo?**
- ✅ Completely FREE forever
- ✅ Easy setup (5 minutes)
- ✅ Auto-deployment from Git
- ✅ HTTPS included
- ✅ Fast global CDN

### Total Cost: **$0/month** 💰

---

# METHOD 1: Vercel + Railway (RECOMMENDED) ⭐

## Part A: Setup MongoDB Atlas (Database)

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free account)
3. Create a new project: "notepad-app"

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select closest region
4. Cluster Name: "Cluster0" (default is fine)
5. Click "Create Cluster" (takes 1-3 minutes)

### 3. Create Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `notepaduser`
5. Password: Click "Autogenerate Secure Password" → **SAVE IT!**
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### 4. Allow Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access From Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" → "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string:
   ```
   mongodb+srv://notepaduser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before `?`:
   ```
   mongodb+srv://notepaduser:YourPassword123@cluster0.xxxxx.mongodb.net/notepad-app?retryWrites=true&w=majority
   ```
7. **SAVE THIS STRING!** You'll need it soon.

---

## Part B: Deploy Backend to Railway

### 1. Prepare Your Code for Railway

Create `railway.json` in project root:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server/index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Update `package.json` (root) - make sure it has:

```json
{
  "name": "modern-notepad-app",
  "version": "1.0.0",
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### 2. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on GitHub (go to github.com)
# Then push:
git remote add origin https://github.com/YOUR-USERNAME/notepad-app.git
git branch -M main
git push -u origin main
```

### 3. Deploy on Railway

1. Go to https://railway.app/
2. Sign up with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your `notepad-app` repository
6. Railway will auto-detect Node.js

### 4. Add Environment Variables on Railway

1. Click on your project
2. Go to "Variables" tab
3. Add these variables:
   ```
   MONGODB_URI=mongodb+srv://notepaduser:YourPass@cluster0.xxxxx.mongodb.net/notepad-app?retryWrites=true&w=majority
   PORT=5000
   CLIENT_URL=https://your-app-name.vercel.app
   ```
   (We'll update CLIENT_URL after deploying frontend)

### 5. Get Railway Backend URL

1. Go to "Settings" tab
2. Click "Generate Domain" under "Networking"
3. Copy the URL (looks like: `https://notepad-app-production.up.railway.app`)
4. **SAVE THIS URL!**

---

## Part C: Deploy Frontend to Vercel

### 1. Prepare Frontend for Production

Update `client/src/services/api.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://notepad-app-production.up.railway.app/api';
// Replace with YOUR Railway URL + /api
```

Commit changes:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your `notepad-app` repository
5. **Configure Project:**
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://notepad-app-production.up.railway.app/api
   ```
   (Use YOUR Railway URL)
7. Click "Deploy"

### 3. Update Railway CLIENT_URL

1. Go back to Railway
2. Copy your Vercel URL (e.g., `https://notepad-app-sigma.vercel.app`)
3. Update `CLIENT_URL` variable in Railway to this URL
4. Railway will auto-redeploy

---

## ✅ Done! Your App is Live!

Your app should now be accessible at:
- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://your-app.railway.app/api/notes

Test it:
1. Go to your Vercel URL
2. Create a note
3. Refresh the page - note should still be there!

---

# METHOD 2: Render (All-in-One)

Simpler but slightly slower than Railway.

## Step 1: Setup MongoDB Atlas
(Same as Method 1 Part A above)

## Step 2: Deploy Backend on Render

### 1. Push to GitHub
(Same as Method 1 Part B Step 2)

### 2. Deploy Backend

1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name:** notepad-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Plan:** Free
6. Add Environment Variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   PORT=5000
   CLIENT_URL=https://notepad-frontend.onrender.com
   ```
   (We'll update CLIENT_URL later)
7. Click "Create Web Service"

### 3. Get Backend URL
- Copy your backend URL: `https://notepad-backend.onrender.com`

## Step 3: Deploy Frontend on Render

### 1. Update API URL

Edit `client/src/services/api.js`:
```javascript
const API_URL = 'https://notepad-backend.onrender.com/api';
```

Push changes to GitHub.

### 2. Deploy Frontend

1. In Render, click "New +" → "Static Site"
2. Connect same GitHub repo
3. Configure:
   - **Name:** notepad-frontend
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `client/build`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://notepad-backend.onrender.com/api
   ```
5. Click "Create Static Site"

### 3. Update Backend CLIENT_URL

1. Go to your backend service on Render
2. Update `CLIENT_URL` to your frontend URL
3. Service will auto-redeploy

---

# METHOD 3: Netlify + Render Backend

Same as Method 2, but use Netlify for frontend:

1. Go to https://www.netlify.com/
2. "Add new site" → "Import from Git"
3. Select your repo
4. Configure:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```

---

# 🔧 Required Code Changes for Deployment

## 1. Add to `.gitignore`:
```
node_modules/
.env
client/build/
client/node_modules/
```

## 2. Update `server/index.js` (for production):

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

// CORS - Allow your frontend domain
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/notes', require('./routes/notes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 3. Update `client/package.json` (remove proxy for production):

Remove this line when deploying:
```json
"proxy": "http://localhost:5000",
```

## 4. Update `client/src/services/api.js`:

```javascript
import axios from 'axios';

// Use environment variable or production URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ... rest of the code stays same
```

---

# 📋 Deployment Checklist

Before deploying:

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password saved
- [ ] Network access allows all IPs (0.0.0.0/0)
- [ ] Connection string saved
- [ ] Code pushed to GitHub
- [ ] `.env` in `.gitignore`
- [ ] API URL updated in `client/src/services/api.js`
- [ ] Railway/Render account created

After deploying backend:

- [ ] Environment variables set (MONGODB_URI, PORT, CLIENT_URL)
- [ ] Backend URL saved
- [ ] Test: Visit `your-backend-url/api/health`

After deploying frontend:

- [ ] Frontend deployed successfully
- [ ] Frontend URL saved
- [ ] Backend CLIENT_URL updated
- [ ] Test: Create a note, refresh page

---

# 🆘 Troubleshooting Deployment

### "Failed to connect to database"
- Check MONGODB_URI is correct in environment variables
- Verify MongoDB Atlas allows 0.0.0.0/0
- Check username/password have no special characters (or URL encode them)

### "CORS error"
- Update CLIENT_URL in backend environment variables
- Check CORS settings in `server/index.js`

### "API not found / 404"
- Verify REACT_APP_API_URL has `/api` at the end
- Check backend is deployed and running
- Test backend health: `your-backend-url/api/health`

### Frontend shows but notes don't save
- Open browser console (F12)
- Check for API errors
- Verify API URL is correct

### Railway/Render build fails
- Check `package.json` has correct start script
- Verify Node.js version in engines
- Check build logs for specific errors

---

# 💡 Free Tier Limits

## MongoDB Atlas (Free)
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Good for 1000s of notes

## Railway (Free)
- ✅ $5 credit/month
- ✅ ~500 hours runtime
- ✅ Enough for hobby projects

## Vercel (Free)
- ✅ Unlimited bandwidth
- ✅ 100GB bandwidth/month
- ✅ Fast global CDN

## Render (Free)
- ✅ 750 hours/month
- ✅ Auto-sleep after 15 min
- ✅ Wakes on request

---

# 🎉 Congratulations!

Your app is now live and accessible worldwide! Share the link with friends! 🚀

**Next Steps:**
- Add custom domain (optional)
- Enable HTTPS (automatic on all platforms)
- Monitor usage and performance
- Add more features!

