import { BaseResponse } from './base-response';
import { ServiceCategory, OrderStatus } from '../app-state.service';

export class HotelOrder {
    orderId: number;
    userId: number;
    orderName: string;
    category: ServiceCategory;
    orderDate: string;
    makingOrderDate: string;
    status: OrderStatus;
}

export class HotelOrdersResponse extends BaseResponse {
    hotelList: HotelOrder[];
}
