import React from 'react';
import { useAngularServices } from '../../shared/react/angular-services-context';

interface ShellComponentProps {
  children?: React.ReactNode;
}

export const ShellComponent: React.FC<ShellComponentProps> = ({ children }) => {
  const { authService, router } = useAngularServices();

  return (
    <div className="shell-container">
      <div className="shell-header">
        <h2>Application Shell</h2>
        <div className="user-info">
          {authService.isAuthenticated ? 
            <span>Logged In | <a onClick={() => authService.logout().subscribe()}>Logout</a></span> : 
            <span><a onClick={() => router.navigate(['/login'])}>Login</a></span>
          }
        </div>
      </div>
      <div className="shell-content">
        {children}
      </div>
    </div>
  );
};
