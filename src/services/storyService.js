import { api } from './api';

export const storyService = {
  generateStory: async (prompt, genre, tone) => {
    try {
      const response = await api.post('/story/generate', {
        prompt,
        genre,
        tone
      });

      return response;
    } catch (error) {
      console.error('Error generating story:', error);
      throw error;
    }
  },

  // Mock fallback for development/testing
  generateMockStory: async (prompt, genre, tone) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      title: `${genre} Story: ${prompt.substring(0, 30)}...`,
      content: `This is a ${tone.toLowerCase()} ${genre.toLowerCase()} story based on your prompt: "${prompt}"

Once upon a time, in a world where imagination knows no bounds, a story began to unfold. The characters danced across the pages, their voices echoing through the corridors of creativity. Each word was carefully chosen, each sentence crafted with purpose, as the narrative wove its way through the fabric of storytelling.

The protagonist faced challenges that tested their resolve, while supporting characters added depth and dimension to the unfolding drama. Plot twists emerged like unexpected guests at a dinner party, each one adding flavor to the overall experience.

As the story reached its climax, emotions ran high and the stakes became clear. The resolution brought closure, but left room for the reader's imagination to continue the journey beyond the final words.

This story, generated with the power of AI, demonstrates the endless possibilities when human creativity meets artificial intelligence.`,
      tags: [genre.toLowerCase(), tone.toLowerCase(), "ai-generated", "story"]
    };
  }
};
