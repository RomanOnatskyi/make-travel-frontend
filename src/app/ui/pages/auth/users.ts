export class SignInUser {
    login: string;
    password: string;
}

export class SignUpUser {
    login: string;
    password: string;
    name: string;
    email: string;
    passport: string;
    captchaId: number;
    captchaValue: string;
}
