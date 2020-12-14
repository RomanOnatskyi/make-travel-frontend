import { BaseResponse } from './base-response';

export class HotelOrder {
    orderId: number;
    userId: number;
    orderName: string;
    category: string;
    orderDate: string;
    makingOrderDate: string;
    status: string;
}

export class HotelOrdersResponse extends BaseResponse {
    hotelList: HotelOrder[];
}
