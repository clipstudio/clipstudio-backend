# AI Content Generator - Full Stack Application

A comprehensive AI-powered content generation platform with story generation, image creation, text-to-speech, and video editing capabilities.

## 🌟 Features

### AI Content Generation
- **Story Generation**: Create engaging stories with customizable genres and tones
- **Image Generation**: Generate high-quality images using DALL-E
- **Text-to-Speech**: Convert text to natural-sounding speech with multiple voices
- **Video Editing**: AI-powered video editor with upload/download capabilities

### Video Editor Features
- **Media Upload**: Upload videos, images, and audio files
- **AI Image Generation**: Generate custom images for your videos
- **TTS Integration**: Add voice-overs to your videos
- **YouTube Upload**: Direct upload to YouTube
- **Export & Download**: Save videos to your device
- **Timeline Editing**: Drag-and-drop timeline interface

## 🚀 Quick Start

### 1. Run Setup Script
```bash
./setup.sh
```

### 2. Configure Environment Variables
```bash
# Backend (.env)
OPENAI_API_KEY=your_openai_api_key_here

# Frontend (.env)
VITE_API_URL=http://localhost:8000
```

### 3. Start Development Servers
```bash
# Backend
cd backend
source venv/bin/activate
python main.py

# Frontend (in new terminal)
cd frontend
npm run dev
```

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python 3.9+
- **AI Services**: OpenAI GPT-4, DALL-E, TTS
- **File Handling**: Video upload/download, image processing
- **API**: RESTful endpoints with CORS support

### Frontend (React + Vite)
- **Framework**: React 18 with Vite
- **UI**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Routing**: React Router with HashRouter

## 📁 Project Structure

```
├── backend/
│   ├── app/
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # AI and business logic
│   │   └── utils/           # Helper functions
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   └── config/          # Configuration files
│   └── package.json         # Node.js dependencies
└── DEPLOYMENT.md           # Deployment instructions
```

## 🔧 API Endpoints

### Story Generation
- `POST /api/story/generate` - Generate stories with custom prompts

### Image Generation
- `POST /api/image/generate` - Generate images using DALL-E

### Text-to-Speech
- `POST /api/tts/generate` - Convert text to speech
- `GET /api/tts/voices` - Get available voices

### Video Processing
- `POST /api/video/generate` - Generate videos from images/audio
- `POST /api/video/upload` - Upload video files
- `POST /api/video/youtube-upload` - Upload to YouTube

## 🎯 Integration with Existing Website

### 1. Connect to Your Hostinger Website

Your frontend is already configured to work with your Hostinger website at `https://seashell-seahorse-396931.hostingersite.com`. The AI features are integrated into the existing pages:

- **Story Generator**: `/gpt-story` - AI-powered story creation
- **Image Generator**: `/image-generator` - DALL-E image generation
- **Video Editor**: `/video-editor` - Full-featured video editor
- **TTS Generator**: `/voice-over` - Text-to-speech conversion

### 2. Backend Deployment

Deploy your backend to Render and update the frontend configuration:

1. **Deploy to Render** (see `DEPLOYMENT.md`)
2. **Update API URL** in `frontend/src/config/api.js`:
   ```javascript
   production: {
     baseURL: 'https://your-backend-app.onrender.com',
     timeout: 30000,
   }
   ```

### 3. Environment Configuration

Set up environment variables for production:

```bash
# Backend (Render)
OPENAI_API_KEY=sk-your-openai-api-key

# Frontend (Hostinger)
VITE_API_URL=https://your-backend-app.onrender.com
```

## 🎨 UI Components

The application uses a custom UI component library built with:
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **Custom Components**: Tailored for AI content generation

### Key Components
- `Button` - Interactive buttons with loading states
- `Card` - Content containers
- `Input` - Form inputs with validation
- `Select` - Dropdown selections
- `Textarea` - Multi-line text inputs
- `Toast` - Notification system

## 🔒 Security Features

- **CORS Configuration**: Secure cross-origin requests
- **API Key Protection**: Environment variable management
- **Input Validation**: Pydantic models for data validation
- **Error Handling**: Comprehensive error management

## 📊 Performance Optimization

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Efficient image handling
- **API Caching**: Smart caching strategies
- **Bundle Optimization**: Vite build optimization

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Production Deployment
1. **Backend**: Deploy to Render (see `DEPLOYMENT.md`)
2. **Frontend**: Build and upload to Hostinger
3. **Environment**: Configure production variables
4. **Testing**: Verify all features work correctly

### Development Deployment
```bash
# Backend
cd backend && python main.py

# Frontend
cd frontend && npm run dev
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify domain URLs are correct

2. **API Connection Failed**
   - Verify backend URL in frontend config
   - Check backend is running and accessible

3. **OpenAI API Errors**
   - Verify API key is set correctly
   - Check OpenAI account has sufficient credits

4. **Build Errors**
   - Ensure all dependencies are installed
   - Check for missing packages

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Verify network requests** in browser dev tools
3. **Check backend logs** for server errors
4. **Test API endpoints** directly with Postman

## 📈 Monitoring & Analytics

- **Error Tracking**: Monitor application errors
- **Performance Metrics**: Track loading times
- **Usage Analytics**: Monitor feature usage
- **API Monitoring**: Track OpenAI API usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the troubleshooting section
2. Review the deployment guide
3. Check browser console for errors
4. Verify environment variables

## 🔗 Links

- **Website**: https://seashell-seahorse-396931.hostingersite.com
- **Backend API**: https://your-backend-app.onrender.com
- **Documentation**: See `DEPLOYMENT.md` for detailed instructions 