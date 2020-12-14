import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

        // return this.http.get<UserListResponse>(`http://localhost:3000/banned-users`).pipe(
        return this.http.get<UserListResponse>(`${this.appState.baseUrl}/users/getBanned/${this.appState.userToken}`).pipe(
            catchError(HandleError<UserListResponse>('Getting banned users')),
        );
    }

    getCommonUsers() {

        // return this.http.get<UserListResponse>(`http://localhost:3000/common-users`).pipe(
        return this.http.get<UserListResponse>(`${this.appState.baseUrl}/users/getCommon/${this.appState.userToken}`).pipe(
            catchError(HandleError<UserListResponse>('Getting non-banned users')),
        );
    }

    changeUserAccess(userId: number, status: number) {

        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/administration/change-access/${userId}/${status}/${this.appState.userToken}`).pipe(
            catchError(HandleError<BaseResponse>('Banning user')),
        );
    }
}
