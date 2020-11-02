import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { baseUrl } from '../../../app-state';
import { User } from './auth-state';
import { AuthResponse } from './auth-response';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private http: HttpClient,
    ) {}

    signUp(user: User) {

        // return this.http.get<AuthResponse>(`http://localhost:3000/profile?login=${user.login}`)
        // return this.http.post<AuthResponse>(`http://localhost:3000/posts`, user)
        // return this.http.post<AuthResponse>(`${baseUrl}/users/register`, user)

        const params = new HttpParams().set('values', JSON.stringify(user));
        return this.http.get<AuthResponse>(`${baseUrl}/users/register`, { params });
    }

    signIn(user: User) {

        // return this.http.get<AuthResponse>(`http://localhost:3000/profile?login=${user.login}`)
        // return this.http.post<AuthResponse>(`http://localhost:3000/posts`, user)
        // return this.http.post<AuthResponse>(`${baseUrl}/users/login`, user)

        const params = new HttpParams().set('values', JSON.stringify(user));
        return this.http.get<AuthResponse>(`${baseUrl}/users/login`, { params });
    }
}
