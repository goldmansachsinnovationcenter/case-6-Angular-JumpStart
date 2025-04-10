import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  dataTestId?: string;
}

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 12px 16px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Card: React.FC<CardProps> = ({
  children,
  title,
  className,
  dataTestId = 'card',
}) => {
  return (
    <CardContainer className={className} data-testid={dataTestId}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
    </CardContainer>
  );
};

export default Card;
