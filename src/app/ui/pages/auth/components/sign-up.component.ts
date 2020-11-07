import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../app-state.service';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response';
import { SignUpUser } from '../users';

@Component({
    selector: 'app-sign-up',
    template: `
        <app-auth-content
            action="sign-up"
            [user]="user"
            [processing]="processing"
            [errors]="errors"
            (dismissErrors)="errors = null"
            (submit)="submit()">
        </app-auth-content>`,
})
export class SignUpComponent {

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private authService: AuthService,
    ) {}

    user = new SignUpUser();
    processing: boolean = false;
    errors: string = null;

    submit() {

        this.processing = true;

        this.authService.signUp(this.user)
            .subscribe(response => this.handleResponse(response));
    }

    private handleResponse(response: AuthResponse) {

        this.processing = false;
        this.errors = response.errors;

        if (this.errors) {
            window.scrollTo(0, 0);
            return;
        }

        this.router.navigateByUrl('auth/sign-in');
    }
}
