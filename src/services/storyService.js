import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const storyService = {
  async generateStory({ prompt, style, length }) {
    try {
      const response = await axios.post(`${API_URL}/api/story/generate`, {
        prompt,
        style,
        length,
      });
      
      // Format the response to match what the frontend expects
      const { title, content, tags } = response.data;
      return {
        story: `${title}\n\n${content}\n\nTags: ${tags.join(', ')}`
      };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to generate story');
    }
  },
};
