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
    currentPage: Pages = Pages.Main;
}

export enum UserRole {

    Unauthorized ,
    Client ,
    Employee ,
    HotelAdmin ,
    SystemAdmin ,
}

export enum ServiceCategory {

    Cleaning,
    Food,
    Entertainment,
    Repairing,
}

export enum OrderStatus {

    Registered,
    Accepted,
    Finished,
    Declined,
}

export enum Pages {

    Authentication,
    Registration,
    Main,
    Feedbacks,

    Services,
    MyHotels,

    NewService,
    Orders,
    Clients,
}
