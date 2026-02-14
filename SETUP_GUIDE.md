# 🚀 QUICK SETUP GUIDE - FOR BEGINNERS

This guide will walk you through setting up the Modern Notepad App step by step.

## ⚡ What You Need to Edit (TL;DR)

**ONLY ONE FILE:**
1. Create a file named `.env` (copy from `.env.example`)
2. Edit the `MONGODB_URI` line with your MongoDB connection string

**That's it!** Everything else works automatically.

---

## 📋 Step-by-Step Setup

### Step 1: Install Node.js (if not already installed)

1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Install it (keep clicking "Next")
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Set Up MongoDB

**Choose ONE option:**

#### OPTION A: MongoDB Atlas (Easiest - Cloud Database) ⭐ RECOMMENDED

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new project (name it anything you want)
4. Build a cluster:
   - Choose FREE tier (M0 Sandbox)
   - Select your nearest region
   - Click "Create Cluster"
5. Set up Database Access:
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `notepaduser` (or anything you want)
   - Password: Click "Autogenerate Secure Password" and SAVE IT!
   - User Privileges: "Read and write to any database"
   - Click "Add User"
6. Set up Network Access:
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"
7. Get Connection String:
   - Go back to "Clusters"
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string (looks like this):
     ```
     mongodb+srv://notepaduser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with the password you saved earlier
   - Add `/notepad-app` before the `?`:
     ```
     mongodb+srv://notepaduser:YourPassword123@cluster0.xxxxx.mongodb.net/notepad-app?retryWrites=true&w=majority
     ```
   - SAVE THIS STRING! You'll need it in Step 4

#### OPTION B: Local MongoDB (For Advanced Users)

1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB:
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
   - Windows: Already running after install
4. Your connection string is:
   ```
   mongodb://localhost:27017/notepad-app
   ```

### Step 3: Install Project Dependencies

1. Open Terminal/Command Prompt
2. Navigate to project folder:
   ```bash
   cd path/to/modern-notepad-app
   ```
3. Install all dependencies:
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

### Step 4: Configure Environment Variables

1. In the project root folder, find `.env.example`
2. Copy it and rename to `.env`:
   ```bash
   # On Mac/Linux
   cp .env.example .env

   # On Windows (in Command Prompt)
   copy .env.example .env
   ```
3. Open `.env` in any text editor (Notepad, VS Code, etc.)
4. Replace the MongoDB URI:

   **If using MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://notepaduser:YourPassword123@cluster0.xxxxx.mongodb.net/notepad-app?retryWrites=true&w=majority
   ```

   **If using Local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/notepad-app
   ```

5. Save the file

### Step 5: Run the Application

1. Make sure you're in the project root folder
2. Run this command:
   ```bash
   npm run dev
   ```
3. Wait for both servers to start (you'll see):
   ```
   Server is running on port 5000
   MongoDB Connected: ...
   webpack compiled successfully
   ```
4. Open browser and go to: **http://localhost:3000**

🎉 **You're done!** The app should now be working!

---

## 🔍 File Editing Reference

### Files You MUST Edit:

1. **`.env`** - Your MongoDB connection settings
   - Location: `modern-notepad-app/.env`
   - What to change: `MONGODB_URI=...`
   - When: During initial setup
   - Example:
     ```env
     MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/notepad-app?retryWrites=true&w=majority
     PORT=5000
     CLIENT_URL=http://localhost:3000
     ```

### Files You MIGHT Edit (Optional):

2. **`server/index.js`** - Server configuration
   - What to change: PORT number (if 5000 is in use)
   - Line 38: `const PORT = process.env.PORT || 5000;`

3. **`client/src/services/api.js`** - API configuration
   - What to change: API URL for production deployment
   - Line 3: `const API_URL = process.env.REACT_APP_API_URL || '/api';`

4. **`client/src/App.js`** - Main React component
   - What to change: UI customization, add features
   - Lines 40-45: Change gradient colors

5. **`server/models/Note.js`** - Database schema
   - What to change: Add new fields to notes
   - Lines 3-50: Add new properties

### Files You DON'T Need to Touch:

- `package.json` files (root and client)
- `server/config/db.js` (MongoDB connection logic)
- `server/routes/notes.js` (API routes - unless adding new endpoints)
- `client/src/index.js` (React entry point)
- All CSS files (unless styling changes)

---

## 🎯 Common Edits You Might Want to Make

### 1. Change the Port Number

If port 5000 is already in use:

**Edit `.env`:**
```env
PORT=8000
```

**Edit `client/package.json`:**
```json
"proxy": "http://localhost:8000",
```

### 2. Add New Fields to Notes

**Edit `server/models/Note.js`:**
```javascript
const noteSchema = new mongoose.Schema({
  // ... existing fields ...
  tags: {
    type: [String],
    default: [],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
```

### 3. Change Default Colors

**Edit `client/src/App.js` (around line 40):**
```javascript
const colors = [
  'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)', // Red-Yellow
  'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)', // Teal-Gray
  'linear-gradient(135deg, #F38181 0%, #FCE38A 100%)', // Pink-Yellow
];
```

### 4. Change App Title

**Edit `client/public/index.html`:**
```html
<title>My Awesome Notes App</title>
```

**Edit `client/src/App.js`:**
```jsx
<h1>✨ My Awesome Notes</h1>
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Node.js is installed (`node --version` works)
- [ ] MongoDB is accessible (Atlas account created OR local MongoDB running)
- [ ] Dependencies installed (`node_modules` folder exists in root and client)
- [ ] `.env` file created with correct `MONGODB_URI`
- [ ] Server starts without errors (`npm run dev`)
- [ ] Browser opens to `http://localhost:3000`
- [ ] Can create a new note (click + button)
- [ ] Notes save to database (refresh page, notes still there)
- [ ] Can swipe between notes
- [ ] Can delete notes (× button)

---

## 🆘 Help! Something's Wrong

### Error: "Cannot connect to MongoDB"

**Solution:**
1. Check your `.env` file has the correct `MONGODB_URI`
2. For Atlas: Verify username/password are correct
3. For Atlas: Check Network Access allows your IP
4. For Local: Make sure MongoDB is running

### Error: "Port 5000 already in use"

**Solution:**
1. Change `PORT=8000` in `.env`
2. Change proxy in `client/package.json` to `"proxy": "http://localhost:8000"`
3. Restart the app

### Error: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules client/node_modules
npm install
cd client && npm install && cd ..
```

### Notes aren't saving

**Solution:**
1. Open browser console (F12)
2. Check for error messages
3. Make sure MongoDB connection is successful (check terminal)
4. Verify `.env` file has correct connection string

---

## 🎓 What Each File Does (Quick Reference)

```
.env                          → Your secret configuration (MongoDB URI, etc.)
package.json                  → Lists what packages the app needs
server/index.js              → Starts the backend server
server/config/db.js          → Connects to MongoDB
server/models/Note.js        → Defines what a "note" looks like in database
server/routes/notes.js       → Handles API requests (get/create/delete notes)
client/package.json          → Lists what packages React app needs
client/src/App.js            → Main React component (the UI you see)
client/src/App.css           → Makes everything look pretty
client/src/services/api.js   → Talks to the backend server
```

---

## 🎉 You're All Set!

Your app is now running with:
- ✅ React frontend on port 3000
- ✅ Express backend on port 5000
- ✅ MongoDB database storing your notes
- ✅ Beautiful modern UI

**Next Steps:**
- Create some notes!
- Customize the colors
- Add new features
- Deploy to production

**Happy Coding! 🚀**
