import { AuthState } from './ui/pages/auth/auth-state';

export const baseUrl = "localhost:8080/maketravel";

export class AppState {

    authState = new AuthState();
}
