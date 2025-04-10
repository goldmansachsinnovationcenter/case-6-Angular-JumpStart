import React from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import Card from './shared/Card';
import Button from './shared/Button';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h3`
  margin-bottom: 30px;
  color: #666;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const FeatureList = styled.ul`
  text-align: left;
  margin: 30px auto;
  max-width: 500px;
  padding-left: 20px;
`;

const FeatureItem = styled.li`
  margin-bottom: 10px;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer data-testid="home-container">
      <Card>
        <Title>Angular JumpStart</Title>
        <Subtitle>Now in React!</Subtitle>
        
        <p>
          Welcome to the React version of Angular JumpStart. This application demonstrates
          a complete customer management system built with React and modern web technologies.
        </p>
        
        <FeatureList>
          <FeatureItem>View customers in card, list, or map view</FeatureItem>
          <FeatureItem>Filter and paginate customer data</FeatureItem>
          <FeatureItem>Add, edit, and delete customers</FeatureItem>
          <FeatureItem>View customer orders and details</FeatureItem>
          <FeatureItem>Secure authentication system</FeatureItem>
        </FeatureList>
        
        <ButtonContainer>
          <Button
            variant="primary"
            as={Link}
            to="/customers"
            dataTestId="view-customers-button"
          >
            View Customers
          </Button>
          <Button
            variant="secondary"
            as={Link}
            to="/about"
            dataTestId="about-button"
          >
            About
          </Button>
        </ButtonContainer>
      </Card>
    </HomeContainer>
  );
};

export default Home;
