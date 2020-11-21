import { Component, OnInit } from '@angular/core';
import { UserHotel } from '../../../../responses/user-hotel-response';
import { ServicesService } from '../services.service';
import { HotelService } from '../../../../responses/hotel-service-response';
import { ServiceCategory } from '../../../../app-state.service';

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

        this.userHotels = await this.updateUserHotels();
        this.hotelServices = await this.updateServices(this.userHotels[0].id, ServiceCategory.Cleaning);
    }

    categories = [
        { name: "Уборка", type: ServiceCategory.Cleaning },
        { name: "Еда", type: ServiceCategory.Food },
        { name: "Развлечения", type: ServiceCategory.Entertainment },
        { name: "Ремонт", type: ServiceCategory.Repairing },
    ];

    userHotels: UserHotel[];
    hotelServices: HotelService[];

    currentHotelId: number;
    currentCategory: ServiceCategory;

    async hotelSelected(hotelId: number) {

        this.hotelServices = await this.updateServices(hotelId, this.currentCategory);
    }

    async categorySelected(categoryId: ServiceCategory) {

        this.hotelServices = await this.updateServices(this.currentHotelId, categoryId);
    }

    private async updateUserHotels() {

        const userHotelsResponse = await this.servicesService.getUserHotels().toPromise();

        const error = userHotelsResponse.errors;

        if (error) {
            this.showError(error);
        }

        return userHotelsResponse.hotelList;
    }

    private async updateServices(hotelId: number, categoryId: ServiceCategory) {

        this.currentHotelId = hotelId;
        this.currentCategory = categoryId;

        const hotelServicesResponse = await this.servicesService.getServicesByHotelIdAndCategory(hotelId, categoryId).toPromise();

        const error = hotelServicesResponse.errors;

        if (error) {
            this.showError(error);
        }

        return hotelServicesResponse.serviceList;
    }

    private showError(errors: string) {

        alert(errors);
    }
}
