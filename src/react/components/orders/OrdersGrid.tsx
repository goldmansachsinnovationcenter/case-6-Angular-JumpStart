import React from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';
import { IOrder } from '../../../app/shared/interfaces';

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
    cursor: pointer;
  }
`;

const SummaryRow = styled.tr`
  font-weight: bold;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const PriceCell = styled(TableCell)`
  text-align: right;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

interface OrdersGridProps {
  orders: IOrder[];
}

const OrdersGrid: React.FC<OrdersGridProps> = ({ orders }) => {
  const navigate = useNavigate();
  
  const handleOrderClick = (orderId: number) => {
    navigate({ to: `/orders/${orderId}/details` });
  };
  
  if (!orders || orders.length === 0) {
    return <EmptyMessage>No orders found.</EmptyMessage>;
  }
  
  let totalPrice = 0;
  orders.forEach(order => {
    totalPrice = Math.round((totalPrice + order.itemCost) * 100) / 100;
  });
  
  return (
    <OrdersTable className="orders-table" data-testid="orders-grid">
      <thead>
        <tr>
          <TableHeader>Order #</TableHeader>
          <TableHeader>Customer</TableHeader>
          <TableHeader>Shipped</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader className="text-right">Price</TableHeader>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <TableRow 
            key={order.id}
            onClick={() => handleOrderClick(order.id)}
            data-testid={`order-row-${order.id}`}
          >
            <TableCell>{order.id}</TableCell>
            <TableCell>{`${order.customerFirstName} ${order.customerLastName}`}</TableCell>
            <TableCell>{order.shipped ? 'Yes' : 'No'}</TableCell>
            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
            <PriceCell className="text-right" data-testid="order-price">${order.itemCost.toFixed(2)}</PriceCell>
          </TableRow>
        ))}
        <SummaryRow className="summary-border">
          <TableCell colSpan={4}>Total</TableCell>
          <PriceCell className="text-right" data-testid="order-total">${totalPrice.toFixed(2)}</PriceCell>
        </SummaryRow>
      </tbody>
    </OrdersTable>
  );
};

export default OrdersGrid;
