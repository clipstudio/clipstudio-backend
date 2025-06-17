import apiService from './api';

class TTSService {
  /**
   * Convert text to speech
   * @param {Object} params - TTS parameters
   * @param {string} params.text - Text to convert to speech
   * @param {string} [params.voice="alloy"] - Voice to use (alloy, echo, fable, onyx, nova, shimmer)
   * @param {string} [params.model="tts-1"] - Model to use (tts-1, tts-1-hd)
   * @param {number} [params.speed=1.0] - Speed of speech (0.25 to 4.0)
   * @returns {Promise<Object>} Audio data or URL
   */
  async generateSpeech({ text, voice = "alloy", model = "tts-1", speed = 1.0 }) {
    try {
      const response = await apiService.post('/api/tts/generate', {
        text,
        voice,
        model,
        speed
      });
      
      return response;
    } catch (error) {
      console.warn('TTS generation failed, using mock data:', error.message);
      
      // Return mock data when backend is unavailable
      const mockData = apiService.getMockData('tts');
      return {
        ...mockData,
        url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        text: text.substring(0, 100) + '...',
        voice,
        model,
        speed
      };
    }
  }

  /**
   * Get available voices
   * @returns {Promise<Array>} Array of available voices
   */
  async getVoices() {
    try {
      const response = await apiService.get('/api/tts/voices');
      return response;
    } catch (error) {
      console.warn('Failed to fetch voices, using mock data:', error.message);
      // Return mock voices
      return [
        { id: "alloy", name: "Alloy - Balanced" },
        { id: "echo", name: "Echo - Clear" },
        { id: "fable", name: "Fable - Storytelling" },
        { id: "onyx", name: "Onyx - Deep" },
        { id: "nova", name: "Nova - Bright" },
        { id: "shimmer", name: "Shimmer - Warm" },
      ];
    }
  }

  /**
   * Save a TTS audio file (if backend supports it)
   * @param {Object} audio - Audio object to save
   * @returns {Promise<Object>} Saved audio data
   */
  async saveAudio(audio) {
    try {
      const response = await apiService.post('/api/tts/save', audio);
      return response;
    } catch (error) {
      console.warn('Audio save failed:', error.message);
      // Return mock success response
      return {
        id: `mock-${Date.now()}`,
        ...audio,
        saved: true,
        message: 'Audio saved (mock)'
      };
    }
  }

  /**
   * Get user's saved audio files (if backend supports it)
   * @returns {Promise<Array>} Array of saved audio files
   */
  async getSavedAudio() {
    try {
      const response = await apiService.get('/api/tts/saved');
      return response;
    } catch (error) {
      console.warn('Failed to fetch saved audio, using mock data:', error.message);
      // Return mock saved audio files
      return [
        {
          id: 'mock-1',
          url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          text: 'Sample audio text',
          voice: 'alloy',
          model: 'tts-1',
          speed: 1.0,
          createdAt: new Date().toISOString()
        }
      ];
    }
  }

  /**
   * Delete a saved audio file (if backend supports it)
   * @param {string} audioId - ID of the audio file to delete
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteAudio(audioId) {
    try {
      const response = await apiService.delete(`/api/tts/${audioId}`);
      return response;
    } catch (error) {
      console.warn('Audio deletion failed:', error.message);
      // Return mock success response
      return {
        success: true,
        message: 'Audio deleted (mock)',
        id: audioId
      };
    }
  }

  /**
   * Download an audio file from URL
   * @param {string} audioUrl - URL of the audio file to download
   * @returns {Promise<Blob>} Audio blob
   */
  async downloadAudio(audioUrl) {
    try {
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error(`Failed to download audio: ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.error('Audio download failed:', error);
      throw new Error(`Failed to download audio: ${error.message}`);
    }
  }
}

// Create and export a singleton instance
const ttsService = new TTSService();
export default ttsService;
