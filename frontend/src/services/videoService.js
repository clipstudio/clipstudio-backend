import apiService from './api';

class VideoService {
  /**
   * Generate a video from story and images
   * @param {Object} params - Video generation parameters
   * @param {string} params.story - Story content for the video
   * @param {Array} params.images - Array of image URLs
   * @param {string} [params.style="cinematic"] - Video style
   * @param {string} [params.duration="30"] - Video duration in seconds
   * @returns {Promise<Object>} Generated video data
   */
  async generateVideo({ story, images, style = "cinematic", duration = "30" }) {
    try {
      const response = await apiService.post('/api/video/generate', {
        story,
        images,
        style,
        duration
      });
      
      return response;
    } catch (error) {
      console.error('Video generation failed:', error);
      throw new Error(`Failed to generate video: ${error.message}`);
    }
  }

  /**
   * Upload a video to YouTube
   * @param {Object} params - YouTube upload parameters
   * @param {File} params.videoFile - Video file to upload
   * @param {string} params.title - Video title
   * @param {string} params.description - Video description
   * @param {Array} params.tags - Video tags
   * @param {string} [params.privacy="private"] - Privacy setting (private, unlisted, public)
   * @returns {Promise<Object>} Upload result
   */
  async uploadToYouTube({ videoFile, title, description, tags, privacy = "private" }) {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', JSON.stringify(tags));
      formData.append('privacy', privacy);

      const response = await apiService.post('/api/video/youtube-upload', formData, {
        headers: {
          // Don't set Content-Type for FormData, let the browser set it
        }
      });
      
      return response;
    } catch (error) {
      console.error('YouTube upload failed:', error);
      throw new Error(`Failed to upload to YouTube: ${error.message}`);
    }
  }

  /**
   * Save a video project (if backend supports it)
   * @param {Object} video - Video object to save
   * @returns {Promise<Object>} Saved video data
   */
  async saveVideo(video) {
    try {
      const response = await apiService.post('/api/video/save', video);
      return response;
    } catch (error) {
      console.error('Video save failed:', error);
      throw new Error(`Failed to save video: ${error.message}`);
    }
  }

  /**
   * Get user's saved videos (if backend supports it)
   * @returns {Promise<Array>} Array of saved videos
   */
  async getSavedVideos() {
    try {
      const response = await apiService.get('/api/video/saved');
      return response;
    } catch (error) {
      console.error('Failed to fetch saved videos:', error);
      throw new Error(`Failed to fetch saved videos: ${error.message}`);
    }
  }

  /**
   * Delete a saved video (if backend supports it)
   * @param {string} videoId - ID of the video to delete
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteVideo(videoId) {
    try {
      const response = await apiService.delete(`/api/video/${videoId}`);
      return response;
    } catch (error) {
      console.error('Video deletion failed:', error);
      throw new Error(`Failed to delete video: ${error.message}`);
    }
  }

  /**
   * Get video processing status
   * @param {string} videoId - ID of the video to check
   * @returns {Promise<Object>} Processing status
   */
  async getVideoStatus(videoId) {
    try {
      const response = await apiService.get(`/api/video/${videoId}/status`);
      return response;
    } catch (error) {
      console.error('Failed to get video status:', error);
      throw new Error(`Failed to get video status: ${error.message}`);
    }
  }

  /**
   * Download a video from URL
   * @param {string} videoUrl - URL of the video to download
   * @returns {Promise<Blob>} Video blob
   */
  async downloadVideo(videoUrl) {
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.error('Video download failed:', error);
      throw new Error(`Failed to download video: ${error.message}`);
    }
  }
}

// Create and export a singleton instance
const videoService = new VideoService();
export default videoService;
