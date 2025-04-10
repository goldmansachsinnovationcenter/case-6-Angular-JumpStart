import React from 'react';
import styled from 'styled-components';
import { Outlet } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { UIProvider, useUI } from '../contexts/UIContext';
import Header from './Header';
import Footer from './Footer';
import Growler from './shared/Growler';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const GrowlerWrapper = () => {
  const { isLoading } = useUI();
  
  return (
    <>
      {/* Growler messages will be rendered by the UIProvider */}
    </>
  );
};

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <UIProvider>
      <MainContainer data-testid="main-layout">
        <Header />
        <Content>
          <Outlet />
        </Content>
        <Footer />
        <GrowlerWrapper />
      </MainContainer>
    </UIProvider>
  );
};

export default MainLayout;
