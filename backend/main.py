from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import story, image

app = FastAPI(title="AI Content Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Local development
        "http://localhost:5174",  # Local development (alternative port)
        "https://slategrey-oyster-130297.hostingersite.com",  # Production frontend
        "http://slategrey-oyster-130297.hostingersite.com",   # Production frontend (http)
        "https://darkorange-seahorse-703302.hostingersite.com",  # New production frontend
        "http://darkorange-seahorse-703302.hostingersite.com",   # New production frontend (http)
    ],
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
