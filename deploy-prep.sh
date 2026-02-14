#!/bin/bash

# Modern Notepad App - Deployment Helper Script
# This script helps prepare your app for deployment

echo "🚀 Modern Notepad App - Deployment Preparation"
echo "=============================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env created. Please edit it with your MongoDB URI!"
    echo ""
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
    echo ""
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "Creating .gitignore..."
    cat > .gitignore << EOL
# Dependencies
node_modules/
client/node_modules/

# Environment variables
.env

# Build files
client/build/
dist/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
EOL
    echo "✅ .gitignore created"
    echo ""
fi

# Install dependencies
echo "📥 Installing dependencies..."
npm install
cd client && npm install && cd ..
echo "✅ Dependencies installed"
echo ""

# Git status
echo "📋 Git Status:"
git status
echo ""

# Next steps
echo "✨ Preparation Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Edit .env file with your MongoDB Atlas connection string"
echo "2. Update client/src/services/api.js with your production API URL"
echo "3. Commit your changes:"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "4. Create GitHub repository and push:"
echo "   git remote add origin https://github.com/YOUR-USERNAME/notepad-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "5. Deploy to Railway/Render/Vercel (see DEPLOYMENT_GUIDE.md)"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
