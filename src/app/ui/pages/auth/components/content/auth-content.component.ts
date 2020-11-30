import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SignInUser, SignUpUser } from '../../users';
import { AppStateService } from '../../../../../app-state.service';

export type AuthAction = "sign-up" | "sign-in";

@Component({
    selector: 'app-auth-content',
    templateUrl: './auth-content.component.html',
    styleUrls: ['./auth-content.component.css'],
})
export class AuthContentComponent {

    @Input() action: AuthAction;
    @Input() user: SignInUser | SignUpUser;
    @Input() processing: boolean;
    @Input() captchaId: string;
    @Input() authError: string;
    @Input() captchaError: string;

    @Output() updateCaptcha = new EventEmitter<void>();
    @Output() dismissAuthError = new EventEmitter<void>();
    @Output() dismissCaptchaError = new EventEmitter<void>();
    @Output() submit = new EventEmitter<void>();

    get signUp() { return this.action == "sign-up"; }
    get signIn() { return this.action == "sign-in"; }
    get captchaImageURL() { return `${this.appStateService.appState.baseUrl}/getCaptcha?captchaId=${this.captchaId}` }

    constructor(
        private appStateService: AppStateService,
    ) {}
}
