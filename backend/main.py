from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import story, image, tts, video

app = FastAPI(title="AI Content Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://darkorange-seahorse-703302.hostingersite.com",  # Production frontend
        "http://darkorange-seahorse-703302.hostingersite.com",   # Production frontend (http)
        "https://seashell-seahorse-396931.hostingersite.com",    # Alternative production frontend
        "http://seashell-seahorse-396931.hostingersite.com",     # Alternative production frontend (http)
        "https://clipstudio-backend-1.onrender.com",             # Backend domain
        "http://clipstudio-backend-1.onrender.com",              # Backend domain (http)
        "http://localhost:5173",  # Local development
        "http://localhost:5174",  # Local development (alternative port)
        "http://localhost:3000",  # Alternative local development
        "*",  # Allow all origins for development (remove in production)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(story.router, prefix="/api/story", tags=["story"])
app.include_router(image.router, prefix="/api/image", tags=["image"])
app.include_router(tts.router, prefix="/api/tts", tags=["tts"])
app.include_router(video.router, prefix="/api/video", tags=["video"])

@app.get("/")
async def root():
    return {"message": "AI Content Generator API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}

@app.get("/ping")
async def ping():
    return {"pong": "API is alive"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
