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
            login: '',
            password: '',

            // login: 'qqqq',
            // password: 'qsf6Fui27g',
            // passport: '111111',
            // name: 'qqq',
            // email: '111@eee.com',
        };

        this.captchaPattern = "3cyunR";
    }

    submitAuth(): void {

        this.submitting = true;

        // TODO: проверить капчу

        let requestUrl: string;
        if (this.signUp) {
            requestUrl = "localhost:8080/maketravel/users/register"
        }
        else {
            requestUrl = "localhost:8080/maketravel/users/login";
        }

        // this.httpClient.get(`http://localhost:3000/profile?login=${this.user.login}`)
        // this.httpClient.post(`http://localhost:3000/posts`, this.user)
        this.httpClient.post(requestUrl, this.user)
            .subscribe(response => {

                // TODO: сохранить токен
                const token = response['token'] ? response['token'] : '';

                this.submitting = false;

                if (response['status']) {
                    this.errors = response['errors'];

                    alert(`Произошла ошибка:\n${this.errors}`);
                    return;
                }

                this.route.navigateByUrl('');
            },
            error => {

                this.errors = error.message;
                alert(`Произошла ошибка:\n${this.errors}`);

                this.submitting = false;
            });
    }
}
