import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from '@tanstack/react-router';
import { useOrders } from '../../hooks/useOrders';
import { useUI } from '../../contexts/UIContext';
import Card from '../shared/Card';
import Backdrop from '../shared/Backdrop';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

const NoOrdersMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const OrdersContainer: React.FC = () => {
  const { id } = useParams({ from: '/customers/$id' });
  const customerId = Number(id);
  
  const { data: orders, isLoading } = useOrders(customerId);
  const { setLoading } = useUI();
  
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  
  const calculateOrderTotal = (order: any) => {
    return order.itemCost * order.quantity;
  };
  
  return (
    <Container data-testid="orders-container">
      <Card title="Customer Orders">
        {orders && orders.length > 0 ? (
          <Table data-testid="orders-table">
            <thead>
              <tr>
                <TableHeader>Product</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Total</TableHeader>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <TableRow key={index} data-testid={`order-row-${index}`}>
                  <TableCell data-testid={`product-${index}`}>{order.productName}</TableCell>
                  <TableCell data-testid={`quantity-${index}`}>{order.quantity}</TableCell>
                  <TableCell data-testid={`price-${index}`}>${order.itemCost.toFixed(2)}</TableCell>
                  <TableCell data-testid={`total-${index}`}>${calculateOrderTotal(order).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoOrdersMessage>No orders found for this customer</NoOrdersMessage>
        )}
      </Card>
      
      <Backdrop show={isLoading} onClick={() => {}}>
        <div>Loading orders...</div>
      </Backdrop>
    </Container>
  );
};

export default OrdersContainer;
