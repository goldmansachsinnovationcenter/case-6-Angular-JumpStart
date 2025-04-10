import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';
import { AuthService } from '../services/auth.service';
import { GrowlerService } from '../growler/growler.service';
import { LoggerService } from '../services/logger.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as React from 'react';

@Component({
  selector: 'cm-shell',
  template: `
    <div #reactShellContainer></div>
    <div style="display: block;">
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class ShellComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('reactShellContainer', { static: true }) containerRef!: ElementRef;

  constructor(
    private reactWrapper: ReactWrapperService,
    private authService: AuthService,
    private growlerService: GrowlerService,
    private loggerService: LoggerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderReactComponent();
    setTimeout(() => {
      this.cdr.detectChanges();
    });
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
          React.createElement(ReactShellComponent as any)
        );

        this.reactWrapper.renderReact(this.containerRef, reactElement as any);
      });
    });
  }
}
