import apiService from './api';

class ImageService {
  /**
   * Generate an image based on the provided prompt
   * @param {Object} params - Image generation parameters
   * @param {string} params.prompt - The image prompt
   * @param {string} [params.style="realistic"] - Image style (realistic, artistic, cartoon, anime)
   * @param {string} [params.size="1024x1024"] - Image size (256x256, 512x512, 1024x1024)
   * @returns {Promise<Object>} Generated image with URL
   */
  async generateImage({ prompt, style = "realistic", size = "1024x1024" }) {
    try {
      const response = await apiService.post('/api/image/generate', {
        prompt,
        style,
        size
      });
      
      return response;
    } catch (error) {
      console.warn('Image generation failed, using mock data:', error.message);
      
      // Return mock data when backend is unavailable
      const mockData = apiService.getMockData('image');
      return {
        ...mockData,
        url: `https://via.placeholder.com/${size.replace('x', 'x')}/4F46E5/FFFFFF?text=Mock+Image:+${encodeURIComponent(prompt.substring(0, 20))}`
      };
    }
  }

  /**
   * Save an image to the user's projects (if backend supports it)
   * @param {Object} image - Image object to save
   * @returns {Promise<Object>} Saved image data
   */
  async saveImage(image) {
    try {
      const response = await apiService.post('/api/image/save', image);
      return response;
    } catch (error) {
      console.warn('Image save failed:', error.message);
      // Return mock success response
      return {
        id: `mock-${Date.now()}`,
        ...image,
        saved: true,
        message: 'Image saved (mock)'
      };
    }
  }

  /**
   * Get user's saved images (if backend supports it)
   * @returns {Promise<Array>} Array of saved images
   */
  async getSavedImages() {
    try {
      const response = await apiService.get('/api/image/saved');
      return response;
    } catch (error) {
      console.warn('Failed to fetch saved images, using mock data:', error.message);
      // Return mock saved images
      return [
        {
          id: 'mock-1',
          url: 'https://via.placeholder.com/512x512/4F46E5/FFFFFF?text=Sample+Image',
          prompt: 'Sample image prompt',
          style: 'realistic',
          size: '512x512',
          createdAt: new Date().toISOString()
        }
      ];
    }
  }

  /**
   * Delete a saved image (if backend supports it)
   * @param {string} imageId - ID of the image to delete
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteImage(imageId) {
    try {
      const response = await apiService.delete(`/api/image/${imageId}`);
      return response;
    } catch (error) {
      console.warn('Image deletion failed:', error.message);
      // Return mock success response
      return {
        success: true,
        message: 'Image deleted (mock)',
        id: imageId
      };
    }
  }

  /**
   * Download an image from URL
   * @param {string} imageUrl - URL of the image to download
   * @returns {Promise<Blob>} Image blob
   */
  async downloadImage(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.error('Image download failed:', error);
      throw new Error(`Failed to download image: ${error.message}`);
    }
  }
}

// Create and export a singleton instance
const imageService = new ImageService();
export default imageService;
