import { Component } from '@angular/core';
import { OverlayComponent } from './core/overlay/overlay.component';
import { ModalComponent } from './core/modal/modal.component';
import { GrowlerComponent } from './core/growler/growler.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ShellComponent } from './core/shell/shell.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';

@Component({
    selector: 'cm-app-component',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [NavbarComponent, RouterOutlet, GrowlerComponent, ModalComponent, OverlayComponent, ShellComponent, SidebarComponent]
})
export class AppComponent {

}
