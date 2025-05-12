import React, { createContext, useContext, ReactNode } from 'react';
import { AuthService } from '../../core/services/auth.service';
import { GrowlerService } from '../../core/growler/growler.service';
import { LoggerService } from '../../core/services/logger.service';
import { Router } from '@angular/router';
import { ModalService } from '../../core/modal/modal.service';
import { EventBusService } from '../../core/services/event-bus.service';

interface AngularServicesContextType {
  authService?: AuthService;
  growlerService?: GrowlerService;
  loggerService?: LoggerService;
  router?: Router;
  modalService?: ModalService;
  eventBus?: EventBusService;
}

const AngularServicesContext = createContext<AngularServicesContextType | undefined>(undefined);

export const AngularServicesProvider: React.FC<{
  services: AngularServicesContextType;
  children: ReactNode;
}> = ({ services, children }) => {
  return (
    <AngularServicesContext.Provider value={services}>
      {children}
    </AngularServicesContext.Provider>
  );
};

export const useAngularServices = (): AngularServicesContextType => {
  const context = useContext(AngularServicesContext);
  if (context === undefined) {
    throw new Error('useAngularServices must be used within an AngularServicesProvider');
  }
  return context;
};
