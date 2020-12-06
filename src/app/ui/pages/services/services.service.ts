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

        // return this.http.get<UserHotelResponse>(`http://localhost:3000/hotels`).pipe(
        return this.http.get<UserHotelResponse>(`${this.appState.baseUrl}/hotels/getHotels/${this.appState.userToken}`).pipe(
            catchError(HandleError<UserHotelResponse>('Getting hotels info')),
        );
    }

    getServicesByHotelIdAndCategory(hotelId: number, categoryId: number) {

        // return this.http.get<HotelServiceResponse>(`http://localhost:3000/services`).pipe(
        return this.http.get<HotelServiceResponse>(`${this.appState.baseUrl}/services/forHotel/${hotelId}/${categoryId}/${this.appState.userToken}`).pipe(
            catchError(HandleError<HotelServiceResponse>('Getting services info')),
        );
    }

    getOrderedServicesByHotelIdAndCategory(hotelId: number, categoryId: number) {

        // return this.http.get<HotelServiceResponse>(`http://localhost:3000/orderedServices`).pipe(
        return this.http.get<HotelServiceResponse>(`${this.appState.baseUrl}/services/orderedForHotelAndUser/${hotelId}/${categoryId}/${this.appState.userToken}`).pipe(
            catchError(HandleError<HotelServiceResponse>('Getting services info')),
        );
    }

    sendOrder(order: Order) {

        const params = new HttpParams()
            .set('values', JSON.stringify(order));

        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/order/${this.appState.userToken}`, { params }).pipe(
            catchError(HandleError<BaseResponse>('Making order')),
        );
    }

    cancelOrder(orderId: number) {

        const params = new HttpParams()
            .set('values', orderId.toString());

        return this.http.get<BaseResponse>(`${this.appState.baseUrl}/order/decline/${this.appState.userToken}`, { params }).pipe(
            catchError(HandleError<BaseResponse>('Declining order')),
        );
    }
}
