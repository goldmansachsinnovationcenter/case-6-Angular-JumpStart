import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

export const TableHeaderCell = styled.th<{ sortable?: boolean }>`
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  text-align: left;
  
  ${props => props.sortable && `
    cursor: pointer;
    
    &:hover {
      background-color: #e9ecef;
    }
    
    &::after {
      content: "\\2195";
      margin-left: 5px;
      font-size: 0.8em;
    }
  `}
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
`;

export const OrdersTable = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
  
  tr {
    &:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.075);
    }
  }
  
  td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  
  .text-right {
    text-align: right;
  }
  
  .summary-border {
    border-top: 2px solid #dee2e6;
    font-weight: bold;
  }
`;
