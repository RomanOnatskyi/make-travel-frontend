import { Injectable } from '@angular/core';
import { SignUpUser } from './users';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { catchError } from 'rxjs/operators';
import { AppStateService } from '../../../app-state.service';
import { BaseResponse } from '../../../base-response';
import { Observable, of } from 'rxjs';
import { CaptchaResponse } from './captcha-response';

@Injectable({
    providedIn: 'root',
})
export class CaptchaService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() {
        return this.appStateService.appState;
    }


    getCaptcha() {

        return this.http.get<CaptchaResponse>(`${this.appState.baseUrl}/captcha`).pipe(
            catchError(this.handleError<CaptchaResponse>('Getting captcha')),
        );
    }

    private handleError<T extends BaseResponse>(operation = 'Operation') {

        return (error: any): Observable<T> => {

            const result = {} as T;
            result.errors = `${operation} failed: ${error.message}`;

            return of(result);
        };
    }
}
