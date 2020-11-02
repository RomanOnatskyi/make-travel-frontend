import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../app-state.service';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response';
import { User } from '../auth-state';

@Component({
    selector: 'app-sign-in',
    template: `
        <app-auth-content
            [authState]="authState"
            (submit)="submit()">
        </app-auth-content>`,
})
export class SignInComponent implements OnInit {

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private authService: AuthService,
    ) {
    }

    get authState() {
        return this.appStateService.authState;
    }

    ngOnInit() {

        this.authState.action = 'sign-in';
    }

    submit() {

        this.authState.processing = true;

        this.authService.signIn(this.authState.user)
            .subscribe(
                response => {

                    console.log('55: response.errors =', response.errors);
                    this.handleResponse(response);
                },
                error => {
                    this.handleErrors(error);
                },
            );
    }

    private handleResponse(response: AuthResponse) {

        this.authState.processing = false;
        this.authState.errors = response.errors;

        console.log('55: response.errors =', response.errors);

        if (!this.authState.errors) {

            // TODO: сохранить токен
            const token = response.token || '';

            this.authState.user = new User();
            this.router.navigateByUrl('');
        }
    }

    private handleErrors(error) {

        this.authState.processing = false;
        this.authState.errors = error.message;
    }
}
