import React from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';
import { IOrder } from '../../../app/shared/interfaces';
import Card from '../shared/Card';

const OrdersListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const OrderCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const OrderInfo = styled.div`
  padding: 15px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const OrderId = styled.h3`
  margin: 0;
  color: #333;
`;

const OrderDate = styled.span`
  color: #666;
`;

const CustomerName = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`;

const OrderTotal = styled.div`
  font-weight: 700;
  color: #007bff;
  margin-top: 10px;
`;

const ShippedBadge = styled.span<{ $shipped: boolean }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.$shipped ? '#28a745' : '#ffc107'};
  color: ${props => props.$shipped ? 'white' : '#333'};
  margin-top: 10px;
`;

interface OrdersListProps {
  orders: IOrder[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const navigate = useNavigate();
  
  const handleOrderClick = (orderId: number) => {
    navigate({ to: `/orders/${orderId}/details` });
  };
  
  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }
  
  return (
    <OrdersListContainer data-testid="orders-list">
      {orders.map((order) => (
        <OrderCard 
          key={order.id}
          onClick={() => handleOrderClick(order.id)}
          data-testid={`order-card-${order.id}`}
        >
          <Card>
            <OrderInfo>
              <OrderHeader>
                <OrderId>Order #{order.id}</OrderId>
                <OrderDate>{new Date(order.orderDate).toLocaleDateString()}</OrderDate>
              </OrderHeader>
              
              <CustomerName>
                {`${order.customerFirstName} ${order.customerLastName}`}
              </CustomerName>
              
              <div>{order.customerCity}, {order.customerState}</div>
              
              <OrderTotal>${order.itemCost.toFixed(2)}</OrderTotal>
              
              <ShippedBadge $shipped={order.shipped}>
                {order.shipped ? 'Shipped' : 'Pending'}
              </ShippedBadge>
            </OrderInfo>
          </Card>
        </OrderCard>
      ))}
    </OrdersListContainer>
  );
};

export default OrdersList;
