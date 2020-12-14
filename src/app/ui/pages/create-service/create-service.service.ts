import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { NewHotelService } from './new-hotel-service';
import { BaseResponse } from '../../../responses/base-response';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';

@Injectable({
    providedIn: 'root',
})
export class CreateServiceService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {}

    get appState() { return this.appStateService.appState; }

    createService(service: NewHotelService) {

        // todo add user token
        const params = new HttpParams().set('values', JSON.stringify(service));
        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/services/create/login`, { params }).pipe(
            catchError(HandleError<BaseResponse>('Service creating')),
        );
    }
}
