import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export type GrowlerType = 'success' | 'info' | 'warning' | 'error';

interface GrowlerProps {
  message: string;
  type: GrowlerType;
  timeout?: number;
  onClose?: () => void;
}

const getBackgroundColor = (type: GrowlerType) => {
  switch (type) {
    case 'success':
      return '#4CAF50';
    case 'info':
      return '#2196F3';
    case 'warning':
      return '#FF9800';
    case 'error':
      return '#F44336';
    default:
      return '#2196F3';
  }
};

const GrowlerContainer = styled.div<{ $type: GrowlerType }>`
  position: relative;
  padding: 15px 20px;
  margin: 10px;
  border-radius: 4px;
  background-color: ${props => getBackgroundColor(props.$type)};
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
  max-width: 400px;
  animation: slideIn 0.3s ease-out forwards;
  
  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Growler: React.FC<GrowlerProps> = ({
  message,
  type,
  timeout = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (timeout > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, timeout);
      
      return () => clearTimeout(timer);
    }
    return undefined; // Return undefined for the case where timeout <= 0
  }, [timeout, onClose]);
  
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };
  
  if (!visible) return null;
  
  return (
    <GrowlerContainer $type={type} data-testid={`growler-${type}`}>
      <div>{message}</div>
      <CloseButton onClick={handleClose} aria-label="Close">
        ×
      </CloseButton>
    </GrowlerContainer>
  );
};

export default Growler;
