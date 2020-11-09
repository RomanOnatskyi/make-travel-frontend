import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppStateService } from '../../../app-state.service';
import { CaptchaResponse } from './captcha-response';
import { HandleError } from '../../../handle-error';

@Injectable({
    providedIn: 'root',
})
export class CaptchaService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getCaptcha() {

        return this.http.get<CaptchaResponse>(`${this.appState.baseUrl}/captcha`).pipe(
            catchError(HandleError<CaptchaResponse>('Getting captcha')),
        );
    }
}
