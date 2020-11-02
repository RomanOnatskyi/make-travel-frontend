import { AuthState } from './ui/pages/auth/auth-state';

export const baseUrl = "http://localhost:8080/maketravel/api";

export class AppState {

    authState = new AuthState();
}
