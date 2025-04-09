import React, { useState, useEffect } from 'react';
import { useAngularServices } from '../../shared/react/angular-services-context';

export interface IModalContent {
  header?: string;
  body?: string;
  cancelButtonText?: string;
  OKButtonText?: string;
  cancelButtonVisible?: boolean;
}

interface ModalComponentProps {
  onCancel?: () => void;
  onOk?: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({ onCancel, onOk }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleAnimate, setModalVisibleAnimate] = useState(false);
  const [modalContent, setModalContent] = useState<IModalContent>({});
  const [cancel, setCancel] = useState<() => void>(() => () => {});
  const [ok, setOk] = useState<() => void>(() => () => {});
  
  const defaultModalContent: IModalContent = {
    header: 'Please Confirm',
    body: 'Are you sure you want to continue?',
    cancelButtonText: 'Cancel',
    OKButtonText: 'OK',
    cancelButtonVisible: true
  };

  const show = (content: IModalContent) => {
    setModalContent({ ...defaultModalContent, ...content });
    setModalVisible(true);
    setTimeout(() => setModalVisibleAnimate(true), 10);
    
    return new Promise<boolean>((resolve) => {
      const handleCancel = () => {
        hide();
        resolve(false);
        if (onCancel) onCancel();
      };
      
      const handleOk = () => {
        hide();
        resolve(true);
        if (onOk) onOk();
      };
      
      setCancel(() => handleCancel);
      setOk(() => handleOk);
    });
  };

  const hide = () => {
    setModalVisibleAnimate(false);
    setTimeout(() => setModalVisible(false), 300);
  };

  useEffect(() => {
    const angularServices = useAngularServices();
    
    if (angularServices.modalService) {
      angularServices.modalService.show = show;
      angularServices.modalService.hide = hide;
    }
    
  }, []);

  return (
    <div 
      className={`modal fade ${modalVisibleAnimate ? 'in' : ''}`}
      tabIndex={-1} 
      style={{
        display: modalVisible ? 'block' : 'none',
        opacity: modalVisibleAnimate ? 1 : 0
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" onClick={cancel} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{modalContent.header}</h4>
          </div>
          <div className="modal-body">
            {modalContent.body}
          </div>
          <div className="modal-footer">
            {modalContent.cancelButtonVisible && (
              <button type="button" className="btn btn-default" onClick={cancel}>
                {modalContent.cancelButtonText}
              </button>
            )}
            <button type="button" className="btn btn-primary" onClick={ok}>
              {modalContent.OKButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
