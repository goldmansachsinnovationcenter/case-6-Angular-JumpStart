import React from 'react';
import styled from 'styled-components';

interface BackdropProps {
  show: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const BackdropContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${props => (props.$show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
`;

const Backdrop: React.FC<BackdropProps> = ({
  show,
  onClick,
  children,
}) => {
  return (
    <BackdropContainer
      $show={show}
      onClick={onClick}
      data-testid="backdrop"
    >
      {children}
    </BackdropContainer>
  );
};

export default Backdrop;
