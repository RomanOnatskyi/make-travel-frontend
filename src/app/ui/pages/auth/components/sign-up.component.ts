import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../app-state.service';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response';
import { SignUpUser } from '../users';
import { CaptchaService } from '../captcha.service';
import { CaptchaResponse } from '../captcha-response';

@Component({
    selector: 'app-sign-up',
    template: `
        <app-auth-content
            action="sign-up"
            captchaImage="sign-up"
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
        private captchaService: CaptchaService,
    ) {}

    user = new SignUpUser();
    processing: boolean = false;
    errors: string = null;
    captchaId: number;

    updateCaptcha() {
        this.captchaService.getCaptcha()
            .subscribe(captcha => this.handleCaptchaResponse(captcha));
    }

    submit() {

        this.processing = true;

        this.authService.signUp(this.user)
            .subscribe(response => this.handleResponse(response));
    }

    private handleCaptchaResponse(captcha: CaptchaResponse) {

        this.captchaId = captcha.captchaId;
        this.captchaImage = captcha.captchaImage;
    }

    private handleResponse(response: AuthResponse) {

        this.errors = response.errors;
        this.processing = false;

        if (this.errors) {
            window.scrollTo(0, 0);
            return;
        }

        this.router.navigateByUrl('auth/sign-in');
    }
}
