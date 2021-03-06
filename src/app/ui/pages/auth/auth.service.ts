import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SignInUser, SignUpUser } from './users';
import { AppStateService } from '../../../app-state.service';
import { AuthResponse } from '../../../responses/auth-response';
import { HandleError } from '../../../handle-error';
import { CaptchaResponse } from '../../../responses/captcha-response';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {}

    get appState() { return this.appStateService.appState; }

    signUp(user: SignUpUser) {

        // return this.http.get<AuthResponse>(`http://localhost:3000/profile`).pipe(
        // return this.http.post<AuthResponse>(`http://localhost:3000/posts`, user).pipe(

        const params = new HttpParams().set('values', JSON.stringify(user));
        return this.http.get<AuthResponse>('http://localhost:8080/maketravel/users/register', { params }).pipe(
            catchError(HandleError<AuthResponse>('Signing up')),
        );
    }

    signIn(user: SignInUser) {

        // return this.http.get<AuthResponse>(`http://localhost:3000/profile`).pipe(
        // return this.http.post<AuthResponse>(`http://localhost:3000/posts`, user).pipe(

        const params = new HttpParams().set('values', JSON.stringify(user));
        return this.http.get<AuthResponse>('http://localhost:8080/maketravel/users/login', { params }).pipe(
            catchError(HandleError<AuthResponse>('Signing in')),
        );
    }

    getCaptchaId() {

        return this.http.get<CaptchaResponse>('http://localhost:8080/maketravel/captcha/id').pipe(
            catchError(HandleError<CaptchaResponse>('Getting captcha')),
        );
    }
}
