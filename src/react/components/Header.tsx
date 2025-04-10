import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 10px 0;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 0 20px;
  margin-bottom: 10px;
  color: #333;
`;

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <HeaderContainer data-testid="app-header">
      <Logo>Angular JumpStart (React)</Logo>
      <NavBar />
    </HeaderContainer>
  );
};

export default Header;
