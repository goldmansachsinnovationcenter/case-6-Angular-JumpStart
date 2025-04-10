import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  dataTestId?: string;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  class-name: pagination;
`;

const PageItem = styled.li<{ active?: boolean }>`
  margin: 0 2px;
`;

const PageLink = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#007bff'};
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.active ? '#007bff' : '#f8f9fa'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  dataTestId = 'pagination',
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  return (
    <PaginationContainer data-testid={dataTestId}>
      <PaginationList className="pagination">
        <PageItem>
          <PageLink
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </PageLink>
        </PageItem>
        
        {getPageNumbers().map((page, index) => (
          <PageItem key={index} active={page === currentPage}>
            {page < 0 ? (
              <PageLink disabled>{page === -1 ? '...' : '...'}</PageLink>
            ) : (
              <PageLink
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PageLink>
            )}
          </PageItem>
        ))}
        
        <PageItem>
          <PageLink
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </PageLink>
        </PageItem>
      </PaginationList>
    </PaginationContainer>
  );
};

export default Pagination;
