import {Component, OnInit} from '@angular/core';
import { AppStateService, Pages, UserRole } from '../../../app-state.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(
        public appStateService: AppStateService,
    ) {}

    ngOnInit(): void {
    }

    get currentUser() {
        return this.appStateService.appState.currentUser;
    }

    get currentPage() {
        return this.appStateService.appState.currentPage;
    }

    pages = Pages;
    UserRole = UserRole;
}
