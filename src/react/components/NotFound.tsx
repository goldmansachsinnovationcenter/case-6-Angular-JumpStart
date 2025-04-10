import React from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import Card from './shared/Card';
import Button from './shared/Button';

const NotFoundContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Message = styled.p`
  margin-bottom: 30px;
  color: #666;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer data-testid="not-found-container">
      <Card>
        <Title>Page Not Found</Title>
        <Message>
          The page you are looking for does not exist or has been moved.
        </Message>
        <ButtonContainer>
          <Button
            variant="primary"
            as={Link}
            to="/"
            dataTestId="home-button"
          >
            Return to Home
          </Button>
        </ButtonContainer>
      </Card>
    </NotFoundContainer>
  );
};

export default NotFound;
