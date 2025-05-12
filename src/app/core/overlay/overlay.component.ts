import { Component, ElementRef, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as React from 'react';

import { EventBusService } from '../services/event-bus.service';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';

@Component({
    selector: 'cm-overlay',
    template: '<div #reactOverlayContainer></div>',
    standalone: true,
    imports: [CommonModule]
})
export class OverlayComponent implements OnInit, OnDestroy {
    @ViewChild('reactOverlayContainer', { static: true }) containerRef!: ElementRef;
    @Input() delay = 500;

    constructor(
        private eventBus: EventBusService,
        private reactWrapper: ReactWrapperService
    ) { }

    ngOnInit() {
        this.renderReactComponent();
    }

    ngOnDestroy() {
        this.reactWrapper.unmountReact(this.containerRef);
    }

    private renderReactComponent(): void {
        import('./overlay-component').then(({ OverlayComponent: ReactOverlayComponent }) => {
            import('../../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
                const services = {
                    eventBus: this.eventBus
                };

                const reactElement = React.createElement(
                    AngularServicesProvider as any, 
                    { services } as any,
                    React.createElement(ReactOverlayComponent as any, {
                        delay: this.delay
                    })
                );

                this.reactWrapper.renderReact(this.containerRef, reactElement as any);
            });
        });
    }
}
