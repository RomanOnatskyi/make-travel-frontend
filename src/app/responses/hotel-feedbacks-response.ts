import { BaseResponse } from './base-response';

export class HotelFeedback {
    userLogin: string;
    text: string;
}

export class HotelFeedbackResponse extends BaseResponse {
    feedbackList: HotelFeedback[];
}
