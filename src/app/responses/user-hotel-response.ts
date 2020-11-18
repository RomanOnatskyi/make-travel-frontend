import { BaseResponse } from './base-response';

export class UserHotel {
    id: number;
    name: string;
}

export class UserHotelResponse extends BaseResponse {
    hotelList: UserHotel[];
}
