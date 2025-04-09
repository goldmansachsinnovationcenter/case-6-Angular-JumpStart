import React from 'react';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { ICustomer } from '../../interfaces';
import { Container, Row } from '../../shared-components/Layout';
import { OrdersTable } from '../../shared-components/Tables';
import { CustomerName, NoOrders, NoCustomer } from '../../shared-components/Typography';
import { capitalize, formatCurrency } from '../../shared-components/Utils';

const CustomerOrders: React.FC = () => {
  const { id } = useParams({ from: '/customers/$id/orders' });
  
  const { data: customer, isLoading, error } = useQuery<ICustomer>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await fetch(`/api/customers/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer');
      }
      return response.json();
    },
    enabled: !!id
  });
  
  if (isLoading) {
    return <Container>Loading customer orders...</Container>;
  }
  
  if (error) {
    return <Container>Error loading customer orders</Container>;
  }
  
  if (!customer) {
    return (
      <Container>
        <NoCustomer>No customer found</NoCustomer>
      </Container>
    );
  }
  
  return (
    <Container>
      {customer && customer.orders && customer.orders.length > 0 ? (
        <Row>
          <CustomerName>
            Orders for {capitalize(customer.firstName)} {capitalize(customer.lastName)}
          </CustomerName>
          <br />
          <OrdersTable className="table table-striped table-hover orders-table">
            <tbody>
              {customer.orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.productName}</td>
                  <td className="text-right">{formatCurrency(order.itemCost)}</td>
                </tr>
              ))}
              <tr className="summary-border">
                <td>&nbsp;</td>
                <td className="text-right">{formatCurrency(customer.orderTotal || 0)}</td>
              </tr>
            </tbody>
          </OrdersTable>
        </Row>
      ) : customer ? (
        <Row>
          <NoOrders>No orders found</NoOrders>
        </Row>
      ) : (
        <Row>
          <NoCustomer>No customer found</NoCustomer>
        </Row>
      )}
    </Container>
  );
};

export default CustomerOrders;
