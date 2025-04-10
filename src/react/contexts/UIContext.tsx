import React, { createContext, useContext, useState } from 'react';

interface GrowlerMessage {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timeout?: number;
}

interface ModalOptions {
  header: string;
  body: React.ReactNode;
  cancelButtonText?: string;
  okButtonText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

interface UIContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showGrowler: (message: GrowlerMessage) => void;
  showModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [growlerMessages, setGrowlerMessages] = useState<GrowlerMessage[]>([]);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const showGrowler = (message: GrowlerMessage) => {
    setGrowlerMessages((prev) => [...prev, message]);
    
    setTimeout(() => {
      setGrowlerMessages((prev) => prev.filter((m) => m !== message));
    }, message.timeout || 3000);
  };

  const showModal = (options: ModalOptions) => {
    setModalOptions(options);
  };

  const closeModal = () => {
    setModalOptions(null);
  };

  return (
    <UIContext.Provider
      value={{
        isLoading,
        setLoading,
        showGrowler,
        showModal,
        closeModal,
      }}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div>Loading...</div>
        </div>
      )}

      {/* Growler Messages */}
      {growlerMessages.length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9998,
          }}
        >
          {/* We'll implement Growler component integration in the next phase */}
          {growlerMessages.map((msg, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '5px',
                backgroundColor:
                  msg.type === 'success'
                    ? '#4CAF50'
                    : msg.type === 'info'
                    ? '#2196F3'
                    : msg.type === 'warning'
                    ? '#FF9800'
                    : '#F44336',
                color: 'white',
                borderRadius: '4px',
              }}
            >
              {msg.message}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOptions && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9997,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '4px',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <h2>{modalOptions.header}</h2>
            <div>{modalOptions.body}</div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              {modalOptions.cancelButtonText && (
                <button
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    if (modalOptions.onCancel) modalOptions.onCancel();
                    closeModal();
                  }}
                >
                  {modalOptions.cancelButtonText}
                </button>
              )}
              {modalOptions.okButtonText && (
                <button
                  onClick={() => {
                    if (modalOptions.onOk) modalOptions.onOk();
                    closeModal();
                  }}
                >
                  {modalOptions.okButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
