// API Configuration
export const API_CONFIG = {
  // Development
  development: {
    baseURL: 'http://localhost:8000',
    timeout: 30000,
  },
  
  // Production - your deployed backend on Render
  production: {
    baseURL: 'https://your-backend-app.onrender.com', // Update this with your actual Render backend URL
    timeout: 30000,
  },
  
  // Testing
  test: {
    baseURL: 'http://localhost:8000',
    timeout: 10000,
  }
};

// Get current environment
const getEnvironment = () => {
  if (import.meta.env.DEV) return 'development';
  if (import.meta.env.MODE === 'test') return 'test';
  return 'production';
};

// Get current config
export const getApiConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env];
};

// API Endpoints
export const API_ENDPOINTS = {
  // Health check
  health: '/',
  
  // Story endpoints
  story: {
    generate: '/api/story/generate',
    save: '/api/story/save',
    saved: '/api/story/saved',
    delete: (id) => `/api/story/${id}`,
  },
  
  // Image endpoints
  image: {
    generate: '/api/image/generate',
    save: '/api/image/save',
    saved: '/api/image/saved',
    delete: (id) => `/api/image/${id}`,
  },
  
  // TTS endpoints
  tts: {
    generate: '/api/tts/generate',
    voices: '/api/tts/voices',
    save: '/api/tts/save',
    saved: '/api/tts/saved',
    delete: (id) => `/api/tts/${id}`,
  },
  
  // Video endpoints
  video: {
    generate: '/api/video/generate',
    upload: '/api/video/upload',
    youtubeUpload: '/api/video/youtube-upload',
    save: '/api/video/save',
    saved: '/api/video/saved',
    delete: (id) => `/api/video/${id}`,
    status: (id) => `/api/video/${id}/status`,
    formats: '/api/video/formats/supported',
  },
};

// Mock data for testing when backend is unavailable
export const MOCK_DATA = {
  story: {
    title: "Test Story",
    content: "This is a test story generated for demonstration purposes. The backend is currently unavailable, so this is mock data.",
    tags: ["test", "mock", "demo"]
  },
  
  image: {
    url: "https://via.placeholder.com/1024x1024/4F46E5/FFFFFF?text=Mock+Image"
  },
  
  tts: {
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Example audio URL
  },
  
  video: {
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" // Example video URL
  }
}; 