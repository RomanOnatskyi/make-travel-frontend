import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppStateService {

    private state = new AppState();

    get appState() { return this.state; }
}

export class AppState {

    baseUrl = "http://localhost:8080/maketravel/api";
    currentUser: UserRole = UserRole.Unauthorized;
    userToken: string;
}

export enum UserRole {

    Unauthorized = "Unauthorized",
    Client = "Client",
    Employee = "Employee",
    HotelAdmin = "HotelAdmin",
    SystemAdmin = "SystemAdmin",
}

export enum ServiceCategory {

    Cleaning,
    Food,
    Entertainment,
    Repairing,
}
