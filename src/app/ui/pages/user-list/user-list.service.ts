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

        return this.http.get<UserListResponse>(`${this.appState.baseUrl}/users/getBanned/${this.appState.userToken}`).pipe(
            catchError(HandleError<UserListResponse>('Getting banned users')),
        );
    }

    getCommonUsers() {

        return this.http.get<UserListResponse>(`${this.appState.baseUrl}/users/getCommon/${this.appState.userToken}`).pipe(
            catchError(HandleError<UserListResponse>('Getting non-banned users')),
        );
    }

    changeUserAccess(userId: number, status: boolean) {

        const params = new HttpParams()
            .set('values', JSON.stringify(userId))
            .set('values', JSON.stringify(status));

        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/administration/change-access/${this.appState.userToken}`, { params }).pipe(
            catchError(HandleError<BaseResponse>('Banning user')),
        );
    }
}
