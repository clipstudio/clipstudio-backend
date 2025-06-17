#!/bin/bash

echo "🚀 AI Content Generator Setup Script"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "backend/main.py" ] || [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
    echo "⚠️  Please update the OPENAI_API_KEY in backend/.env with your actual API key"
fi

cd ..

# Setup Frontend
echo ""
echo "🔧 Setting up Frontend..."
cd frontend

# Install dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    echo "VITE_API_URL=http://localhost:8000" > .env
fi

cd ..

echo ""
echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your OpenAI API key"
echo "2. Update frontend/.env with your backend URL"
echo "3. Deploy backend to Render (see DEPLOYMENT.md)"
echo "4. Deploy frontend to Hostinger (see DEPLOYMENT.md)"
echo ""
echo "🚀 To start development:"
echo "  Backend:  cd backend && source venv/bin/activate && python main.py"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "📚 For detailed deployment instructions, see DEPLOYMENT.md" 