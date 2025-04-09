import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { ICustomer } from '../../interfaces';
import Map from '../shared/Map';
import { 
  Container, 
  Row, 
  ColMd2, 
  ColMd10, 
  ColMd12 
} from '../../shared-components/Layout';
import { CustomerName, NoCustomer } from '../../shared-components/Typography';
import { capitalize } from '../../shared-components/Utils';

const DetailsImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const MapContainer = styled.div`
  margin-top: 20px;
`;

const CustomerDetails: React.FC = () => {
  const { id } = useParams({ from: '/customers/$id/details' });
  const [mapEnabled, setMapEnabled] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  
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
  
  useEffect(() => {
    if (customer && customer.latitude && !mapLoaded) {
      setMapEnabled(true);
      setMapLoaded(true);
    }
  }, [customer, mapLoaded]);
  
  if (isLoading) {
    return <Container>Loading customer details...</Container>;
  }
  
  if (error) {
    return <Container>Error loading customer details</Container>;
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
      <Row>
        <ColMd2>
          <DetailsImage 
            src={`images/${customer.gender?.toLowerCase()}.png`} 
            className="details-image" 
            title="customer picture" 
            alt={customer.gender}
          />
        </ColMd2>
        <ColMd10>
          <CustomerName>
            {capitalize(customer.firstName)} {capitalize(customer.lastName)}
          </CustomerName>
          <br />
          {customer.address}
          <br />
          {customer.city}, {customer.state?.name}
        </ColMd10>
      </Row>
      <br /><br />
      <Row>
        <ColMd12>
          <MapContainer>
            {mapEnabled && (
              <Map 
                latitude={customer.latitude}
                longitude={customer.longitude}
                zoom={10}
                enabled={true}
                markerText={`<h3>${customer.firstName} ${customer.lastName}</h3>${customer.city}, ${customer.state?.name}`}
              />
            )}
          </MapContainer>
        </ColMd12>
      </Row>
    </Container>
  );
};

export default CustomerDetails;
