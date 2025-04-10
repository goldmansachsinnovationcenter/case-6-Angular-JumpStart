import React from 'react';
import styled from 'styled-components';
import { Outlet, useParams } from '@tanstack/react-router';
import { useCustomer } from '../../hooks/useCustomers';
import { useUI } from '../../contexts/UIContext';
import Backdrop from '../shared/Backdrop';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CustomerContainer: React.FC = () => {
  const { id } = useParams({ from: '/customers/$id' });
  const customerId = Number(id);
  
  const { data: customer, isLoading } = useCustomer(customerId);
  const { setLoading } = useUI();
  
  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  
  return (
    <Container data-testid="customer-container">
      <Outlet />
      <Backdrop show={isLoading} onClick={() => {}}>
        <div>Loading...</div>
      </Backdrop>
    </Container>
  );
};

export default CustomerContainer;
