import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgClass, NgStyle, NgIf } from '@angular/common';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';
import { ModalService } from './modal.service';
import * as React from 'react';

@Component({
    selector: 'cm-modal',
    template: '<div #reactModalContainer></div>',
    styleUrls: ['./modal.component.css'],
    standalone: true,
    imports: [NgClass, NgStyle, NgIf]
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

  private renderReactComponent(): void {
    import('./modal-component').then(({ ModalComponent: ReactModalComponent }) => {
      import('../../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
        const services = {
          modalService: this.modalService
        };

        const reactElement = React.createElement(
          AngularServicesProvider as any, 
          { services } as any,
          React.createElement(ReactModalComponent as any)
        );

        this.reactWrapper.renderReact(this.containerRef, reactElement as any);
      });
    });
  }
}
