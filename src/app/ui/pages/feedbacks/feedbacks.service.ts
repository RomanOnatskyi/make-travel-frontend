import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { UserHotelResponse } from '../../../responses/user-hotel-response';
import { HotelFeedbackResponse } from '../../../responses/hotel-feedbacks-response';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';

@Injectable({
    providedIn: 'root',
})
export class FeedbacksService {

    constructor(
        private http: HttpClient,
        private appStateService: AppStateService,
    ) {
    }

    get appState() { return this.appStateService.appState; }

    getAllHotels() {

        // return this.http.get<UserHotelResponse>(`http://localhost:3000/all-hotels`).pipe(
        return this.http.get<UserHotelResponse>(`${this.appState.baseUrl}/hotels/getHotels/${this.appState.userToken}`).pipe(
            catchError(HandleError<UserHotelResponse>('Getting hotels info')),
        );
    }

    getFeedbacksByHotelId(hotelId: number) {

        // return this.http.get<HotelFeedbackResponse>(`http://localhost:3000/hotel-feedbacks`).pipe(
        return this.http.get<HotelFeedbackResponse>(`${this.appState.baseUrl}/services/forHotel/${hotelId}/${this.appState.userToken}`).pipe(
            catchError(HandleError<HotelFeedbackResponse>('Getting feedbacks')),
        );
    }
}
