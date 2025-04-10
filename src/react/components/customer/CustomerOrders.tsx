import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useCustomerOrders } from '../../hooks/useOrders';
import { useUI } from '../../contexts/UIContext';
import Card from '../shared/Card';
import Button from '../shared/Button';
import Backdrop from '../shared/Backdrop';

const OrdersContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f2f2f2;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CustomerOrders: React.FC = () => {
  const { id } = useParams({ from: '/customers/$id/orders' });
  const customerId = Number(id);
  const navigate = useNavigate();
  
  const { data: orders, isLoading } = useCustomerOrders(customerId);
  const { setLoading } = useUI();
  
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  
  const handleBackClick = () => {
    navigate({ to: `/customers/${customerId}` });
  };
  
  const handleOrderClick = (orderId: number) => {
    navigate({ to: `/orders/${orderId}/details` });
  };
  
  return (
    <OrdersContainer data-testid="customer-orders">
      <Card title="Customer Orders">
        {orders && orders.length > 0 ? (
          <OrdersTable data-testid="orders-table">
            <thead>
              <tr>
                <TableHeader>Order #</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Total</TableHeader>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id}
                  onClick={() => handleOrderClick(order.id)}
                  style={{ cursor: 'pointer' }}
                  data-testid={`order-row-${order.id}`}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>${order.itemCost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </OrdersTable>
        ) : (
          <EmptyMessage>No orders found for this customer.</EmptyMessage>
        )}
        
        <ButtonContainer>
          <Button
            variant="secondary"
            onClick={handleBackClick}
            dataTestId="back-button"
          >
            Back to Customer
          </Button>
        </ButtonContainer>
      </Card>
      
      <Backdrop show={isLoading} onClick={() => {}}>
        <div>Loading...</div>
      </Backdrop>
    </OrdersContainer>
  );
};

export default CustomerOrders;
