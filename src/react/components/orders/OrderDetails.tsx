import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useOrder } from '../../hooks/useOrders';
import { useUI } from '../../contexts/UIContext';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Backdrop from '../shared/Backdrop';

const OrderDetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const OrderInfo = styled.div`
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  margin-bottom: 15px;
`;

const InfoTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 500;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const InfoLabel = styled.div`
  font-weight: 500;
  width: 120px;
`;

const InfoValue = styled.div`
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const OrderDetails: React.FC = () => {
  const { id } = useParams({ from: '/orders/$id/details' });
  const orderId = Number(id);
  const navigate = useNavigate();
  
  const { data: order, isLoading } = useOrder(orderId);
  const { setLoading } = useUI();
  
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  
  const handleBackClick = () => {
    navigate({ to: '/orders' });
  };
  
  if (!order && !isLoading) {
    return (
      <OrderDetailsContainer data-testid="order-details">
        <Card>
          <p>Order not found</p>
          <ButtonContainer>
            <Button
              variant="secondary"
              onClick={handleBackClick}
              dataTestId="back-button"
            >
              Back to Orders
            </Button>
          </ButtonContainer>
        </Card>
      </OrderDetailsContainer>
    );
  }
  
  return (
    <OrderDetailsContainer data-testid="order-details">
      {order && (
        <Card title={`Order #${order.id}`}>
          <OrderInfo>
            <InfoSection>
              <InfoTitle>Order Information</InfoTitle>
              <InfoRow>
                <InfoLabel>Order #:</InfoLabel>
                <InfoValue>{order.id}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Date:</InfoLabel>
                <InfoValue>{new Date(order.orderDate).toLocaleDateString()}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Total:</InfoLabel>
                <InfoValue>${order.itemCost.toFixed(2)}</InfoValue>
              </InfoRow>
            </InfoSection>
            
            <InfoSection>
              <InfoTitle>Customer Information</InfoTitle>
              <InfoRow>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{`${order.customerFirstName} ${order.customerLastName}`}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Address:</InfoLabel>
                <InfoValue>{order.customerAddress}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>City:</InfoLabel>
                <InfoValue>{order.customerCity}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>State:</InfoLabel>
                <InfoValue>{order.customerState}</InfoValue>
              </InfoRow>
            </InfoSection>
          </OrderInfo>
          
          <ButtonContainer>
            <Button
              variant="secondary"
              onClick={handleBackClick}
              dataTestId="back-button"
            >
              Back to Orders
            </Button>
          </ButtonContainer>
        </Card>
      )}
      
      <Backdrop show={isLoading} onClick={() => {}}>
        <div>Loading...</div>
      </Backdrop>
    </OrderDetailsContainer>
  );
};

export default OrderDetails;
