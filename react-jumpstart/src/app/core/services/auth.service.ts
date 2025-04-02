import axios from 'axios';
import { UtilitiesService } from './utilities.service';
import { IUserLogin, IApiResponse } from '../../shared/interfaces';

/**
 * Authentication service for handling user login/logout
 */
export const AuthService = {
  baseUrl: UtilitiesService.getApiUrl(),
  
  /**
   * Login user
   */
  login: async (userLogin: IUserLogin): Promise<boolean> => {
    try {
      const response = await axios.post<IApiResponse>(
        `${AuthService.baseUrl}/api/auth/login`, 
        userLogin
      );
      
      const { status } = response.data;
      
      if (status) {
        localStorage.setItem('token', response.data.token || 'demo-token');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error in login:', error);
      return false;
    }
  },
  
  /**
   * Logout user
   */
  logout: (): void => {
    localStorage.removeItem('token');
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
  
  /**
   * Get authentication token
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  }
};
