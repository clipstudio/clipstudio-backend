import { getApiConfig, MOCK_DATA } from '@/config/api';

class ApiService {
  constructor() {
    this.config = getApiConfig();
    this.baseURL = this.config.baseURL;
    this.timeout = this.config.timeout;
    this.isBackendAvailable = true;
  }

  // Check if backend is available
  async checkBackendHealth() {
    try {
      const response = await fetch(`${this.baseURL}/`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      this.isBackendAvailable = response.ok;
      return this.isBackendAvailable;
    } catch (error) {
      console.warn('Backend is not available, using mock data:', error.message);
      this.isBackendAvailable = false;
      return false;
    }
  }

  // Generic request method
  async request(endpoint, options = {}) {
    // Check backend health if not already checked
    if (this.isBackendAvailable) {
      await this.checkBackendHealth();
    }

    // If backend is not available, throw an error to trigger fallback
    if (!this.isBackendAvailable) {
      throw new Error('Backend is not available');
    }

    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Health check
  async healthCheck() {
    return this.get('/');
  }

  // Get mock data for testing
  getMockData(type) {
    return MOCK_DATA[type];
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
