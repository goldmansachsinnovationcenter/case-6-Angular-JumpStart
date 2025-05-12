import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';
import { AuthService } from '../services/auth.service';
import { GrowlerService, GrowlerMessageType } from '../growler/growler.service';
import { LoggerService } from '../services/logger.service';
import { CommonModule } from '@angular/common';
import * as React from 'react';

@Component({
    selector: 'cm-navbar',
    template: '<div #reactNavbarContainer></div>',
    standalone: true,
    imports: [CommonModule]
})
export class NavbarComponent implements OnInit, OnDestroy {
    @ViewChild('reactNavbarContainer', { static: true }) containerRef!: ElementRef;

    constructor(
        private router: Router,
        private authService: AuthService,
        private growler: GrowlerService,
        private logger: LoggerService,
        private reactWrapper: ReactWrapperService
    ) { }

    ngOnInit() {
        this.renderReactComponent();
    }

    ngOnDestroy() {
        this.reactWrapper.unmountReact(this.containerRef);
    }

    private handleLoginLogout = () => {
    }

    private renderReactComponent(): void {
        import('./navbar-component').then(({ NavbarComponent: ReactNavbarComponent }) => {
            import('../../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
                const services = {
                    authService: this.authService,
                    growlerService: this.growler,
                    loggerService: this.logger,
                    router: this.router
                };

                const reactElement = React.createElement(
                    AngularServicesProvider as any, 
                    { services } as any,
                    React.createElement(ReactNavbarComponent as any, {
                        onLoginLogout: this.handleLoginLogout
                    })
                );

                this.reactWrapper.renderReact(this.containerRef, reactElement as any);
            });
        });
    }
}
