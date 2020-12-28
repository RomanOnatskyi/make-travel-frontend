import { BaseResponse } from './base-response';
import { Feedback } from '../ui/pages/my-hotels/feedback';

export class UserHotel {
    id: number;
    name: string;
    feedback?: Feedback;
}

export class UserHotelResponse extends BaseResponse {
    hotelList: UserHotel[];
}
