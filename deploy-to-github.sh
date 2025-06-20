#!/bin/bash

echo "🚀 GitHub Upload Script for Render Deployment"
echo "=============================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Initial commit for Render deployment"

echo ""
echo "✅ Files are ready for GitHub upload!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com and create a new repository"
echo "2. Copy the repository URL (e.g., https://github.com/yourusername/your-repo.git)"
echo "3. Run these commands:"
echo "   git remote add origin https://github.com/yourusername/your-repo.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Then follow the Render deployment guide in RENDER_DEPLOYMENT_GUIDE.md"
echo ""
echo "🎯 Your repository structure should look like:"
echo "├── backend/"
echo "│   ├── main.py"
echo "│   ├── requirements.txt"
echo "│   ├── start.sh"
echo "│   └── app/"
echo "├── src/"
echo "├── package.json"
echo "└── README.md" 