import React, { useEffect, useState } from 'react';
import { useAngularServices } from '../../shared/react/angular-services-context';

interface NavbarComponentProps {
  onLoginLogout?: () => void;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({ onLoginLogout }) => {
  const { authService, growlerService, router, loggerService } = useAngularServices();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loginLogoutText, setLoginLogoutText] = useState('Login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (authService) {
      setIsAuthenticated(authService.isAuthenticated);
      setLoginLogoutText(authService.isAuthenticated ? 'Logout' : 'Login');
      
      if (!authService.isAuthenticated && router && router.url && !router.url.includes('/login')) {
        router.navigate(['/customers']);
      }
      
      const subscription = authService.authChanged.subscribe({
        next: (loggedIn: boolean) => {
          setIsAuthenticated(loggedIn);
          setLoginLogoutText(loggedIn ? 'Logout' : 'Login');
        },
        error: (err: any) => loggerService?.log(err)
      });

      return () => {
        subscription.unsubscribe();
      };
    }
    
    return () => {};
  }, [authService, router, loggerService]);

  const loginOrOut = () => {
    if (!authService) return;
    
    if (isAuthenticated) {
      authService.logout().subscribe({
        next: (status: boolean) => {
          setLoginLogoutText('Login');
          setIsAuthenticated(false);
          growlerService?.growl('Logged Out', 3); // GrowlerMessageType.Info = 3
          router?.navigate(['/customers']);
          if (onLoginLogout) {
            onLoginLogout();
          }
        },
        error: (err: any) => loggerService?.log(err)
      });
    } else {
      router?.navigate(['/login']);
      if (onLoginLogout) {
        onLoginLogout();
      }
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigateTo = (path: string) => {
    if (router) {
      router.navigate([path]);
    }
  };

  const isActive = (path: string): boolean => {
    return router?.url?.includes(path) || false;
  };

  return (
    <nav className="navbar navbar-inner navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" onClick={toggleCollapse}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" onClick={() => navigateTo('/customers')}>
            <img src="images/people.png" alt="logo" />
            <span className="app-title">Customer Manager</span>
          </a>
          <span className="navbar-collapse" data-collapse={isCollapsed ? "true" : "false"}>
            <ul className="nav navbar-nav nav-pills navBarPadding">
              <li className={isActive('/customers') ? 'active' : ''}>
                <a onClick={() => navigateTo('/customers')}>Customers</a>
              </li>
              <li className={isActive('/orders') ? 'active' : ''}>
                <a onClick={() => navigateTo('/orders')}>Orders</a>
              </li>
              <li className={isActive('/about') ? 'active' : ''}>
                <a onClick={() => navigateTo('/about')}>About</a>
              </li>
              <li className={isActive('/login') ? 'active' : ''} onClick={loginOrOut} data-cy="login-logout">
                <a>{loginLogoutText}</a>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </nav>
  );
};
