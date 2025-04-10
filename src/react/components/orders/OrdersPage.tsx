import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from '@tanstack/react-router';
import { useOrders } from '../../hooks/useOrders';
import { useUI } from '../../contexts/UIContext';
import OrdersGrid from './OrdersGrid';
import OrdersList from './OrdersList';
import FilterTextbox from '../shared/FilterTextbox';
import Pagination from '../shared/Pagination';
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
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.$active ? '#0069d9' : '#f1f1f1'};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FabContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
`;

enum DisplayModeEnum {
  List = 0,
  Grid = 1
}

const OrdersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [displayMode, setDisplayMode] = useState<DisplayModeEnum>(DisplayModeEnum.Grid);
  
  const { data: orders, isLoading } = useOrders(null);
  const { setLoading } = useUI();
  
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    
    if (!filterText) return orders;
    
    const lowerFilter = filterText.toLowerCase();
    return orders.filter(order => 
      order.customerFirstName.toLowerCase().includes(lowerFilter) ||
      order.customerLastName.toLowerCase().includes(lowerFilter) ||
      order.customerCity.toLowerCase().includes(lowerFilter) ||
      order.customerState.toLowerCase().includes(lowerFilter)
    );
  }, [orders, filterText]);
  
  const totalItems = filteredOrders.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  const handleFilterChange = (text: string) => {
    setFilterText(text);
    setPage(1); // Reset to first page when filter changes
  };
  
  const handleDisplayModeChange = (mode: DisplayModeEnum) => {
    setDisplayMode(mode);
  };
  
  return (
    <Container data-testid="orders-page">
      <Title>Orders</Title>
      
      <Toolbar>
        <ViewToggle>
          <ToggleButton 
            $active={displayMode === DisplayModeEnum.Grid}
            onClick={() => handleDisplayModeChange(DisplayModeEnum.Grid)}
            data-testid="grid-view-button"
          >
            Grid View
          </ToggleButton>
          <ToggleButton 
            $active={displayMode === DisplayModeEnum.List}
            onClick={() => handleDisplayModeChange(DisplayModeEnum.List)}
            data-testid="list-view-button"
          >
            List View
          </ToggleButton>
        </ViewToggle>
        
        <FilterContainer>
          <FilterTextbox 
            filterText={filterText} 
            onFilterChange={handleFilterChange}
            placeholder="Filter orders..."
            dataTestId="orders-filter"
          />
        </FilterContainer>
      </Toolbar>
      
      {displayMode === DisplayModeEnum.Grid && (
        <OrdersGrid orders={paginatedOrders} />
      )}
      
      {displayMode === DisplayModeEnum.List && (
        <OrdersList orders={paginatedOrders} />
      )}
      
      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={handlePageChange}
        dataTestId="orders-pagination"
      />
      
      <Backdrop show={isLoading} onClick={() => {}}>
        <div>Loading orders...</div>
      </Backdrop>
      
      <Outlet />
    </Container>
  );
};

export default OrdersPage;
