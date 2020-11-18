import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppStateService } from '../../../app-state.service';
import { HandleError } from '../../../handle-error';
import { HotelServiceResponse, ServiceResponse, UserHotelResponse } from './responses';

@Injectable({
    providedIn: 'root',
})
export class ServicesService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getUserHotels() {

        // todo: add token to url
        return this.http.get<UserHotelResponse>(`${this.appState.baseUrl}/hotels`).pipe(
            catchError(HandleError<UserHotelResponse>('Getting hotels info')),
        );
    }

    getHotelServices(hotelId: number, categoryId: number) {

        // todo: add token to url
        return this.http.get<HotelServiceResponse>(`${this.appState.baseUrl}/hotels/services/${hotelId}/${categoryId}`).pipe(
            catchError(HandleError<HotelServiceResponse>('Getting services info')),
        );
    }

    getService(serviceId: number) {

        // todo: add token to url
        return this.http.get<ServiceResponse>(`${this.appState.baseUrl}/hotels/services/${serviceId}`).pipe(
            catchError(HandleError<ServiceResponse>('Getting service info')),
        );
    }
}
