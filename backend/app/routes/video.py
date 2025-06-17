from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List
from app.services.video_service import (
    generate_video_from_images, 
    save_video, 
    upload_to_youtube, 
    get_video_status,
    process_video_upload,
    get_supported_video_formats
)
import uuid
import os

router = APIRouter()

class VideoGenerateRequest(BaseModel):
    images: List[str]
    audio_base64: Optional[str] = None
    duration: Optional[int] = 10

class VideoResponse(BaseModel):
    video_base64: str
    filename: str
    duration: int

class YouTubeUploadRequest(BaseModel):
    video_path: str
    title: str
    description: Optional[str] = ""
    tags: Optional[List[str]] = []

@router.post("/generate", response_model=VideoResponse)
async def create_video(request: VideoGenerateRequest):
    """Generate video from images and optional audio"""
    try:
        # Generate unique filename
        filename = f"video_{uuid.uuid4().hex[:8]}.mp4"
        
        # Generate video
        video_base64 = await generate_video_from_images(
            images=request.images,
            audio_base64=request.audio_base64,
            duration=request.duration
        )
        
        return VideoResponse(
            video_base64=video_base64,
            filename=filename,
            duration=request.duration
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
async def upload_video(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(""),
    tags: str = Form("")
):
    """Upload a video file"""
    try:
        # Validate file type
        allowed_extensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm']
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Read file data
        file_data = await file.read()
        
        # Process upload
        file_path = await process_video_upload(file_data, file.filename)
        
        # Parse tags
        tag_list = [tag.strip() for tag in tags.split(',') if tag.strip()]
        
        return {
            "message": "Video uploaded successfully",
            "filename": file.filename,
            "file_path": file_path,
            "title": title,
            "description": description,
            "tags": tag_list,
            "size": len(file_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/youtube-upload")
async def youtube_upload(request: YouTubeUploadRequest):
    """Upload video to YouTube"""
    try:
        result = await upload_to_youtube(
            video_path=request.video_path,
            title=request.title,
            description=request.description,
            tags=request.tags
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save")
async def save_video_endpoint(request: VideoGenerateRequest):
    """Generate and save video to file"""
    try:
        # Generate unique filename
        filename = f"video_{uuid.uuid4().hex[:8]}.mp4"
        
        # Generate video
        video_base64 = await generate_video_from_images(
            images=request.images,
            audio_base64=request.audio_base64,
            duration=request.duration
        )
        
        # Save to file
        file_path = await save_video(video_base64, filename)
        
        return {
            "message": "Video saved successfully",
            "filename": filename,
            "file_path": file_path,
            "duration": request.duration
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/saved")
async def get_saved_videos():
    """Get list of saved video files"""
    try:
        upload_dir = "uploads/videos"
        if not os.path.exists(upload_dir):
            return {"files": []}
        
        files = []
        for filename in os.listdir(upload_dir):
            if filename.endswith(('.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm')):
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

@router.get("/{video_id}/status")
async def get_video_status_endpoint(video_id: str):
    """Get the status of a video processing job"""
    try:
        status = await get_video_status(video_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{filename}")
async def delete_video(filename: str):
    """Delete a saved video file"""
    try:
        file_path = os.path.join("uploads/videos", filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            return {"message": f"File {filename} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/formats/supported")
async def get_supported_formats():
    """Get list of supported video formats"""
    try:
        formats = await get_supported_video_formats()
        return {"formats": formats}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
