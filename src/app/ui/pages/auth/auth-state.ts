export class User {
    login: string;
    password: string;
    name?: string;
    email?: string;
    passport?: string;
}

export class AuthState {

    action: "sign-up" | "sign-in" = null;
    user = new User();
    processing = false;
    errors: string = null;
}
