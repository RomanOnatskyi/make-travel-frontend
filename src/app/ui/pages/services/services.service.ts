import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { UserHotelResponse } from '../../../responses/user-hotel-response';
import { HotelServiceResponse } from '../../../responses/hotel-service-response';

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

    getServicesByHotelIdAndCategory(hotelId: number, categoryId: number) {

        // todo: add token to url
        return this.http.get<HotelServiceResponse>(`${this.appState.baseUrl}/hotels/services/${hotelId}/${categoryId}`).pipe(
            catchError(HandleError<HotelServiceResponse>('Getting services info')),
        );
    }
}
