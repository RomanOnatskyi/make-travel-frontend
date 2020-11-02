import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthState } from '../../auth-state';

@Component({
    selector: 'app-auth-content',
    templateUrl: './auth-content.component.html',
    styleUrls: ['./auth-content.component.css'],
})
export class AuthContentComponent implements OnInit {

    @Input() authState: AuthState;
    @Output() submit = new EventEmitter<void>();

    get user() { return this.authState.user; }
    get processing() { return this.authState.processing; }
    get errors() { return this.authState.errors; }
    get signUp() { return this.authState.action == "sign-up"; }
    get signIn() { return this.authState.action == "sign-in"; }

    // todo: remove captchaPattern
    captchaPattern: string;

    ngOnInit(): void {

        this.captchaPattern = "3cyunR";
    }
}
