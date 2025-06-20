import { api } from './api';

export const imageService = {
  // Generate image using AI
  generateImage: async (prompt, style, size = "1024x1024") => {
    try {
      const response = await api.post('/image/generate', {
        prompt,
        style,
        size
      });
      return response;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  },

  // Generate multiple images
  generateMultipleImages: async (prompt, style, count = 4, size = "1024x1024") => {
    try {
      const response = await api.post('/image/generate-multiple', {
        prompt,
        style,
        count,
        size
      });
      return response;
    } catch (error) {
      console.error('Error generating multiple images:', error);
      throw error;
    }
  },

  // Edit existing image
  editImage: async (imageFile, prompt, maskFile = null) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('prompt', prompt);
      if (maskFile) {
        formData.append('mask', maskFile);
      }

      const response = await api.post('/image/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error editing image:', error);
      throw error;
    }
  },

  // Upscale image
  upscaleImage: async (imageFile, scale = 2) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('scale', scale);

      const response = await api.post('/image/upscale', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error upscaling image:', error);
      throw error;
    }
  },

  // Apply style transfer
  applyStyleTransfer: async (contentImage, styleImage) => {
    try {
      const formData = new FormData();
      formData.append('content_image', contentImage);
      formData.append('style_image', styleImage);

      const response = await api.post('/image/style-transfer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error applying style transfer:', error);
      throw error;
    }
  },

  // Get image variations
  getImageVariations: async (imageFile, count = 4) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('count', count);

      const response = await api.post('/image/variations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error getting image variations:', error);
      throw error;
    }
  },

  // Mock functions for development/testing
  mockGenerateImage: async (prompt, style, size = "1024x1024") => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockImages = [
      "https://via.placeholder.com/1024x1024/4F46E5/FFFFFF?text=AI+Generated+Image+1",
      "https://via.placeholder.com/1024x1024/7C3AED/FFFFFF?text=AI+Generated+Image+2",
      "https://via.placeholder.com/1024x1024/EC4899/FFFFFF?text=AI+Generated+Image+3",
      "https://via.placeholder.com/1024x1024/F59E0B/FFFFFF?text=AI+Generated+Image+4"
    ];
    
    return {
      id: `img_${Date.now()}`,
      url: mockImages[Math.floor(Math.random() * mockImages.length)],
      prompt,
      style,
      size,
      created_at: new Date().toISOString()
    };
  },

  mockGenerateMultipleImages: async (prompt, style, count = 4, size = "1024x1024") => {
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockImages = [
      "https://via.placeholder.com/1024x1024/4F46E5/FFFFFF?text=AI+Image+1",
      "https://via.placeholder.com/1024x1024/7C3AED/FFFFFF?text=AI+Image+2",
      "https://via.placeholder.com/1024x1024/EC4899/FFFFFF?text=AI+Image+3",
      "https://via.placeholder.com/1024x1024/F59E0B/FFFFFF?text=AI+Image+4",
      "https://via.placeholder.com/1024x1024/10B981/FFFFFF?text=AI+Image+5",
      "https://via.placeholder.com/1024x1024/EF4444/FFFFFF?text=AI+Image+6"
    ];
    
    const images = [];
    for (let i = 0; i < count; i++) {
      images.push({
        id: `img_${Date.now()}_${i}`,
        url: mockImages[i % mockImages.length],
        prompt,
        style,
        size,
        created_at: new Date().toISOString()
      });
    }
    
    return { images };
  }
};
