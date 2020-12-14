import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { BaseResponse } from '../../../responses/base-response';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { UserListResponse } from '../../../responses/user-list-response';

@Injectable({
    providedIn: 'root',
})
export class UserListService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getBannedUsers() {

        // todo: add token to url
        return this.http.get<UserListResponse>(`${this.appState.baseUrl}/users/getBanned`).pipe(
            catchError(HandleError<UserListResponse>('Getting banned users')),
        );
    }

    getCommonUsers() {

        // todo: add token to url
        return this.http.get<UserListResponse>(`${this.appState.baseUrl}/users/getCommon`).pipe(
            catchError(HandleError<UserListResponse>('Getting non-banned users')),
        );
    }

    banUser(userId: number) {

        const params = new HttpParams()
            .set('values', JSON.stringify(userId));

        // todo: add token to url
        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/users/ban`, { params }).pipe(
            catchError(HandleError<BaseResponse>('Banning user')),
        );
    }

    unbanUser(userId: number) {

        const params = new HttpParams()
            .set('values', JSON.stringify(userId));

        // todo: add token to url
        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/users/unban`, { params }).pipe(
            catchError(HandleError<BaseResponse>('Unbanning user')),
        );
    }
}
