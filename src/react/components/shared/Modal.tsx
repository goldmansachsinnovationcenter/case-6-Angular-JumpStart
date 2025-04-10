import React from 'react';
import styled from 'styled-components';
import Backdrop from './Backdrop';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
  width?: string;
}

const ModalContainer = styled.div<{ $width: string }>`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 0;
  width: ${props => props.$width};
  max-width: 90%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  children,
  width = '500px',
}) => {
  if (!isOpen) return null;
  
  return (
    <Backdrop show={isOpen} onClick={onClose}>
      <ModalContainer 
        $width={width} 
        onClick={e => e.stopPropagation()}
        data-testid="modal"
      >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {cancelText && (
            <Button 
              variant="secondary" 
              onClick={onClose}
              dataTestId="modal-cancel"
            >
              {cancelText}
            </Button>
          )}
          {onConfirm && confirmText && (
            <Button 
              variant="primary" 
              onClick={onConfirm}
              dataTestId="modal-confirm"
            >
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
