import { Injectable, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilitiesService {    
    constructor(@Inject('Window') private window: Window) { }

    getApiUrl() {
        const port = this.getPort();
        if (import.meta.env.NG_APP_API_URL) {
            return import.meta.env.NG_APP_API_URL;
        }
        
        const hostname = this.window.location.hostname.includes('@') 
            ? this.window.location.hostname.split('@')[1] 
            : this.window.location.hostname;
            
        return `${this.window.location.protocol}//${hostname}${port}`;
    }

    private getPort() {
        const port = this.window.location.port;
        if (port) {
            // for running with Azure Functions local emulator
            if (port === '4200') {
                // Local run with 'npm run' also started in api folder for Azure Functions
                return ':7071'; // for debugging Azure Functions locally
            }
            // Running with local node (which serves Angular and the API)
            return ':' + this.window.location.port;
        }
        else {
            // for running locally with Docker/Kubernetes
            if (this.window.location.hostname === 'localhost') {
                return ':8080';
            }
        }
        return '';
    }
}
