import os
from openai import AsyncOpenAI
from typing import Dict, Any

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_story(prompt: str, style: str = "casual", length: str = "medium") -> Dict[str, Any]:
    # Define length tokens
    length_tokens = {
        "short": "about 200 words",
        "medium": "about 500 words",
        "long": "about 1000 words"
    }
    
    # Define style prompts
    style_prompts = {
        "casual": "Write a casual, conversational story that's easy to read and engaging. Include a catchy title.",
        "professional": "Write a professional, well-structured story suitable for business or formal contexts. Include a clear title.",
        "creative": "Write a creative, imaginative story that's unique and engaging. Include a creative title.",
        "humorous": "Write a funny, entertaining story that will make readers laugh. Include a witty title."
    }
    
    system_prompt = f"""You are a professional story writer. 
    {style_prompts.get(style, style_prompts["casual"])}
    The story should be {length_tokens[length]}.
    Include relevant tags at the end.
    Format the response as JSON with 'title', 'content', and 'tags' fields.
    The tags should be relevant to the story's theme and genre."""
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4",  # or "gpt-3.5-turbo" for faster/cheaper results
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            response_format={ "type": "json_object" }
        )
        
        # Parse the JSON response
        story_data = response.choices[0].message.content
        return story_data
        
    except Exception as e:
        raise Exception(f"Error generating story: {str(e)}")

async def generate_image(prompt: str, style: str = "realistic", size: str = "1024x1024") -> str:
    try:
        response = await client.images.generate(
            model="dall-e-3",
            prompt=f"Create a {style} style image: {prompt}",
            size=size,
            quality="standard",
            n=1,
        )
        return response.data[0].url
    except Exception as e:
        raise Exception(f"Error generating image: {str(e)}")
