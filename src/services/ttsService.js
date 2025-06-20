import { api } from './api';

export const ttsService = {
  // Convert text to speech
  textToSpeech: async (text, voice = "alloy", model = "tts-1") => {
    try {
      const response = await api.post('/tts/generate', {
        text,
        voice,
        model
      });
      return response;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  },

  // Generate speech with custom settings
  generateSpeech: async (text, options = {}) => {
    try {
      const response = await api.post('/tts/generate-advanced', {
        text,
        voice: options.voice || "alloy",
        model: options.model || "tts-1",
        speed: options.speed || 1.0,
        pitch: options.pitch || 1.0,
        format: options.format || "mp3",
        quality: options.quality || "standard"
      });
      return response;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  },

  // Get available voices
  getVoices: async () => {
    try {
      const response = await api.get('/tts/voices');
      return response;
    } catch (error) {
      console.error('Error getting voices:', error);
      throw error;
    }
  },

  // Convert speech to text (STT)
  speechToText: async (audioFile, language = "en") => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('language', language);

      const response = await api.post('/tts/speech-to-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error converting speech to text:', error);
      throw error;
    }
  },

  // Generate voice clone
  cloneVoice: async (audioFile, name) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('name', name);

      const response = await api.post('/tts/clone-voice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error cloning voice:', error);
      throw error;
    }
  },

  // Use cloned voice for TTS
  useClonedVoice: async (text, voiceId) => {
    try {
      const response = await api.post('/tts/use-cloned-voice', {
        text,
        voice_id: voiceId
      });
      return response;
    } catch (error) {
      console.error('Error using cloned voice:', error);
      throw error;
    }
  },

  // Mock functions for development/testing
  mockTextToSpeech: async (text, voice = "alloy") => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a mock audio blob
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
    
    return {
      id: `tts_${Date.now()}`,
      audio_url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      text,
      voice,
      duration: 1.0,
      created_at: new Date().toISOString()
    };
  },

  mockGetVoices: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      voices: [
        { id: "alloy", name: "Alloy", language: "en", gender: "neutral" },
        { id: "echo", name: "Echo", language: "en", gender: "male" },
        { id: "fable", name: "Fable", language: "en", gender: "male" },
        { id: "onyx", name: "Onyx", language: "en", gender: "male" },
        { id: "nova", name: "Nova", language: "en", gender: "female" },
        { id: "shimmer", name: "Shimmer", language: "en", gender: "female" }
      ]
    };
  }
};
