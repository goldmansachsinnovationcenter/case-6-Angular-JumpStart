import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUserLogin, IApiResponse } from '../../app/shared/interfaces';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userLogin: IUserLogin) => Promise<IApiResponse>;
  logout: () => Promise<boolean>;
  user: { email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUser({ email: authData.email });
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = async (userLogin: IUserLogin): Promise<IApiResponse> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });
      
      const data: IApiResponse = await response.json();
      
      if (data.status) {
        setIsAuthenticated(true);
        setUser({ email: userLogin.email });
        localStorage.setItem('auth', JSON.stringify({ 
          email: userLogin.email,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        }));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { status: false, error: 'An error occurred during login' };
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.status) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('auth');
      }
      
      return data.status;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
