import React from 'react';
import styled from 'styled-components';
import { Outlet, Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { UIProvider } from '../contexts/UIContext';
import Growler from './shared/Growler';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Footer = styled.footer`
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px;
`;

const AppContainer: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };
  
  return (
    <UIProvider>
      <AppWrapper data-testid="app-container">
        <Header>
          <NavBar>
            <Logo>Angular JumpStart</Logo>
            {isAuthenticated && (
              <NavLinks>
                <NavItem>
                  <NavLink to="/customers" data-testid="customers-link">
                    Customers
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/orders" data-testid="orders-link">
                    Orders
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/about" data-testid="about-link">
                    About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <LogoutButton onClick={handleLogout} data-testid="logout-button">
                    Logout
                  </LogoutButton>
                </NavItem>
              </NavLinks>
            )}
          </NavBar>
        </Header>
        
        <Content>
          <Outlet />
        </Content>
        
        <Footer>
          <div>Angular JumpStart - React Version</div>
        </Footer>
        
        {/* Growler will be rendered by UIContext */}
      </AppWrapper>
    </UIProvider>
  );
};

export default AppContainer;
