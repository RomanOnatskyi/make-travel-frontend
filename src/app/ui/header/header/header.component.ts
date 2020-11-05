import { Component } from '@angular/core';
import { AppStateService, UserRole } from '../../../app-state.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

    constructor(
        private appStateService: AppStateService,
    ) {}

    get currentUser() { return this.appStateService.appState.currentUser; }

    UserRole = UserRole;
}
