import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService, Pages } from '../../../../app-state.service';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../../../../responses/auth-response';
import { SignUpUser } from '../users';
import { CaptchaResponse } from '../../../../responses/captcha-response';

@Component({
    selector: 'app-sign-up',
    template: `
        <app-auth-content
            *ngIf="user.captchaId; else loading"
            action="sign-up"
            [user]="user"
            [processing]="processing"
            [captchaId]="user.captchaId"
            [authError]="authError"
            [captchaError]="captchaError"
            (updateCaptcha)="updateCaptcha()"
            (dismissAuthError)="authError = null"
            (dismissCaptchaError)="captchaError = null"
            (submit)="submit()">
        </app-auth-content>
        
        <ng-template #loading>
            Loading...
        </ng-template>`,
})
export class SignUpComponent implements OnInit {

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private authService: AuthService,
    ) {}

    ngOnInit() {

        this.updateCaptcha();
    }

    user = new SignUpUser();
    processing: boolean = false;
    authError: string = null;
    captchaError: string = null;
    pages = Pages;

    updateCaptcha() {

        this.processing = true;
        this.user.captchaValue = null;

        this.authService.getCaptchaId()
            .subscribe(captcha => this.handleCaptchaIdResponse(captcha));
    }

    submit() {

        this.processing = true;

        this.authService.signUp(this.user)
            .subscribe(response => this.handleAuthResponse(response));
    }

    private handleCaptchaIdResponse(captcha: CaptchaResponse) {

        this.captchaError = captcha.errors;
        this.processing = false;

        this.user.captchaId = captcha.captchaId.toString();

        if (this.captchaError) {
            window.scrollTo(0, 0);
        }
    }

    private handleAuthResponse(response: AuthResponse) {

        this.authError = response.errors;
        this.processing = false;

        if (this.authError) {
            window.scrollTo(0, 0);
            this.updateCaptcha();
            return;
        }

        this.appStateService.appState.currentPage = this.pages.Authentication;
        this.router.navigateByUrl('auth/sign-in');
    }
}
