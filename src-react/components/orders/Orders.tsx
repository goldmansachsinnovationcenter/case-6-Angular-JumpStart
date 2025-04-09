import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { ICustomer, IPagedResults } from '../../interfaces';
import Pagination from '../shared/Pagination';
import { ViewContainer, Container, Header } from '../../shared-components/Layout';
import { Title, CustomerName, NoOrders, NoCustomers } from '../../shared-components/Typography';
import { OrdersTable } from '../../shared-components/Tables';
import { Icon } from '../../shared-components/Icons';
import { capitalize, formatCurrency } from '../../shared-components/Utils';

const CustomerRow = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const Orders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  const { data, isLoading, error } = useQuery<IPagedResults<ICustomer>>({
    queryKey: ['customers', 'orders', currentPage, pageSize],
    queryFn: async () => {
      const response = await fetch(`/api/customers/page/${(currentPage - 1) * pageSize}/${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      return response.json();
    }
  });
  
  const customers = data?.results || [];
  const totalRecords = data?.totalRecords || 0;
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  if (isLoading) {
    return <Container>Loading customers and orders...</Container>;
  }
  
  if (error) {
    return <Container>Error loading customers and orders</Container>;
  }
  
  return (
    <ViewContainer className="customers view indent">
      <Container>
        <Header>
          <Title>
            <Icon className="glyphicon glyphicon-folder-open"></Icon>
            Orders
          </Title>
        </Header>
        <br />
        
        <Container>
          {customers && customers.length > 0 ? (
            <>
              {customers.map((customer) => (
                <CustomerRow key={customer.id}>
                  <CustomerName>
                    {capitalize(customer.firstName)} {capitalize(customer.lastName)}
                  </CustomerName>
                  <br />
                  
                  {customer.orders && customer.orders.length > 0 ? (
                    <OrdersTable className="table table-striped table-hover orders-table">
                      <tbody>
                        {customer.orders?.map((order: { productName: string; itemCost: number }, index: number) => (
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
                  ) : (
                    <NoOrders>No orders found</NoOrders>
                  )}
                </CustomerRow>
              ))}
              
              {totalRecords > 0 && (
                <Pagination 
                  totalItems={totalRecords}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <NoCustomers>No customers found</NoCustomers>
          )}
        </Container>
      </Container>
    </ViewContainer>
  );
};

export default Orders;
