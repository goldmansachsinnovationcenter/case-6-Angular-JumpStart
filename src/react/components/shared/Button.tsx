import React from 'react';
import { Fab } from '@mui/material';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  dataTestId?: string;
  as?: React.ComponentType<any>;
  to?: string;
}

const getColorByVariant = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return '#007bff';
    case 'secondary':
      return '#6c757d';
    case 'success':
      return '#28a745';
    case 'danger':
      return '#dc3545';
    case 'warning':
      return '#ffc107';
    case 'info':
      return '#17a2b8';
    default:
      return '#007bff';
  }
};

const StyledFab = styled(Fab)<{ $variant: ButtonProps['variant'] }>`
  && {
    background-color: ${props => getColorByVariant(props.$variant)};
    color: white;
    margin: 8px;
    
    &:hover {
      background-color: ${props => {
        const color = getColorByVariant(props.$variant);
        return color.replace(
          /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
          (_, r, g, b) => {
            const darken = (hex: string) => {
              const num = parseInt(hex, 16);
              return Math.max(0, num - 20).toString(16).padStart(2, '0');
            };
            return `#${darken(r)}${darken(g)}${darken(b)}`;
          }
        );
      }};
    }
    
    &:disabled {
      background-color: #cccccc;
      color: #666666;
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  className,
  dataTestId = 'button',
  as,
  to,
}) => {
  if (as === Link && to) {
    return (
      <Link to={to} data-testid={dataTestId}>
        <StyledFab
          $variant={variant}
          size={size}
          disabled={disabled}
          className={className}
          variant="extended"
        >
          {children}
        </StyledFab>
      </Link>
    );
  }
  
  return (
    <StyledFab
      $variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      data-testid={dataTestId}
      variant="extended"
    >
      {children}
    </StyledFab>
  );
};

export default Button;
