# Deployment Guide: AI Content Generator

This guide will help you deploy your AI Content Generator application with the frontend on Hostinger and backend on Render.

## Backend Deployment (Render)

### 1. Prepare Backend for Deployment

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Set the following configuration:
     - **Name**: `ai-content-generator-backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Set Environment Variables** in Render:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Deploy the backend** and note the URL (e.g., `https://ai-content-generator-backend.onrender.com`)

### 2. Update Frontend Configuration

Once your backend is deployed, update the frontend API configuration:

1. **Update `frontend/src/config/api.js`**:
   ```javascript
   // Production - your deployed backend on Render
   production: {
     baseURL: 'https://your-backend-app-name.onrender.com', // Replace with your actual Render URL
     timeout: 30000,
   },
   ```

2. **Create environment file** `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-backend-app-name.onrender.com
   ```

## Frontend Deployment (Hostinger)

### 1. Build the Frontend

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **The built files will be in `frontend/dist/`**

### 2. Upload to Hostinger

1. **Log into your Hostinger control panel**

2. **Navigate to File Manager** or use FTP

3. **Upload the contents of `frontend/dist/` to your website's public_html directory**

4. **Create/update `.htaccess` file** in your public_html directory:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

## Testing the Connection

### 1. Test Backend Health

Visit your backend URL to ensure it's running:
```
https://your-backend-app-name.onrender.com/
```

You should see:
```json
{"message": "AI Content Generator API is running"}
```

### 2. Test Frontend-Backend Connection

1. **Open your Hostinger website**
2. **Navigate to the AI features** (Story Generator, Image Generator, etc.)
3. **Try generating content** to ensure the connection works

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure your backend CORS configuration includes your Hostinger domain
   - Check that the domain is exactly correct (including https://)

2. **API Connection Failed**:
   - Verify the backend URL in your frontend configuration
   - Check that your backend is running on Render
   - Ensure environment variables are set correctly

3. **OpenAI API Errors**:
   - Verify your OpenAI API key is set in Render environment variables
   - Check that your OpenAI account has sufficient credits

4. **Build Errors**:
   - Ensure all dependencies are installed: `npm install`
   - Check for any missing packages in package.json

### Debug Steps

1. **Check browser console** for any JavaScript errors
2. **Check network tab** to see if API requests are being made
3. **Verify backend logs** in Render dashboard
4. **Test API endpoints directly** using tools like Postman

## Environment Variables Reference

### Backend (Render)
```
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Frontend (Hostinger)
```
VITE_API_URL=https://your-backend-app-name.onrender.com
```

## API Endpoints

Your backend provides these endpoints:

- **Health Check**: `GET /`
- **Story Generation**: `POST /api/story/generate`
- **Image Generation**: `POST /api/image/generate`
- **TTS Generation**: `POST /api/tts/generate`
- **Video Processing**: `POST /api/video/generate`
- **Video Upload**: `POST /api/video/upload`
- **YouTube Upload**: `POST /api/video/youtube-upload`

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **CORS**: Only allow necessary domains in CORS configuration
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **HTTPS**: Always use HTTPS in production

## Performance Optimization

1. **CDN**: Consider using a CDN for static assets
2. **Caching**: Implement caching for generated content
3. **Compression**: Enable gzip compression on your server
4. **Image Optimization**: Optimize generated images before serving

## Monitoring

1. **Set up logging** in your backend
2. **Monitor API usage** and costs
3. **Set up alerts** for errors and downtime
4. **Track user engagement** with analytics

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Render and Hostinger documentation
3. Check the browser console and network tab
4. Verify all environment variables are set correctly 