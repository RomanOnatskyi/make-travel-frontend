import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignInUser, SignUpUser } from './users';
import { AppStateService } from '../../../app-state.service';
import { AuthResponse } from './auth-response';
import { BaseResponse } from '../../../base-response';

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
        return this.http.get<AuthResponse>(`${this.appState.baseUrl}/users/register`, { params }).pipe(
            catchError(this.handleError<AuthResponse>('signIn')),
        );
    }

    signIn(user: SignInUser) {

        // return this.http.get<AuthResponse>(`http://localhost:3000/profile`).pipe(
        // return this.http.post<AuthResponse>(`http://localhost:3000/posts`, user).pipe(

        const params = new HttpParams().set('values', JSON.stringify(user));
        return this.http.get<AuthResponse>(`${this.appState.baseUrl}/users/login`, { params }).pipe(
            catchError(this.handleError<AuthResponse>('signIn')),
        );
    }

    private handleError<T extends BaseResponse>(operation = 'operation') {

        return (error: any): Observable<T> => {

            const result = {} as T;
            result.errors = `${operation} failed: ${error.message}`;

            return of(result);
        };
    }
}
