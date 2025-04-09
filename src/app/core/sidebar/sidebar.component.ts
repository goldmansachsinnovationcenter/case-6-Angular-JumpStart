import { Component, ElementRef, EventEmitter, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { ReactWrapperService } from '../../shared/react/react-wrapper.service';
import { AuthService } from '../services/auth.service';
import { GrowlerService } from '../growler/growler.service';
import { LoggerService } from '../services/logger.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as React from 'react';

@Component({
  selector: 'cm-sidebar',
  template: '<div #reactSidebarContainer></div>',
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('reactSidebarContainer', { static: true }) containerRef!: ElementRef;
  @Output() itemSelected = new EventEmitter<string>();

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

  private handleItemSelected = (path: string) => {
    this.itemSelected.emit(path);
  }

  private renderReactComponent(): void {
    import('./sidebar-component').then(({ SidebarComponent: ReactSidebarComponent }) => {
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
          React.createElement(ReactSidebarComponent as any, {
            onItemSelected: this.handleItemSelected
          })
        );

        this.reactWrapper.renderReact(this.containerRef, reactElement as any);
      });
    });
  }
}
