import { BaseResponse } from './base-response';

export class HotelService {
    id: number;
    name: string;
    description: string;
    price: number;
    isOrdered: boolean;
}

export class HotelServiceResponse extends BaseResponse {
    serviceList: HotelService[];
}


