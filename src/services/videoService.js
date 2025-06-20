import { api } from './api';

export const videoService = {
  // Video processing and editing
  processVideo: async (videoFile, options = {}) => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      
      // Add processing options
      Object.keys(options).forEach(key => {
        formData.append(key, options[key]);
      });

      const response = await api.post('/video/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error processing video:', error);
      throw error;
    }
  },

  // Add text overlay to video
  addTextOverlay: async (videoId, textOptions) => {
    try {
      const response = await api.post('/video/text-overlay', {
        video_id: videoId,
        ...textOptions
      });
      return response;
    } catch (error) {
      console.error('Error adding text overlay:', error);
      throw error;
    }
  },

  // Add audio to video
  addAudio: async (videoId, audioFile, options = {}) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('video_id', videoId);
      
      Object.keys(options).forEach(key => {
        formData.append(key, options[key]);
      });

      const response = await api.post('/video/add-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error adding audio:', error);
      throw error;
    }
  },

  // Apply filters and effects
  applyFilter: async (videoId, filterType, filterOptions = {}) => {
    try {
      const response = await api.post('/video/apply-filter', {
        video_id: videoId,
        filter_type: filterType,
        ...filterOptions
      });
      return response;
    } catch (error) {
      console.error('Error applying filter:', error);
      throw error;
    }
  },

  // Trim video
  trimVideo: async (videoId, startTime, endTime) => {
    try {
      const response = await api.post('/video/trim', {
        video_id: videoId,
        start_time: startTime,
        end_time: endTime
      });
      return response;
    } catch (error) {
      console.error('Error trimming video:', error);
      throw error;
    }
  },

  // Export video
  exportVideo: async (videoId, exportOptions = {}) => {
    try {
      const response = await api.post('/video/export', {
        video_id: videoId,
        ...exportOptions
      });
      return response;
    } catch (error) {
      console.error('Error exporting video:', error);
      throw error;
    }
  },

  // Get video status
  getVideoStatus: async (videoId) => {
    try {
      const response = await api.get(`/video/status/${videoId}`);
      return response;
    } catch (error) {
      console.error('Error getting video status:', error);
      throw error;
    }
  },

  // Mock functions for development/testing
  mockProcessVideo: async (videoFile, options = {}) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
      id: `video_${Date.now()}`,
      status: 'completed',
      url: URL.createObjectURL(videoFile),
      duration: 30,
      thumbnail: 'https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=Video+Thumbnail'
    };
  },

  mockAddTextOverlay: async (videoId, textOptions) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      id: videoId,
      status: 'completed',
      text_added: true,
      text_options: textOptions
    };
  },

  mockApplyFilter: async (videoId, filterType) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: videoId,
      status: 'completed',
      filter_applied: filterType
    };
  }
};
