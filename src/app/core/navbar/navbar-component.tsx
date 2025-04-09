import React, { useEffect, useState } from 'react';
import { useAngularServices } from '../../shared/react/angular-services-context';

interface NavbarComponentProps {
  onLoginLogout?: () => void;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({ onLoginLogout }) => {
  const { authService, growlerService, router, loggerService } = useAngularServices();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loginLogoutText, setLoginLogoutText] = useState('Login');

  useEffect(() => {
    const subscription = authService.authChanged.subscribe({
      next: (loggedIn: boolean) => {
        setLoginLogoutText(loggedIn ? 'Logout' : 'Login');
      },
      error: (err: any) => loggerService.log(err)
    });

    setLoginLogoutText(authService.isAuthenticated ? 'Logout' : 'Login');

    return () => {
      subscription.unsubscribe();
    };
  }, [authService, loggerService]);

  const loginOrOut = () => {
    const isAuthenticated = authService.isAuthenticated;
    if (isAuthenticated) {
      authService.logout().subscribe({
        next: (status: boolean) => {
          setLoginLogoutText('Login');
          growlerService.growl('Logged Out', 3); // GrowlerMessageType.Info = 3
          router.navigate(['/customers']);
          if (onLoginLogout) {
            onLoginLogout();
          }
        },
        error: (err: any) => loggerService.log(err)
      });
    } else {
      router.navigate(['/login']);
      if (onLoginLogout) {
        onLoginLogout();
      }
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
          <a className="navbar-brand" onClick={() => router.navigate(['/customers'])}>
            <img src="images/people.png" alt="logo" />
            <span className="app-title">Customer Manager</span>
          </a>
          <span className="navbar-collapse" data-collapse={isCollapsed ? "true" : "false"}>
            <ul className="nav navbar-nav nav-pills navBarPadding">
              <li className={router.url.includes('/customers') ? 'active' : ''}>
                <a onClick={() => router.navigate(['/customers'])}>Customers</a>
              </li>
              <li className={router.url.includes('/orders') ? 'active' : ''}>
                <a onClick={() => router.navigate(['/orders'])}>Orders</a>
              </li>
              <li className={router.url.includes('/about') ? 'active' : ''}>
                <a onClick={() => router.navigate(['/about'])}>About</a>
              </li>
              <li className={router.url.includes('/login') ? 'active' : ''} onClick={loginOrOut} data-cy="login-logout">
                <a>{loginLogoutText}</a>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </nav>
  );
};
