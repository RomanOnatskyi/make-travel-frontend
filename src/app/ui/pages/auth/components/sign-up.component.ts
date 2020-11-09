import { Component, OnInit } from '@angular/core';
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
            [captchaImage]="captchaImage"
            [user]="user"
            [processing]="processing"
            [errors]="errors"
            (updateCaptcha)="updateCaptcha()"
            (dismissErrors)="errors = null"
            (submit)="submit()">
        </app-auth-content>`,
})
export class SignUpComponent implements OnInit {

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private authService: AuthService,
        private captchaService: CaptchaService,
    ) {}

    ngOnInit() {

        this.updateCaptcha();
    }

    user = new SignUpUser();
    processing: boolean = false;
    errors: string = null;
    captchaImage: any;

    updateCaptcha() {

        this.captchaService.getCaptcha()
            .subscribe(captcha => this.handleCaptchaResponse(captcha));
    }

    submit() {

        this.processing = true;

        this.authService.signUp(this.user)
            .subscribe(response => this.handleAuthResponse(response));
    }

    private handleCaptchaResponse(captcha: CaptchaResponse) {

        this.errors = captcha.errors;
        this.user.captchaId = captcha.captchaId;

        // todo: convert captcha.captchaImage to image
        this.captchaImage = captcha.captchaImage;

        if (this.errors) {
            window.scrollTo(0, 0);
        }
    }

    private handleAuthResponse(response: AuthResponse) {

        this.errors = response.errors;
        this.processing = false;

        if (this.errors) {
            window.scrollTo(0, 0);
            return;
        }

        this.router.navigateByUrl('auth/sign-in');
    }
}
