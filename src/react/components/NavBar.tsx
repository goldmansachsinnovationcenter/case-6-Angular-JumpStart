import React from 'react';
import styled from 'styled-components';
import { Link, useRouter } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';

const NavContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 0;
  margin: 0;
`;

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 0;
  margin: 0;
  
  &:hover {
    background-color: #444;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  
  &:hover {
    text-decoration: none;
    color: white;
  }
  
  &.active {
    background-color: #007bff;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #444;
  }
`;

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.navigate({ to: '/login' });
  };
  
  return (
    <NavContainer data-testid="navbar">
      <NavList>
        <NavItem>
          <NavLink to="/" data-testid="home-link">
            Home
          </NavLink>
        </NavItem>
        
        {isAuthenticated && (
          <>
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
          </>
        )}
        
        {!isAuthenticated && (
          <NavItem>
            <NavLink to="/login" data-testid="login-link">
              Login
            </NavLink>
          </NavItem>
        )}
      </NavList>
    </NavContainer>
  );
};

export default NavBar;
