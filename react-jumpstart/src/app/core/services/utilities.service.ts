/**
 * Utility service for the application
 */
export const UtilitiesService = {
  /**
   * Get the API URL based on environment
   */
  getApiUrl: (): string => {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) 
      ? import.meta.env.VITE_API_URL 
      : 'http://localhost:8080';
  }
};
