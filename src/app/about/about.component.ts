import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ReactWrapperService } from '../shared/react/react-wrapper.service';
import { CommonModule } from '@angular/common';
import * as React from 'react';

@Component({
    selector: 'cm-about',
    template: '<div #reactAboutContainer></div>',
    styleUrls: ['./about.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class AboutComponent implements OnInit, OnDestroy {
    @ViewChild('reactAboutContainer', { static: true }) containerRef!: ElementRef;

    constructor(
        private reactWrapper: ReactWrapperService
    ) { }

    ngOnInit() {
        this.renderReactComponent();
    }

    ngOnDestroy() {
        this.reactWrapper.unmountReact(this.containerRef);
    }

    private renderReactComponent(): void {
        import('./about-component').then(({ AboutComponent: ReactAboutComponent }) => {
            import('../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
                const services = {};

                const reactElement = React.createElement(
                    AngularServicesProvider as any, 
                    { services } as any,
                    React.createElement(ReactAboutComponent as any)
                );

                this.reactWrapper.renderReact(this.containerRef, reactElement as any);
            });
        });
    }
}
