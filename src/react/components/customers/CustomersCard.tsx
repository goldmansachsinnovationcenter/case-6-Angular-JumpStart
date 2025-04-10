import React from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import { ICustomer } from '../../../app/shared/interfaces';
import Card from '../shared/Card';
import Button from '../shared/Button';

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const CustomerCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const CardImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 15px;
`;

const CardTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 500;
`;

const CardDetails = styled.div`
  flex-grow: 1;
`;

const CardInfo = styled.div`
  margin-bottom: 15px;
  flex-grow: 1;
`;

const InfoItem = styled.div`
  margin-bottom: 5px;
`;

const Label = styled.span`
  font-weight: 500;
  margin-right: 5px;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
`;

interface CustomersCardProps {
  customers: ICustomer[];
}

const CustomersCard: React.FC<CustomersCardProps> = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <div>No customers found</div>;
  }

  return (
    <CardContainer data-testid="customers-card-container">
      {customers.map((customer) => {
        const cardImage = 'assets/images/' + (customer.gender === 'male' ? 'male.png' : 'female.png');
        
        return (
          <CustomerCard key={customer.id} dataTestId="customer-card">
            <CardHeader>
              <CardImage src={cardImage} alt={`${customer.firstName} ${customer.lastName}`} />
              <CardDetails>
                <CardTitle>{customer.firstName} {customer.lastName}</CardTitle>
                <div>{customer.address}</div>
                <div>{customer.city}, {customer.state.name}</div>
              </CardDetails>
            </CardHeader>
            
            <CardInfo>
              <InfoItem>
                <Label>Orders:</Label> {customer.orders?.length || 0}
              </InfoItem>
              {customer.orderTotal !== undefined && (
                <InfoItem>
                  <Label>Order Total:</Label> ${customer.orderTotal.toFixed(2)}
                </InfoItem>
              )}
            </CardInfo>
            
            <CardActions>
              <Button 
                variant="primary" 
                size="small"
                onClick={() => window.location.href = `/customers/${customer.id}`}
                dataTestId={`view-customer-${customer.id}`}
              >
                View Details
              </Button>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => window.location.href = `/customers/${customer.id}/edit`}
                dataTestId={`edit-customer-${customer.id}`}
              >
                Edit
              </Button>
            </CardActions>
          </CustomerCard>
        );
      })}
    </CardContainer>
  );
};

export default CustomersCard;
