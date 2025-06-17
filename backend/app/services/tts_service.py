import os
import tempfile
import base64
from openai import OpenAI
from typing import Optional

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_tts(text: str, voice: str = "alloy", model: str = "tts-1") -> str:
    """
    Generate TTS audio from text using OpenAI's TTS API
    
    Args:
        text: The text to convert to speech
        voice: The voice to use (alloy, echo, fable, onyx, nova, shimmer)
        model: The TTS model to use (tts-1, tts-1-hd)
    
    Returns:
        Base64 encoded audio data
    """
    try:
        # Create a temporary file to store the audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            response = client.audio.speech.create(
                model=model,
                voice=voice,
                input=text
            )
            
            # Save the audio to the temporary file
            response.stream_to_file(temp_file.name)
            
            # Read the file and encode as base64
            with open(temp_file.name, "rb") as audio_file:
                audio_data = audio_file.read()
                audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            
            # Clean up the temporary file
            os.unlink(temp_file.name)
            
            return audio_base64
            
    except Exception as e:
        raise Exception(f"TTS generation failed: {str(e)}")

async def get_available_voices() -> list:
    """
    Get list of available TTS voices
    
    Returns:
        List of voice options
    """
    return [
        {"id": "alloy", "name": "Alloy", "description": "A balanced, versatile voice"},
        {"id": "echo", "name": "Echo", "description": "A warm, friendly voice"},
        {"id": "fable", "name": "Fable", "description": "A clear, expressive voice"},
        {"id": "onyx", "name": "Onyx", "description": "A deep, authoritative voice"},
        {"id": "nova", "name": "Nova", "description": "A bright, energetic voice"},
        {"id": "shimmer", "name": "Shimmer", "description": "A soft, gentle voice"}
    ]

async def save_tts_audio(audio_base64: str, filename: str) -> str:
    """
    Save TTS audio to a file
    
    Args:
        audio_base64: Base64 encoded audio data
        filename: Name for the saved file
    
    Returns:
        Path to the saved file
    """
    try:
        # Decode base64 audio
        audio_data = base64.b64decode(audio_base64)
        
        # Create uploads directory if it doesn't exist
        upload_dir = "uploads/tts"
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save the file
        file_path = os.path.join(upload_dir, filename)
        with open(file_path, "wb") as f:
            f.write(audio_data)
        
        return file_path
        
    except Exception as e:
        raise Exception(f"Failed to save TTS audio: {str(e)}")
