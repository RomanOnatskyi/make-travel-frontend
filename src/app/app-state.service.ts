import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppStateService {

    private state = new AppState();

    get appState() { return this.state; }
}

export class AppState {

    currentUser: UserRole = UserRole.Unauthorized;
    baseUrl = "http://localhost:8080/maketravel/api";
}

export enum UserRole {

    Unauthorized = "Unauthorized",
    Client = "Client",
    Employee = "Employee",
    HotelAdmin = "HotelAdmin",
    SystemAdmin = "SystemAdmin",
}
