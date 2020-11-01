import { Injectable } from '@angular/core';
import { AppState } from './app-state';
import { AuthState } from './ui/pages/auth/auth-state';

@Injectable({
    providedIn: 'root',
})
export class AppStateService {

    private appState = new AppState();

    get authState() { return this.appState.authState; }
}
