import React from 'react';
import { useAngularServices } from '../../shared/react/angular-services-context';

interface ShellComponentProps {
  children?: React.ReactNode;
}

export const ShellComponent: React.FC<ShellComponentProps> = ({ children }) => {
  const { authService, router } = useAngularServices();

  const handleLogout = () => {
    if (authService) {
      authService.logout().subscribe();
    }
  };

  const navigateToLogin = () => {
    if (router) {
      router.navigate(['/login']);
    }
  };

  const isAuthenticated = authService?.isAuthenticated || false;

  return (
    <div className="shell-container">
      <div className="shell-header">
        <h2>Application Shell</h2>
        <div className="user-info">
          {isAuthenticated ? 
            <span>Logged In | <a onClick={handleLogout}>Logout</a></span> : 
            <span><a onClick={navigateToLogin}>Login</a></span>
          }
        </div>
      </div>
      <div className="shell-content">
        {children}
      </div>
    </div>
  );
};
