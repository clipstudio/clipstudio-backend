from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.openai_service import generate_image

router = APIRouter()

class ImageRequest(BaseModel):
    prompt: str
    style: Optional[str] = "realistic"  # realistic, artistic, cartoon, anime
    size: Optional[str] = "1024x1024"  # 256x256, 512x512, 1024x1024

class ImageResponse(BaseModel):
    url: str

@router.post("/generate", response_model=ImageResponse)
async def create_image(request: ImageRequest):
    try:
        image_url = await generate_image(
            prompt=request.prompt,
            style=request.style,
            size=request.size
        )
        return {"url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
