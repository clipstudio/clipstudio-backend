# AI Content Studio - Complete Integration

A comprehensive AI-powered content creation platform with story generation, image creation, video editing, and text-to-speech capabilities.

## 🚀 Features

### AI Story Generator
- Generate stories with custom prompts, genres, and tones
- Real-time AI-powered content creation
- Copy and download generated stories
- Multiple story styles and lengths

### Professional Video Editor (CapCut-like)
- Multi-track timeline editing
- Drag-and-drop media management
- Real-time preview with controls
- Professional effects and filters
- Text overlays and audio mixing
- Export functionality with progress tracking
- Undo/redo functionality
- Track visibility controls

### AI Image Generator
- Generate images from text prompts
- Multiple art styles and sizes
- Batch image generation
- Image editing and variations
- Style transfer capabilities

### Text-to-Speech
- Multiple voice options
- Customizable speed and pitch
- Voice cloning capabilities
- Speech-to-text conversion

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Radix UI** components
- **Lucide React** icons
- **WaveSurfer.js** for audio visualization
- **React Router** for navigation

### Backend
- **FastAPI** Python framework
- **OpenAI API** integration
- **CORS** enabled for cross-origin requests
- **Async/await** for performance

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- OpenAI API key

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set OpenAI API key
export OPENAI_API_KEY="your-api-key-here"

# Start backend server
python main.py
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend
VITE_API_BASE_URL=http://localhost:8000/api

# Backend
OPENAI_API_KEY=your-openai-api-key-here
```

### API Endpoints

#### Story Generation
- `POST /api/story/generate` - Generate AI stories
- Parameters: `prompt`, `style`, `length`

#### Image Generation
- `POST /api/image/generate` - Generate AI images
- Parameters: `prompt`, `style`, `size`

#### Video Processing
- `POST /api/video/process` - Process video files
- `POST /api/video/text-overlay` - Add text overlays
- `POST /api/video/apply-filter` - Apply video filters
- `POST /api/video/export` - Export final video

#### Text-to-Speech
- `POST /api/tts/generate` - Convert text to speech
- `GET /api/tts/voices` - Get available voices

## 🎯 Usage

### Story Generator
1. Navigate to `/gpt-story`
2. Enter your story prompt
3. Select genre and tone
4. Click "Generate Story"
5. Copy or download the result

### Video Editor
1. Navigate to `/video-editor`
2. Upload media files (video, audio, images)
3. Drag tracks to timeline
4. Add effects and filters
5. Adjust properties in the right sidebar
6. Export your final video

### Image Generator
1. Navigate to `/image-generator`
2. Enter image description
3. Select style and size
4. Generate single or multiple images
5. Download or edit generated images

## 🔌 API Integration

### Frontend Services

The frontend includes comprehensive service files for API integration:

- `src/services/api.js` - Base API configuration
- `src/services/storyService.js` - Story generation
- `src/services/videoService.js` - Video editing
- `src/services/imageService.js` - Image generation
- `src/services/ttsService.js` - Text-to-speech

### Error Handling

All services include:
- Proper error handling with user-friendly messages
- Fallback to mock data when API is unavailable
- Loading states and progress indicators
- Toast notifications for user feedback

## 🎨 UI Components

### Professional Video Editor Interface
- **Three-panel layout**: Media library, preview, properties
- **Tabbed interface**: Media, effects, audio
- **Timeline**: Multi-track with drag-and-drop
- **Preview controls**: Play, pause, volume, time display
- **Export progress**: Modal with progress bar

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts
- Touch-friendly controls
- Professional color scheme

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to hosting platform
# (Vercel, Netlify, etc.)
```

### Backend Deployment
```bash
# Deploy to Render, Railway, or similar
# Ensure environment variables are set
```

## 🔒 Security

- CORS properly configured for production domains
- API key stored securely in environment variables
- Input validation on both frontend and backend
- Rate limiting recommended for production

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS settings include your frontend domain
2. **API Key Issues**: Verify OpenAI API key is set correctly
3. **Blank Pages**: Check browser console for JavaScript errors
4. **Missing Dependencies**: Run `npm install` to install all packages

### Development Tips

- Use browser dev tools to inspect network requests
- Check backend logs for API errors
- Test with mock data when API is unavailable
- Use React DevTools for component debugging

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review API documentation
- Open an issue on GitHub

---

**Note**: This is a comprehensive AI content creation platform with professional video editing capabilities. The video editor provides a CapCut-like experience with advanced features for content creators. 