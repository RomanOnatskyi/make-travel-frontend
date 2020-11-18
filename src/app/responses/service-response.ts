import { BaseResponse } from './base-response';

export class ServiceResponse extends BaseResponse {
    name: string;
    description: string;
    price: number;
}
