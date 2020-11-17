import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppStateService } from '../../../app-state.service';

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
        return this.http.get<UserHotelsResponse>(`${this.appState.baseUrl}/hotels`).pipe(
            catchError(HandleError<UserHotelsResponse>('Getting hotels')),
        );
    }

    getHotelServices(hotelId: number, categoryId: number) {

        // todo: add token to url
        return this.http.get<HotelServicesResponse>(`${this.appState.baseUrl}/hotels/services/${hotelId}/${categoryId}`).pipe(
            catchError(HandleError<HotelServicesResponse>('Getting services')),
        );
    }
}
