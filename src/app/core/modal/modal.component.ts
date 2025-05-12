import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as React from 'react';

import { ModalService } from './modal.service';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';

@Component({
    selector: 'cm-modal',
    template: '<div #reactModalContainer></div>',
    standalone: true,
    imports: [CommonModule]
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('reactModalContainer', { static: true }) containerRef!: ElementRef;

  constructor(
    private modalService: ModalService,
    private reactWrapper: ReactWrapperService
  ) { }

  ngOnInit() {
    this.renderReactComponent();
  }

  ngOnDestroy() {
    this.reactWrapper.unmountReact(this.containerRef);
  }

  private handleCancel = () => {
  }

  private handleOk = () => {
  }

  private renderReactComponent(): void {
    import('./modal-component').then(({ ModalComponent: ReactModalComponent }) => {
      import('../../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
        const services = {
          modalService: this.modalService
        };

        const reactElement = React.createElement(
          AngularServicesProvider as any, 
          { services } as any,
          React.createElement(ReactModalComponent as any, {
            onCancel: this.handleCancel,
            onOk: this.handleOk
          })
        );

        this.reactWrapper.renderReact(this.containerRef, reactElement as any);
      });
    });
  }
}
