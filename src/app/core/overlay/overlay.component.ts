import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';
import { EventBusService } from '../services/event-bus.service';
import * as React from 'react';

@Component({
    selector: 'cm-overlay',
    template: '<div #reactOverlayContainer><ng-content></ng-content></div>',
    styleUrls: ['./overlay.component.css'],
    standalone: true
})
export class OverlayComponent implements OnInit, OnDestroy {
    @ViewChild('reactOverlayContainer', { static: true }) containerRef!: ElementRef;
    @Input() delay = 500;

    constructor(
      private eventBus: EventBusService,
      private reactWrapper: ReactWrapperService
    ) { }

    ngOnInit() {
      const content = this.containerRef.nativeElement.innerHTML;
      this.containerRef.nativeElement.innerHTML = '';
      
      this.renderReactComponent(content);
    }

    ngOnDestroy() {
      this.reactWrapper.unmountReact(this.containerRef);
    }

    private renderReactComponent(content: string): void {
      import('./overlay-component').then(({ OverlayComponent: ReactOverlayComponent }) => {
        import('../../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
          const services = {
            eventBus: this.eventBus
          };

          const reactElement = React.createElement(
            AngularServicesProvider as any, 
            { services } as any,
            React.createElement(ReactOverlayComponent as any, { 
              delay: this.delay,
              dangerouslySetInnerHTML: { __html: content }
            })
          );

          this.reactWrapper.renderReact(this.containerRef, reactElement as any);
        });
      });
    }
}
