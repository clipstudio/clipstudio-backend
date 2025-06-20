from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.services.openai_service import generate_story

router = APIRouter()

class StoryRequest(BaseModel):
    prompt: str
    genre: Optional[str] = "Drama"  # Match frontend genres
    tone: Optional[str] = "Serious"  # Match frontend tones

class StoryResponse(BaseModel):
    title: str
    content: str
    tags: List[str]

@router.post("/generate", response_model=StoryResponse)
async def create_story(request: StoryRequest):
    try:
        story = await generate_story(
            prompt=request.prompt,
            genre=request.genre,
            tone=request.tone
        )
        return story
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
