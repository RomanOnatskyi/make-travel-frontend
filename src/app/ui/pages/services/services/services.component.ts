import { Component, OnInit } from '@angular/core';
import { UserHotel } from '../../../../responses/user-hotel-response';
import { ServicesService } from '../services.service';
import { HotelService } from '../../../../responses/hotel-service-response';
import { ServiceCategory } from '../../../../app-state.service';
import { Order } from '../order';

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

        this.userHotels = await this.getUserHotels();
        this.hotelServices = await this.getServices(this.userHotels[0].id, ServiceCategory.Cleaning);

        this.order.date = this.getCurrentTimeAsString();
    }

    categories = [
        { name: "Уборка", type: ServiceCategory.Cleaning, imageName: "cleaning" },
        { name: "Еда", type: ServiceCategory.Food, imageName: "food" },
        { name: "Развлечения", type: ServiceCategory.Entertainment, imageName: "entertainment" },
        { name: "Ремонт", type: ServiceCategory.Repairing, imageName: "repairing" },
    ];

    userHotels: UserHotel[];
    hotelServices: HotelService[];

    currentHotelId: number;
    currentCategory: ServiceCategory;

    order: Order = new Order();

    async hotelSelected(hotelId: number) {

        this.hotelServices = await this.getServices(hotelId, this.currentCategory);
    }

    async categorySelected(categoryId: ServiceCategory) {

        this.hotelServices = await this.getServices(this.currentHotelId, categoryId);
    }

    getCategoryImageName() {

        for (let i = 0; i < this.categories.length; i++) {

            if (this.categories[i].type == this.currentCategory) {
                return this.categories[i].imageName;
            }
        }
    }

    private async getUserHotels() {

        const userHotelsResponse = await this.servicesService.getUserHotels().toPromise();

        const error = userHotelsResponse.errors;

        if (error) {
            this.showError(error);
        }

        return userHotelsResponse.hotelList;
    }

    private async getServices(hotelId: number, categoryId: ServiceCategory) {

        this.currentHotelId = hotelId;
        this.currentCategory = categoryId;

        this.order.date = this.getCurrentTimeAsString();

        const hotelServicesResponse = await this.servicesService.getServicesByHotelIdAndCategory(hotelId, categoryId).toPromise();

        const error = hotelServicesResponse.errors;

        if (error) {
            this.showError(error);
        }

        return hotelServicesResponse.serviceList;
    }

    async makeOrder(serviceId: number) {

        this.order.hotelId = this.currentHotelId;
        this.order.serviceId = serviceId;

        this.servicesService.sendOrder(this.order)
            .subscribe(response => this.showError(response.errors));

        this.hotelServices = await this.getServices(this.currentHotelId, this.currentCategory);
    }

    private showError(errors: string) {

        alert(errors);
    }

    getCurrentTimeAsString() {

        let currentLocalTime = new Date().toUTCString();
        let hoursOffsetGMT = new Date().getTimezoneOffset() / 60;

        currentLocalTime += hoursOffsetGMT.toString();

        return new Date(currentLocalTime).toISOString().slice(0, 16);
    }
}
