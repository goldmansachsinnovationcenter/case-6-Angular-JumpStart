import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
  
  &.active {
    font-weight: bold;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem;
`;

export const AppLayout: React.FC = () => {
  return (
    <AppContainer>
      <Header>
        <h1>Angular JumpStart (React Version)</h1>
        <Nav>
          <NavLink to="/customers">Customers</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">Login</NavLink>
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </AppContainer>
  );
};
