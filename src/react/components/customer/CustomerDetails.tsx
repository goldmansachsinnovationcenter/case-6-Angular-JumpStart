import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from '@tanstack/react-router';
import { ICustomer } from '../../../app/shared/interfaces';
import { useCustomer } from '../../hooks/useCustomers';
import { useUI } from '../../contexts/UIContext';
import Card from '../shared/Card';
import Map from '../shared/Map';
import Button from '../shared/Button';
import Backdrop from '../shared/Backdrop';

const DetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CustomerInfo = styled.div`
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

const MapContainer = styled.div`
  margin-top: 20px;
  height: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CustomerDetails: React.FC<{}> = () => {
  const { id } = useParams({ from: '/customers/$id' });
  const { setLoading } = useUI();
  const customerId = Number(id);
  
  const { data: customer, isLoading } = useCustomer(customerId);
  const [mapEnabled, setMapEnabled] = useState(false);
  
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  
  useEffect(() => {
    if (customer && (customer.latitude || customer.longitude)) {
      setMapEnabled(true);
    }
  }, [customer]);
  
  if (!customer && !isLoading) {
    return <div>Customer not found</div>;
  }
  
  const handleEditClick = () => {
    window.location.href = `/customers/${customerId}/edit`;
  };
  
  const handleOrdersClick = () => {
    window.location.href = `/customers/${customerId}/orders`;
  };
  
  return (
    <DetailsContainer data-testid="customer-details">
      {customer && (
        <>
          <Card title="Customer Information">
            <CustomerInfo>
              <InfoSection>
                <InfoTitle>General Information</InfoTitle>
                <InfoRow>
                  <InfoLabel>First Name:</InfoLabel>
                  <InfoValue>{customer.firstName}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Last Name:</InfoLabel>
                  <InfoValue>{customer.lastName}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Gender:</InfoLabel>
                  <InfoValue>{customer.gender}</InfoValue>
                </InfoRow>
              </InfoSection>
              
              <InfoSection>
                <InfoTitle>Address</InfoTitle>
                <InfoRow>
                  <InfoLabel>Street:</InfoLabel>
                  <InfoValue>{customer.address}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>City:</InfoLabel>
                  <InfoValue>{customer.city}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>State:</InfoLabel>
                  <InfoValue>{customer.state.name}</InfoValue>
                </InfoRow>
              </InfoSection>
              
              {customer.orders && customer.orders.length > 0 && (
                <InfoSection>
                  <InfoTitle>Orders</InfoTitle>
                  <InfoRow>
                    <InfoLabel>Order Count:</InfoLabel>
                    <InfoValue>{customer.orders.length}</InfoValue>
                  </InfoRow>
                  {customer.orderTotal !== undefined && (
                    <InfoRow>
                      <InfoLabel>Order Total:</InfoLabel>
                      <InfoValue>${customer.orderTotal.toFixed(2)}</InfoValue>
                    </InfoRow>
                  )}
                </InfoSection>
              )}
              
              {mapEnabled && (
                <MapContainer>
                  <Map
                    mapDataPoints={[
                      {
                        longitude: customer.longitude || 0,
                        latitutde: customer.latitude || 0,
                        markerText: `${customer.firstName} ${customer.lastName}`
                      }
                    ]}
                    zoom={10}
                    height="400px"
                    dataTestId="customer-map"
                  />
                </MapContainer>
              )}
            </CustomerInfo>
            
            <ButtonContainer>
              <Button
                variant="secondary"
                onClick={handleOrdersClick}
                dataTestId="view-orders-button"
              >
                View Orders
              </Button>
              <Button
                variant="primary"
                onClick={handleEditClick}
                dataTestId="edit-customer-button"
              >
                Edit
              </Button>
            </ButtonContainer>
          </Card>
          
          <Backdrop show={isLoading} onClick={() => {}}>
            <div>Loading...</div>
          </Backdrop>
        </>
      )}
    </DetailsContainer>
  );
};
export default CustomerDetails;
