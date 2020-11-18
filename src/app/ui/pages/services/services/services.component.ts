import { Component, OnInit } from '@angular/core';
import { UserHotel, UserHotelResponse } from '../../../../responses/user-hotel-response';
import { ServicesService } from '../services.service';
import { HotelService, HotelServiceResponse } from '../../../../responses/hotel-service-response';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {

    constructor(
        private servicesService: ServicesService,
    ) {}

    async ngOnInit() {

        const userHotelsResponse = await this.servicesService.getUserHotels().toPromise();

        this.userHotels = userHotelsResponse.hotelList;
        this.errors = userHotelsResponse.errors;

        if (this.errors) {
            alert(this.errors);
            this.errors = null;
        }

        const hotelServicesResponse = await this.servicesService.getHotelServices(this.userHotels[0].id, 1).toPromise();

        this.hotelServices = hotelServicesResponse.serviceList;
        this.errors = hotelServicesResponse.errors;

        if (this.errors) {
            alert(this.errors);
            this.errors = null;
        }
    }

    userHotels: UserHotel[];
    hotelServices: HotelService[];
    errors: string;
}
