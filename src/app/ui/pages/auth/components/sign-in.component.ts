import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService, Pages } from '../../../../app-state.service';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../../../../responses/auth-response';
import { SignInUser } from '../users';

@Component({
    selector: 'app-sign-in',
    template: `
        <app-auth-content
            action="sign-in"
            [user]="user"
            [processing]="processing"
            [authError]="authError"
            (dismissAuthError)="authError = null"
            (submit)="submit()">
        </app-auth-content>`,
})
export class SignInComponent {

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private authService: AuthService,
    ) {}

    user = new SignInUser();
    processing: boolean = false;
    authError: string = null;
    pages = Pages;

    submit() {

        this.processing = true;

        this.authService.signIn(this.user)
            .subscribe(response => this.handleResponse(response));
    }

    private handleResponse(response: AuthResponse) {

        this.processing = false;
        this.authError = response.errors;

        if (this.authError) {
            window.scrollTo(0, 0);
            return;
        }

        this.appStateService.appState.userToken = response.token || '';
        this.appStateService.appState.currentUser = response.userRole;

        this.appStateService.appState.currentPage = this.pages.Main;
        this.router.navigateByUrl('main');
    }
}
