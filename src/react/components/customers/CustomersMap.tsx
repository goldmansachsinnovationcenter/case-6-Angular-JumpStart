import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from '@tanstack/react-router';
import { ICustomer } from '../../../app/shared/interfaces';
import Map from '../shared/Map';
import Backdrop from '../shared/Backdrop';

const MapContainer = styled.div`
  height: 600px;
  width: 100%;
  margin-bottom: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 18px;
`;

interface CustomersMapProps {
  customers: ICustomer[];
  isLoading: boolean;
}

const CustomersMap: React.FC<CustomersMapProps> = ({ customers, isLoading }) => {
  const navigate = useNavigate();
  
  const handleMarkerClick = (customerId: number) => {
    navigate({ to: `/customers/${customerId}` });
  };
  
  const mapDataPoints = customers
    .filter(customer => customer.latitude && customer.longitude)
    .map(customer => ({
      longitude: customer.longitude || 0,
      latitutde: customer.latitude || 0,
      markerText: `${customer.firstName} ${customer.lastName}`,
      id: customer.id,
      onClick: () => handleMarkerClick(customer.id)
    }));
  
  return (
    <div data-testid="customers-map">
      <MapContainer>
        <Map
          mapDataPoints={mapDataPoints}
          zoom={5}
          height="600px"
          dataTestId="customer-locations-map"
        />
      </MapContainer>
      
      <Backdrop show={isLoading} onClick={() => {}}>
        <LoadingContainer>
          Loading customer locations...
        </LoadingContainer>
      </Backdrop>
    </div>
  );
};

export default CustomersMap;
