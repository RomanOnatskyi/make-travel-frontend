import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { UserHotelResponse } from '../../../responses/user-hotel-response';
import { HotelServiceResponse } from '../../../responses/hotel-service-response';
import { BaseResponse } from '../../../responses/base-response';
import { Feedback } from './feedback';

@Injectable({
    providedIn: 'root',
})
export class MyHotelsService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getUserHotels() {

        // return this.http.get<UserHotelResponse>(`http://localhost:3000/hotels`).pipe(
        return this.http.get<UserHotelResponse>(`${this.appState.baseUrl}/hotels/getHotels/${this.appState.userToken}`).pipe(
            catchError(HandleError<UserHotelResponse>('Getting hotels info')),
        );
    }

    sendFeedback(feedback: Feedback) {

        const params = new HttpParams()
            .set('values', JSON.stringify(feedback));

        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/hotels/feedback/${this.appState.userToken}`, { params }).pipe(
            catchError(HandleError<BaseResponse>('Leaving feedback')),
        );
    }
}
