from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import story, image

app = FastAPI(title="AI Content Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(story.router, prefix="/api/story", tags=["story"])
app.include_router(image.router, prefix="/api/image", tags=["image"])

@app.get("/")
async def root():
    return {"message": "AI Content Generator API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
