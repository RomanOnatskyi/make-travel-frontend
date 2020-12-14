import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { HotelOrdersResponse } from '../../../responses/hotel-orders-response';

@Injectable({
    providedIn: 'root',
})
export class HotelOrdersService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getHotelOrders() {

        // return this.http.get<UserHotelResponse>(`http://localhost:3000/hotels`).pipe(
        return this.http.get<HotelOrdersResponse>(`${this.appState.baseUrl}/hotels/getOrders/${this.appState.userToken}`).pipe(
            catchError(HandleError<HotelOrdersResponse>('Getting hotel orders')),
        );
    }
}
