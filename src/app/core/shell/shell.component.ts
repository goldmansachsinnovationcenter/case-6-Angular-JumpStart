import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';
import { AuthService } from '../services/auth.service';
import { GrowlerService } from '../growler/growler.service';
import { LoggerService } from '../services/logger.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as React from 'react';

@Component({
  selector: 'cm-shell',
  template: '<div #reactShellContainer></div>',
  standalone: true,
  imports: [CommonModule]
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild('reactShellContainer', { static: true }) containerRef!: ElementRef;

  constructor(
    private reactWrapper: ReactWrapperService,
    private authService: AuthService,
    private growlerService: GrowlerService,
    private loggerService: LoggerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.renderReactComponent();
  }

  ngOnDestroy(): void {
    this.reactWrapper.unmountReact(this.containerRef);
  }

  private renderReactComponent(): void {
    import('./shell-component').then(({ ShellComponent: ReactShellComponent }) => {
      import('../../shared/react/angular-services-context').then(({ AngularServicesProvider }) => {
        const services = {
          authService: this.authService,
          growlerService: this.growlerService,
          loggerService: this.loggerService,
          router: this.router
        };

        const reactElement = React.createElement(
          AngularServicesProvider as any, 
          { services } as any,
          React.createElement(ReactShellComponent as any, null)
        );

        this.reactWrapper.renderReact(this.containerRef, reactElement as any);
      });
    });
  }
}
