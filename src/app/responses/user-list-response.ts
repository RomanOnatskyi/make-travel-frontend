import { BaseResponse } from './base-response';

export class User {
    id: number;
    login: string;
    name: string;
    passport: string;
    email: string;
    isBanned?: boolean;
}

export class UserListResponse extends BaseResponse {
    userList: User[];
}


