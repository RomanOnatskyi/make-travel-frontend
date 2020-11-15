import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SignInUser, SignUpUser } from '../../users';

export type AuthAction = "sign-up" | "sign-in";

@Component({
    selector: 'app-auth-content',
    templateUrl: './auth-content.component.html',
    styleUrls: ['./auth-content.component.css'],
})
export class AuthContentComponent implements OnInit{

    @Input() action: AuthAction;
    @Input() user: SignInUser | SignUpUser;
    @Input() processing: boolean;
    @Input() authError: string;
    @Input() captchaError: string;

    @Output() updateCaptcha = new EventEmitter<void>();
    @Output() dismissAuthError = new EventEmitter<void>();
    @Output() dismissCaptchaError = new EventEmitter<void>();
    @Output() submit = new EventEmitter<void>();

    get signUp() { return this.action == "sign-up"; }
    get signIn() { return this.action == "sign-in"; }

    ngOnInit() {
        this.captchaImageURL = `http://localhost:8080/project/getCaptcha?${this.user.login}`;
    }

    captchaImageURL: string;
}
