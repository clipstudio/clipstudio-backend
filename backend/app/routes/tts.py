from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.services.tts_service import generate_tts, get_available_voices, save_tts_audio
import uuid
import os

router = APIRouter()

class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = "alloy"
    model: Optional[str] = "tts-1"

class TTSResponse(BaseModel):
    audio_base64: str
    filename: str
    voice: str
    model: str

class TTSVoice(BaseModel):
    id: str
    name: str
    description: str

@router.post("/generate", response_model=TTSResponse)
async def create_tts(request: TTSRequest):
    """Generate TTS audio from text"""
    try:
        # Generate unique filename
        filename = f"tts_{uuid.uuid4().hex[:8]}.mp3"
        
        # Generate TTS audio
        audio_base64 = await generate_tts(
            text=request.text,
            voice=request.voice,
            model=request.model
        )
        
        return TTSResponse(
            audio_base64=audio_base64,
            filename=filename,
            voice=request.voice,
            model=request.model
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/voices", response_model=List[TTSVoice])
async def get_voices():
    """Get available TTS voices"""
    try:
        voices = await get_available_voices()
        return voices
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save")
async def save_tts(request: TTSRequest):
    """Generate and save TTS audio to file"""
    try:
        # Generate unique filename
        filename = f"tts_{uuid.uuid4().hex[:8]}.mp3"
        
        # Generate TTS audio
        audio_base64 = await generate_tts(
            text=request.text,
            voice=request.voice,
            model=request.model
        )
        
        # Save to file
        file_path = await save_tts_audio(audio_base64, filename)
        
        return {
            "message": "TTS audio saved successfully",
            "filename": filename,
            "file_path": file_path,
            "voice": request.voice,
            "model": request.model
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/saved")
async def get_saved_tts():
    """Get list of saved TTS files"""
    try:
        upload_dir = "uploads/tts"
        if not os.path.exists(upload_dir):
            return {"files": []}
        
        files = []
        for filename in os.listdir(upload_dir):
            if filename.endswith('.mp3'):
                file_path = os.path.join(upload_dir, filename)
                file_size = os.path.getsize(file_path)
                files.append({
                    "filename": filename,
                    "size": file_size,
                    "path": file_path
                })
        
        return {"files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{filename}")
async def delete_tts(filename: str):
    """Delete a saved TTS file"""
    try:
        file_path = os.path.join("uploads/tts", filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            return {"message": f"File {filename} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
