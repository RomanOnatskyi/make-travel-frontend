import {Component, OnInit} from '@angular/core';
import {AppStateService, UserRole} from '../../../app-state.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(
        private appStateService: AppStateService,
    ) {
    }

    ngOnInit(): void {
    }

    get currentUser() {
        return this.appStateService.appState.currentUser;
    }

    UserRole = UserRole;
}
