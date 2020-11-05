import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SignInUser, SignUpUser } from '../../users';

export type AuthAction = "sign-up" | "sign-in";

@Component({
    selector: 'app-auth-content',
    templateUrl: './auth-content.component.html',
    styleUrls: ['./auth-content.component.css'],
})
export class AuthContentComponent implements OnInit {

    @Input() action: AuthAction;
    @Input() user: SignInUser | SignUpUser;
    @Input() processing: boolean;
    @Input() errors: string;

    @Output() dismissErrors = new EventEmitter<void>();
    @Output() submit = new EventEmitter<void>();

    get signUp() { return this.action == "sign-up"; }
    get signIn() { return this.action == "sign-in"; }

    // todo: remove captchaPattern
    captchaPattern: string;

    ngOnInit(): void {

        this.captchaPattern = "3cyunR";
    }
}
