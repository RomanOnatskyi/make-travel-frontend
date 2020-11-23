import { BaseResponse } from './base-response';

export class HotelService {
    id: number;
    name: string;
    description: string;
    price: number;
    isOrdered?: boolean;
    orderDate?: string;
}

export class HotelServiceResponse extends BaseResponse {
    serviceList: HotelService[];
}


