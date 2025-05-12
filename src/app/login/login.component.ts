import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as React from 'react';

import { AuthService } from '../core/services/auth.service';
import { GrowlerService } from '../core/growler/growler.service';
import { LoggerService } from '../core/services/logger.service';
import { ReactWrapperService } from '../shared/react/react-wrapper.service';

@Component({
    selector: 'cm-login',
    template: '<div #reactLoginContainer></div>',
    standalone: true,
    imports: [CommonModule]
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild('reactLoginContainer', { static: true }) containerRef!: ElementRef;

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

    private handleLoginSuccess = () => {
    }

    private renderReactComponent(): void {
        import('./login-component').then(({ LoginComponent: ReactLoginComponent }) => {
            import('../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
                const services = {
                    authService: this.authService,
                    growlerService: this.growler,
                    loggerService: this.logger,
                    router: this.router
                };

                const reactElement = React.createElement(
                    AngularServicesProvider as any, 
                    { services } as any,
                    React.createElement(ReactLoginComponent as any, {
                        onLoginSuccess: this.handleLoginSuccess
                    })
                );

                this.reactWrapper.renderReact(this.containerRef, reactElement as any);
            });
        });
    }
}
