import React from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import { ICustomer } from '../../../app/shared/interfaces';
import Button from '../shared/Button';

const GridContainer = styled.div`
  margin-bottom: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
`;

const ActionsCell = styled(TableCell)`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

interface CustomersGridProps {
  customers: ICustomer[];
}

const CustomersGrid: React.FC<CustomersGridProps> = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <div>No customers found</div>;
  }

  return (
    <GridContainer>
      <Table data-testid="customers-grid">
        <TableHead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>City</TableHeader>
            <TableHeader>State</TableHeader>
            <TableHeader>Orders</TableHeader>
            <TableHeader>Total Spent</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {customers.map((customer) => (
            <TableRow key={customer.id} data-testid={`customer-row-${customer.id}`}>
              <TableCell>{customer.firstName} {customer.lastName}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.state.name}</TableCell>
              <TableCell>{customer.orders?.length || 0}</TableCell>
              <TableCell>
                {customer.orderTotal !== undefined 
                  ? `$${customer.orderTotal.toFixed(2)}` 
                  : '-'}
              </TableCell>
              <ActionsCell>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => window.location.href = `/customers/${customer.id}`}
                  dataTestId={`view-customer-${customer.id}`}
                >
                  View
                </Button>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => window.location.href = `/customers/${customer.id}/edit`}
                  dataTestId={`edit-customer-${customer.id}`}
                >
                  Edit
                </Button>
              </ActionsCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </GridContainer>
  );
};

export default CustomersGrid;
