import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

import { ICustomer } from '../../interfaces';
import { 
  Container, 
  GridContainer, 
  Column 
} from '../../shared-components/Layout';
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableHeaderCell, 
  TableBody, 
  TableRow, 
  TableCell 
} from '../../shared-components/Tables';
import { capitalize, trim, formatCurrency } from '../../shared-components/Utils';

const GridImage = styled.img`
  height: 50px;
  width: 50px;
  margin-top: 10px;
`;

interface CustomersGridProps {
  customers: ICustomer[];
}

const CustomersGrid: React.FC<CustomersGridProps> = ({ customers = [] }) => {
  const [sortedCustomers, setSortedCustomers] = useState<ICustomer[]>(customers);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const getPropertyValue = (obj: any, path: string) => {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, obj);
  };
  
  const sort = (prop: string) => {
    const isAsc = sortColumn === prop && sortDirection === 'asc';
    const direction = isAsc ? 'desc' : 'asc';
    
    const sorted = [...customers].sort((a, b) => {
      const aVal = getPropertyValue(a, prop);
      const bVal = getPropertyValue(b, prop);
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal > bVal ? 1 : -1;
      return direction === 'desc' ? comparison * -1 : comparison;
    });
    
    setSortedCustomers(sorted);
    setSortColumn(prop);
    setSortDirection(direction);
  };
  
  React.useEffect(() => {
    setSortedCustomers(customers);
  }, [customers]);
  
  return (
    <Container>
      <GridContainer className="grid-container">
        <Column>
          <TableContainer>
            <Table className="table table-striped table-hover">
              <TableHead>
                <tr>
                  <TableHeaderCell>&nbsp;</TableHeaderCell>
                  <TableHeaderCell sortable onClick={() => sort('firstName')}>
                    First Name
                  </TableHeaderCell>
                  <TableHeaderCell sortable onClick={() => sort('lastName')}>
                    Last Name
                  </TableHeaderCell>
                  <TableHeaderCell sortable onClick={() => sort('address')}>
                    Address
                  </TableHeaderCell>
                  <TableHeaderCell sortable onClick={() => sort('city')}>
                    City
                  </TableHeaderCell>
                  <TableHeaderCell sortable onClick={() => sort('state.name')}>
                    State
                  </TableHeaderCell>
                  <TableHeaderCell sortable onClick={() => sort('orderTotal')}>
                    Order Total
                  </TableHeaderCell>
                  <TableHeaderCell>&nbsp;</TableHeaderCell>
                </tr>
              </TableHead>
              <TableBody>
                {sortedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <GridImage 
                        src={`images/${customer.gender?.toLowerCase()}.png`} 
                        className="grid-image" 
                        alt="Customer Image" 
                      />
                    </TableCell>
                    <TableCell>
                      <Link 
                        to="/customers/$id/details"
                        params={{ id: customer.id.toString() }}
                      >
                        {capitalize(customer.firstName)}
                      </Link>
                    </TableCell>
                    <TableCell>{capitalize(customer.lastName)}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{trim(customer.city)}</TableCell>
                    <TableCell>{customer.state?.name}</TableCell>
                    <TableCell>{formatCurrency(customer.orderTotal || 0)}</TableCell>
                    <TableCell>
                      <Link 
                        to="/customers/$id/orders"
                        params={{ id: customer.id.toString() }}
                      >
                        View Orders
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {!sortedCustomers.length && (
                  <TableRow>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell colSpan={7}>No Records Found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Column>
      </GridContainer>
    </Container>
  );
};

export default CustomersGrid;
