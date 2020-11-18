import { BaseResponse } from '../../../base-response';

export class UserHotel {
    id: number;
    name: string;
}

export class HotelService {
    id: number;
    name: string;
    description: string;
    price: number;
}

export class UserHotelResponse extends BaseResponse {
    hotelList: UserHotel[];
}

export class HotelServiceResponse extends BaseResponse {
    serviceList: HotelService[];
}

export class ServiceResponse extends BaseResponse {
    name: string;
    description: string;
    price: number;
}
