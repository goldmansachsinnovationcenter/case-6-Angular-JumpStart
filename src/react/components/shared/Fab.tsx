import React from 'react';
import { Fab as MuiFab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from '@tanstack/react-router';

interface FabProps {
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'extended';
  disabled?: boolean;
  to?: string;
  dataTestId?: string;
  onClick?: () => void;
  children: React.ReactNode;
  'aria-label'?: string;
}

const StyledFab = styled(MuiFab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1000,
}));

const Fab: React.FC<FabProps> = ({ 
  children, 
  to, 
  dataTestId,
  ...props 
}) => {
  if (to) {
    return (
      <StyledFab
        component={Link}
        to={to}
        data-testid={dataTestId}
        {...props}
      >
        {children}
      </StyledFab>
    );
  }
  
  return (
    <StyledFab
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </StyledFab>
  );
};

export default Fab;
