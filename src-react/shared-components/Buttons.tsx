import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const SuccessButton = styled(Button)`
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  
  &:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
  }
  
  &:disabled {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
`;

export const DangerButton = styled(Button)`
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
  
  &:hover {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
  }
`;

export const DefaultButton = styled(Button)`
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
  
  &:hover {
    color: #212529;
    background-color: #e2e6ea;
    border-color: #dae0e5;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const NavButton = styled.a`
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #777;
  cursor: pointer;
  
  &:hover, &:focus {
    text-decoration: none;
    color: #333;
    background-color: transparent;
  }
`;
