# Modern Notepad App with MongoDB

A modern, interactive notepad application built with React and MongoDB. Features swipeable slides for quotes and articles with a beautiful Spotify-inspired design.

## 🚀 Features

- ✨ Modern UI with Spotify-inspired design
- 📱 Fully responsive (mobile & desktop)
- 👆 Swipeable slides with smooth animations
- 💾 MongoDB database integration
- 🎨 Beautiful gradients and animations
- 📝 Two content types: Quotes and Articles
- ➕ Create, read, and delete notes
- 🎯 Interactive article expansion

## 📁 Project Structure

```
modern-notepad-app/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js     # API service for backend calls
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── Note.js        # Note schema
│   ├── routes/
│   │   └── notes.js       # API routes
│   └── index.js           # Server entry point
├── .env.example           # Environment variables template
├── .gitignore
├── package.json           # Root package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone or Download the Project

```bash
# If using git
git clone <your-repo-url>
cd modern-notepad-app

# Or just extract the folder if downloaded as ZIP
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Step 3: Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB on your system: https://www.mongodb.com/docs/manual/installation/
2. Start MongoDB service:
   ```bash
   # On Mac with Homebrew
   brew services start mongodb-community

   # On Linux
   sudo systemctl start mongod

   # On Windows
   # MongoDB starts automatically after installation
   ```

3. Your connection string will be: `mongodb://localhost:27017/notepad-app`

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (Free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your actual credentials
7. Add `/notepad-app` before the `?` to specify database name:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/notepad-app?retryWrites=true&w=majority
   ```

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your settings:

```env
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/notepad-app

# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/notepad-app?retryWrites=true&w=majority

PORT=5000
CLIENT_URL=http://localhost:3000
```

**⚠️ IMPORTANT: Replace the MongoDB URI with your actual connection string!**

### Step 5: Run the Application

#### Option A: Run Both (Recommended for Development)

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- React app on `http://localhost:3000`

#### Option B: Run Separately

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

### Step 6: Access the Application

Open your browser and go to: **http://localhost:3000**

## 🎯 What You Need to Edit

### Required Changes:

1. **`.env` file** (MUST EDIT):
   - Replace `MONGODB_URI` with your actual MongoDB connection string
   - This is the ONLY file you MUST edit to make it work

### Optional Changes:

2. **`client/src/services/api.js`**:
   - Change API_URL if deploying to production
   - Default uses proxy to `http://localhost:5000`

3. **`server/index.js`**:
   - Change PORT if 5000 is already in use

4. **`client/package.json`**:
   - Update proxy if backend port changes

## 🔧 MongoDB Connection String Examples

### Local MongoDB:
```
mongodb://localhost:27017/notepad-app
```

### MongoDB Atlas:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/notepad-app?retryWrites=true&w=majority
```

### MongoDB with Authentication:
```
mongodb://username:password@localhost:27017/notepad-app?authSource=admin
```

## 📝 API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/health` - Health check

## 🎨 Customization

### Change Colors

Edit gradients in `client/src/App.js` (line ~40):
```javascript
const colors = [
  'linear-gradient(135deg, #1db954 0%, #1ed760 100%)', // Spotify Green
  'linear-gradient(135deg, #c850c0 0%, #ffcc70 100%)', // Pink-Orange
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink-Red
];
```

### Add More Features

- Edit `server/models/Note.js` to add new fields
- Edit `client/src/App.js` to add new UI components
- Edit `server/routes/notes.js` to add new API endpoints

## 🐛 Troubleshooting

### "MongoDB connection failed"
- Check if MongoDB is running
- Verify your connection string in `.env`
- For Atlas: Check IP whitelist (add 0.0.0.0/0 for all IPs)
- For Atlas: Verify username/password are correct

### "Port 5000 already in use"
- Change PORT in `.env` file
- Update proxy in `client/package.json`

### "Module not found"
- Run `npm install` in root directory
- Run `npm install` in client directory

### Notes not saving
- Check browser console for errors
- Check server terminal for error messages
- Verify MongoDB connection is successful

## 📦 Production Deployment

### Build the React app:
```bash
cd client
npm run build
```

### Deploy to Heroku, Vercel, or your preferred platform

### Environment Variables for Production:
```
MONGODB_URI=<your-production-mongodb-uri>
PORT=5000
CLIENT_URL=<your-frontend-url>
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Feel free to submit issues and pull requests!

## 📧 Support

If you encounter any issues, check the troubleshooting section or create an issue in the repository.

---

Made with ❤️ using React, Node.js, Express, and MongoDB
