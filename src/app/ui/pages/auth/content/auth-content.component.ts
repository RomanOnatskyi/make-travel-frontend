import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
    login: string;
    password: string;
    name?: string;
    email?: string;
    passport?: string;
}

@Component({
    selector: 'app-auth-content',
    templateUrl: './auth-content.component.html',
    styleUrls: ['./auth-content.component.css'],
})
export class AuthContentComponent implements OnInit {

    @Input() action: string;

    constructor(
        private httpClient: HttpClient,
        private route: Router,
    ) {}

    get signUp() { return this.action == "sign-up"; }
    get signIn() { return this.action == "sign-in"; }

    user: User;
    captchaPattern: string;
    submitting: boolean;
    errors: string;

    ngOnInit(): void {

        this.user = {
            // login: '',
            // password: '',

            login: 'qqqq',
            password: 'qsf6Fui27g',
            // passport: '111111',
            // name: 'qqq',
            // email: '111@eee.com',
        };

        this.captchaPattern = "3cyunR";
    }

    submitAuth(): void {

        console.log('sent: ', this.user);

        this.submitting = true;

        this.httpClient.post("http://localhost:3000/testResponse", this.user)
            .subscribe(result => {

                    console.log('result: ', result);
                    this.errors = result["errors"];

                    setTimeout(() => {

                        this.submitting = false;
                    }, 3000);

                    // this.submitting = false;

                if (this.errors) {
                    alert(`Произошла ошибка:\n ${this.errors}`)
                    return;
                }

                    this.route.navigateByUrl('')
                },
                error => {

                    this.errors = error.message;
                    alert(`Произошла ошибка:\n ${this.errors}`)

                    setTimeout(() => {

                        this.submitting = false;
                    }, 3000);

                    // this.submitting = false;
                },
            );
    }
}
