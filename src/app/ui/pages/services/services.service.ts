import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppStateService } from '../../../app-state.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../../../handle-error';
import { UserHotelResponse } from '../../../responses/user-hotel-response';
import { HotelServiceResponse } from '../../../responses/hotel-service-response';
import { Order } from './order';
import { BaseResponse } from '../../../responses/base-response';

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
        return this.http.get<UserHotelResponse>(`http://localhost:3000/hotels`).pipe(
        // return this.http.get<UserHotelResponse>(`${this.appState.baseUrl}/hotels/getHotels/login`).pipe(
            catchError(HandleError<UserHotelResponse>('Getting hotels info')),
        );
    }

    getServicesByHotelIdAndCategory(hotelId: number, categoryId: number) {

        // todo: add token to url
        return this.http.get<HotelServiceResponse>(`http://localhost:3000/services`).pipe(
        // return this.http.get<HotelServiceResponse>(`${this.appState.baseUrl}/services/forHotel/${hotelId}/${categoryId}`).pipe(
            catchError(HandleError<HotelServiceResponse>('Getting services info')),
        );
    }

    getOrderedServicesByHotelIdAndCategory(hotelId: number, categoryId: number) {

        // todo: add token to url
        return this.http.get<HotelServiceResponse>(`http://localhost:3000/orderedServices`).pipe(
        // return this.http.get<HotelServiceResponse>(`${this.appState.baseUrl}/services/orderedForHotelAndUser/${hotelId}/${categoryId}/login`).pipe(
            catchError(HandleError<HotelServiceResponse>('Getting services info')),
        );
    }

    sendOrder(order: Order) {

        const params = new HttpParams()
            .set('values', JSON.stringify(order));

        // todo: add token to url
        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/order`, { params }).pipe(
            catchError(HandleError<UserHotelResponse>('Making order')),
        );
    }
}
