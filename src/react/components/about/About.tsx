import React from 'react';
import styled from 'styled-components';
import Card from '../shared/Card';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Content = styled.div`
  line-height: 1.6;
`;

const About: React.FC = () => {
  return (
    <AboutContainer data-testid="about-container">
      <Title>About Angular JumpStart</Title>
      <Card>
        <Content>
          <p>
            This application provides a simple way to manage customers and their orders.
            It was originally built with Angular and has been converted to React.
          </p>
          <p>
            The application demonstrates several key features:
          </p>
          <ul>
            <li>Customer management (add, edit, view)</li>
            <li>Order tracking</li>
            <li>Multiple view modes (card, grid, map)</li>
            <li>Filtering and pagination</li>
            <li>Responsive design</li>
          </ul>
          <p>
            Technologies used in the React version:
          </p>
          <ul>
            <li>React with TypeScript</li>
            <li>TanStack Router for routing</li>
            <li>React Query for data fetching</li>
            <li>Styled Components for styling</li>
            <li>Material-UI for UI components</li>
          </ul>
        </Content>
      </Card>
    </AboutContainer>
  );
};

export default About;
