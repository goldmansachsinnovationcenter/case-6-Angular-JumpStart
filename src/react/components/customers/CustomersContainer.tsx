import React, { useState } from 'react';
import styled from 'styled-components';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import { useCustomers } from '../../hooks/useCustomers';
import { useUI } from '../../contexts/UIContext';
import FilterTextbox from '../shared/FilterTextbox';
import Pagination from '../shared/Pagination';
import CustomersCard from './CustomersCard';
import CustomersGrid from './CustomersGrid';
import Map from '../shared/Map';
import Backdrop from '../shared/Backdrop';
import Fab from '../shared/Fab';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const ViewToggleButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$active ? '#007bff' : '#f8f9fa'};
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  max-width: 300px;
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 18px;
  color: #666;
`;

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}

const CustomersContainer: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filter, setFilter] = useState('');
  const [displayMode, setDisplayMode] = useState<DisplayModeEnum>(DisplayModeEnum.Card);
  
  const { data, isLoading } = useCustomers(page, pageSize, filter);
  const { setLoading } = useUI();
  
  const customers = data?.results || [];
  const totalRecords = data?.totalRecords || 0;
  
  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page when filter changes
  };
  
  const handleDisplayModeChange = (mode: DisplayModeEnum) => {
    setDisplayMode(mode);
  };
  
  return (
    <Container data-testid="customers-container">
      <Title>Customers</Title>
      
      <Toolbar>
        <ViewToggleContainer>
          <ViewToggleButton 
            $active={displayMode === DisplayModeEnum.Card}
            onClick={() => handleDisplayModeChange(DisplayModeEnum.Card)}
            data-testid="card-view-button"
          >
            Card View
          </ViewToggleButton>
          <ViewToggleButton 
            $active={displayMode === DisplayModeEnum.Grid}
            onClick={() => handleDisplayModeChange(DisplayModeEnum.Grid)}
            data-testid="grid-view-button"
          >
            List View
          </ViewToggleButton>
          <ViewToggleButton 
            $active={displayMode === DisplayModeEnum.Map}
            onClick={() => handleDisplayModeChange(DisplayModeEnum.Map)}
            data-testid="map-view-button"
          >
            Map View
          </ViewToggleButton>
        </ViewToggleContainer>
        
        <FilterContainer>
          <FilterTextbox 
            filterText={filter} 
            onFilterChange={handleFilterChange}
            placeholder="Filter customers..."
          />
        </FilterContainer>
      </Toolbar>
      
      {isLoading ? (
        <LoadingContainer>Loading customers...</LoadingContainer>
      ) : (
        <>
          {displayMode === DisplayModeEnum.Card && (
            <CustomersCard customers={customers} />
          )}
          
          {displayMode === DisplayModeEnum.Grid && (
            <CustomersGrid customers={customers} />
          )}
          
          {displayMode === DisplayModeEnum.Map && customers.length > 0 && (
            <Map 
              mapDataPoints={customers
                .filter(c => c.latitude && c.longitude)
                .map(c => ({
                  longitude: c.longitude || 0,
                  latitutde: c.latitude || 0,
                  markerText: `${c.firstName} ${c.lastName}`
                }))}
              height="600px"
              dataTestId="customers-map"
            />
          )}
          
          <Pagination 
            totalItems={totalRecords}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </>
      )}
      
      <AddButtonContainer>
        <Fab 
          color="primary" 
          aria-label="add customer"
          to="/customers/new/edit"
          dataTestId="add-customer-button"
        >
          <AddIcon />
        </Fab>
      </AddButtonContainer>
      
      <Backdrop show={isLoading} onClick={() => {}}>
        <div>Loading...</div>
      </Backdrop>
    </Container>
  );
};

export default CustomersContainer;
