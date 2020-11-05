import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService, UserRole } from '../../../../app-state.service';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response';
import { SignInUser } from '../users';

@Component({
    selector: 'app-sign-in',
    template: `
        <app-auth-content
            action="sign-in"
            [user]="user"
            [processing]="processing"
            [errors]="errors"
            (dismissErrors)="errors = null"
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
    errors: string = null;

    submit() {

        this.processing = true;

        this.authService.signIn(this.user)
            .subscribe(response => this.handleResponse(response));
    }

    private handleResponse(response: AuthResponse) {

        this.processing = false;
        this.errors = response.errors;

        if (!this.errors) {

            // TODO: сохранить токен
            const token = response.token || '';

            // TODO: присвоить пользователю роль
            // this.appStateService.appState.currentUser = response.userRole as UserRole;
            this.appStateService.appState.currentUser = UserRole.Client;

            this.router.navigateByUrl('main');
        }
    }
}
